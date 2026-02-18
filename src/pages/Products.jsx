import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard.jsx";
import { getProducts } from "../api/products.js";

function mapProduct(product) {
  return {
    _id: product._id,
    id: product._id,
    name: product.name,
    category: String(product.category || "").toLowerCase(),
    price: product.price,
    image: product.image,
    description: product.description,
    size: "-",
    light: "-",
    watering: "-",
    level: "-",
    petFriendly: false,
    ideal: "Interiores",
    tags: [],
  };
}

export default function Products() {
  const [params, setParams] = useSearchParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [total, setTotal] = useState(0);

  const filters = useMemo(
    () => ({
      q: params.get("q") || "",
      category: params.get("category") || "",
      minPrice: params.get("minPrice") || "",
      maxPrice: params.get("maxPrice") || "",
      sort: params.get("sort") || "newest",
      page: Number(params.get("page") || "1"),
      limit: Number(params.get("limit") || "12"),
    }),
    [params]
  );

  useEffect(() => {
    let alive = true;

    const run = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await getProducts({
          page: filters.page,
          limit: filters.limit,
          sort: filters.sort,
          q: filters.q,
          category: filters.category,
          minPrice: filters.minPrice,
          maxPrice: filters.maxPrice,
        });

        if (!alive) return;
        setItems((data.items || []).map(mapProduct));
        setTotal(data.pagination?.total || 0);
      } catch (e) {
        if (!alive) return;
        setError(e.message || "No se pudo cargar el catalogo");
      } finally {
        if (alive) setLoading(false);
      }
    };

    run();
    return () => {
      alive = false;
    };
  }, [filters]);

  function setParam(key, value) {
    const next = new URLSearchParams(params);
    if (!value) next.delete(key);
    else next.set(key, value);
    if (key !== "page") next.set("page", "1");
    setParams(next, { replace: true });
  }

  function clearFilters() {
    setParams(new URLSearchParams(), { replace: true });
  }

  return (
    <section className="section">
      <div className="container">
        <div className="productsTop">
          <div>
            <div className="kicker">Productos</div>
            <h1 className="h1" style={{ fontSize: "clamp(36px, 4.6vw, 54px)" }}>
              Catalogo
            </h1>
            <p className="p" style={{ maxWidth: 860, marginBottom: 0 }}>
              Catalogo conectado al backend con busqueda, filtros y orden.
            </p>
          </div>
        </div>

        <div className="productsLayout" style={{ marginTop: 18 }}>
          <div className="card" style={{ padding: 18 }}>
            <div className="kicker">Filtros API</div>

            <div className="field" style={{ marginTop: 12 }}>
              <label htmlFor="q">Buscar</label>
              <input
                id="q"
                className="search"
                placeholder="Buscar por nombre o descripcion"
                value={filters.q}
                onChange={(e) => setParam("q", e.target.value)}
              />
            </div>

            <div className="filters" style={{ marginTop: 10 }}>
              <button
                className={filters.category === "Plantas" ? "chip chip--on" : "chip"}
                onClick={() =>
                  setParam(
                    "category",
                    filters.category === "Plantas" ? "" : "Plantas"
                  )
                }
                type="button"
              >
                Plantas
              </button>
              <button
                className={filters.category === "Terrarios" ? "chip chip--on" : "chip"}
                onClick={() =>
                  setParam("category", filters.category === "Terrarios" ? "" : "Terrarios")
                }
                type="button"
              >
                Terrarios
              </button>
            </div>

            <div className="field" style={{ marginTop: 10 }}>
              <label htmlFor="sort">Orden</label>
              <select
                id="sort"
                value={filters.sort}
                onChange={(e) => setParam("sort", e.target.value)}
              >
                <option value="newest">Mas nuevos</option>
                <option value="price_asc">Precio: menor a mayor</option>
                <option value="price_desc">Precio: mayor a menor</option>
                <option value="name_asc">Nombre A-Z</option>
                <option value="name_desc">Nombre Z-A</option>
              </select>
            </div>

            <div style={{ display: "flex", gap: 10, marginTop: 14, flexWrap: "wrap" }}>
              <button className="btnSmall" onClick={clearFilters} type="button">
                Limpiar filtros
              </button>
              <span className="small" style={{ margin: 0 }}>
                Resultados: <b>{total}</b>
              </span>
            </div>
          </div>
        </div>

        {loading ? <p className="p">Cargando catalogo...</p> : null}
        {error ? (
          <div className="card" style={{ padding: 18, marginTop: 14 }}>
            <p className="p" style={{ margin: 0 }}>
              {error}
            </p>
          </div>
        ) : null}

        {!loading && !error ? (
          <div className="gridProducts">
            {items.map((p) => (
              <ProductCard key={p._id} product={p} onView={() => {}} />
            ))}
          </div>
        ) : null}

        {!loading && !error && items.length === 0 ? (
          <div className="card" style={{ padding: 18, marginTop: 14 }}>
            <p className="p" style={{ margin: 0 }}>
              No encontramos resultados con esos filtros.
            </p>
          </div>
        ) : null}
      </div>
    </section>
  );
}
