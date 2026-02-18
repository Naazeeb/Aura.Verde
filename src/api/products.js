export async function getProducts(
  { page = 1, limit = 12, sort = "", q = "", category = "", minPrice = "", maxPrice = "" } = {}
) {
  const base = import.meta.env.VITE_API_URL;

  if (!base) {
    throw new Error("Falta VITE_API_URL en el front (.env)");
  }

  const qs = new URLSearchParams({ page: String(page), limit: String(limit) });
  if (sort) qs.set("sort", sort);
  if (q) qs.set("q", q);
  if (category) qs.set("category", category);
  if (minPrice) qs.set("minPrice", String(minPrice));
  if (maxPrice) qs.set("maxPrice", String(maxPrice));

  const res = await fetch(`${base}/products?${qs.toString()}`);
  const json = await res.json();

  if (!json?.ok) throw new Error(json?.message || "Error cargando productos");

  return json.data;
}
