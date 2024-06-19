// convert date YYYY-MM-DDTHH:mm:ss.SSSSSZ to YYYY-MM-DD
export function formatISODateToYYYYMMDD(date: string): string {
  if (!date) {
    return '';
  }
  const newDate = new Date(date);
  return newDate.toISOString().split('T')[0];
  // return newDate.toISOString().split('T')[0];
}

// convert date YYYY-MM-DDTHH:mm:ss.SSSSSZ to ddd MMM DD YYYY
export function formatISODateToUTCDate(date: string): string {
  if (!date) {
    return '';
  }
  const newDate = new Date(date);
  return newDate.toDateString();
}

export function formatISODateToMMMDDYYYY(dateString: string): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Intl.DateTimeFormat('en-US', options).format(date);
}
