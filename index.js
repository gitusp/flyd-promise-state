import flyd from "flyd";
import filter from "flyd/module/filter";

export const toStateStream = p => {
  const s = flyd.stream({ state: "pending" });
  p.then(
    value => {
      s({ state: "fulfilled", value });
      s.end(true);
    },
    reason => {
      s({ state: "rejected", reason });
      s.end(true);
    }
  );
  return s;
};

export const filterFulfilled = s => filter(v => v.state === "fulfilled", s);

export const filterRejected = s => filter(v => v.state === "rejected", s);

export const toValueStream = s => filterFulfilled(s).map(v => v.value);

export const toReasonStream = s => filterRejected(s).map(v => v.reason);
