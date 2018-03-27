
export class ShareService {

  private container: any;

  constructor() {
    this.container = {};
  }

  set(key: string, value: any) {
    this.container[key] = value;
  }

  get(key: string) {
    return this.container[key];
  }

  clear() {
    this.container = {};
  }
}
