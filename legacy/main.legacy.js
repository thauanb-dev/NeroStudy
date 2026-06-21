const navButtons=document.querySelectorAll(".nav-button");
const views=document.querySelectorAll(".view");
const pageTitle=document.getElementById("pageTitle");
const pageSubtitle=document.getElementById("pageSubtitle");
const timer=document.getElementById("timer");
const timerStatus=document.getElementById("timerStatus");
const startBtn=document.getElementById("startBtn");
const pauseBtn=document.getElementById("pauseBtn");
const resetBtn=document.getElementById("resetBtn");
const finishBtn=document.getElementById("finishBtn");
const applyMinutesBtn=document.getElementById("applyMinutesBtn");
const focusMinutes=document.getElementById("focusMinutes");
const focusHistory=document.getElementById("focusHistory");
const todayFocus=document.getElementById("todayFocus");
const studyForm=document.getElementById("studyForm");
const subjectInput=document.getElementById("subjectInput");
const topicInput=document.getElementById("topicInput");
const minutesInput=document.getElementById("minutesInput");
const studyTypeInput=document.getElementById("studyTypeInput");
const difficultyInput=document.getElementById("difficultyInput");
const statusInput=document.getElementById("statusInput");
const questionsInput=document.getElementById("questionsInput");
const hitsInput=document.getElementById("hitsInput");
const errorsInput=document.getElementById("errorsInput");
const notesInput=document.getElementById("notesInput");
const studyList=document.getElementById("studyList");
const subjectsCount=document.getElementById("subjectsCount");
const studyMinutes=document.getElementById("studyMinutes");
const questionsCount=document.getElementById("questionsCount");
const performancePie=document.getElementById("performancePie");
const performanceMain=document.getElementById("performanceMain");
const performanceDetails=document.getElementById("performanceDetails");
const hitLegend=document.getElementById("hitLegend");
const errorLegend=document.getElementById("errorLegend");
const performanceTitle=document.getElementById("performanceTitle");
const performanceScope=document.getElementById("performanceScope");
const planForm=document.getElementById("planForm");
const planDayInput=document.getElementById("planDayInput");
const planMinutesInput=document.getElementById("planMinutesInput");
const planSubjectInput=document.getElementById("planSubjectInput");
const planTopicInput=document.getElementById("planTopicInput");
const planPriorityInput=document.getElementById("planPriorityInput");
const planStatusInput=document.getElementById("planStatusInput");
const planList=document.getElementById("planList");
const weekPlanCount=document.getElementById("weekPlanCount");
const weekPlanMinutes=document.getElementById("weekPlanMinutes");
const highPriorityCount=document.getElementById("highPriorityCount");
const goalForm=document.getElementById("goalForm");
const goalTextInput=document.getElementById("goalTextInput");
const goalAreaInput=document.getElementById("goalAreaInput");
const goalPriorityInput=document.getElementById("goalPriorityInput");
const goalList=document.getElementById("goalList");
const dailyGoalsCount=document.getElementById("dailyGoalsCount");
const dailyGoalsDone=document.getElementById("dailyGoalsDone");
const dailyGoalsPending=document.getElementById("dailyGoalsPending");
const configInput = document.querySelector('.config-input');
console.log(configInput);
let defaultMinutes=30;
let secondsLeft=defaultMinutes*60;
let timerInterval=null;
let isRunning=false;
const todayKey=new Date().toLocaleDateString("pt-BR");
let focusData=JSON.parse(localStorage.getItem("neroStudy_focus"))||[];
let studyData=JSON.parse(localStorage.getItem("neroStudy_studies"))||[];
let planData=JSON.parse(localStorage.getItem("neroStudy_weekPlan"))||[];
let goalData=JSON.parse(localStorage.getItem("neroStudy_dailyGoals"))||[];
const icons={
    clock:`<svg class="icon" viewBox="0 0 24 24"><circle cx="12" cy="13" r="8"></circle><path d="M12 9v4l3 2"></path><path d="M9 2h6"></path></svg>`,
    book:`<svg class="icon" viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M4 4v15.5"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>`,
    calendar:`<svg class="icon" viewBox="0 0 24 24"><path d="M8 2v4"></path><path d="M16 2v4"></path><rect x="3" y="4" width="18" height="18" rx="2"></rect><path d="M3 10h18"></path></svg>`,
    check:`<svg class="icon" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"></path></svg>`,
    target:`<svg class="icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"></circle><circle cx="12" cy="12" r="5"></circle><circle cx="12" cy="12" r="1"></circle></svg>`,
    trash:`<svg class="icon small-icon" viewBox="0 0 24 24"><path d="M3 6h18"></path><path d="M8 6V4h8v2"></path><path d="M19 6l-1 14H6L5 6"></path></svg>`,
    rotate:`<svg class="icon small-icon" viewBox="0 0 24 24"><path d="M3 12a9 9 0 1 0 3-6.7"></path><path d="M3 3v6h6"></path></svg>`
};
navButtons.forEach(button=>{
    button.addEventListener("click",()=>{
        navButtons.forEach(btn=>btn.classList.remove("active"));
        views.forEach(view=>view.classList.remove("active"));
        button.classList.add("active");
        document.getElementById(button.dataset.view).classList.add("active");
        pageTitle.textContent=button.dataset.title;
        pageSubtitle.textContent=button.dataset.subtitle;
    });
});
function saveFocus(){
    localStorage.setItem("neroStudy_focus",JSON.stringify(focusData));
}
function saveStudies(){
    localStorage.setItem("neroStudy_studies",JSON.stringify(studyData));
}
function savePlan(){
    localStorage.setItem("neroStudy_weekPlan",JSON.stringify(planData));
}
function saveGoals(){
    localStorage.setItem("neroStudy_dailyGoals",JSON.stringify(goalData));
}
function formatTime(totalSeconds){
    const minutes=Math.floor(totalSeconds/60);
    const seconds=totalSeconds%60;
    return `${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}`;
}
function updateTimerDisplay(){
    timer.textContent=formatTime(secondsLeft);
}
function startTimer(){
    if(isRunning)return;
    isRunning=true;
    timerStatus.textContent="Foco em andamento";
    timerInterval=setInterval(()=>{
        secondsLeft--;
        updateTimerDisplay();
        if(secondsLeft<=0){
            clearInterval(timerInterval);
            isRunning=false;
            timerStatus.textContent="Ciclo concluído. Salve seu foco.";
        }
    },1000);
}
function pauseTimer(){
    clearInterval(timerInterval);
    isRunning=false;
    timerStatus.textContent="Pausado";
}
function resetTimer(){
    clearInterval(timerInterval);
    isRunning=false;
    secondsLeft=defaultMinutes*60;
    timerStatus.textContent="Pronto para iniciar";
    updateTimerDisplay();
}
function finishTimer(){
    const elapsedMinutes=defaultMinutes-Math.ceil(secondsLeft/60);
    if(elapsedMinutes<=0){
        alert("Você ainda não registrou tempo suficiente para salvar.");
        return;
    }
    focusData.unshift({
        id:crypto.randomUUID(),
        date:todayKey,
        minutes:elapsedMinutes,
        createdAt:new Date().toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})
    });
    saveFocus();
    resetTimer();
    renderFocusHistory();
    updateGlobalStats();
}
function applyMinutes(){
    const value=Number(focusMinutes.value);
    if(!value||value<1)return;
    defaultMinutes=value;
    secondsLeft=defaultMinutes*60;
    resetTimer();
}
function deleteFocus(id){
    focusData=focusData.filter(item=>item.id!==id);
    saveFocus();
    renderFocusHistory();
    updateGlobalStats();
}
function renderFocusHistory(){
    const todayItems=focusData.filter(item=>item.date===todayKey);
    if(todayItems.length===0){
        focusHistory.innerHTML='<div class="empty">Nenhum foco registrado hoje.</div>';
        return;
    }
    focusHistory.innerHTML=todayItems.map(item=>`
        <div class="item">
            <div class="item-header">
                <div class="item-main">
                    <div class="item-icon">${icons.clock}</div>
                    <div>
                        <div class="item-title">Foco registrado</div>
                        <div class="item-meta">${item.minutes}min • ${item.createdAt}</div>
                    </div>
                </div>
                <button class="btn small danger" onclick="deleteFocus('${item.id}')">${icons.trash} Excluir</button>
            </div>
        </div>
    `).join("");
}
studyForm.addEventListener("submit",event=>{
    event.preventDefault();
    const questions=Number(questionsInput.value)||0;
    const hits=Number(hitsInput.value)||0;
    const errors=Number(errorsInput.value)||0;
    if(questions>0&&hits+errors!==questions){
        alert("A soma de acertos e erros precisa ser igual ao total de questões.");
        return;
    }
    studyData.unshift({
        id:crypto.randomUUID(),
        date:todayKey,
        subject:subjectInput.value.trim(),
        topic:topicInput.value.trim(),
        minutes:Number(minutesInput.value),
        type:studyTypeInput.value,
        difficulty:difficultyInput.value,
        status:statusInput.value,
        questions,
        hits,
        errors,
        notes:notesInput.value.trim(),
        createdAt:new Date().toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})
    });
    saveStudies();
    studyForm.reset();
    renderStudyList();
    updateGlobalStats();
});
function deleteStudy(id){
    studyData=studyData.filter(item=>item.id!==id);
    saveStudies();
    renderStudyList();
    updateGlobalStats();
}
function renderStudyList(){
    const todayItems=studyData.filter(item=>item.date===todayKey);
    if(todayItems.length===0){
        studyList.innerHTML='<div class="empty">Nenhuma matéria registrada hoje.</div>';
        return;
    }
    studyList.innerHTML=todayItems.map(item=>{
        const questions=item.questions||0;
        const hits=item.hits||0;
        const errors=item.errors||0;
        const hitRate=questions>0?Math.round((hits/questions)*100):0;
        const errorRate=questions>0?Math.round((errors/questions)*100):0;
        return `
            <div class="item">
                <div class="item-header">
                    <div class="item-main">
                        <div class="item-icon">${icons.book}</div>
                        <div>
                            <div class="item-title">${item.subject} — ${item.topic}</div>
                            <div class="item-meta">${item.minutes}min • ${item.type} • ${item.difficulty} • ${item.status}</div>
                            <div class="item-meta">Registrado às ${item.createdAt}</div>
                            <div class="study-question-box">
                                <div class="study-question-metric total">
                                    <span>Questões</span>
                                    <strong>${questions}</strong>
                                </div>
                                <div class="study-question-metric hit">
                                    <span>Acertos</span>
                                    <strong>${hits} (${hitRate}%)</strong>
                                </div>
                                <div class="study-question-metric error">
                                    <span>Erros</span>
                                    <strong>${errors} (${errorRate}%)</strong>
                                </div>
                            </div>
                            ${questions>0?`
                                <div class="performance-line">
                                    Aproveitamento:
                                    <strong class="hit">${hitRate}% acertos</strong>
                                    •
                                    <strong class="error">${errorRate}% erros</strong>
                                </div>
                            `:""}
                            ${item.notes?`<div class="item-meta">${item.notes}</div>`:""}
                        </div>
                    </div>
                    <button class="btn small danger" onclick="deleteStudy('${item.id}')">${icons.trash} Excluir</button>
                </div>
            </div>
        `;
    }).join("");
}
planForm.addEventListener("submit",event=>{
    event.preventDefault();
    planData.push({
        id:crypto.randomUUID(),
        day:planDayInput.value,
        subject:planSubjectInput.value.trim(),
        topic:planTopicInput.value.trim(),
        minutes:Number(planMinutesInput.value),
        priority:planPriorityInput.value,
        status:planStatusInput.value
    });
    savePlan();
    planForm.reset();
    renderPlanList();
    updateGlobalStats();
});
function deletePlan(id){
    planData=planData.filter(item=>item.id!==id);
    savePlan();
    renderPlanList();
    updateGlobalStats();
}
function togglePlanStatus(id){
    planData=planData.map(item=>{
        if(item.id!==id)return item;
        return {...item,status:item.status==="Concluído"?"Planejado":"Concluído"};
    });
    savePlan();
    renderPlanList();
    updateGlobalStats();
}
function renderPlanList(){
    const dayOrder=["Segunda","Terça","Quarta","Quinta","Sexta","Sábado","Domingo"];
    const sorted=[...planData].sort((a,b)=>dayOrder.indexOf(a.day)-dayOrder.indexOf(b.day));
    if(sorted.length===0){
        planList.innerHTML='<div class="empty">Nenhum assunto planejado para a semana.</div>';
        return;
    }
    planList.innerHTML=sorted.map(item=>`
        <div class="item ${item.status==="Concluído"?"done":""}">
            <div class="item-header">
                <div class="item-main">
                    <div class="item-icon">${icons.calendar}</div>
                    <div>
                        <div class="item-title">${item.day} — ${item.subject}</div>
                        <div class="item-meta">${item.topic}</div>
                        <div class="item-meta">${item.minutes}min • Prioridade ${item.priority} • ${item.status}</div>
                    </div>
                </div>
                <div class="item-actions">
                    <button class="btn small" onclick="togglePlanStatus('${item.id}')">${item.status==="Concluído"?icons.rotate:icons.check} ${item.status==="Concluído"?"Reabrir":"Concluir"}</button>
                    <button class="btn small danger" onclick="deletePlan('${item.id}')">${icons.trash} Excluir</button>
                </div>
            </div>
        </div>
    `).join("");
}
goalForm.addEventListener("submit",event=>{
    event.preventDefault();
    goalData.unshift({
        id:crypto.randomUUID(),
        date:todayKey,
        text:goalTextInput.value.trim(),
        area:goalAreaInput.value,
        priority:goalPriorityInput.value,
        done:false
    });
    saveGoals();
    goalForm.reset();
    renderGoalList();
    updateGlobalStats();
});
function toggleGoal(id){
    goalData=goalData.map(item=>{
        if(item.id!==id)return item;
        return {...item,done:!item.done};
    });
    saveGoals();
    renderGoalList();
    updateGlobalStats();
}
function deleteGoal(id){
    goalData=goalData.filter(item=>item.id!==id);
    saveGoals();
    renderGoalList();
    updateGlobalStats();
}
function renderGoalList(){
    const todayItems=goalData.filter(item=>item.date===todayKey);
    if(todayItems.length===0){
        goalList.innerHTML='<div class="empty">Nenhuma meta criada para hoje.</div>';
        return;
    }
    goalList.innerHTML=todayItems.map(item=>`
        <div class="item ${item.done?"done":""}">
            <div class="item-header">
                <div class="item-main">
                    <div class="item-icon">${item.done?icons.check:icons.target}</div>
                    <div>
                        <div class="item-title">${item.text}</div>
                        <div class="item-meta">${item.area} • Prioridade ${item.priority}</div>
                    </div>
                </div>
                <div class="item-actions">
                    <button class="btn small" onclick="toggleGoal('${item.id}')">${item.done?icons.rotate:icons.check} ${item.done?"Desmarcar":"Concluir"}</button>
                    <button class="btn small danger" onclick="deleteGoal('${item.id}')">${icons.trash} Excluir</button>
                </div>
            </div>
        </div>
    `).join("");
}
function updateGlobalStats(){
    const todayFocusItems=focusData.filter(item=>item.date===todayKey);
    const totalFocus=todayFocusItems.reduce((sum,item)=>sum+item.minutes,0);
    const todayStudies=studyData.filter(item=>item.date===todayKey);
    const uniqueSubjects=new Set(todayStudies.map(item=>item.subject.toLowerCase()));
    const totalStudyMinutes=todayStudies.reduce((sum,item)=>sum+item.minutes,0);
    const totalQuestions=todayStudies.reduce((sum,item)=>sum+(item.questions||0),0);
    const selectedPerformanceScope=performanceScope.value;
    const performanceStudies=selectedPerformanceScope==="today"?todayStudies:studyData;
    const performanceQuestions=performanceStudies.reduce((sum,item)=>sum+(item.questions||0),0);
    const performanceHits=performanceStudies.reduce((sum,item)=>sum+(item.hits||0),0);
    const performanceErrors=performanceStudies.reduce((sum,item)=>sum+(item.errors||0),0);
    const hitRate=performanceQuestions>0?Math.round((performanceHits/performanceQuestions)*100):0;
    const errorRate=performanceQuestions>0?Math.round((performanceErrors/performanceQuestions)*100):0;
    const totalPlanMinutes=planData.reduce((sum,item)=>sum+item.minutes,0);
    const highPriority=planData.filter(item=>item.priority==="Alta").length;
    const todayGoals=goalData.filter(item=>item.date===todayKey);
    const doneGoals=todayGoals.filter(item=>item.done).length;
    todayFocus.textContent=`${totalFocus}min`;
    subjectsCount.textContent=uniqueSubjects.size;
    studyMinutes.textContent=`${totalStudyMinutes}min`;
    questionsCount.textContent=totalQuestions;
    performancePie.style.setProperty("--hit-percent",`${hitRate}%`);
    performanceMain.textContent=`${hitRate}%`;
    performanceDetails.textContent=`${performanceHits} acertos • ${performanceErrors} erros • ${performanceQuestions} questões`;
    hitLegend.textContent=`${hitRate}%`;
    errorLegend.textContent=`${errorRate}%`;
    performanceTitle.textContent=selectedPerformanceScope==="today"?"Desempenho do dia":"Desempenho geral";
    weekPlanCount.textContent=planData.length;
    weekPlanMinutes.textContent=`${totalPlanMinutes}min`;
    highPriorityCount.textContent=highPriority;
    dailyGoalsCount.textContent=todayGoals.length;
    dailyGoalsDone.textContent=doneGoals;
    dailyGoalsPending.textContent=todayGoals.length-doneGoals;
}

document.addEventListener("DOMContentLoaded", function () {
    const configInput = document.querySelector(".config-row input");
    console.log(configInput);
    configInput.addEventListener("input", function () {
      if (Number(configInput.value) > 999) {
        configInput.value = 999;
      }
  
      if (Number(configInput.value) < 0) {
        configInput.value = 0;
      }
    });
  });

startBtn.addEventListener("click",startTimer);
pauseBtn.addEventListener("click",pauseTimer);
resetBtn.addEventListener("click",resetTimer);
finishBtn.addEventListener("click",finishTimer);
applyMinutesBtn.addEventListener("click",applyMinutes);
performanceScope.addEventListener("change",updateGlobalStats);
updateTimerDisplay();
renderFocusHistory();
renderStudyList();
renderPlanList();
renderGoalList();
updateGlobalStats();
