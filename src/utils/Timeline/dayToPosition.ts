function dayToPosition(day: number, now: number, dayWidth: number): number {
  return day * dayWidth + now;
}

export { dayToPosition };
