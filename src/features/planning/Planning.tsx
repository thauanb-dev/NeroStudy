"use client";

import { useEffect, useState, type FormEvent } from "react";
import PageHeader from "../../shared/components/PageHeader";
import { useTodayFocus } from "../../shared/hooks/useTodayFocus";
import { loadStorage, saveStorage } from "../../shared/lib/storage";
import PlanningForm, { type PlanFormData } from "./components/PlanningForm";
import WeeklyPlanList from "./components/WeeklyPlanList";
import type { PlanItem } from "./types";

const emptyForm: PlanFormData = { day: "", materia: "", task: "" };

export default function Planning() {
  const { todayFocus } = useTodayFocus();
  const [plans, setPlans] = useState<PlanItem[]>([]);
  const [form, setForm] = useState<PlanFormData>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => setPlans(loadStorage("neroStudy_weekPlan", [])), []);

  function updatePlans(updatedPlans: PlanItem[]) {
    setPlans(updatedPlans);
    saveStorage("neroStudy_weekPlan", updatedPlans);
  }

  function submitPlan(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form.day.trim() || !form.materia.trim() || !form.task.trim()) {
      alert("Preencha dia, matéria e tarefa do planejamento.");
      return;
    }

    const updatedPlans = editingId
      ? plans.map((item) => item.id === editingId ? { ...item, ...form } : item)
      : [{ id: crypto.randomUUID(), ...form, done: false, createdAt: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }) }, ...plans];

    updatePlans(updatedPlans);
    setForm(emptyForm);
    setEditingId(null);
  }

  function editPlan(item: PlanItem) {
    setEditingId(item.id);
    setForm({ day: item.day, materia: item.materia, task: item.task });
  }

  return (
    <>
      <PageHeader title="Planejamento" subtitle="Organize os assuntos da semana." todayFocus={todayFocus} />
      <section className="grid">
        <PlanningForm value={form} isEditing={Boolean(editingId)} onChange={setForm} onSubmit={submitPlan} />
        <WeeklyPlanList
          plans={plans}
          onToggle={(id) => updatePlans(plans.map((item) => item.id === id ? { ...item, done: !item.done } : item))}
          onDelete={(id) => updatePlans(plans.filter((item) => item.id !== id))}
          onEdit={editPlan}
        />
      </section>
    </>
  );
}
