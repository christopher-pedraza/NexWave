import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Divider,
} from "@nextui-org/react";
import { EyeIcon } from "./AssetsDashboard/EyeIcon";
import { DeleteIcon } from "./AssetsDashboard/DeleteIcon";
import { data } from "./AssetsDashboard/data";
import Title from "./Title";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook from react-router-dom

export default function Dashboard() {
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleEyeIconClick = () => {
    navigate("/indv"); // Navigate to /indv when EyeIcon is clicked
  };

  return (
    <>
      <Title />
      <Divider />
      <Table
        isStriped
        aria-label="Example static collection table"
        className="mt-3"
      >
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
              <TableCell>{item.estatus}</TableCell>
              <TableCell>
                <div className="relative flex items-center gap-2">
                  <Tooltip content="Detalles">
                    <span
                      className="text-lg text-default-400 cursor-pointer active:opacity-50"
                      onClick={handleEyeIconClick} // Add onClick handler
                    >
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
