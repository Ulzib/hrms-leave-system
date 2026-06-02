export const TIME_OPTION = Array.from({ length: 24 }, (_, i) => {
  const aa = String(i).padStart(2, 0);
  return { value: `${aa}:00`, label: `${aa}:00` };
});
