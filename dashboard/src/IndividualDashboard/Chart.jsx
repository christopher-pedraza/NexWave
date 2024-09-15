import BarChart from "./BarChartComponent";
import LineChartComponent from "./LineChartComponent";
import { Divider } from "@nextui-org/react"; // Importar Divider de NextUI
import Cards from "./Cards";

export default function Chart() {
  return (
    <>
      <div className="flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 pb-1">
              Análisis de Sentimiento y Creación de Cuentas
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Visualiza el análisis de sentimiento en conversaciones de WhatsApp
              y el número de cuentas creadas durante la campaña.
            </p>
          </div>
        </div>
        <Cards />

        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
            Análisis de Sentimiento en Conversaciones
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Esta gráfica muestra el nivel de agrado de los usuarios en las
            conversaciones de WhatsApp durante la campaña.
          </p>
          {/* Divider de NextUI */}
          <Divider />
          <BarChart />
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
            Número de Cuentas Creadas Durante la Campaña
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            A continuación se muestra el número de cuentas creadas diariamente a
            lo largo de la campaña.
          </p>
          {/* Divider de NextUI */}
          <Divider />
          <LineChartComponent />
        </div>
      </div>
    </>
  );
}
