"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  NOMBRE_CLINICA,
  especialidades,
  getEspecialidad,
  getMedicosDeEspecialidad,
  getMedico,
  generarFechas,
  horarios,
  pacientePorDefecto,
  formatearFecha,
  generarCitaId,
} from "@/lib/data";

type Props = {
  especialidadInicial: string;
  nombreInicial: string;
  rutInicial: string;
  telefonoInicial: string;
  previsionInicial: string;
  motivoInicial: string;
};

const PASOS = ["Especialidad", "Médico", "Fecha y hora", "Tus datos", "Confirmar"];

export default function AgendarFlow(props: Props) {
  const router = useRouter();
  const fechas = useMemo(() => generarFechas(7), []);

  const [paso, setPaso] = useState(props.especialidadInicial ? 1 : 0);
  const [especialidad, setEspecialidad] = useState(props.especialidadInicial);
  const [medico, setMedico] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [nombre, setNombre] = useState(props.nombreInicial || pacientePorDefecto.nombre);
  const [apellido, setApellido] = useState(pacientePorDefecto.apellido);
  const [rut, setRut] = useState(props.rutInicial || pacientePorDefecto.rut);
  const [telefono, setTelefono] = useState(props.telefonoInicial || pacientePorDefecto.telefono);
  const [prevision, setPrevision] = useState(props.previsionInicial || pacientePorDefecto.prevision);
  const [motivo, setMotivo] = useState(props.motivoInicial || "");

  const medicosDeEspecialidad = getMedicosDeEspecialidad(especialidad);
  const espActual = getEspecialidad(especialidad);
  const medicoActual = getMedico(medico);

  const confirmar = () => {
    const params = new URLSearchParams({
      id: generarCitaId(fecha, hora),
      nombre,
      apellido,
      rut,
      telefono,
      prevision,
      especialidad: espActual?.nombre ?? "",
      medico: medicoActual?.nombre ?? "",
      fecha,
      hora,
      motivo,
    });
    router.push(`/confirmacion?${params.toString()}`);
  };

  const pasoValido = () => {
    switch (paso) {
      case 0:
        return !!especialidad;
      case 1:
        return !!medico;
      case 2:
        return !!fecha && !!hora;
      case 3:
        return !!nombre && !!rut && !!telefono;
      default:
        return true;
    }
  };

  return (
    <main className="flex-1 w-full max-w-3xl mx-auto px-6 py-10">
      <header className="flex items-center gap-3 mb-8">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-600 text-2xl">
          🏥
        </div>
        <div>
          <h1 className="text-xl font-bold leading-tight">{NOMBRE_CLINICA}</h1>
          <p className="text-sm text-slate-500">Agendamiento de horas médicas</p>
        </div>
      </header>

      <ol className="mb-8 flex flex-wrap gap-2 text-xs" data-testid="indicador-pasos">
        {PASOS.map((p, i) => (
          <li
            key={p}
            className={`rounded-full px-3 py-1 font-medium ${
              i === paso
                ? "bg-teal-600 text-white"
                : i < paso
                  ? "bg-teal-100 text-teal-700"
                  : "bg-slate-100 text-slate-400"
            }`}
          >
            {i + 1}. {p}
          </li>
        ))}
      </ol>

      {paso === 0 && (
        <section>
          <h2 className="text-2xl font-semibold mb-6">Selecciona la especialidad</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {especialidades.map((e) => (
              <button
                key={e.slug}
                type="button"
                data-testid={`especialidad-${e.slug}`}
                onClick={() => {
                  setEspecialidad(e.slug);
                  setMedico("");
                  setPaso(1);
                }}
                className={`flex items-start gap-4 rounded-2xl border p-5 text-left transition ${
                  especialidad === e.slug
                    ? "border-teal-500 bg-teal-50"
                    : "border-slate-200 bg-white hover:border-teal-400"
                }`}
              >
                <div className="text-2xl">{e.emoji}</div>
                <div>
                  <h3 className="font-semibold">{e.nombre}</h3>
                  <p className="text-sm text-slate-500">{e.descripcion}</p>
                </div>
              </button>
            ))}
          </div>
        </section>
      )}

      {paso === 1 && (
        <section>
          <h2 className="text-2xl font-semibold mb-1">
            Elige tu médico · {espActual?.nombre}
          </h2>
          <p className="text-slate-500 mb-6">Selecciona un profesional disponible.</p>
          <div className="grid gap-4">
            {medicosDeEspecialidad.map((m) => (
              <button
                key={m.id}
                type="button"
                data-testid={`medico-${m.id}`}
                onClick={() => {
                  setMedico(m.id);
                  setPaso(2);
                }}
                className={`flex items-center gap-4 rounded-2xl border p-5 text-left transition ${
                  medico === m.id
                    ? "border-teal-500 bg-teal-50"
                    : "border-slate-200 bg-white hover:border-teal-400"
                }`}
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-teal-100 text-lg">
                  🧑‍⚕️
                </div>
                <div>
                  <h3 className="font-semibold">{m.nombre}</h3>
                  <p className="text-sm text-slate-500">{espActual?.nombre}</p>
                </div>
              </button>
            ))}
          </div>
        </section>
      )}

      {paso === 2 && (
        <section>
          <h2 className="text-2xl font-semibold mb-6">Elige fecha y hora</h2>
          <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500">
            Fecha
          </h3>
          <div className="mb-6 grid gap-2 sm:grid-cols-2" data-testid="lista-fechas">
            {fechas.map((f) => (
              <button
                key={f.value}
                type="button"
                data-testid={`fecha-${f.value}`}
                onClick={() => setFecha(f.value)}
                className={`rounded-xl border p-3 text-left transition ${
                  fecha === f.value
                    ? "border-teal-500 bg-teal-50"
                    : "border-slate-200 bg-white hover:border-teal-400"
                }`}
              >
                <div className="font-semibold">{f.diaSemana}</div>
                <div className="text-sm text-slate-500">
                  {f.dia} de {f.mes}
                </div>
              </button>
            ))}
          </div>

          <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500">
            Hora
          </h3>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4" data-testid="lista-horas">
            {horarios.map((h) => (
              <button
                key={h}
                type="button"
                data-testid={`hora-${h}`}
                onClick={() => setHora(h)}
                className={`rounded-xl border p-3 text-center font-semibold transition ${
                  hora === h
                    ? "border-teal-500 bg-teal-50"
                    : "border-slate-200 bg-white hover:border-teal-400"
                }`}
              >
                {h}
              </button>
            ))}
          </div>
        </section>
      )}

      {paso === 3 && (
        <section>
          <h2 className="text-2xl font-semibold mb-6">Confirma tus datos</h2>
          <div className="grid gap-4">
            <Campo label="Nombre" data-testid="campo-nombre">
              <input
                className="input"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Nombre"
              />
            </Campo>
            <Campo label="Apellido" data-testid="campo-apellido">
              <input
                className="input"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                placeholder="Apellido"
              />
            </Campo>
            <Campo label="RUT" data-testid="campo-rut">
              <input
                className="input"
                value={rut}
                onChange={(e) => setRut(e.target.value)}
                placeholder="12.345.678-9"
              />
            </Campo>
            <Campo label="Teléfono" data-testid="campo-telefono">
              <input
                className="input"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                placeholder="+56 9 0000 0000"
              />
            </Campo>
            <Campo label="Previsión" data-testid="campo-prevision">
              <select
                className="input"
                value={prevision}
                onChange={(e) => setPrevision(e.target.value)}
              >
                <option>FONASA</option>
                <option>ISAPRE</option>
                <option>Particular</option>
              </select>
            </Campo>
            <Campo label="Motivo de consulta" data-testid="campo-motivo">
              <textarea
                className="input min-h-24"
                value={motivo}
                onChange={(e) => setMotivo(e.target.value)}
                placeholder="Ej. dolor de rodilla al caminar"
              />
            </Campo>
          </div>
        </section>
      )}

      {paso === 4 && (
        <section data-testid="resumen">
          <h2 className="text-2xl font-semibold mb-6">Resumen de tu cita</h2>
          <dl className="mb-6 divide-y divide-slate-100 rounded-2xl border border-slate-200 bg-white p-5 text-sm">
            <Fila k="Especialidad" v={espActual?.nombre ?? ""} />
            <Fila k="Médico" v={medicoActual?.nombre ?? ""} />
            <Fila k="Fecha" v={fecha ? formatearFecha(fecha) : ""} />
            <Fila k="Hora" v={hora} />
            <Fila k="Paciente" v={`${nombre} ${apellido}`} />
            <Fila k="RUT" v={rut} />
            <Fila k="Previsión" v={prevision} />
            <Fila k="Motivo" v={motivo} />
          </dl>
        </section>
      )}

      <div className="mt-8 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setPaso((p) => Math.max(0, p - 1))}
          disabled={paso === 0}
          className="rounded-xl border border-slate-300 px-5 py-2.5 font-medium text-slate-600 transition hover:bg-slate-100 disabled:opacity-40"
        >
          ← Atrás
        </button>

        {paso < 4 ? (
          <button
            type="button"
            data-testid="boton-continuar"
            onClick={() => setPaso((p) => Math.min(4, p + 1))}
            disabled={!pasoValido()}
            className="rounded-xl bg-teal-600 px-6 py-2.5 font-semibold text-white transition hover:bg-teal-700 disabled:opacity-40"
          >
            Continuar →
          </button>
        ) : (
          <button
            type="button"
            data-testid="boton-confirmar-cita"
            onClick={confirmar}
            className="rounded-xl bg-teal-600 px-6 py-2.5 font-semibold text-white transition hover:bg-teal-700"
          >
            Confirmar cita
          </button>
        )}
      </div>

      <p className="mt-8 text-center text-xs text-slate-400">
        <Link href="/" className="hover:text-slate-600">
          ← Volver al inicio
        </Link>
      </p>
    </main>
  );
}

function Campo({
  label,
  children,
  ...rest
}: {
  label: string;
  children: React.ReactNode;
  "data-testid"?: string;
}) {
  return (
    <label className="block" data-testid={rest["data-testid"]}>
      <span className="mb-1 block text-sm font-medium text-slate-600">{label}</span>
      {children}
    </label>
  );
}

function Fila({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-4 py-2.5">
      <dt className="text-slate-500">{k}</dt>
      <dd className="text-right font-medium text-slate-800">{v || "—"}</dd>
    </div>
  );
}
