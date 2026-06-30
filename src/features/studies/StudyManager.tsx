"use client";

import { useEffect, useState, type FormEvent } from "react";
import PageHeader from "../../shared/components/PageHeader";
import { useTodayFocus } from "../../shared/hooks/useTodayFocus";
import { loadStorage, saveStorage, todayKey } from "../../shared/lib/storage";
import StudyForm from "./components/StudyForm";
import StudySummary from "./components/StudySummary";
import type { StudyFormData, StudyItem } from "./types";

const emptyForm: StudyFormData = { materia: "", topic: "", minutes: "", questoes: "", hits: "", errors: "" };

export default function StudyManager() {
  const { todayFocus } = useTodayFocus();
  const [studyData, setStudyData] = useState<StudyItem[]>([]);
  const [studyForm, setStudyForm] = useState<StudyFormData>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => setStudyData(loadStorage("neroStudy_studies", [])), []);

  function submitStudy(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const questions = Number(studyForm.questoes || 0);
    if (questions > 0 && Number(studyForm.hits || 0) + Number(studyForm.errors || 0) !== questions) {
      alert("A soma de acertos e erros precisa ser igual ao total de questões.");
      return;
    }

    const updatedData = editingId
      ? studyData.map((item) => item.id === editingId ? { ...item, ...studyForm } : item)
      : [{ id: crypto.randomUUID(), date: todayKey(), ...studyForm, createdAt: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }) }, ...studyData];

    setStudyData(updatedData);
    saveStorage("neroStudy_studies", updatedData);
    setStudyForm(emptyForm);
    setEditingId(null);
  }

  function deleteStudy(id: string) {
    const updatedData = studyData.filter((item) => item.id !== id);
    setStudyData(updatedData);
    saveStorage("neroStudy_studies", updatedData);
    if (editingId === id) {
      setStudyForm(emptyForm);
      setEditingId(null);
    }
  }

  function editStudy(item: StudyItem) {
    setEditingId(item.id);
    setStudyForm({
      materia: item.materia,
      topic: item.topic,
      minutes: item.minutes,
      questoes: item.questoes,
      hits: item.hits,
      errors: item.errors,
    });
  }

  function cancelStudyEdit() {
    setEditingId(null);
    setStudyForm(emptyForm);
  }

  const todayStudies = studyData.filter((item) => item.date === todayKey());
  const totalMinutes = todayStudies.reduce((total, item) => total + Number(item.minutes || 0), 0);
  const totalQuestions = todayStudies.reduce((total, item) => total + Number(item.questoes || 0), 0);

  return (
    <>
      <PageHeader title="Gestor de Estudo" subtitle="Registre matérias, questões, acertos e erros." todayFocus={todayFocus} />
      <section className="grid">
        <StudyForm
          value={studyForm}
          isEditing={Boolean(editingId)}
          onCancelEdit={cancelStudyEdit}
          onChange={setStudyForm}
          onSubmit={submitStudy}
        />
        <StudySummary
          studies={todayStudies}
          totalMinutes={totalMinutes}
          totalQuestions={totalQuestions}
          onEdit={editStudy}
          onDelete={deleteStudy}
        />
      </section>
    </>
  );
}
