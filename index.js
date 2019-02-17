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

export const toValueStream = s =>
  filter(v => v.state === "fulfilled", s).map(v => v.value);

export const toReasonStream = s =>
  filter(v => v.state === "rejected", s).map(v => v.reason);
