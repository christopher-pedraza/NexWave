import Chart from "./Chart";
import MetaTable from "./MetaTable";
import TableComponent from "./TableComponent";
import { Divider } from "@nextui-org/react";

export default function IndividualDashboard() {
  return (
    <div>
      <Chart />
      <div className="mt-8">
        {/* Divider de NextUI */}
        <Divider />
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
            Configuración de la Campaña
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            La tabla a continuación muestra los parámetros clave utilizados en
            la configuración de la campaña. Estos parámetros incluyen el perfil
            demográfico y el tono de la interacción del bot, optimizados para
            conectar con el público objetivo.
          </p>
          <MetaTable />
        </div>
        <Divider />
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
            Temas Clave en Conversaciones de Cierre de Cuentas
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            La tabla muestra los temas más mencionados en conversaciones de
            WhatsApp donde los usuarios cerraron cuentas, ordenados por el
            porcentaje de aparición en esas interacciones.
          </p>
          <TableComponent />
        </div>
      </div>
    </div>
  );
}
