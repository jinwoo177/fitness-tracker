let timerInterval;
let seconds = 0;
let isTimerRunning = false;
let level = 1;

function startTraining() {
  const name = document.getElementById('username').value;
  const age = document.getElementById('age').value;
  const weight = document.getElementById('weight').value;
  const gender = document.getElementById('gender').value;

  if (!name || !age || !weight || !gender) {
    alert("Please fill all fields.");
    return;
  }

  document.getElementById('nameDisplay').textContent = name;
  document.getElementById('startScreen').style.display = "none";
  document.getElementById('systemScreen').style.display = "flex";
  generateQuests();
}

function startTimer() {
  if (isTimerRunning) return;
  isTimerRunning = true;
  document.getElementById("completeBtn").disabled = false;

  timerInterval = setInterval(() => {
    seconds++;
    document.getElementById("timer").textContent = formatTime(seconds);
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
  isTimerRunning = false;
}

function resetTimer() {
  stopTimer();
  seconds = 0;
  document.getElementById("timer").textContent = "00:00";
  document.getElementById("completeBtn").disabled = true;
}

function formatTime(sec) {
  const m = Math.floor(sec / 60).toString().padStart(2, '0');
  const s = (sec % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

function generateQuests() {
  const age = parseInt(document.getElementById('age').value);
  const gender = document.getElementById('gender').value;

  let questPool = [];

  if (age < 13) {
    questPool = ["10 Arm Circles", "5 Wall Push-ups", "15 Jumping Jacks", "Walk 2x", "Breathing Exercise 1 min"];
  } else if (age <= 17) {
    questPool = gender === "male" ?
      ["20 Jumping Jacks", "10 Push-ups", "15 Squats", "Run 1 min", "1-min Plank"] :
      ["15 Jumping Jacks", "10 Knee Push-ups", "20 Leg Raises", "Run 1 min", "Glute Bridge x10"];
  } else if (age <= 40) {
    questPool = gender === "male" ?
      ["30 Jumping Jacks", "20 Push-ups", "20 Squats", "2-minute Plank", "15 Burpees"] :
      ["20 Jumping Jacks", "15 Push-ups", "20 Glute Bridges", "15 Squats", "Wall Sit 1.5 min"];
  } else if (age <= 60) {
    questPool = gender === "male" ?
      ["15 Push-ups", "20 Jumping Jacks", "1-min Plank", "Wall Sit 1 min", "Stretch 2 mins"] :
      ["10 Squats", "15 Jumping Jacks", "Wall Push-ups x15", "Stretch 3 mins", "Chair Sit/Stand x10"];
  } else {
    questPool = ["Chair Sit/Stand x10", "Wall Push-ups x10", "Stretch", "Walk 5 mins", "Breathing 3 mins"];
  }

  const selected = [];
  while (selected.length < 3) {
    const q = questPool[Math.floor(Math.random() * questPool.length)];
    if (!selected.includes(q)) selected.push(q);
  }

  document.getElementById('questList').innerHTML = selected.map(q => `<li>${q}</li>`).join('');
}

function completeQuests() {
  resetTimer();
  level++;
  document.getElementById("level").textContent = level;

  const rank = getRank(level);
  document.getElementById("rankTitle").textContent = rank;
  showLevelPopup(level, rank);
  generateQuests();
}

function getRank(level) {
  if (level <= 20) return "Beginner";
  if (level <= 40) return "Intermediate";
  if (level <= 60) return "Advanced";
  if (level <= 80) return "Expert";
  if (level <= 100) return "Master";
  if (level <= 150) return "Ultra";
  return "Ultra Instinct";
}

function showLevelPopup(level, rank) {
  const popup = document.getElementById("levelPopup");
  document.getElementById("popupLevel").textContent = level;
  document.getElementById("popupRank").textContent = rank;
  popup.style.display = "block";
  setTimeout(() => {
    popup.style.display = "none";
  }, 3000);
}

function updateAgeLabel() {
  const age = parseInt(document.getElementById("age").value);
  let ageGroup = "-";
  if (!isNaN(age)) {
    if (age < 13) ageGroup = "Child";
    else if (age < 18) ageGroup = "Teen";
    else if (age < 40) ageGroup = "Adult";
    else if (age < 60) ageGroup = "Middle-aged";
    else ageGroup = "Senior";
  }
  document.getElementById("ageType").textContent = ageGroup;
}

function showInstructions() {
  document.getElementById("instructionPopup").style.display = "block";
}
function closeInstructions() {
  document.getElementById("instructionPopup").style.display = "none";
}

function showAbout() {
  document.getElementById("aboutPopup").style.display = "block";
}
function closeAbout() {
  document.getElementById("aboutPopup").style.display = "none";
}

function showRankGuide() {
  document.getElementById("rankGuidePopup").style.display = "block";
}
function closeRankGuide() {
  document.getElementById("rankGuidePopup").style.display = "none";
}

function resetAll() {
  location.reload();
}
