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
    function syncFocusData() {
      setFocusData(loadStorage<FocusItem[]>("neroStudy_focus", []));
    }

    function handleStorage(event: StorageEvent) {
      if (event.key === "neroStudy_focus") syncFocusData();
    }

    function handleCustomStorage(event: Event) {
      const customEvent = event as CustomEvent<{ key: string }>;
      if (customEvent.detail?.key === "neroStudy_focus") syncFocusData();
    }

    syncFocusData();
    window.addEventListener("storage", handleStorage);
    window.addEventListener("neroStudy:storage", handleCustomStorage);

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("neroStudy:storage", handleCustomStorage);
    };
  }, []);

  const todayFocus = focusData
    .filter((item) => item.date === todayKey())
    .reduce((total, item) => total + item.minutes, 0);

  return { focusData, setFocusData, todayFocus };
}
