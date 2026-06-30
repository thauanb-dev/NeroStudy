"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { BookOpen, CheckCircle2, Crosshair, Flame, Play, Sparkles, Target, Timer, Trash2, Trophy } from "lucide-react";
import Link from "next/link";
import Card from "../../shared/components/ui/Card";
import EmptyState from "../../shared/components/ui/EmptyState";
import ProgressBar from "../../shared/components/ui/ProgressBar";
import SectionTitle from "../../shared/components/ui/SectionTitle";
import StatCard from "../../shared/components/ui/StatCard";
import { useTodayFocus, type FocusItem } from "../../shared/hooks/useTodayFocus";
import { loadStorage, saveStorage, todayKey } from "../../shared/lib/storage";
import type { PlanItem } from "../planning/types";
import type { StudyItem } from "../studies/types";

type GoalItem = {
  id: string;
  text: string;
  done: boolean;
  date: string;
};

type SessionPreview = {
  id: string;
  title: string;
  meta: string;
  kind: "focus" | "study";
  date: string;
  time: string;
  score: number;
};

type ContinueAction = {
  title: string;
  meta: string;
  detail: string;
  href: string;
  buttonLabel: string;
};

type ReviewSession = {
  id: string;
  sourceId: string;
  title: string;
  meta: string;
  kind: "focus" | "study";
};

function toPtBrDate(date: Date) {
  return date.toLocaleDateString("pt-BR");
}

function calculateStreak(dates: string[]) {
  const activeDates = new Set(dates);
  let streak = 0;
  const cursor = new Date();

  while (activeDates.has(toPtBrDate(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  return streak;
}

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Bom dia";
  if (hour < 18) return "Boa tarde";
  return "Boa noite";
}

function getLastSevenDays() {
  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - index));

    return {
      key: toPtBrDate(date),
      label: date.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" }),
      weekday: date.toLocaleDateString("pt-BR", { weekday: "short" }).replace(".", ""),
    };
  });
}

function parseSessionScore(date: string, time?: string) {
  const [day = 1, month = 1, year = 1970] = date.split("/").map(Number);
  const [hour = 0, minute = 0] = (time || "00:00").split(":").map(Number);
  const score = new Date(year, month - 1, day, hour, minute).getTime();
  return Number.isFinite(score) ? score : 0;
}

function isValidPtBrDate(date: string) {
  return /^\d{2}\/\d{2}\/\d{4}$/.test(date);
}

function isValidFocusItem(item: FocusItem) {
  return Boolean(item.id && isValidPtBrDate(item.date) && Number.isFinite(item.minutes) && item.minutes > 0);
}

function isValidStudyItem(item: StudyItem) {
  return Boolean(item.id && isValidPtBrDate(item.date) && item.materia?.trim() && item.topic?.trim());
}

function isMeaningfulText(value?: string) {
  const normalized = value?.trim().toLowerCase();
  return Boolean(
    normalized &&
    normalized !== "test" &&
    normalized !== "teste" &&
    normalized !== "sessao de foco" &&
    normalized !== "sessão de foco"
  );
}

function formatPlanDate(value: string) {
  const [year, month, day] = value.split("-");
  if (!year || !month || !day) return "Sem data";
  return `${day}/${month}/${year}`;
}

function parsePlanScore(value: string) {
  const score = new Date(`${value}T00:00:00`).getTime();
  return Number.isFinite(score) ? score : Number.MAX_SAFE_INTEGER;
}

function loadDashboardData() {
  return {
    studies: loadStorage<StudyItem[]>("neroStudy_studies", []),
    plans: loadStorage<PlanItem[]>("neroStudy_weekPlan", []),
    goals: loadStorage<GoalItem[]>("neroStudy_dailyGoals", []),
  };
}

