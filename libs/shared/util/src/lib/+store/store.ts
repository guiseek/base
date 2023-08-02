import { BehaviorSubject, distinctUntilChanged, map } from 'rxjs';

export abstract class Store<T> {
  #state: BehaviorSubject<T>;

  protected get state() {
    return this.#state.getValue();
  }

  constructor(initialState: T) {
    const state = Object.freeze(initialState);
    this.#state = new BehaviorSubject(state);
  }

  use() {
    return {
      pick: <K extends keyof T>(key: K) => {
        return this.select((state) => state[key]);
      },
      update: <K extends keyof T>(prop: K, value: T[K]) => {
        const state = { ...this.state, [prop]: value };
        return this.setState(state);
      },
    };
  }

  select<K>(mapFn: (state: T) => K) {
    return this.#state.asObservable().pipe(
      map((state: T) => mapFn(state)),
      distinctUntilChanged()
    );
  }

  setState(newState: Partial<T>) {
    this.#state.next({
      ...this.state,
      ...newState,
    });
  }
}
