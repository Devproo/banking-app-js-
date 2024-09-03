'use client';
import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);
const DoughnutChart = ({ accounts }: DoughnutChartProps) => {
  const accounNames = accounts.map((a) => a.name)
  const balances = accounts.map((a) => a.currentBalance)
  const data = {
    datasets: [
      {
        label: 'banks',
        data: balances,
        backgroundColor: ['#0747b6', '#2265db', '#2f91fa'],
      },
    ],
    labels: accounNames,
  };
  return (
    <Doughnut
      data={data}
      options={{
        cutout: '60%',
        plugins: {
          legend: {
            display: false,
          },
        },
      }}
    />
  );
};

export default DoughnutChart;
