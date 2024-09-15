import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";

export default function MetaTable() {
  // Data randomly selected from the modal options
  const data = [
    { nombre: "Nombre", cuentasCreadas: "Semana del Financiero" },
    { nombre: "Rango de edad", cuentasCreadas: "17-28 años" }, // Example random choice
    { nombre: "Experiencia financiera", cuentasCreadas: "Intermedia" }, // Random choice
    { nombre: "Ubicación", cuentasCreadas: "Zona urbana" }, // Random choice
    { nombre: "Personalidad", cuentasCreadas: "Profesional" }, // Random choice
    { nombre: "Longitud", cuentasCreadas: "Regular" }, // Random choice
    { nombre: "Tecnicismo", cuentasCreadas: "Avanzado" }, // Random choice
    { nombre: "Proactividad", cuentasCreadas: "Proactivo" }, // Random choice
    { nombre: "Uso de Emojis", cuentasCreadas: "Moderado" }, // Random choice
  ];

  return (
    <>
      <Table
        isStriped
        aria-label="Example static collection table"
        className="mt-3"
      >
        <TableHeader>
          <TableColumn>CARACTERÍSTICA</TableColumn>
          <TableColumn>SELECCIÓN</TableColumn>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.nombre}</TableCell>
              <TableCell>{item.cuentasCreadas}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
