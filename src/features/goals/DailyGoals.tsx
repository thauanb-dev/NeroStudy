"use client";

import { useEffect, useState, type FormEvent } from "react";
import PageHeader from "../../shared/components/PageHeader";
import { useTodayFocus } from "../../shared/hooks/useTodayFocus";
import { loadStorage, saveStorage, todayKey } from "../../shared/lib/storage";
import GoalForm from "./components/GoalForm";
import GoalList, { type GoalItem } from "./components/GoalList";

export default function DailyGoals() {
  const { todayFocus } = useTodayFocus();
  const [goals, setGoals] = useState<GoalItem[]>([]);
  const [goalText, setGoalText] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => setGoals(loadStorage("neroStudy_dailyGoals", [])), []);

  function updateGoals(updatedGoals: GoalItem[]) {
    setGoals(updatedGoals);
    saveStorage("neroStudy_dailyGoals", updatedGoals);
  }

  function submitGoal(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!goalText.trim()) return;

    const updatedGoals = editingId
      ? goals.map((goal) => goal.id === editingId ? { ...goal, text: goalText.trim() } : goal)
      : [{ id: crypto.randomUUID(), text: goalText.trim(), done: false, date: todayKey() }, ...goals];

    updateGoals(updatedGoals);
    setGoalText("");
    setEditingId(null);
  }

  function deleteGoal(id: string) {
    updateGoals(goals.filter((item) => item.id !== id));
    if (editingId === id) {
      setGoalText("");
      setEditingId(null);
    }
  }

  function editGoal(goal: GoalItem) {
    setEditingId(goal.id);
    setGoalText(goal.text);
  }

  function cancelGoalEdit() {
    setEditingId(null);
    setGoalText("");
  }

  const todayGoals = goals.filter((goal) => goal.date === todayKey());

  return (
    <>
      <PageHeader title="Metas do Dia" subtitle="Defina pequenas metas para manter constância." todayFocus={todayFocus} />
      <section className="grid">
        <GoalForm
          value={goalText}
          isEditing={Boolean(editingId)}
          onCancelEdit={cancelGoalEdit}
          onChange={setGoalText}
          onSubmit={submitGoal}
        />
        <GoalList
          goals={todayGoals}
          onToggle={(id) => updateGoals(goals.map((item) => item.id === id ? { ...item, done: !item.done } : item))}
          onEdit={editGoal}
          onDelete={deleteGoal}
        />
      </section>
    </>
  );
}
