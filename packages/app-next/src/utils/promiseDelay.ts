export default async function delay(ms = 2000): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
