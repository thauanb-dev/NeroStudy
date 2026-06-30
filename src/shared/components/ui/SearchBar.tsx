"use client";

import { Search, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { loadStorage } from "../../lib/storage";

type SearchBarProps = {
  placeholder: string;
};

type SearchSourceItem = {
  id: string;
  title: string;
  meta: string;
  href: string;
};

type FocusItem = {
  id: string;
  label?: string;
  minutes: number;
  date: string;
};

type StudyItem = {
  id: string;
  materia: string;
  topic: string;
  minutes: string;
  date: string;
};

type PlanItem = {
  id: string;
  materia: string;
  task: string;
  day: string;
  done: boolean;
};

type GoalItem = {
  id: string;
  text: string;
  done: boolean;
  date: string;
};

function loadSearchItems(): SearchSourceItem[] {
  const focus = loadStorage<FocusItem[]>("neroStudy_focus", []).map((item) => ({
    id: `focus-${item.id}`,
    title: item.label || "Sessão de foco",
    meta: `${item.minutes}min • ${item.date}`,
    href: "/pomodoro",
  }));
  const studies = loadStorage<StudyItem[]>("neroStudy_studies", []).map((item) => ({
    id: `study-${item.id}`,
    title: `${item.materia} - ${item.topic}`,
    meta: `${item.minutes || 0}min • ${item.date}`,
    href: "/gestor-estudos",
  }));
  const plans = loadStorage<PlanItem[]>("neroStudy_weekPlan", []).map((item) => ({
    id: `plan-${item.id}`,
    title: `${item.materia} - ${item.task}`,
    meta: item.done ? "Planejamento concluído" : "Planejamento pendente",
    href: "/planejamento",
  }));
  const goals = loadStorage<GoalItem[]>("neroStudy_dailyGoals", []).map((item) => ({
    id: `goal-${item.id}`,
    title: item.text,
    meta: item.done ? "Meta concluída" : "Meta pendente",
    href: "/metas",
  }));

  return [...focus, ...studies, ...plans, ...goals].filter((item) => item.title.trim());
}

export default function SearchBar({ placeholder }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState<SearchSourceItem[]>([]);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    function syncSearchItems() {
      setItems(loadSearchItems());
    }

    syncSearchItems();
    window.addEventListener("neroStudy:storage", syncSearchItems);
    window.addEventListener("storage", syncSearchItems);

    return () => {
      window.removeEventListener("neroStudy:storage", syncSearchItems);
      window.removeEventListener("storage", syncSearchItems);
    };
  }, []);

  const results = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return [];

    return items
      .filter((item) => `${item.title} ${item.meta}`.toLowerCase().includes(normalizedQuery))
      .slice(0, 6);
  }, [items, query]);
  const showResults = isFocused && query.trim().length > 0;

  return (
    <div className="search-box">
      <label className="search-bar">
        <Search size={17} aria-hidden="true" />
        <span className="sr-only">Pesquisar no NeroStudy</span>
        <input
          type="search"
          placeholder={placeholder}
          value={query}
          onBlur={() => window.setTimeout(() => setIsFocused(false), 120)}
          onChange={(event) => setQuery(event.target.value)}
          onFocus={() => setIsFocused(true)}
        />
        {query ? (
          <button type="button" onClick={() => setQuery("")} aria-label="Limpar pesquisa">
            <X size={14} aria-hidden="true" />
          </button>
        ) : null}
      </label>

      {showResults ? (
        <div className="search-results">
          {results.length === 0 ? (
            <span>Nenhum resultado salvo encontrado.</span>
          ) : (
            results.map((item) => (
              <Link href={item.href} key={item.id} onClick={() => setQuery("")}>
                <strong>{item.title}</strong>
                <small>{item.meta}</small>
              </Link>
            ))
          )}
        </div>
      ) : null}
    </div>
  );
}
