export const dollars = (cents: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cents / 100);

export const parsePriceToCents = (str: string) => {
  const cleaned = str.replace(/[^\d.]/g, '');
  const value = Number(cleaned || '0');
  return Math.round(value * 100);
};
