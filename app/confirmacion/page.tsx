import type { Cita } from "@/lib/types";
import { formatearFecha } from "@/lib/data";
import Comprobante from "./comprobante";

export default async function ConfirmacionPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const sp = await searchParams;
  const first = (v: string | string[] | undefined) =>
    Array.isArray(v) ? v[0] : (v ?? "");

  const cita: Cita = {
    id: first(sp.id),
    paciente: {
      nombre: first(sp.nombre),
      apellido: first(sp.apellido),
      rut: first(sp.rut),
      telefono: first(sp.telefono),
      prevision: first(sp.prevision),
    },
    especialidad: first(sp.especialidad),
    medico: first(sp.medico),
    fecha: first(sp.fecha),
    hora: first(sp.hora),
    motivo: first(sp.motivo),
  };

  const fechaFormateada = cita.fecha ? formatearFecha(cita.fecha) : "";

  return <Comprobante cita={cita} fechaFormateada={fechaFormateada} />;
}
