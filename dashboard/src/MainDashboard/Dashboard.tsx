import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Tooltip,
} from "@nextui-org/react";
import { EyeIcon } from "./AssetsDashboard/EyeIcon";
import { DeleteIcon } from "./AssetsDashboard/DeleteIcon";
import { data } from "./AssetsDashboard/data";
import Title from "./Title";

export default function Dashboard() {
  return (
    <>
      <Title />
      <Table isStriped aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>NOMBRE</TableColumn>
          <TableColumn>SENTIMIENTO</TableColumn>
          <TableColumn># CUENTAS CREADAS</TableColumn>
          <TableColumn>ESTATUS</TableColumn>
          <TableColumn>ACCIONES</TableColumn>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.nombre}</TableCell>
              <TableCell>{item.sentimiento}</TableCell>
              <TableCell>{item.cuentasCreadas.toLocaleString()}</TableCell>
              <TableCell>
                <Chip color={item.estatus === "Activo" ? "primary" : "danger"}>
                  {item.estatus}
                </Chip>
              </TableCell>
              <TableCell>
                <div className="relative flex items-center gap-2">
                  <Tooltip content="Detalles">
                    <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                      <EyeIcon />
                    </span>
                  </Tooltip>
                  <Tooltip color="danger" content="Borrar campaña">
                    <span className="text-lg text-danger cursor-pointer active:opacity-50">
                      <DeleteIcon />
                    </span>
                  </Tooltip>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
