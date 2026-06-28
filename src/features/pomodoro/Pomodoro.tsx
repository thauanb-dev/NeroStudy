"use client";

import { useEffect, useState } from "react";
import PageHeader from "../../shared/components/PageHeader";
import { useTodayFocus } from "../../shared/hooks/useTodayFocus";
import { saveStorage, todayKey } from "../../shared/lib/storage";
import FocusHistory from "./components/FocusHistory";
import TimerCard from "./components/TimerCard";

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export default function Pomodoro() {
  const { focusData, setFocusData, todayFocus } = useTodayFocus();
  const [defaultMinutes, setDefaultMinutes] = useState(30);
  const [secondsLeft, setSecondsLeft] = useState(defaultMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning || secondsLeft <= 0) {
      if (secondsLeft <= 0) setIsRunning(false);
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
  }

  function applyMinutes() {
    const safeMinutes = Math.max(1, Number(defaultMinutes) || 25);
    setDefaultMinutes(safeMinutes);
    setSecondsLeft(safeMinutes * 60);
    setIsRunning(false);
  }

  function finishTimer() {
    const elapsedMinutes = defaultMinutes - Math.ceil(secondsLeft / 60);
    if (elapsedMinutes <= 0) {
      alert("Você ainda não registrou tempo suficiente para salvar.");
      return;
    }

    const updatedData = [{
      id: crypto.randomUUID(),
      date: todayKey(),
      minutes: elapsedMinutes,
      createdAt: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
    }, ...focusData];

    setFocusData(updatedData);
    saveStorage("neroStudy_focus", updatedData);
    resetTimer();
  }

  const todayItems = focusData.filter((item) => item.date === todayKey());

  return (
    <>
      <PageHeader title="Pomodoro" subtitle="Cronômetro limpo para sessões de foco." todayFocus={todayFocus} />
      <section className="grid">
        <TimerCard
          time={formatTime(secondsLeft)}
          isRunning={isRunning}
          minutes={defaultMinutes}
          onMinutesChange={setDefaultMinutes}
          onStart={() => setIsRunning(true)}
          onPause={() => setIsRunning(false)}
          onReset={resetTimer}
          onFinish={finishTimer}
          onApply={applyMinutes}
        />
        <FocusHistory items={todayItems} />
      </section>
    </>
  );
}
