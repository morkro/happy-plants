export default function errorHandler(error: Error, vm: Vue, info: string): void {
  const css = [
    'background:#E54B4B;padding:1px;border-radius:3px;color:#fff',
    'background:transparent',
    'font-weight:bold',
    'background:transparent',
  ]
  console.log(`%c[Global Error Handler]%c Error in %c${info}%c: ${error}`, ...css)
}
