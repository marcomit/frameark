class Signal<T> {
  private proxy: T extends object ? T : { value: T };
  constructor(value: T) {
    this.proxy = new Proxy<RefReturn<T>>(
      typeof value === "object" ? value : { value },
      {
        get: this.get(),
        set: this.set(),
      }
    );
  }
  public get() {}
  public set() {}
}
