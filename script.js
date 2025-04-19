let currentQuestion = 0;
let score = 0;
let startTime, timerInterval;
let studentName = "", studentClass = "", studentPrediction = "";
const API_URL = "https://script.google.com/macros/s/AKfycbyZ5pPURF4XU4LgJhgBybq5VVj54UD28UA1KBc8svLAF7rpapOMNR6aPHREKzi1212Y/exec";

function normalizeString(str) {
  return str.trim().toLowerCase().replace(/\s+/g, " ");
}

function startQuiz() {
  studentName = document.getElementById("studentName").value.trim();
  studentClass = document.getElementById("studentClass").value.trim();
  studentPrediction = document.getElementById("studentPrediction").value.trim();
  if (!studentName || !studentClass || !studentPrediction) {
    alert("Vui lòng nhập đầy đủ không bỏ trống!");
    return;
  }

  document.getElementById("infoSection").classList.add("hidden");
  document.getElementById("quizSection").classList.remove("hidden");

  questions.sort(() => Math.random() - 0.5);
  startTime = new Date();
  timerInterval = setInterval(updateTimer, 1000);
  showQuestion();
}

function updateTimer() {
  const now = new Date();
  const diff = Math.floor((now - startTime) / 1000);
  const h = String(Math.floor(diff / 3600)).padStart(2, "0");
  const m = String(Math.floor((diff % 3600) / 60)).padStart(2, "0");
  const s = String(diff % 60).padStart(2, "0");
  document.getElementById("timer").textContent = `${h}:${m}:${s}`;
}

function showQuestion() {
  const q = questions[currentQuestion];
  let html = `<h3>Câu ${currentQuestion + 1}: ${q.question}</h3>`;
  const shuffledOptions = q.options.sort(() => Math.random() - 0.5);

  shuffledOptions.forEach(option => {
    html += `<button class="option-btn" onclick="selectOption('${option}')">${option}</button>`;
  });

  document.getElementById("questionBox").innerHTML = html;
  document.getElementById("nextBtn").style.display = "none";
}

function selectOption(selectedOption) {
  if (selectedOption === questions[currentQuestion].answer) score++;
  currentQuestion++;
  if (currentQuestion >= questions.length) {
    finishQuiz();
  } else {
    showQuestion();
  }
}

function finishQuiz() {
  clearInterval(timerInterval);
  const totalSeconds = Math.floor((new Date() - startTime) / 1000);

  const data = {
    name: studentName,
    class: studentClass,
    prediction: studentPrediction,
    score: score,
    time: totalSeconds
  };

  fetch(API_URL, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" }
  })
    .then(res => res.text())
    .then(response => {
      console.log("Server response:", response);
      loadRanking();
    });

  document.getElementById("quizSection").innerHTML = `
    <h2>Hoàn thành!</h2>
    <p>Điểm: ${score}/${questions.length}</p>
    <p>Thời gian: ${totalSeconds} giây</p>
  `;
}

// 🟡 Lấy bảng xếp hạng từ Google Sheet
function loadRanking() {
  fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      data.sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        return a.time - b.time;
      });
      updateRankingTable(data);
      updateFloatingRanking(data);
    });
}

function updateRankingTable(rankingList) {
  const tbody = document.querySelector("#rankingTable tbody");
  tbody.innerHTML = "";
  rankingList.forEach((item, index) => {
    const row = `<tr>
      <td>${index + 1}</td>
      <td>${item.name}</td>
      <td>${item.class}</td>
      <td>${item.prediction}</td>
      <td>${item.score}/${questions.length}</td>
      <td>${item.time}</td>
    </tr>`;
    tbody.innerHTML += row;
  });
}

function updateFloatingRanking(rankingList) {
  const topList = document.getElementById("topRankingList");
  topList.innerHTML = "";
  rankingList.slice(0, 5).forEach((entry, index) => {
    const li = document.createElement("li");
    li.textContent = `${index + 1}. ${entry.name} - ${entry.class}`;
    topList.appendChild(li);
  });
}

// 🟣 ADMIN ĐĂNG NHẬP
let isAdmin = false;

function showAdminLogin() {
  const username = prompt("Nhập tài khoản:");
  const password = prompt("Nhập mật khẩu:");
  if (username === "admin" && password === "3041975") {
    isAdmin = true;
    alert("Đăng nhập thành công! Các chức năng quản trị đã được mở.");
  } else {
    alert("Sai tài khoản hoặc mật khẩu!");
  }
}

function showResetPrompt() {
  if (!isAdmin) {
    alert("Chức năng này cần đăng nhập quản trị viên.");
    return;
  }
  alert("Reset dữ liệu phải thực hiện trực tiếp trong Google Sheet.");
}

function showViewParticipantsPrompt() {
  if (!isAdmin) {
    alert("Chức năng này cần đăng nhập quản trị viên.");
    return;
  }
  fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      alert("Tổng số người đã tham gia: " + data.length);
    });
}

function showRankingWithPassword() {
  if (!isAdmin) {
    alert("Chức năng này cần đăng nhập quản trị viên.");
    return;
  }
  document.getElementById("hiddenRanking").style.display = "block";
  loadRanking();
}

window.onload = () => {
  loadRanking();
};
