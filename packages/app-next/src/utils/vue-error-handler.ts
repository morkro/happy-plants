export default function errorHandler(error: unknown, vm: any, info: string): void {
  const css = [
    'background:#c41a16;padding:1px;border-radius:3px;color:#fff',
    'background:transparent',
    'font-weight:bold',
    'background:transparent',
  ]
  console.log(`%c[Global Error Handler]%c Error in %c${info}%c: ${error}`, ...css)
}
