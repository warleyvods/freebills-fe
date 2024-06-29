import React from "react";
import { Pie, Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { Box } from "@chakra-ui/react";

export interface PieChart {
  labels: string[];
  series: number[];
}

export const PieChartVehicleStatus: React.FC<PieChart> = ({labels, series}) => {
  Chart.register(ArcElement, Tooltip, Legend);

  return (
    <Box w={"100%"} flex={1}>
      <Doughnut
        data={{
          labels: [...labels],
          datasets: [
            {
              label: "",
              data: [...series],
              backgroundColor: ["#0099ff", "#FFD700", "#FC6075"],
              borderColor: ["#0099ff", "#FFD700", "#FC6075"],
              borderWidth: 1,
            },
          ],
        }}
        options={{
          maintainAspectRatio: false,
          responsive: true,
          plugins: {
            legend: {
              position: "right",
            },
          },
        }}
      />
    </Box>
  );
};
