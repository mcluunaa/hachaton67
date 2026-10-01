import { Suspense } from "react";
import AgendarFlow from "./agendar-flow";

export default async function AgendarPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const sp = await searchParams;
  const first = (v: string | string[] | undefined) =>
    Array.isArray(v) ? v[0] : v;

  return (
    <Suspense fallback={<Cargando />}>
      <AgendarFlow
        especialidadInicial={first(sp.especialidad) ?? ""}
        nombreInicial={first(sp.nombre) ?? ""}
        rutInicial={first(sp.rut) ?? ""}
        telefonoInicial={first(sp.telefono) ?? ""}
        previsionInicial={first(sp.prevision) ?? ""}
        motivoInicial={first(sp.motivo) ?? ""}
      />
    </Suspense>
  );
}

function Cargando() {
  return (
    <div className="flex flex-1 items-center justify-center py-40 text-slate-500">
      Cargando…
    </div>
  );
}
