import React, { useMemo, useState } from "react";

export default function Quiz({ onApply }) {
  const [step, setStep] = useState(0);
  const [a, setA] = useState({ light: "", time: "", pets: "", size: "" });
  const done = useMemo(() => Object.values(a).every(Boolean), [a]);

  function next() { setStep((s) => Math.min(s + 1, 3)); }
  function prev() { setStep((s) => Math.max(s - 1, 0)); }

  function apply() {
    const filters = {};
    if (a.light === "suave") filters.light = "baja-media";
    if (a.light === "plena") filters.light = "alta";
    if (a.time === "minimo") filters.watering = "bajo";
    if (a.time === "normal") filters.watering = "medio";
    if (a.pets === "si") filters.petFriendly = true;
    if (a.size) filters.size = a.size;
    onApply?.(filters);
  }

  const questions = [
    { title:"¿Cuánta luz recibe tu espacio?", options:[{k:"suave",label:"Luz suave"},{k:"media",label:"Luz media"},{k:"plena",label:"Luz plena"}], key:"light" },
    { title:"¿Cuánto tiempo querés dedicar al riego?", options:[{k:"minimo",label:"Mínimo"},{k:"normal",label:"Normal"},{k:"dedicado",label:"Dedicado"}], key:"time" },
    { title:"¿Convivís con mascotas?", options:[{k:"si",label:"Sí"},{k:"no",label:"No"}], key:"pets" },
    { title:"¿Qué tamaño te queda mejor?", options:[{k:"S",label:"S (compacto)"},{k:"M",label:"M (equilibrado)"},{k:"L",label:"L (protagonista)"}], key:"size" },
  ];

  const q = questions[step];

  return (
    <div className="card" style={{ padding: 18 }}>
      <div className="kicker">Guía breve</div>
      <h3 className="h2" style={{ fontSize: 28, marginTop: 6 }}>{q.title}</h3>

      <div className="filters" style={{ marginTop: 12 }}>
        {q.options.map((opt) => {
          const on = a[q.key] === opt.k;
          return (
            <button
              key={opt.k}
              className={on ? "chip chip--on" : "chip"}
              onClick={() => setA((s) => ({ ...s, [q.key]: opt.k }))}
              type="button"
            >
              {opt.label}
            </button>
          );
        })}
      </div>

      <div style={{ display: "flex", gap: 10, marginTop: 14, justifyContent: "space-between", flexWrap: "wrap" }}>
        <button className="btnSmall" onClick={prev} disabled={step === 0} type="button">Atrás</button>
        {step < 3 ? (
          <button className="btnSmall btnSmall--primary" onClick={next} type="button">Siguiente</button>
        ) : (
          <button className="btnSmall btnSmall--primary" onClick={apply} disabled={!done} type="button">
            Ver sugerencias
          </button>
        )}
      </div>
    </div>
  );
}

