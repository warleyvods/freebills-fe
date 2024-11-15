import React, { useState } from 'react';
import { Box } from '@chakra-ui/react';

const PieChart = ({ labels = [], series = [] }) => {
  const [tooltipContent, setTooltipContent] = useState('');
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [selectedSliceIndex, setSelectedSliceIndex] = useState(null);

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

  const describeFullDonut = (x, y, innerRadius, outerRadius) => {
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
  };

  const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'];
  let cumulativeAngle = 0;

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

    const handleMouseEnter = () => {
      setTooltipContent(`${labels[index] || ''}: ${series[index] || 0}`);
      setTooltipVisible(true);
    };

    const handleMouseMove = (e) => {
      setTooltipPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseLeave = () => {
      setTooltipVisible(false);
    };

    return (
      <path
        key={index}
        d={pathData}
        fill={colors[index % colors.length]}
        stroke="#fff"
        strokeWidth="1"
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => setSelectedSliceIndex(index)}
        cursor="pointer"
      />
    );
  });

  return (
    <Box position="relative" width="100%" height="100%">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 200 200"
        preserveAspectRatio="xMidYMid meet"
      >
        {slices}
        {selectedSliceIndex !== null && (
          <>
            <path
              d={describeFullDonut(
                centerX,
                centerY,
                innerCircleInnerRadius,
                innerCircleOuterRadius
              )}
              fill={colors[selectedSliceIndex % colors.length]}
              stroke="#fff"
              strokeWidth="1"
              onClick={() => setSelectedSliceIndex(null)}
              cursor="pointer"
            />
            <text
              x={centerX}
              y={centerY}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="16"
              fill="#000"
              fontWeight="bold"
            >
              {series[selectedSliceIndex]}
            </text>
          </>
        )}
      </svg>
      {tooltipVisible && (
        <Box
          position="fixed"
          left={`${tooltipPosition.x + 10}px`}
          top={`${tooltipPosition.y + 10}px`}
          bg="gray.700"
          color="white"
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
