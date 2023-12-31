export default class AppWorker {
  constructor(worker) {
    const name = worker.toString();
    const blob = new Blob(["(" + name + ")()"]);
    return new Worker(URL.createObjectURL(blob));
  }
}
