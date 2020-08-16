declare module 'worker-loader!*' {
  class WebpackWorker extends Worker {
    constructor()
  }

  // Uncomment this if you set the `esModule` option to `false`
  // export = WebpackWorker;
  export default WebpackWorker
}
