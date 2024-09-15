import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { data } from "./AssetsDashboard/data";

export default function TableComponent() {
  return (
    <>
      <Table
        isStriped
        aria-label="Example static collection table"
        className="mt-3"
      >
        <TableHeader>
          <TableColumn>TEMAS POPULARES</TableColumn>
          <TableColumn># CUENTAS CREADAS</TableColumn>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.nombre}</TableCell>
              <TableCell>{item.cuentasCreadas.toLocaleString()}%</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
