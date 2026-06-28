export type StudyItem = {
  id: string;
  date: string;
  materia: string;
  topic: string;
  minutes: string;
  questoes: string;
  hits: string;
  errors: string;
  createdAt: string;
};

export type StudyFormData = Omit<StudyItem, "id" | "date" | "createdAt">;
