export type PromiseStatePending = { state: "pending" };

export type PromiseStateFulfilled<T> = { state: "fulfilled"; value: T };

export type PromiseStateRejected = { state: "rejected"; reason: Error };

export type PromiseState<T> =
  | PromiseStatePending
  | PromiseStateFulfilled<T>
  | PromiseStateRejected;

export declare function toStateStream<T>(
  promise: Promise<T> | PromiseLike<T>
): flyd.Stream<PromiseState<T>>;

export declare function filterFulfilled<
  T,
  U extends PromiseState<T>,
  V extends PromiseStateFulfilled<T>
>(stream: flyd.Stream<U>): flyd.Stream<V>;

export declare function filterRejected<
  T,
  U extends PromiseState<T>,
  V extends PromiseStateRejected
>(stream: flyd.Stream<U>): flyd.Stream<V>;

export declare function toValueStream<T, U extends PromiseState<T>>(
  stream: flyd.Stream<U>
): flyd.Stream<T>;

export declare function toReasonStream<T, U extends PromiseState<T>>(
  stream: flyd.Stream<U>
): flyd.Stream<Error>;
