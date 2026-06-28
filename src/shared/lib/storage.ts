export function loadStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;

  const data = localStorage.getItem(key);
  if (!data) return fallback;

  try {
    return JSON.parse(data) as T;
  } catch {
    return fallback;
  }
}

export function saveStorage<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

export const todayKey = () => new Date().toLocaleDateString("pt-BR");
