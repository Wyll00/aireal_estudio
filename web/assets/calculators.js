(function (root) {
  'use strict';
  const finite = (value, min, max) => Math.max(min, Math.min(max, Number.isFinite(Number(value)) ? Number(value) : min));
  function timeScenario({ hours, share, hourValue, monthlyCost }) {
    const savedHours = finite(hours, 0, 40) * finite(share, 0, 90) / 100 * 52 / 12;
    const gross = savedHours * finite(hourValue, 0, 1000);
    return { savedHours, gross, net: gross - finite(monthlyCost, 0, 50000) };
  }
  function bookingScenario({ revenue, share, commission, fee, annualCost }) {
    const gross = finite(revenue, 0, 250000) * finite(share, 0, 100) / 100 * (finite(commission, 0, 50) - finite(fee, 0, 50)) / 100;
    return { gross, net: gross - finite(annualCost, 0, 100000) };
  }
  root.AirealMath = { timeScenario, bookingScenario };
  if (typeof module !== 'undefined' && module.exports) module.exports = root.AirealMath;
}(typeof window !== 'undefined' ? window : globalThis));
