export const cleanString = (str: string | null | undefined): string => {
  return str ? str.replace(/\s\s+/g, ' ').trim() : '';
};
