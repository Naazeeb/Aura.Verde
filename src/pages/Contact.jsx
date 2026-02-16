import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";

const Schema = Yup.object().shape({
  nombre: Yup.string().min(2, "Muy corto").required("Requerido"),
  apellido: Yup.string().min(2, "Muy corto").required("Requerido"),
  email: Yup.string().email("Email inválido").required("Requerido"),
  asunto: Yup.string().min(6, "Muy corto").required("Requerido"),
});

export default function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <section className="section">
      <div className="container">
        <div className="kicker">Contacto</div>
        <h1 className="h1" style={{ fontSize: "clamp(36px, 4.6vw, 54px)" }}>Escribinos</h1>
        <p className="p" style={{ maxWidth: 860 }}>
          Si querés que te orientemos en una elección, contanos un poco sobre tu espacio. Respondemos con calma y atención.
        </p>

        <div className="card" style={{ padding: 18 }}>
          <Formik
            initialValues={{ nombre: "", apellido: "", email: "", asunto: "" }}
            validationSchema={Schema}
            onSubmit={(values, helpers) => {
              helpers.setSubmitting(false);
              setSent(true);
              setTimeout(() => setSent(false), 6000);
              helpers.resetForm();
              console.log("Formulario (demo):", values);
            }}
          >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
              <form className="form" onSubmit={handleSubmit}>
                <div className="formGrid">
                  <div className="field">
                    <label htmlFor="nombre">Nombre</label>
                    <input id="nombre" name="nombre" value={values.nombre} onChange={handleChange} onBlur={handleBlur} placeholder="Tu nombre" />
                    {touched.nombre && errors.nombre ? <div className="error">{errors.nombre}</div> : null}
                  </div>

                  <div className="field">
                    <label htmlFor="apellido">Apellido</label>
                    <input id="apellido" name="apellido" value={values.apellido} onChange={handleChange} onBlur={handleBlur} placeholder="Tu apellido" />
                    {touched.apellido && errors.apellido ? <div className="error">{errors.apellido}</div> : null}
                  </div>

                  <div className="field" style={{ gridColumn: "1 / -1" }}>
                    <label htmlFor="email">Email</label>
                    <input id="email" name="email" value={values.email} onChange={handleChange} onBlur={handleBlur} placeholder="tu@email.com" />
                    {touched.email && errors.email ? <div className="error">{errors.email}</div> : null}
                  </div>

                  <div className="field" style={{ gridColumn: "1 / -1" }}>
                    <label htmlFor="asunto">Asunto</label>
                    <textarea id="asunto" name="asunto" value={values.asunto} onChange={handleChange} onBlur={handleBlur}
                      placeholder="Contanos sobre tu espacio: luz, rutina, tamaño y convivencia..." />
                    {touched.asunto && errors.asunto ? <div className="error">{errors.asunto}</div> : null}
                  </div>
                </div>

                <div style={{ marginTop: 14 }}>
                  <button className="btn btn--primary" type="submit" disabled={isSubmitting}>Enviar</button>
                </div>

                {sent && <div className="success">Mensaje enviado correctamente. Gracias por escribirnos.</div>}
              </form>
            )}
          </Formik>
        </div>
      </div>
    </section>
  );
}

