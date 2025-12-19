export const passwordFields = [
  {
    name: "oldPassword" as const,
    label: "Contraseña anterior",
    field: "old" as const,
  },
  {
    name: "newPassword" as const,
    label: "Contraseña nueva",
    field: "new" as const,
  },
  {
    name: "confirmPassword" as const,
    label: "Confirmar contraseña",
    field: "confirm" as const,
  },
];
