class Container implements IContainer {
  items: Map<string, any> = new Map<string, any>();
  scopes: Map<string, IContainer> = new Map<string, IContainer>();
  scope(name: string): IContainer {
    let scope = this.scopes.get(name);
    if (!scope) {
      scope = new Container();

      this.scopes.set(name, scope);
    }

    return scope;
  }
  register<T>(type: string, service: T | TServiceHandler) {
    const arr = this.items.get(type);

    if (arr) {
      const v = [...arr];

      v.push(service);

      this.items.set(type, v);
    } else {
      this.items.set(type, [service]);
    }
  }
  unregister(type: string, service?: any): boolean {
    if (service) {
      const arr = this.items.get(type);

      if (arr) {
        const v = [...arr];

        const index = v.indexOf(service);

        if (index >= 0) {
          v.splice(index, 1);

          this.items.set(type, v);

          return true;
        }
      }

      return false;
    } else {
      return this.items.delete(type);
    }
  }
  getService<T>(type: string): T | undefined {
    const arr = this.items.get(type);

    if (arr) {
      const item = arr[0];

      if (typeof item === 'function') {
        const fn = item as TServiceHandler;

        return fn(this) as T;
      } else {
        return item as T;
      }
    }

    return undefined;
  }
  getServices<T>(type?: string | ((t: T) => boolean)): T[] {
    if (type) {
      let obj: any;

      if (typeof type === 'string') {
        obj = this.items.get(type);
      } else if (typeof type === 'function') {
        const arr = Array.from(this.items.values());

        const list: any[] = [];

        for (const item of arr) {
          list.push(...item);
        }

        obj = list.filter(type);
      }

      if (obj) {
        const v = [...obj];

        return v.map((item) => {
          if (typeof item === 'function') {
            const fn = item as TServiceHandler;

            return fn(this) as T;
          } else {
            return item as T;
          }
        });
      }

      return [];
    } else {
      const arr: T[] = [];

      const vs = Array.from(this.items.values());

      for (const v of vs) {
        const vv = v as any[];

        for (const item of vv) {
          if (typeof item === 'function') {
            const fn = item as TServiceHandler;

            arr.push(fn(this) as T);
          } else {
            arr.push(item as T);
          }
        }
      }

      return arr;
    }
  }
}

export default Container;
