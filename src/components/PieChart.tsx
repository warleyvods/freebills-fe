import React, { useState } from 'react';
import { Box, VStack, Text, useColorModeValue } from '@chakra-ui/react';

const PieChart = ({ labels = [], series = [], colors = [] }) => {
  const [tooltipContent, setTooltipContent] = useState('');
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [selectedSliceIndex, setSelectedSliceIndex] = useState(null);

  const strokeColor = useColorModeValue('#fff', '#1A202C');
  const tooltipBg = useColorModeValue('gray.700', 'gray.300');
  const tooltipColor = useColorModeValue('white', 'black');
  const defaultInnerCircleFillColor = useColorModeValue('#ffffff', '#1A202C');

  const total = series.reduce((acc, value) => acc + value, 0);

  if (total === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100%">
        Nenhum dado disponível
      </Box>
    );
  }

  const centerX = 100;
  const centerY = 100;
  const outerRadius = 100;
  const innerRadius = 75;
  const gapSize = 6;
  const circleThickness = 10;
  const innerCircleOuterRadius = innerRadius - gapSize;
  const innerCircleInnerRadius = innerCircleOuterRadius - circleThickness;

  const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  };

  const describeArc = (x, y, innerRadius, outerRadius, startAngle, endAngle) => {
    const deltaAngle = Math.abs(endAngle - startAngle);
    const fullCircle = deltaAngle >= 359.9999;

    if (fullCircle) {
      const d = [
        'M', x, y - outerRadius,
        'A', outerRadius, outerRadius, 0, 1, 1, x, y + outerRadius,
        'A', outerRadius, outerRadius, 0, 1, 1, x, y - outerRadius,
        'M', x, y - innerRadius,
        'A', innerRadius, innerRadius, 0, 1, 0, x, y + innerRadius,
        'A', innerRadius, innerRadius, 0, 1, 0, x, y - innerRadius,
        'Z',
      ].join(' ');
      return d;
    } else {
      const startOuter = polarToCartesian(x, y, outerRadius, startAngle);
      const endOuter = polarToCartesian(x, y, outerRadius, endAngle);
      const startInner = polarToCartesian(x, y, innerRadius, endAngle);
      const endInner = polarToCartesian(x, y, innerRadius, startAngle);
      const largeArcFlag = deltaAngle <= 180 ? '0' : '1';

      const d = [
        'M', startOuter.x, startOuter.y,
        'A', outerRadius, outerRadius, 0, largeArcFlag, 1, endOuter.x, endOuter.y,
        'L', startInner.x, startInner.y,
        'A', innerRadius, innerRadius, 0, largeArcFlag, 0, endInner.x, endInner.y,
        'Z',
      ].join(' ');
      return d;
    }
  };

  let cumulativeAngle = 0;

  const currencyFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  const slices = series.map((value, index) => {
    const angle =
      index === series.length - 1 ? 360 - cumulativeAngle : (value / total) * 360;
    const startAngle = cumulativeAngle;
    const endAngle = cumulativeAngle + angle;
    cumulativeAngle = endAngle;

    const pathData = describeArc(
      centerX,
      centerY,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle
    );

    const handleMouseEnter = (e) => {
      setTooltipContent(`${labels[index] || ''}: ${currencyFormatter.format(series[index] || 0)}`);
      setTooltipVisible(true);
      setSelectedSliceIndex(index);
    };

    const handleMouseMove = (e) => {
      setTooltipPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseLeave = () => {
      setTooltipVisible(false);
      setSelectedSliceIndex(null);
    };

    return (
      <path
        key={index}
        d={pathData}
        fill={colors[index % colors.length] || '#ccc'} // Usar a cor do backend ou fallback
        stroke={strokeColor}
        strokeWidth="1"
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        cursor="pointer"
      />
    );
  });

  const centerLabel = selectedSliceIndex !== null
    ? labels[selectedSliceIndex] || ''
    : 'Total';
  const centerValue = selectedSliceIndex !== null
    ? currencyFormatter.format(series[selectedSliceIndex] || 0)
    : currencyFormatter.format(total);
  const centerPercentage = selectedSliceIndex !== null
    ? `${((series[selectedSliceIndex] / total) * 100).toFixed(1)}%`
    : '';

  const innerCircleFillColor = selectedSliceIndex !== null
    ? colors[selectedSliceIndex % colors.length] || defaultInnerCircleFillColor
    : defaultInnerCircleFillColor;

  const innerCircleOpacity = selectedSliceIndex !== null ? 1 : 0.7;

  return (
    <Box position="relative" width="100%" height="100%">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 200 200"
        preserveAspectRatio="xMidYMid meet"
      >
        {slices}
        <path
          d={describeArc(
            centerX,
            centerY,
            innerCircleInnerRadius,
            innerCircleOuterRadius,
            0,
            360
          )}
          fill={innerCircleFillColor}
          stroke={strokeColor}
          strokeWidth="1"
          opacity={innerCircleOpacity}
        />
      </svg>
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        pointerEvents="none"
      >
        <VStack spacing={0}>
          <Text fontSize="md" fontWeight="medium">
            {centerLabel}
          </Text>
          <Text fontSize="lg" fontWeight="medium">
            {centerValue}
          </Text>
          {centerPercentage && (
            <Text fontSize="md" color="gray.500">
              {centerPercentage}
            </Text>
          )}
        </VStack>
      </Box>
      {tooltipVisible && (
        <Box
          position="fixed"
          left={`${tooltipPosition.x + 10}px`}
          top={`${tooltipPosition.y + 10}px`}
          bg={tooltipBg}
          color={tooltipColor}
          px="2"
          py="1"
          borderRadius="md"
          pointerEvents="none"
          fontSize="sm"
          zIndex="tooltip"
        >
          {tooltipContent}
        </Box>
      )}
    </Box>
  );
};

export default PieChart;
