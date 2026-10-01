import type { Especialidad, Medico, Paciente } from "./types";

export const NOMBRE_CLINICA = "Centro Médico Central";

export const especialidades: Especialidad[] = [
  {
    slug: "traumatologia",
    nombre: "Traumatología",
    emoji: "🦴",
    descripcion: "Huesos, articulaciones y lesiones musculares",
  },
  {
    slug: "cardiologia",
    nombre: "Cardiología",
    emoji: "❤️",
    descripcion: "Corazón y sistema circulatorio",
  },
  {
    slug: "medicina-general",
    nombre: "Medicina General",
    emoji: "🩺",
    descripcion: "Consulta de salud integral",
  },
  {
    slug: "oftalmologia",
    nombre: "Oftalmología",
    emoji: "👁️",
    descripcion: "Salud visual y de los ojos",
  },
  {
    slug: "neurologia",
    nombre: "Neurología",
    emoji: "🧠",
    descripcion: "Sistema nervioso y memoria",
  },
];

export const medicos: Medico[] = [
  { id: "trau-01", nombre: "Dra. Valentina Rojas", especialidadSlug: "traumatologia" },
  { id: "trau-02", nombre: "Dr. Andrés Fuentes", especialidadSlug: "traumatologia" },
  { id: "card-01", nombre: "Dr. Miguel Salinas", especialidadSlug: "cardiologia" },
  { id: "card-02", nombre: "Dra. Carolina Pino", especialidadSlug: "cardiologia" },
  { id: "gen-01", nombre: "Dra. Paula Contreras", especialidadSlug: "medicina-general" },
  { id: "gen-02", nombre: "Dr. Rodrigo Mella", especialidadSlug: "medicina-general" },
  { id: "oft-01", nombre: "Dra. Javiera Soto", especialidadSlug: "oftalmologia" },
  { id: "neu-01", nombre: "Dr. Felipe Arenas", especialidadSlug: "neurologia" },
];

// Datos del paciente asociados al dispositivo del adulto mayor.
// El agente (browser-use/Playwright) usa estos datos para agendar la cita.
export const pacientePorDefecto: Paciente = {
  nombre: "René",
  apellido: "González",
  rut: "12.345.678-9",
  telefono: "+56 9 8765 4321",
  prevision: "FONASA",
};

const DIAS_SEMANA = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
];

const MESES = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

export type FechaDisponible = {
  value: string; // formato ISO yyyy-mm-dd
  label: string; // "Martes 14 de Octubre"
  dia: string; // "14"
  mes: string; // "Octubre"
  diaSemana: string; // "Martes"
};

export function generarFechas(cantidad = 7): FechaDisponible[] {
  const fechas: FechaDisponible[] = [];
  const hoy = new Date();
  for (let i = 1; i <= cantidad; i++) {
    const d = new Date(hoy);
    d.setDate(hoy.getDate() + i);
    const value = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    const label = `${DIAS_SEMANA[d.getDay()]} ${d.getDate()} de ${MESES[d.getMonth()]}`;
    fechas.push({
      value,
      label,
      dia: String(d.getDate()),
      mes: MESES[d.getMonth()],
      diaSemana: DIAS_SEMANA[d.getDay()],
    });
  }
  return fechas;
}

export const horarios = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
];

export function getEspecialidad(slug: string): Especialidad | undefined {
  return especialidades.find((e) => e.slug === slug);
}

export function getMedicosDeEspecialidad(slug: string): Medico[] {
  return medicos.filter((m) => m.especialidadSlug === slug);
}

export function getMedico(id: string): Medico | undefined {
  return medicos.find((m) => m.id === id);
}

export function formatearFecha(value: string): string {
  const [anio, mes, dia] = value.split("-").map(Number);
  const d = new Date(anio, mes - 1, dia);
  return `${DIAS_SEMANA[d.getDay()]} ${dia} de ${MESES[d.getMonth()]}`;
}

export function generarCitaId(fecha: string, hora: string): string {
  const limpio = fecha.replace(/-/g, "") + hora.replace(":", "");
  return `CMC-${limpio}`;
}
