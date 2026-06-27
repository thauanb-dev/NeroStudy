"use client";

import { useEffect, useState } from "react";

const todayKey = new Date().toLocaleDateString("pt-BR");

const views = {
  pomodoro: {
    title: "Pomodoro",
    subtitle: "Cronômetro limpo para sessões de foco.",
  },
  studies: {
    title: "Gestor de Estudo",
    subtitle: "Registre matérias, questões, acertos e erros.",
  },
  plan: {
    title: "Planejamento",
    subtitle: "Organize os assuntos da semana.",
  },
  goals: {
    title: "Metas do Dia",
    subtitle: "Defina pequenas metas para manter constância.",
  },
};

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function loadStorage(key, fallback) {
  if (typeof window === "undefined") return fallback;

  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : fallback;
}

function saveStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}



export default function NeroStudyApp() {

function addPlan(event) {
  event.preventDefault();

  if (!planForm.day.trim() || !planForm.subject.trim() || !planForm.task.trim()) {
    alert("Preencha dia, matéria e tarefa do planejamento.");
    return;
  }

  const updatedData = [
    {
      id: crypto.randomUUID(),
      ...planForm,
      done: false,
      createdAt: new Date().toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
    ...planData,
  ];

  setPlanData(updatedData);
  saveStorage("neroStudy_weekPlan", updatedData);

  setPlanForm({
    day: "",
    subject: "",
    task: "",
  });
}

function togglePlan(id) {
  const updatedData = planData.map((item) =>
    item.id === id ? { ...item, done: !item.done } : item
  );

  setPlanData(updatedData);
  saveStorage("neroStudy_weekPlan", updatedData);
}

function deletePlan(id) {
  const updatedData = planData.filter((item) => item.id !== id);

  setPlanData(updatedData);
  saveStorage("neroStudy_weekPlan", updatedData);
}

  const [activeView, setActiveView] = useState("pomodoro");
  const [focusData, setFocusData] = useState([]);
  const [studyData, setStudyData] = useState([]);
  const [planData, setPlanData] = useState([]);
  const [goalData, setGoalData] = useState([]);
  const [defaultMinutes, setDefaultMinutes] = useState(25);
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);

  const [studyForm, setStudyForm] = useState({
    subject: "",
    topic: "",
    minutes: "",
    questions: "",
    hits: "",
    errors: "",
});

  const [planForm, setPlanForm] = useState({
    day: "",
    subject: "",
    task: "",  
  })

  const [goalText, setGoalText] = useState("");

  useEffect(() => {
    setFocusData(loadStorage("neroStudy_focus", []));
    setStudyData(loadStorage("neroStudy_studies", []));
    setPlanData(loadStorage("neroStudy_weekPlan", []));
    setGoalData(loadStorage("neroStudy_dailyGoals", []));
  }, []);

  useEffect(() => {
    if (!isRunning) return;

    if (secondsLeft <= 0) {
      setIsRunning(false);
      return;
    }

    const intervalId = setInterval(() => {
      setSecondsLeft((current) => current - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isRunning, secondsLeft]);

  const todayFocus = focusData
    .filter((item) => item.date === todayKey)
    .reduce((total, item) => total + item.minutes, 0);

  const todayStudies = studyData.filter((item) => item.date === todayKey);

  const totalStudyMinutes = todayStudies.reduce(
    (total, item) => total + Number(item.minutes || 0),
    0
  );

  const totalQuestions = todayStudies.reduce(
    (total, item) => total + Number(item.questions || 0),
    0
  );

  function startTimer() {
    setIsRunning(true);
  }

  function pauseTimer() {
    setIsRunning(false);
  }

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

    const updatedData = [
      {
        id: crypto.randomUUID(),
        date: todayKey,
        minutes: elapsedMinutes,
        createdAt: new Date().toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
      ...focusData,
    ];

    setFocusData(updatedData);
    saveStorage("neroStudy_focus", updatedData);
    resetTimer();
  }

  function addStudy(event) {
    event.preventDefault();

    const questions = Number(studyForm.questions || 0);
    const hits = Number(studyForm.hits || 0);
    const errors = Number(studyForm.errors || 0);

    if (questions > 0 && hits + errors !== questions) {
      alert("A soma de acertos e erros precisa ser igual ao total de questões.");
      return;
    }

    const updatedData = [
      {
        id: crypto.randomUUID(),
        date: todayKey,
        ...studyForm,
        createdAt: new Date().toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
      ...studyData,
    ];

    setStudyData(updatedData);
    saveStorage("neroStudy_studies", updatedData);

    setStudyForm({
      subject: "",
      topic: "",
      minutes: "",
      questions: "",
      hits: "",
      errors: "",
    });
  }

  function addGoal(event) {
    event.preventDefault();

    if (!goalText.trim()) return;

    const updatedData = [
      {
        id: crypto.randomUUID(),
        text: goalText.trim(),
        done: false,
        date: todayKey,
      },
      ...goalData,
    ];

    setGoalData(updatedData);
    saveStorage("neroStudy_dailyGoals", updatedData);
    setGoalText("");
  }

  function toggleGoal(id) {
    const updatedData = goalData.map((goal) =>
      goal.id === id ? { ...goal, done: !goal.done } : goal
    );

    setGoalData(updatedData);
    saveStorage("neroStudy_dailyGoals", updatedData);
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">N</div>

          <div>
            <h1>NeroStudy</h1>
            <p>Foco e constância</p>
          </div>
        </div>

        <nav className="nav">
          {Object.entries(views).map(([key, view]) => (
            <button
              key={key}
              type="button"
              className={`nav-button ${activeView === key ? "active" : ""}`}
              onClick={() => setActiveView(key)}
            >
              {view.title}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <strong>NeroStudy</strong>
          <p>Um painel limpo para estudar com constância, foco e controle.</p>
        </div>
      </aside>

      <main className="main">
        <header className="header">
          <div>
            <h2>{views[activeView].title}</h2>
            <p>{views[activeView].subtitle}</p>
          </div>

          <div className="status-card">
            <span>Foco registrado hoje</span>
            <strong>{todayFocus}min</strong>
          </div>
        </header>

        {activeView === "pomodoro" && (
          <section className="grid">
            <div className="card timer-card">
              <span className="mode-badge">
                {isRunning ? "Sessão em andamento" : "Sessão ativa"}
              </span>

              <div className="timer">{formatTime(secondsLeft)}</div>

              <p className="timer-status">
                {isRunning ? "Foco em andamento" : "Pronto para iniciar"}
              </p>

              <div className="controls">
                <button className="btn primary" type="button" onClick={startTimer}>
                  Iniciar
                </button>

                <button className="btn" type="button" onClick={pauseTimer}>
                  Pausar
                </button>

                <button className="btn" type="button" onClick={resetTimer}>
                  Resetar
                </button>

                <button className="btn" type="button" onClick={finishTimer}>
                  Finalizar
                </button>
              </div>

              <div className="config-row">
                <input
                  type="number"
                  value={defaultMinutes}
                  min="1"
                  onChange={(event) => setDefaultMinutes(event.target.value)}
                />

                <button className="btn small" type="button" onClick={applyMinutes}>
                  Aplicar
                </button>
              </div>
            </div>

            <div className="card">
              <h3 className="card-title">Histórico de foco</h3>

              <div className="history-list">
                {focusData.filter((item) => item.date === todayKey).length === 0 ? (
                  <div className="empty">Nenhum foco registrado hoje.</div>
                ) : (
                  focusData
                    .filter((item) => item.date === todayKey)
                    .map((item) => (
                      <div className="history-item" key={item.id}>
                        <strong>Foco registrado</strong>
                        <span>{item.minutes}min • {item.createdAt}</span>
                      </div>
                    ))
                )}
              </div>
            </div>
          </section>
        )}

        {activeView === "studies" && (
          <section className="grid">
            <div className="card">
              <h3 className="card-title">Registrar estudo</h3>

              <form className="form" onSubmit={addStudy}>
                <input
                  placeholder="Matéria"
                  value={studyForm.subject}
                  onChange={(event) =>
                    setStudyForm({ ...studyForm, subject: event.target.value })
                  }
                />

                <input
                  placeholder="Assunto"
                  value={studyForm.topic}
                  onChange={(event) =>
                    setStudyForm({ ...studyForm, topic: event.target.value })
                  }
                />

                <input
                  type="number"
                  placeholder="Minutos"
                  value={studyForm.minutes}
                  onChange={(event) =>
                    setStudyForm({ ...studyForm, minutes: event.target.value })
                  }
                />

                <input
                  type="number"
                  placeholder="Questões"
                  value={studyForm.questions}
                  onChange={(event) =>
                    setStudyForm({ ...studyForm, questions: event.target.value })
                  }
                />

                <input
                  type="number"
                  placeholder="Acertos"
                  value={studyForm.hits}
                  onChange={(event) =>
                    setStudyForm({ ...studyForm, hits: event.target.value })
                  }
                />

                <input
                  type="number"
                  placeholder="Erros"
                  value={studyForm.errors}
                  onChange={(event) =>
                    setStudyForm({ ...studyForm, errors: event.target.value })
                  }
                />

                <button className="btn primary" type="submit">
                  Adicionar registro
                </button>
              </form>
            </div>

            <div className="card">
              <h3 className="card-title">Estudos de hoje</h3>

              <p>Tempo estudado: {totalStudyMinutes}min</p>
              <p>Questões feitas: {totalQuestions}</p>

              <div className="history-list">
                {todayStudies.length === 0 ? (
                  <div className="empty">Nenhuma matéria registrada hoje.</div>
                ) : (
                  todayStudies.map((item) => (
                    <div className="history-item" key={item.id}>
                      <strong>{item.subject} — {item.topic}</strong>
                      <span>
                        {item.minutes}min • {item.questions || 0} questões
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </section>
        )}

{activeView === "plan" && (
  <section className="grid">
    <div className="card">
      <h3 className="card-title">Novo planejamento</h3>

      <form className="form" onSubmit={addPlan}>
        <input
          placeholder="Dia da semana"
          value={planForm.day}
          onChange={(event) =>
            setPlanForm({ ...planForm, day: event.target.value })
          }
        />

        <input
          placeholder="Matéria"
          value={planForm.subject}
          onChange={(event) =>
            setPlanForm({ ...planForm, subject: event.target.value })
          }
        />

        <input
          placeholder="Tarefa / assunto"
          value={planForm.task}
          onChange={(event) =>
            setPlanForm({ ...planForm, task: event.target.value })
          }
        />

        <button className="btn primary" type="submit">
          Adicionar planejamento
        </button>
      </form>
    </div>

    <div className="card">
      <h3 className="card-title">Plano semanal</h3>

      <div className="history-list">
        {planData.length === 0 ? (
          <div className="empty">Nenhum planejamento cadastrado.</div>
        ) : (
          planData.map((item) => (
            <div className="history-item" key={item.id}>
              <button type="button" onClick={() => togglePlan(item.id)}>
                <strong>
                  {item.done ? "✅" : "⬜"} {item.day} — {item.subject}
                </strong>
                <span>{item.task}</span>
              </button>

              <button
                className="btn small"
                type="button"
                onClick={() => deletePlan(item.id)}
              >
                Remover
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  </section>
)}

        {activeView === "goals" && (
          <section className="grid">
            <div className="card">
              <h3 className="card-title">Nova meta</h3>

              <form className="form" onSubmit={addGoal}>
                <input
                  placeholder="Digite uma meta para hoje"
                  value={goalText}
                  onChange={(event) => setGoalText(event.target.value)}
                />

                <button className="btn primary" type="submit">
                  Adicionar meta
                </button>
              </form>
            </div>

            <div className="card">
              <h3 className="card-title">Checklist de hoje</h3>

              <div className="history-list">
                {goalData.filter((goal) => goal.date === todayKey).length === 0 ? (
                  <div className="empty">Nenhuma meta cadastrada hoje.</div>
                ) : (
                  goalData
                    .filter((goal) => goal.date === todayKey)
                    .map((goal) => (
                      <button
                        type="button"
                        className="history-item"
                        key={goal.id}
                        onClick={() => toggleGoal(goal.id)}
                      >
                        <strong>{goal.done ? "✅" : "⬜"} {goal.text}</strong>
                      </button>
                    ))
                )}
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}