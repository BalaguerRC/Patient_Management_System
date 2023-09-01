import { useState } from "react";
import ReactApexChart from "react-apexcharts";

const PieChart = () => {
  const [state, setstate] = useState({
    series: [
      {
        name: "Pending Result",
        data: [44, 55, 57],
      },
      {
        name: "Completed",
        data: [35, 41, 36],
      },
      {
        name: "Pending Consultation",
        data: [35, 41, 36],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "25%",
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        categories: ["1", "2", "3"],
      },
      yaxis: {
        title: {
          text: "amount",
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return "" + val + "";
          },
        },
      },
    },
  });
  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={state.options}
          series={state.series}
          type="bar"
          height={350}
        />
      </div>
    </div>
  );
};

export default PieChart;
