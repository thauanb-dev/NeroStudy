"use client";

import { useEffect, useState } from "react";
import { loadStorage, todayKey } from "../lib/storage";

export type FocusItem = {
  id: string;
  date: string;
  label?: string; //nome da sessao de foco
  minutes: number;
  createdAt: string;
  startedAt?: string;
  endedAt?: string;
};

export function useTodayFocus() {
  const [focusData, setFocusData] = useState<FocusItem[]>([]);
  useEffect(() => {
    setFocusData(loadStorage<FocusItem[]>("neroStudy_focus", []));
  }, []);

  const todayFocus = focusData
    .filter((item) => item.date === todayKey())
    .reduce((total, item) => total + item.minutes, 0);

  return { focusData, setFocusData, todayFocus };
}
