export type Especialidad = {
  slug: string;
  nombre: string;
  emoji: string;
  descripcion: string;
};

export type Medico = {
  id: string;
  nombre: string;
  especialidadSlug: string;
};

export type Paciente = {
  nombre: string;
  apellido: string;
  rut: string;
  telefono: string;
  prevision: string;
};

export type Cita = {
  id: string;
  paciente: Paciente;
  especialidad: string;
  medico: string;
  fecha: string;
  hora: string;
  motivo: string;
};
