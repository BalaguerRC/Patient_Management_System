import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const PieChart = () => {
  const data = JSON.parse(localStorage.getItem("dashboard"));
  const [dashboard, setdashboard] = useState({});

  const GetDashboard = () => {
    fetch(import.meta.env.VITE_APIURL + "MedicalAppointments/dashboard")
      .then((resp) => resp.json())
      .then((data) => {
        setdashboard(data.data);
        localStorage.setItem("dashboard", JSON.stringify(data.data));
      });
  };

  useEffect(() => {
    GetDashboard();
  }, [dashboard]);
  //console.log("pending",dashboard[0]?.pending_Results)
  const [state, setstate] = useState({
    series: [
      data[0]?.pending_Results,
      data[0]?.results,
      data[0]?.pending_Consultation,
    ],
    options: {
      chart: {
        width: 380,
        type: "donut",
      },
      dataLabels: {
        enabled: true,
      },
      plotOptions: {
        pie: {
          borderRadius: 10,
          customScale: 0.8,
          expandOnClick: true,
          donut: {
            size: "75%",
            labels: {
              show: true,
              name: {},
              value: {
                color: "undefined",
              },
              total: {
                show: true,
                color: "#undefined",
              },
            },
          },
        },
      },
      stroke: {
        show: true,
        colors: "#fff",
        width: 5,
      },
      labels: ["Pending Results", "Results", "Pending Consultation"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              show: false,
            },
          },
        },
      ],
      legend: {
        position: "right",
        offsetY: 0,
        height: 230,
      },
    },

    /*series: [
      {
        name: "Pending_Consultation",
        data: [pending_Consultation],
      },
      {
        name: "Pending_Results",
        data: [0, pending_Results],
      },
      {
        name: "Results",
        data: [0, 0, results],
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
          columnWidth: "55%",
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
        categories: ["Feb", "Mar", "Apr"],
      },
      yaxis: {
        title: {
          text: "$ (thousands)",
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return "$ " + val + " thousands";
          },
        },
      },
    },*/
  });

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={state.options}
          series={state.series}
          type="donut"
          height={300}
        />
      </div>
    </div>
  );
};

export default PieChart;
