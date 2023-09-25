import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const PieChart = () => {
  const data = JSON.parse(localStorage.getItem("dashboard"));
  const [dashboard, setdashboard] = useState({});

  const GetDashboard = () => {
    fetch(import.meta.env.VITE_APIURL + "MedicalAppointmentGraph")
      .then((resp) => resp.json())
      .then((data) => {
        setdashboard(data.data);
        localStorage.setItem("dashboard", JSON.stringify(data.data));
      });
  };
  //#121212
  const theme = localStorage.getItem("theme");
  useEffect(() => {
    if (data === undefined) GetDashboard();
  }, [dashboard]);
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
                color: theme == 1 ? "#000" : "#fff",
              },
              total: {
                show: true,
                color: theme == 1 ? "#000" : "#fff",
              },
            },
          },
        },
      },
      stroke: {
        show: true,
        colors: theme == 1 ? "#fff" : "#2C3640",
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
        labels: {
          colors: theme != 1 ? "#fff" : "#202020",
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
          type="donut"
          height={300}
        />
      </div>
    </div>
  );
};

export default PieChart;
