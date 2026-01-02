// function pages() {
//   let cards = document.querySelectorAll(".elem");
//   let pages = document.querySelectorAll(".pages");
//   cards.forEach((card) => {
//     card.addEventListener("click", (e) => {
//       const cardId = e.currentTarget.id;
//       pages.forEach((page) => {
//         page.style.display = page.id === cardId ? "flex" : "";
//       });
//     });
//   });
//   pages.forEach((e) => {
//     let p = e.querySelector("p");
//     p.addEventListener("click", () => {
//       e.style.display = "none";
//     });
//   });
// }

function todo() {
  let inputTitle = document.querySelector("form .inp");
  let inputDetails = document.querySelector("form textarea");
  let check = document.querySelector(".todo-page form .checkbox input");
  let submit = document.querySelector("form botton");
  let todosContainer = document.querySelector(".todo-page .bot .right .list");
  let form = document.querySelector(".todo-page form");
  let listitems = document.querySelectorAll(".todo-page .list .listitems");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  function render() {
    let sum = "";
    tasks.forEach((elem, idx) => {
      sum += ` <div class="listitems" id="${idx}">
                   <p class="text ${
                     elem.completed ? "done" : ""
                   }" id="${idx}"> <span class="imp ${
        elem.completed ? "grey" : ""
      }" >${elem.imp ? "imp" : ""}</span> ${elem.task}</p>
                   <p class="completed" id="${idx}">${
        elem.completed ? "undo completed" : "mark as completed"
      }</p>
                   <p class="delete" id="${idx}" >delete</p>
                </div>`;
    });

    todosContainer.innerHTML = sum;
  }
  render();
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    tasks.push({
      task: inputTitle.value,
      taskDet: inputDetails.value,
      imp: check.checked,
      completed: false,
    });
    // console.log(tasks);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    inputTitle.value = "";
    inputDetails.value = "";
    check.checked = false;
    render();
  });
  todosContainer.addEventListener("click", (e) => {
    const item = e.target.closest(".listitems");
    if (!item) return;
    const textP = item.querySelector(".text");
    console.log(textP);
    // console.log(e.target.classList.contains("delete"));
    if (e.target.classList.contains("delete")) {
      tasks.splice(Number(e.target.id), 1);
    }
    if (e.target.classList.contains("completed")) {
      tasks[Number(e.target.id)].completed =
        !tasks[Number(e.target.id)].completed;
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
    render();
  });
}
function dailyPlanner() {
  let listConatiner = document.querySelector(".dailyplanner-page .bot .inside");
  let items = document.querySelectorAll(
    ".dailyplanner-page .bot .inside .items"
  );
  let inputText = document.querySelector(
    ".dailyplanner-page .bot .inside .items input"
  );
  let dayplanData = JSON.parse(localStorage.getItem("dailyplanData")) || {};

  function renderTime() {
    let cluster = "";

    function formatTime(hour) {
      const period = hour >= 12 ? "pm" : "am";
      const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
      return `${formattedHour}:${period}`;
    }

    let hours = Array.from({ length: 18 }, (_, idx) => {
      const startHour = 5 + idx;
      const endHour = startHour + 1;

      return `${formatTime(startHour)}--${formatTime(endHour)}`;
    });

    hours.forEach((elem, idx) => {
      let str = dayplanData[idx] || "";
      cluster += ` <div class="items" id=${idx}>
                     <p>${elem}</p>
                     <input id=${idx} type="text"  placeholder="add your plan..." value="${str}">
                  </div>`;
    });
    listConatiner.innerHTML = cluster;
  }
  renderTime();

  listConatiner.addEventListener("input", (e) => {
    console.log(e.target.id);
    dayplanData[e.target.id] = e.target.value;
    localStorage.setItem("dailyplanData", JSON.stringify(dayplanData));
    // console.log(dayplanData);
  });
}

function motivationalQuote() {
  let textDiv = document.querySelector(
    ".motivational-page .bot .quoteDiv .quote"
  );
  let authorName = document.querySelector(
    ".motivational-page .bot .quoteDiv .name"
  );
  let btn = document.querySelector(".motivational-page .bot .inside .btn");

  async function fetchQuote() {
    let response = await fetch(
      "https://random-quotes-freeapi.vercel.app/api/random"
    );
    let val = await response.json();
    // quote author
    quote = val.quote;
    author = val.author;
    console.log(quote, author);
    textDiv.innerHTML = quote;
    authorName.innerHTML = `"${author}"`;
  }
  btn.addEventListener("click", () => {
    fetchQuote();
  });
}

function pomoDoro() {
  let pomodoroTab = document.querySelector(
    ".pomodoro-page .bot .timerDiv .tabs .pomo"
  );
  let shortBreakTab = document.querySelector(
    ".pomodoro-page .bot .timerDiv .tabs .shortBreak"
  );
  let longBreakTab = document.querySelector(
    ".pomodoro-page .bot .timerDiv .tabs .longBreak"
  );
  let timerDiv = document.querySelector(".pomodoro-page .bot .timerDiv .timer");
  let startBtn = document.querySelector(
    ".pomodoro-page .bot .timerDiv .btn .btn1"
  );
  let resetBtn = document.querySelector(
    ".pomodoro-page .bot .timerDiv .btn .btn2"
  );

  //timers
  const timer1 = {
    minutes: 25,
    seconds: 0,
    startMinutes: 25,
    intervalId: null,
  };
  const timer2 = {
    minutes: 5,
    seconds: 0,
    startMinutes: 5,
    intervalId: null,
  };
  const timer3 = {
    minutes: 10,
    seconds: 0,
    startMinutes: 10,
    intervalId: null,
  };

  let activeTimer = timer1;

  //reset the time
  function reset(timer) {
    clearInterval(timer.intervalId);
    timer.intervalId = null;
    timer.minutes = timer.startMinutes;
    timer.seconds = 0;
    render(timer);
  }

  //render on screen
  function render(timer) {
    timerDiv.innerHTML = `${timer.minutes} 
    <span><i class="ri-circle-fill"></i><i class="ri-circle-fill"></i></span>
    ${timer.seconds.toString().padStart(2, "0")}`;
  }

  //updateds the time
  function updateTimer(timer) {
    if (timer.intervalId) return;

    timer.intervalId = setInterval(() => {
      if (timer.minutes === 0 && timer.seconds === 0) {
        clearInterval(timer.intervalId);
        timer.intervalId = null;
        return;
      }

      if (timer.seconds === 0) {
        timer.minutes--;
        timer.seconds = 59;
      } else {
        timer.seconds--;
      }

      render(timer);
    }, 1000);
  }
  // switch timer and resets the old timer instantly
  function switchTimer(newTimer) {
    // 1️⃣ Reset the currently active timer
    reset(activeTimer);

    // 2️⃣ Switch active timer
    activeTimer = newTimer;

    // 3️⃣ Render the new timer
    render(activeTimer);
  }

  pomodoroTab.addEventListener("click", () => {
    switchTimer(timer1);
  });

  shortBreakTab.addEventListener("click", () => {
    switchTimer(timer2);
  });
  longBreakTab.addEventListener("click", () => {
    switchTimer(timer3);
  });

  startBtn.addEventListener("click", () => {
    updateTimer(activeTimer);
  });

  resetBtn.addEventListener("click", () => {
    reset(activeTimer);
  });
}
pomoDoro();
// pages();
// motivationalQuote();
// dailyPlanner();
// todo();
