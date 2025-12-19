// function pages() {
//   let cards = document.querySelectorAll(".elem");
//   let pages = document.querySelectorAll(".pages");

//   cards.forEach((card) => {
//     //   console.log(elem);
//     card.addEventListener("click", (e) => {
//       console.log(e.target);
//       pages.forEach((page) => {
//         if (e.target.id == page.id) {
//           page.style.display = "flex";
//         }
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
// pages();

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
todo();
