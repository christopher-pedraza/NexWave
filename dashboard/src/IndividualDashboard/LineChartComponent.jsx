import { LineChart } from "@tremor/react";
import "./dash.css";

const data = [
  {
    date: "Aug 01",
    "Número de cuentas creadas": 5923,
  },
  {
    date: "Aug 02",
    "Número de cuentas creadas": 1950,
  },
  {
    date: "Aug 03",
    "Número de cuentas creadas": 4763,
  },
  {
    date: "Aug 04",
    "Número de cuentas creadas": 2075,
  },
  {
    date: "Aug 05",
    "Número de cuentas creadas": 1830,
  },
  {
    date: "Aug 06",
    "Número de cuentas creadas": 7652,
  },
  {
    date: "Aug 07",
    "Número de cuentas creadas": 4831,
  },
  {
    date: "Aug 08",
    "Número de cuentas creadas": 3127,
  },
  {
    date: "Aug 09",
    "Número de cuentas creadas": 6548,
  },
  {
    date: "Aug 10",
    "Número de cuentas creadas": 2791,
  },
  {
    date: "Aug 11",
    "Número de cuentas creadas": 3895,
  },
  {
    date: "Aug 12",
    "Número de cuentas creadas": 7213,
  },
  {
    date: "Aug 13",
    "Número de cuentas creadas": 4392,
  },
  {
    date: "Aug 14",
    "Número de cuentas creadas": 5149,
  },
  {
    date: "Aug 15",
    "Número de cuentas creadas": 3720,
  },
  {
    date: "Aug 16",
    "Número de cuentas creadas": 6124,
  },
  {
    date: "Aug 17",
    "Número de cuentas creadas": 2439,
  },
  {
    date: "Aug 18",
    "Número de cuentas creadas": 4862,
  },
  {
    date: "Aug 19",
    "Número de cuentas creadas": 7281,
  },
  {
    date: "Aug 20",
    "Número de cuentas creadas": 3974,
  },
];

const valueFormatter = (number) =>
  `${Intl.NumberFormat("us").format(number).toString()}`;

export default function LineChartComponent() {
  return (
    <>
      <LineChart
        data={data}
        connectNulls
        index="date"
        categories={["Número de cuentas creadas"]}
        colors={["blue", "violet", "fuchsia"]}
        valueFormatter={valueFormatter}
        yAxisWidth={60}
        backgroundColor="transparent"
        textColor="#FFFFFF" // Ensure all text is white in dark mode
        yAxisLabelTextColor="#FFFFFF" // White Y-axis text color
        xAxisLabelTextColor="#FFFFFF" // White X-axis text color
        padding={{ top: 40, right: 40, bottom: 60, left: 60 }} // Increased padding for better layout
        className="mt-6 h-96 dark:bg-gray-800 dark:text-white rounded-lg p-6 shadow-lg"
      />
    </>
  );
}
