export const isValidUrl = (string: string) => {
  if (!string) return true;
  try {
    new URL(string);
    return true;
  } catch {
    return false;
  }
};
