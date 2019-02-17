import flyd from "flyd";
import {
  toStateStream,
  filterFulfilled,
  filterRejected,
  toValueStream,
  toReasonStream
} from ".";

test("toStateStream - fulfilled", async () => {
  const resolver = flyd.stream();
  const p = new Promise(r => {
    flyd.on(r, resolver);
  });
  const s = toStateStream(p);

  expect(s()).toEqual({ state: "pending" });

  const value = Math.random();
  resolver(value);

  await new Promise(r => {
    setTimeout(() => {
      expect(s()).toEqual({ state: "fulfilled", value });
      r(true);
    }, 100);
  });
});

test("toStateStream - rejected", async () => {
  const rejector = flyd.stream();
  const p = new Promise((_, r) => {
    flyd.on(r, rejector);
  });
  const s = toStateStream(p);

  expect(s()).toEqual({ state: "pending" });

  const reason = new Error(Math.random);
  rejector(reason);

  await new Promise(r => {
    setTimeout(() => {
      expect(s()).toEqual({ state: "rejected", reason });
      r(true);
    }, 100);
  });
});

test("filter", async () => {
  const s = flyd.stream();
  const ff = filterFulfilled(s);
  const fr = filterRejected(s);
  const vs = toValueStream(s);
  const rs = toReasonStream(s);

  const value = Math.random();
  s({ state: "fulfilled", value });

  const reason = new Error(Math.random);
  s({ state: "rejected", reason });

  s({ state: "pending" });

  expect(ff()).toEqual({ state: "fulfilled", value });
  expect(fr()).toEqual({ state: "rejected", reason });
  expect(vs()).toBe(value);
  expect(rs()).toBe(reason);
});
