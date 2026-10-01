import Link from "next/link";
import { NOMBRE_CLINICA, especialidades } from "@/lib/data";

export default function Home() {
  return (
    <main className="flex-1 w-full max-w-4xl mx-auto px-6 py-10">
      <header className="flex items-center gap-3 mb-10">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-600 text-2xl">
          🏥
        </div>
        <div>
          <h1 className="text-xl font-bold leading-tight">{NOMBRE_CLINICA}</h1>
          <p className="text-sm text-slate-500">Agendamiento de horas médicas</p>
        </div>
      </header>

      <h2 className="text-2xl font-semibold mb-1">¿Qué especialidad necesitas?</h2>
      <p className="text-slate-500 mb-8">Selecciona una opción para continuar con tu reserva.</p>

      <div className="grid gap-4 sm:grid-cols-2">
        {especialidades.map((e) => (
          <Link
            key={e.slug}
            href={`/agendar?especialidad=${e.slug}`}
            data-testid={`especialidad-${e.slug}`}
            className="group flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-teal-500 hover:shadow-md"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-2xl">
              {e.emoji}
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 group-hover:text-teal-700">
                {e.nombre}
              </h3>
              <p className="text-sm text-slate-500">{e.descripcion}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
