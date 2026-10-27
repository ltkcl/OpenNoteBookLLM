const apiUrl = process.env.NEXT_PUBLIC_SERVER_URL ?? "http://localhost:8081";

export async function api<T>(path: string, init: RequestInit = {}): Promise<T> {
  const headers = new Headers(init.headers);
  if (init.body && !(init.body instanceof FormData)) headers.set("Content-Type", "application/json");
  const response = await fetch(`${apiUrl}${path}`, { ...init, headers, credentials: "include" });
  if (!response.ok) {
    const payload = await response.json().catch(() => null);
    throw new Error(payload?.error ?? payload?.message ?? `Request failed (${response.status})`);
  }
  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
}

export async function apiStream(path: string, body: unknown) {
  const response = await fetch(`${apiUrl}${path}`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    const payload = await response.json().catch(() => null);
    throw new Error(payload?.error ?? payload?.message ?? `Request failed (${response.status})`);
  }
  return { response, reader: response.body?.getReader() };
}

export { apiUrl };
