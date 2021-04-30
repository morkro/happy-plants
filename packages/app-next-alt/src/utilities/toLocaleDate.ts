export const toLocaleDate = (dateString: string | number | Date): string =>
  new Date(dateString).toLocaleDateString(navigator && navigator.language)
