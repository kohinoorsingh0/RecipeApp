const KEY = "favs";

export function getFavourites() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || [];
  } catch {
    return [];
  }
}

export function isFavourite(id) {
  return getFavourites().includes(String(id));
}

export function toggleFavourite(id) {
  const current = getFavourites();
  const key = String(id);
  const next = current.includes(key) ? current.filter((x) => x !== key) : [...current, key];
  localStorage.setItem(KEY, JSON.stringify(next));
  return next;
}