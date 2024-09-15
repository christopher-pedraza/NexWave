const columns = [
  { name: "CAMPAÑA", uid: "name" },
  { name: "ROL", uid: "role" },
  { name: "STATUS", uid: "status" },
  { name: "ACCIONES", uid: "actions" },
];

const users = [
  {
    id: 1,
    name: "Promoción de Verano",
    role: "CEO",
    team: "Gestión",
    status: "activo",
    age: "29",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    email: "tony.reichert@ejemplo.com",
  },
  {
    id: 2,
    name: "Ventas de Invierno",
    role: "Líder Técnico",
    team: "Desarrollo",
    status: "pausado",
    age: "25",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    email: "zoey.lang@ejemplo.com",
  },
  {
    id: 3,
    name: "Lanzamiento de Primavera",
    role: "Desarrolladora Senior",
    team: "Desarrollo",
    status: "activo",
    age: "22",
    avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    email: "jane.fisher@ejemplo.com",
  },
];

export { columns, users };
