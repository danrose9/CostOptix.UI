// convert date YYYY-MM-DDTHH:mm:ss.SSSSSZ to YYYY-MM-DD
export function formatISODateToYYYYMMDD(date: string): string {
  const newDate = new Date(date);
  return newDate.toISOString().split('T')[0];
  // return newDate.toISOString().split('T')[0];
}

// convert date YYYY-MM-DDTHH:mm:ss.SSSSSZ to ddd MMM DD YYYY
export function formatISODateToUTCDate(date: string): string {
  const newDate = new Date(date);
  return newDate.toDateString();
}
