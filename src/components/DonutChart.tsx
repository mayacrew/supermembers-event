"use client";

import { ApexOptions } from "apexcharts";
import { useState } from "react";
import ReactApexChart from "react-apexcharts";

const DonutChart = () => {
  const [state, setState] = useState<{
    series: number[];
    options: ApexOptions;
  }>({
    series: [44, 55, 41, 17, 15, 12],
    options: {
      chart: {
        type: "donut",
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  });

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={state.options}
          series={state.series}
          type="donut"
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default DonutChart;
