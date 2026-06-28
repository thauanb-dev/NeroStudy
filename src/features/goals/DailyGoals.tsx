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

  useEffect(() => setGoals(loadStorage("neroStudy_dailyGoals", [])), []);

  function updateGoals(updatedGoals: GoalItem[]) {
    setGoals(updatedGoals);
    saveStorage("neroStudy_dailyGoals", updatedGoals);
  }

  function addGoal(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!goalText.trim()) return;
    updateGoals([{ id: crypto.randomUUID(), text: goalText.trim(), done: false, date: todayKey() }, ...goals]);
    setGoalText("");
  }

  const todayGoals = goals.filter((goal) => goal.date === todayKey());

  return (
    <>
      <PageHeader title="Metas do Dia" subtitle="Defina pequenas metas para manter constância." todayFocus={todayFocus} />
      <section className="grid">
        <GoalForm value={goalText} onChange={setGoalText} onSubmit={addGoal} />
        <GoalList goals={todayGoals} onToggle={(id) => updateGoals(goals.map((item) => item.id === id ? { ...item, done: !item.done } : item))} />
      </section>
    </>
  );
}
