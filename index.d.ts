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

export declare function filterFulfilled<T, M = {}>(
  stream: flyd.Stream<PromiseState<T> & M>
): flyd.Stream<PromiseStateFulfilled<T> & M>;

export declare function filterRejected<T, M = {}>(
  stream: flyd.Stream<PromiseState<T> & M>
): flyd.Stream<PromiseStateRejected & M>;

export declare function toValueStream<T, M = {}>(
  stream: flyd.Stream<PromiseState<T> & M>
): flyd.Stream<T>;

export declare function toReasonStream<T, M = {}>(
  stream: flyd.Stream<PromiseState<T> & M>
): flyd.Stream<Error>;