export default function Dashboard() {
  const { focusData } = useTodayFocus();
  const [studies, setStudies] = useState<StudyItem[]>([]);
  const [plans, setPlans] = useState<PlanItem[]>([]);
  const [goals, setGoals] = useState<GoalItem[]>([]);

  useEffect(() => {
    function syncDashboardData() {
      const data = loadDashboardData();
      setStudies(data.studies);
      setPlans(data.plans);
      setGoals(data.goals);
    }

    function handleStorage(event: StorageEvent) {
      if (
        event.key === "neroStudy_studies" ||
        event.key === "neroStudy_weekPlan" ||
        event.key === "neroStudy_dailyGoals"
      ) {
        syncDashboardData();
      }
    }

    function handleCustomStorage(event: Event) {
      const customEvent = event as CustomEvent<{ key: string }>;
      if (
        customEvent.detail?.key === "neroStudy_studies" ||
        customEvent.detail?.key === "neroStudy_weekPlan" ||
        customEvent.detail?.key === "neroStudy_dailyGoals"
      ) {
        syncDashboardData();
      }
    }

    syncDashboardData();
    window.addEventListener("storage", handleStorage);
    window.addEventListener("neroStudy:storage", handleCustomStorage);

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("neroStudy:storage", handleCustomStorage);
    };
  }, []);

  const today = todayKey();
  const structurallyValidStudies = studies.filter(isValidStudyItem);
  const structurallyValidFocusData = focusData.filter(isValidFocusItem);
  const validStudies = structurallyValidStudies.filter((item) => (
    isMeaningfulText(item.materia) && isMeaningfulText(item.topic)
  ));
  const validFocusData = structurallyValidFocusData.filter((item) => isMeaningfulText(item.label));
  const reviewSessions: ReviewSession[] = [
    ...structurallyValidFocusData
      .filter((item) => !isMeaningfulText(item.label))
      .map((item) => ({
        id: `review-focus-${item.id}`,
        sourceId: item.id,
        title: item.label || "Sessão de foco sem nome",
        meta: `${item.minutes}min • ${item.date}`,
        kind: "focus" as const,
      })),
    ...structurallyValidStudies
      .filter((item) => !isMeaningfulText(item.materia) || !isMeaningfulText(item.topic))
      .map((item) => ({
        id: `review-study-${item.id}`,
        sourceId: item.id,
        title: `${item.materia || "Sem matéria"} - ${item.topic || "Sem assunto"}`,
        meta: `${item.minutes || 0}min • ${item.date}`,
        kind: "study" as const,
      })),
  ].slice(0, 3);
  const validPlans = plans.filter((plan) => Boolean(plan.id && plan.day && plan.materia?.trim() && plan.task?.trim()));
  const todayStudies = validStudies.filter((item) => item.date === today);
  const todayValidFocus = validFocusData
    .filter((item) => item.date === today)
    .reduce((total, item) => total + item.minutes, 0);
  const todayGoals = goals.filter((goal) => goal.date === today);
  const completedGoals = todayGoals.filter((goal) => goal.done).length;
  const completedPlans = validPlans.filter((plan) => plan.done).length;
  const todayStudyMinutes = todayStudies.reduce((total, item) => total + Number(item.minutes || 0), 0);
  const todayQuestions = todayStudies.reduce((total, item) => total + Number(item.questoes || 0), 0);
  const xpParts = [
    { label: "Foco", value: todayValidFocus * 2, detail: `${todayValidFocus}min x2` },
    { label: "Estudo", value: todayStudyMinutes, detail: `${todayStudyMinutes}min x1` },
    { label: "Questões", value: todayQuestions * 5, detail: `${todayQuestions} x5` },
    { label: "Metas", value: completedGoals * 25, detail: `${completedGoals} x25` },
  ];
  const xp = xpParts.reduce((total, part) => total + part.value, 0);
  const weeklyGoalProgress = validPlans.length > 0 ? Math.round((completedPlans / validPlans.length) * 100) : 0;
  const pendingPlans = validPlans
    .filter((plan) => !plan.done)
    .sort((first, second) => parsePlanScore(first.day) - parsePlanScore(second.day));
  const nextPlan = pendingPlans[0];
  const latestStudy = [...validStudies].sort((first, second) => (
    parseSessionScore(second.date, second.createdAt) - parseSessionScore(first.date, first.createdAt)
  ))[0];
  const todayLatestStudy = [...todayStudies].sort((first, second) => (
    parseSessionScore(second.date, second.createdAt) - parseSessionScore(first.date, first.createdAt)
  ))[0];
  const continueAction: ContinueAction = todayLatestStudy
    ? {
      title: todayLatestStudy.materia,
      meta: `${todayLatestStudy.topic} • ${todayLatestStudy.minutes || 0}min hoje`,
      detail: `${todayLatestStudy.questoes || 0} questões registradas na sessão mais recente.`,
      href: "/gestor-estudos",
      buttonLabel: "Abrir estudo",
    }
    : latestStudy
      ? {
        title: latestStudy.materia,
        meta: `${latestStudy.topic} • último registro em ${latestStudy.date}`,
        detail: "Retome essa matéria ou registre a próxima revisão.",
        href: "/gestor-estudos",
        buttonLabel: "Continuar",
      }
      : nextPlan
        ? {
          title: nextPlan.materia,
          meta: `${nextPlan.task} • ${formatPlanDate(nextPlan.day)}`,
          detail: "Essa é a próxima tarefa pendente do planejamento.",
          href: "/planejamento",
          buttonLabel: "Ver plano",
        }
        : {
          title: "Nenhum estudo iniciado",
          meta: "Crie um registro ou planeje sua próxima sessão.",
          detail: "O Dashboard usa apenas dados salvos no aplicativo.",
          href: "/gestor-estudos",
          buttonLabel: "Registrar estudo",
        };
  const xpChart = getLastSevenDays().map((day) => {
    const focusMinutes = validFocusData
      .filter((item) => item.date === day.key)
      .reduce((total, item) => total + item.minutes, 0);
    const studyMinutes = validStudies
      .filter((item) => item.date === day.key)
      .reduce((total, item) => total + Number(item.minutes || 0), 0);
    const questions = validStudies
      .filter((item) => item.date === day.key)
      .reduce((total, item) => total + Number(item.questoes || 0), 0);
    const doneGoals = goals.filter((goal) => goal.date === day.key && goal.done).length;

    return {
      ...day,
      xp: focusMinutes * 2 + studyMinutes + questions * 5 + doneGoals * 25,
    };
  });
  const maxChartXp = Math.max(...xpChart.map((day) => day.xp), 1);
  const chartWidth = 600;
  const chartHeight = 220;
  const chartPadding = 24;
  const chartPoints = xpChart.map((day, index) => {
    const x = chartPadding + (index * (chartWidth - chartPadding * 2)) / Math.max(xpChart.length - 1, 1);
    const y = chartHeight - chartPadding - (day.xp / maxChartXp) * (chartHeight - chartPadding * 2);

    return { ...day, x, y };
  });
  const chartLine = chartPoints.map((point) => `${point.x},${point.y}`).join(" ");
  const chartArea = [
    `${chartPadding},${chartHeight - chartPadding}`,
    ...chartPoints.map((point) => `${point.x},${point.y}`),
    `${chartWidth - chartPadding},${chartHeight - chartPadding}`,
  ].join(" ");

  const streak = useMemo(() => {
    const focusDates = validFocusData.map((item) => item.date);
    const studyDates = validStudies.map((item) => item.date);
    return calculateStreak([...focusDates, ...studyDates]);
  }, [validFocusData, validStudies]);

  const recentSessions: SessionPreview[] = [
    ...validFocusData.map((item: FocusItem) => ({
      id: `focus-${item.id}`,
      title: item.label || "Sessão de foco",
      meta: `${item.minutes}min de foco`,
      kind: "focus" as const,
      date: item.date,
      time: item.endedAt || item.createdAt || item.startedAt || "00:00",
      score: parseSessionScore(item.date, item.endedAt || item.createdAt || item.startedAt),
    })),
    ...validStudies.map((item) => ({
      id: `study-${item.id}`,
      title: `${item.materia} - ${item.topic}`,
      meta: `${item.minutes || 0}min • ${item.questoes || 0} questões`,
      kind: "study" as const,
      date: item.date,
      time: item.createdAt,
      score: parseSessionScore(item.date, item.createdAt),
    })),
  ]
    .filter((session) => session.score > 0 && session.title.trim() && session.date)
    .sort((first, second) => second.score - first.score)
    .slice(0, 6);

  function deleteReviewSession(session: ReviewSession) {
    if (session.kind === "focus") {
      const updatedFocusData = focusData.filter((item) => item.id !== session.sourceId);
      saveStorage("neroStudy_focus", updatedFocusData);
      return;
    }

    const updatedStudies = studies.filter((item) => item.id !== session.sourceId);
    setStudies(updatedStudies);
    saveStorage("neroStudy_studies", updatedStudies);
  }

  return (
    <section className="dashboard-page">
      <div className="dashboard-hero">
        <div>
          <span className="dashboard-kicker">
            <Sparkles size={15} aria-hidden="true" />
            Sistema de estudos
          </span>
          <h2>{getGreeting()}, Thauan.</h2>
          <p>Seu painel está pronto para manter foco, revisão e constância no mesmo fluxo.</p>
        </div>
        <div className="dashboard-hero-stat">
          <span>XP de hoje</span>
          <strong>{xp}</strong>
        </div>
      </div>

      <div className="dashboard-stat-grid">
        <StatCard icon={<Timer size={19} aria-hidden="true" />} label="Tempo focado" value={`${todayValidFocus}min`} />
        <StatCard icon={<BookOpen size={19} aria-hidden="true" />} label="Tempo estudado" value={`${todayStudyMinutes}min`} />
        <StatCard icon={<Flame size={19} aria-hidden="true" />} label="Sequência" value={`${streak} dias`} />
        <StatCard icon={<Target size={19} aria-hidden="true" />} label="Questões" value={todayQuestions} />
      </div>

      <div className="dashboard-grid">
        <Card className="dashboard-panel continue-panel">
          <SectionTitle
            eyebrow="Continuar estudando"
            title={continueAction.title}
            icon={<Play size={18} aria-hidden="true" />}
          />
          <div className="dashboard-action-card">
            <strong>{continueAction.meta}</strong>
            <p>{continueAction.detail}</p>
            <Link href={continueAction.href}>{continueAction.buttonLabel}</Link>
          </div>
        </Card>

        <Card className="dashboard-panel">
          <SectionTitle
            eyebrow="Metas da semana"
            title={`${completedPlans}/${validPlans.length || 0} concluídas`}
            icon={<CheckCircle2 size={18} aria-hidden="true" />}
          />
          <ProgressBar value={weeklyGoalProgress} label={`${weeklyGoalProgress}% das metas da semana`} />
          <div
            className="weekly-goal-chart"
            style={{ "--weekly-progress": `${weeklyGoalProgress}%` } as CSSProperties}
            aria-label={`${weeklyGoalProgress}% do planejamento semanal completo`}
          >
            <div>
              <strong>{weeklyGoalProgress}%</strong>
              <span>concluído</span>
            </div>
          </div>
          <div className="dashboard-action-card weekly-goal-card">
            <strong>
              {nextPlan ? `${nextPlan.materia} • ${formatPlanDate(nextPlan.day)}` : "Planejamento em dia"}
            </strong>
            <p>
              {nextPlan
                ? nextPlan.task
                : validPlans.length > 0
                  ? "Todas as tarefas cadastradas foram concluídas."
                  : "Adicione tarefas no Planejamento para acompanhar sua semana."}
            </p>
            <span>{pendingPlans.length} pendente{pendingPlans.length === 1 ? "" : "s"} • {weeklyGoalProgress}% completo</span>
          </div>
        </Card>

        <Card className="dashboard-panel xp-chart-panel">
          <SectionTitle
            eyebrow="Gamificação"
            title="XP dos últimos 7 dias"
            icon={<Trophy size={18} aria-hidden="true" />}
          />
          <div className="xp-breakdown" aria-label="Composição do XP de hoje">
            {xpParts.map((part) => (
              <div key={part.label}>
                <span>{part.label}</span>
                <strong>+{part.value} XP</strong>
                <small>{part.detail}</small>
              </div>
            ))}
          </div>
          <div className="xp-chart xp-line-chart" aria-label="Gráfico de XP dos últimos 7 dias">
            <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} role="img" aria-label="Evolução de XP">
              <defs>
                <linearGradient id="xpAreaGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.34" />
                  <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.02" />
                </linearGradient>
              </defs>
              <g className="xp-chart-grid" aria-hidden="true">
                {[0, 1, 2, 3].map((line) => {
                  const y = chartPadding + line * ((chartHeight - chartPadding * 2) / 3);
                  return <line key={line} x1={chartPadding} x2={chartWidth - chartPadding} y1={y} y2={y} />;
                })}
              </g>
              <polygon className="xp-chart-area" points={chartArea} />
              <polyline className="xp-chart-line" points={chartLine} />
              {chartPoints.map((point) => (
                <g className="xp-chart-point" key={point.key}>
                  <circle cx={point.x} cy={point.y} r="5" />
                  <text x={point.x} y={point.y - 12}>{point.xp}</text>
                </g>
              ))}
            </svg>
            <div className="xp-chart-labels">
              {chartPoints.map((point) => (
                <span key={point.key}>
                  <strong>{point.weekday}</strong>
                  <small>{point.label}</small>
                </span>
              ))}
            </div>
          </div>
        </Card>

        <Card className="dashboard-panel recent-panel">
          <SectionTitle eyebrow="Últimas sessões" title="Atividade recente" />
          {reviewSessions.length > 0 ? (
            <div className="dashboard-review-box">
              <strong>Dados para revisar</strong>
              <p>Alguns registros salvos parecem rascunhos ou nomes genéricos e foram ocultados daqui.</p>
              <div>
                {reviewSessions.map((session) => (
                  <div className="dashboard-review-item" key={session.id}>
                    <span>
                      <strong>{session.title}</strong>
                      <small>{session.meta}</small>
                    </span>
                    <button
                      type="button"
                      onClick={() => deleteReviewSession(session)}
                      aria-label={`Excluir dado suspeito ${session.title}`}
                      title="Excluir dado suspeito"
                    >
                      <Trash2 size={15} aria-hidden="true" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="dashboard-review-links">
                <Link href="/pomodoro">Abrir Pomodoro</Link>
                <Link href="/gestor-estudos">Abrir estudos</Link>
              </div>
            </div>
          ) : null}
          <div className="dashboard-session-list">
            {recentSessions.length === 0 ? (
              <EmptyState message="Nenhuma sessão registrada ainda." />
            ) : (
              recentSessions.map((session) => (
                <div className="dashboard-session-item" key={session.id}>
                  <span>
                    {session.kind === "focus" ? (
                      <Crosshair size={16} aria-hidden="true" />
                    ) : (
                      <BookOpen size={16} aria-hidden="true" />
                    )}
                  </span>
                  <div>
                    <strong>{session.title}</strong>
                    <small>{session.meta}</small>
                  </div>
                  <time dateTime={session.date}>
                    <strong>{session.time}</strong>
                    <small>{session.date}</small>
                  </time>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>
    </section>
  );
}
