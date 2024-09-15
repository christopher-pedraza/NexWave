import React from "react";
import { Button } from "@nextui-org/react";

export default function Title() {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
          Usuarios (10)
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Administra usuarios (funcionalidades de tabla en el lado del cliente).
        </p>
      </div>
      <Button size="md" color="secondary" className="dark:bg-purple-700">
        + Añadir Nuevo
      </Button>
    </div>
  );
}
