"use client";

import { useEffect, useState } from "react";
import PageHeader from "../../shared/components/PageHeader";
import { useTodayFocus } from "../../shared/hooks/useTodayFocus";
import { saveStorage, todayKey } from "../../shared/lib/storage";
import FocusHistory from "./components/FocusHistory";
import TimerCard from "./components/TimerCard";
import Debug from "../../components/dev/Debug";

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function currentTime() {
  return new Date().toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function Pomodoro() {
  // estado para o label
  const [sessionLabel, setSessionLabel] = useState("");
  const { focusData, setFocusData, todayFocus } = useTodayFocus();
  const [defaultMinutes, setDefaultMinutes] = useState(30);
  const [secondsLeft, setSecondsLeft] = useState(defaultMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionStartedAt, setSessionStartedAt] = useState<string | null>(null);

  useEffect(() => {
    if (!isRunning) {
      return;
    }

    if (secondsLeft <= 0) {
      setIsRunning(false);
      finishTimer();
      return;
    }

    const intervalId = window.setInterval(() => {
      setSecondsLeft((current) => current - 1);
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [isRunning, secondsLeft]);

  function resetTimer() {
    setIsRunning(false);
    setSecondsLeft(defaultMinutes * 60);
    setSessionStartedAt(null);
  }

  function startTimer() {
    setSessionStartedAt((startedAt) => startedAt ?? currentTime());
    setIsRunning(true);
  }

  function applyMinutes() {
    const safeMinutes = Math.max(1, Number(defaultMinutes) || 25);
    setDefaultMinutes(safeMinutes);
    setSecondsLeft(safeMinutes * 60);
    setIsRunning(false);
    setSessionStartedAt(null);
  }

  function finishTimer() {
    const elapsedMinutes = defaultMinutes - Math.ceil(secondsLeft / 60);
    if (elapsedMinutes <= 0) {
      alert("Você ainda não registrou tempo suficiente para salvar.");
      return;
    }

    const endedAt = currentTime();
    const updatedData = [
      {
        id: crypto.randomUUID(),
        date: todayKey(),
        label: sessionLabel.trim() || "Sessão de foco",
        minutes: elapsedMinutes,
        startedAt: sessionStartedAt ?? endedAt,
        endedAt,
        createdAt: endedAt,
      },
      ...focusData,
    ];

    setFocusData(updatedData);
    saveStorage("neroStudy_focus", updatedData);
    resetTimer();
    setSessionLabel("");
  }

  function handleDeleteFocusItem(id: string) {
    const updatedData = focusData.filter((item) => item.id !== id);
    setFocusData(updatedData);
    saveStorage("neroStudy_focus", updatedData);
  }

  const todayItems = focusData.filter((item) => item.date === todayKey());

  return (
    <>
      <PageHeader
        title="Pomodoro"
        subtitle="Cronômetro limpo para sessões de foco."
        todayFocus={todayFocus}
      />
      <section className="grid">
        <TimerCard
          label={sessionLabel}
          time={formatTime(secondsLeft)}
          isRunning={isRunning}
          minutes={defaultMinutes}
          onMinutesChange={setDefaultMinutes}
          onStart={startTimer}
          onPause={() => setIsRunning(false)}
          onReset={resetTimer}
          onFinish={finishTimer}
          onApply={applyMinutes}
          onLabelChange={setSessionLabel}
        />
        <Debug label="todayitems" value={todayItems} />
        <FocusHistory
          items={todayItems}
          onDelete={handleDeleteFocusItem}
        />
      </section>
    </>
  );
}
