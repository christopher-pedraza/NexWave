import { BarChart, Divider } from "@tremor/react";

// Updated sentiment analysis data (daily values in February and March, 0 to 5 scale)

const data = [
  { date: "01 Feb", Sentimiento: 4.5, "Last Year": 3.2 },
  { date: "02 Feb", Sentimiento: 4.1, "Last Year": 3.3 },
  { date: "03 Feb", Sentimiento: 3.8, "Last Year": 3.0 },
  { date: "04 Feb", Sentimiento: 4.2, "Last Year": 3.5 },
  { date: "05 Feb", Sentimiento: 3.9, "Last Year": 3.4 },
  { date: "06 Feb", Sentimiento: 4.0, "Last Year": 3.8 },
  { date: "07 Feb", Sentimiento: 3.7, "Last Year": 3.6 },
  { date: "08 Feb", Sentimiento: 4.1, "Last Year": 3.9 },
  { date: "09 Feb", Sentimiento: 4.3, "Last Year": 3.7 },
  { date: "10 Feb", Sentimiento: 4.4, "Last Year": 3.8 },
  { date: "11 Feb", Sentimiento: 4.0, "Last Year": 3.9 },
  { date: "12 Feb", Sentimiento: 3.9, "Last Year": 3.6 },
  { date: "13 Feb", Sentimiento: 4.2, "Last Year": 3.7 },
  { date: "14 Feb", Sentimiento: 4.5, "Last Year": 3.9 },
  { date: "15 Feb", Sentimiento: 4.3, "Last Year": 4.1 },
  { date: "16 Feb", Sentimiento: 4.1, "Last Year": 3.8 },
  { date: "17 Feb", Sentimiento: 4.0, "Last Year": 3.9 },
  { date: "18 Feb", Sentimiento: 3.8, "Last Year": 3.6 },
  { date: "19 Feb", Sentimiento: 3.9, "Last Year": 3.7 },
  { date: "20 Feb", Sentimiento: 4.3, "Last Year": 3.9 },
  { date: "21 Feb", Sentimiento: 4.2, "Last Year": 4.0 },
  { date: "22 Feb", Sentimiento: 4.0, "Last Year": 3.5 },
  { date: "23 Feb", Sentimiento: 3.9, "Last Year": 3.4 },
  { date: "24 Feb", Sentimiento: 4.4, "Last Year": 4.2 },
  { date: "25 Feb", Sentimiento: 4.5, "Last Year": 3.7 },
  { date: "26 Feb", Sentimiento: 4.0, "Last Year": 3.8 },
  { date: "27 Feb", Sentimiento: 3.7, "Last Year": 3.6 },
  { date: "28 Feb", Sentimiento: 4.1, "Last Year": 3.9 },
  { date: "01 Mar", Sentimiento: 3.9, "Last Year": 4.0 },
  { date: "02 Mar", Sentimiento: 4.2, "Last Year": 4.1 },
  { date: "03 Mar", Sentimiento: 4.3, "Last Year": 4.2 },
];

// Formatter for sentiment score (0-5 scale)
function valueFormatter(number) {
  return number.toFixed(1); // Show one decimal point
}

export default function BarChartComponent() {
  return (
    <>
      <BarChart
        data={data}
        index="date"
        categories={["Sentimiento"]}
        colors={["blue"]}
        valueFormatter={valueFormatter}
        yAxisWidth={60}
        backgroundColor="transparent"
        textColor="#FFFFFF" // Ensure all text is white in dark mode
        yAxisLabelTextColor="#FFFFFF" // White Y-axis text color
        xAxisLabelTextColor="#FFFFFF" // White X-axis text color
        padding={{ top: 40, right: 40, bottom: 60, left: 60 }} // Increased padding for better layout
        minValue={0}
        maxValue={5}
        stepSize={1}
        className="mt-6 h-96 dark:bg-gray-800 dark:text-white rounded-lg p-6 shadow-lg"
      />
      <Divider />
    </>
  );
}
