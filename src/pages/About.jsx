import React from "react";

export default function About() {
  return (
    <section className="section">
      <div className="container">
        <div className="kicker">Nosotros</div>
        <h1 className="h1" style={{ fontSize: "clamp(38px, 4.6vw, 56px)" }}>
          Aura Verde es una curaduría botánica para interiores.
        </h1>
        <p className="p" style={{ maxWidth: 860 }}>
          Seleccionamos piezas pensadas para habitarse: con equilibrio, presencia y cuidado. Buscamos que cada elección
          acompañe tu espacio con calma, sin ruido, sin exceso. Una estética serena — y un vínculo atento con lo vivo.
        </p>

        <div className="grid4" style={{ marginTop: 18 }}>
          {[
            { title: "Curaduría", text: "Elegimos por presencia, textura y armonía en interiores." },
            { title: "Cuidado", text: "Guías breves para sostener el ritmo de cada planta." },
            { title: "Presencia", text: "Una pieza viva cambia el aire: luz, silencio, equilibrio." },
            { title: "Sustentabilidad", text: "Enfoque responsable: menos exceso, más intención." },
          ].map((b) => (
            <div className="card" key={b.title} style={{ padding: 18 }}>
              <div className="kicker">{b.title}</div>
              <p className="p" style={{ margin: "10px 0 0" }}>{b.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

