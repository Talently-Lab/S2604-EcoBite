function toMinutes(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

/** Whether a restaurant is open at `now`, supporting schedules that cross midnight. */
export function isOpenNow(openingTime: string, closingTime: string, now = new Date()): boolean {
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  const opening = toMinutes(openingTime);
  const closing = toMinutes(closingTime);

  if (closing < opening) {
    return nowMinutes >= opening || nowMinutes <= closing;
  }
  return nowMinutes >= opening && nowMinutes <= closing;
}
