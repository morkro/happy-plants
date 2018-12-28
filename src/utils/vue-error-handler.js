export default function errorHandler (err, vm, info) {
  const css = [
    'background:#c41a16;padding:1px;border-radius:3px;color:#fff',
    'background:transparent',
    'font-weight:bold',
    'background:transparent'
  ]
   // eslint-disable-next-line no-console
  console.log(
    `%c[Global Error Handler]%c Error in %c${info}%c: ${err}%c`,
    ...css
  )
}
