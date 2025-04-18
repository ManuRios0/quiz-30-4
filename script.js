
let currentQuestion = 0;
let score = 0;
let startTime, timerInterval;
let studentName = "", studentClass = "", studentPrediction = "";
let rankingList = JSON.parse(localStorage.getItem("rankingList")) || [];

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

  // ✅ chuẩn hóa tên và lớp
  const normalizedName = normalizeString(studentName);
  const normalizedClass = normalizeString(studentClass);

  // ❌ kiểm tra xem học sinh đã tham gia chưa
  const hasPlayed = rankingList.some(entry =>
    normalizeString(entry.name) === normalizedName &&
    normalizeString(entry.class) === normalizedClass
  );

  if (hasPlayed) {
    alert("Bạn đã tham gia rồi và chỉ được chơi 1 lần.");
    return;
  }


  

  // ✅ cho phép bắt đầu làm bài
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
    html += `
      <button class="option-btn" onclick="selectOption('${option}')">
        ${option}
      </button>
    `;
  });

  document.getElementById("questionBox").innerHTML = html;
  document.getElementById("nextBtn").style.display = "none"; // Ẩn nút "Câu tiếp theo"
}

// ➡️ Thêm mới function này:
function selectOption(selectedOption) {
  if (selectedOption === questions[currentQuestion].answer) {
    score++;
  }
  currentQuestion++;
  if (currentQuestion >= questions.length) {
    finishQuiz();
  } else {
    showQuestion();
  }
}


function nextQuestion() {
  const selected = document.querySelector('input[name="option"]:checked');
  if (!selected) {
    alert("Vui lòng chọn một đáp án!");
    return;
  }
  const answer = selected.value;
  if (answer === questions[currentQuestion].answer) score++;

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

  rankingList.push({
    name: studentName,
    class: studentClass,
    prediction: studentPrediction,
    score: score,
    time: totalSeconds
  });
  rankingList.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.time - b.time;
  });

  localStorage.setItem("rankingList", JSON.stringify(rankingList));
  updateRankingTable();
  updateFloatingRanking();

  document.getElementById("quizSection").innerHTML = `
    <h2>Hoàn thành!</h2>
    <p>Điểm: ${score}/${questions.length}</p>
    <p>Thời gian: ${totalSeconds} giây</p>
  `;
}

function updateRankingTable() {
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

function updateFloatingRanking() {
  const topList = document.getElementById("topRankingList");
  topList.innerHTML = "";

  const data = JSON.parse(localStorage.getItem("rankingList")) || [];
  data.slice(0, 5).forEach((entry, index) => {
    const li = document.createElement("li");
    li.textContent = `${index + 1}. ${entry.name} - ${entry.class}đ`;
    topList.appendChild(li);
  });
}


window.onload = () => {
  updateRankingTable();
  updateFloatingRanking();
};
function showResetPrompt() {
  const password = prompt("Nhập mật khẩu để reset bảng xếp hạng:");
  if (password === "0966521047") {
    if (confirm("Bạn có chắc muốn xóa toàn bộ bảng xếp hạng không?")) {
      rankingList = [];
      updateRankingTable();
      localStorage.removeItem("rankingList");
      alert("Đã xóa bảng xếp hạng.");
    }
  } else {
    alert("Sai mật khẩu!");
  }
}
function showViewParticipantsPrompt() {
  const password = prompt("Nhập mật khẩu để xem số người tham gia:");
  if (password === "0966521047") {
    const total = localStorage.getItem("rankingList")
  ? JSON.parse(localStorage.getItem("rankingList")).length
  : 0;
    alert("Tổng số người đã tham gia: " + total);
  } else {
    alert("Sai mật khẩu!");
  }
}
function showRankingWithPassword() {
  const password = prompt("Nhập mật khẩu để xem bảng xếp hạng:");
  if (password === "0966521047") {
    document.getElementById("hiddenRanking").style.display = "block";
  } else {
    alert("Sai mật khẩu!");
  }
}



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

// Cập nhật các hàm bảo vệ để kiểm tra isAdmin
function showResetPrompt() {
  if (!isAdmin) {
    alert("Chức năng này cần đăng nhập quản trị viên.");
    return;
  }
  if (confirm("Bạn có chắc muốn xóa toàn bộ bảng xếp hạng không?")) {
    rankingList = [];
    updateRankingTable();
    localStorage.removeItem("rankingList");
    alert("Đã xóa bảng xếp hạng.");
  }
}

function showViewParticipantsPrompt() {
  if (!isAdmin) {
    alert("Chức năng này cần đăng nhập quản trị viên.");
    return;
  }
  const total = localStorage.getItem("rankingList")
    ? JSON.parse(localStorage.getItem("rankingList")).length
    : 0;
  alert("Tổng số người đã tham gia: " + total);
}

function showRankingWithPassword() {
  if (!isAdmin) {
    alert("Chức năng này cần đăng nhập quản trị viên.");
    return;
  }
  document.getElementById("hiddenRanking").style.display = "block";
}
