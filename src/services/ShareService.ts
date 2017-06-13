
export class ShareService {

  private container: any;

  constructor() {
    this.container = {};
  }

  set(key: String, value: any) {
    this.container.key = value;
  }

  get(key: String) {
    return this.container.key;
  }

  clear() {
    this.container = {};
  }
}
