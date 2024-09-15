import { Card } from "@tremor/react";

export default function Cards() {
  const stats = [
    {
      id: 1,
      resource: "Promedio de Sentimiento",
      usage: "4.8",
      maximum: "/5",
    },
    {
      id: 2,
      resource: "Total de Cuentas Creadas",
      usage: "12,000",
      maximum: "",
    },
  ];

  return (
    <div className="my-6 grid grid-cols-1 gap-6 sm:max-w-3xl sm:grid-cols-2">
      {stats.map((item) => (
        <Card
          key={item.id}
          className="p-6 rounded-lg shadow-lg bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 ease-in-out"
        >
          <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
            {item.resource}
          </p>
          <p className="mt-3 flex items-end">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">
              {item.usage}
            </span>
            <span className="text-xl font-semibold text-gray-500 dark:text-gray-400 ml-2">
              {item.maximum}
            </span>
          </p>
        </Card>
      ))}
    </div>
  );
}
