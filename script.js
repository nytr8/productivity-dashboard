function pages() {
  let cards = document.querySelectorAll(".elem");
  let pages = document.querySelectorAll(".pages");

  cards.forEach((card) => {
    //   console.log(elem);
    card.addEventListener("click", (e) => {
      console.log(e.target);
      pages.forEach((page) => {
        if (e.target.id == page.id) {
          page.style.display = "flex";
        }
      });
    });
  });
  pages.forEach((e) => {
    let p = e.querySelector("p");
    p.addEventListener("click", () => {
      e.style.display = "none";
    });
  });
}
pages();
