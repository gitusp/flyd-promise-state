export type PromiseState<T> =
  | { state: "pending" }
  | { state: "fulfilled"; value: T }
  | { state: "rejected"; reason: Error };

export declare function toStateStream<T>(
  promise: Promise<T> | PromiseLike<T>
): flyd.Stream<PromiseState<T>>;

export declare function toValueStream<T>(
  stream: flyd.Stream<PromiseState<T>>
): flyd.Stream<T>;

export declare function toReasonStream<T>(
  stream: flyd.Stream<PromiseState<T>>
): flyd.Stream<Error>;
