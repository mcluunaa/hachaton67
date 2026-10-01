"use client";

import Link from "next/link";
import type { Cita } from "@/lib/types";
import { NOMBRE_CLINICA } from "@/lib/data";

export default function Comprobante({
  cita,
  fechaFormateada,
}: {
  cita: Cita;
  fechaFormateada: string;
}) {
  return (
    <main className="flex-1 w-full max-w-2xl mx-auto px-6 py-10">
      <script
        type="application/json"
        id="comprobante-data"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(cita) }}
      />

      <header className="mb-8 text-center">
        <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-600 text-3xl">
          🏥
        </div>
        <h1 className="text-2xl font-bold">{NOMBRE_CLINICA}</h1>
        <p className="text-sm text-slate-500">Comprobante de reserva de hora médica</p>
      </header>

      <div
        data-testid="comprobante"
        className="mb-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
      >
        <div className="bg-teal-600 px-6 py-4 text-white">
          <p className="text-xs uppercase tracking-wide opacity-80">Cita confirmada</p>
          <p className="text-2xl font-bold">✓ {cita.id}</p>
        </div>

        <dl className="divide-y divide-slate-100 px-6 py-2 text-sm">
          <Fila k="Paciente" v={`${cita.paciente.nombre} ${cita.paciente.apellido}`} />
          <Fila k="RUT" v={cita.paciente.rut} />
          <Fila k="Previsión" v={cita.paciente.prevision} />
          <Fila k="Especialidad" v={cita.especialidad} />
          <Fila k="Médico" v={cita.medico} />
          <Fila k="Fecha" v={fechaFormateada} />
          <Fila k="Hora" v={cita.hora} />
          <Fila k="Motivo de consulta" v={cita.motivo} />
        </dl>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
        <button
          type="button"
          data-testid="boton-descargar"
          onClick={() => window.print()}
          className="rounded-xl bg-teal-600 px-6 py-2.5 font-semibold text-white transition hover:bg-teal-700"
        >
          Descargar / Imprimir comprobante
        </button>
        <Link
          href="/"
          className="rounded-xl border border-slate-300 px-6 py-2.5 text-center font-medium text-slate-600 transition hover:bg-slate-100"
        >
          Agendar otra cita
        </Link>
      </div>
    </main>
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
