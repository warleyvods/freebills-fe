// PieChart.jsx
import React, { useState } from 'react';
import { Box, Flex } from '@chakra-ui/react';

const PieChart = ({ labels = [], series = [] }) => {
  // Estados para o tooltip
  const [tooltipContent, setTooltipContent] = useState('');
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  // Estado para a fatia selecionada
  const [selectedSliceIndex, setSelectedSliceIndex] = useState(null);

  // Cálculo do total dos valores
  const total = series.reduce((acc, value) => acc + value, 0);

  // Verifica se há dados para exibir
  if (total === 0) {
    return (
      <Flex>
        Nenhum dado disponivel
      </Flex>
    );
  }

  // Dimensões do gráfico
  const centerX = 100;
  const centerY = 100;
  const outerRadius = 100;
  const innerRadius = 75; // Altere este valor para ajustar o tamanho do furo do gráfico principal

  // Definir a margem desejada entre o círculo interno e o gráfico principal
  const gapSize = 6; // Altere este valor para controlar a margem (espaço) desejada

  // Espessura do círculo interno
  const circleThickness = 10; // Ajuste este valor para controlar a espessura do círculo interno

  // Raios do círculo interno
  const innerCircleOuterRadius = innerRadius - gapSize;
  const innerCircleInnerRadius = innerCircleOuterRadius - circleThickness;

  // Função para converter ângulo em coordenadas cartesianas
  const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  };

  // Função para descrever o arco SVG para cada segmento da rosquinha
  const describeArc = (x, y, innerRadius, outerRadius, startAngle, endAngle) => {
    const deltaAngle = Math.abs(endAngle - startAngle);
    const fullCircle = deltaAngle >= 359.9999;

    if (fullCircle) {
      const d = [
        // Mover para o ponto inicial do círculo externo
        'M', x, y - outerRadius,
        // Desenhar o círculo externo (dois arcos de 180 graus)
        'A', outerRadius, outerRadius, 0, 1, 1, x, y + outerRadius,
        'A', outerRadius, outerRadius, 0, 1, 1, x, y - outerRadius,
        // Mover para o ponto inicial do círculo interno
        'M', x, y - innerRadius,
        // Desenhar o círculo interno (dois arcos de 180 graus, direção oposta)
        'A', innerRadius, innerRadius, 0, 1, 0, x, y + innerRadius,
        'A', innerRadius, innerRadius, 0, 1, 0, x, y - innerRadius,
        'Z',
      ].join(' ');

      return d;
    } else {
      // Código original para arcos menores que 360 graus
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

  // Função para desenhar um círculo completo com um furo (rosquinha)
  const describeFullDonut = (x, y, innerRadius, outerRadius) => {
    const d = [
      // Primeiro semicírculo externo
      'M', x, y - outerRadius,
      'A', outerRadius, outerRadius, 0, 1, 1, x, y + outerRadius,
      // Segundo semicírculo externo
      'A', outerRadius, outerRadius, 0, 1, 1, x, y - outerRadius,
      // Mover para o raio interno
      'M', x, y - innerRadius,
      // Primeiro semicírculo interno
      'A', innerRadius, innerRadius, 0, 1, 0, x, y + innerRadius,
      // Segundo semicírculo interno
      'A', innerRadius, innerRadius, 0, 1, 0, x, y - innerRadius,
      'Z',
    ].join(' ');

    return d;
  };

  // Cores para os segmentos (personalizável)
  const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'];

  let cumulativeAngle = 0;

  // Gerar os segmentos do gráfico
  const slices = series.map((value, index) => {
    // Ajuste no cálculo do ângulo
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

    // Manipuladores de evento para o tooltip
    const handleMouseEnter = (e) => {
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
    <Box position="relative" width="200px" height="200px" mx="auto">
      <svg width="200" height="200" viewBox="0 0 200 200">
        {slices}

        {/* Círculo Interno com Valor */}
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
