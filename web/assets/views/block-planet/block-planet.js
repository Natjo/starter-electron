import { gk } from "/assets/app.js";
export default (el => {
  const btn_open = el.querySelector(".btn-open");
  const header = document.querySelector("#header");
  const market_name = header.querySelector(".market-name");
  const btn_close = header.querySelector(".cta-close");
  const btn_home = header.querySelector(".logo");

  btn_open.onclick = () => {
    el.classList.add("open");
    header.classList.add("levelx");
    market_name.innerHTML = "MAP";
    gk.open(document.querySelector("main").dataset.market);
    el.addEventListener("transitionend", () => {
      gk.resize();
      el.classList.toggle("active");
    }, {
      once: true
    });
  };

  btn_close.onclick = () => {
    gk.close();
    el.classList.remove("active");
    header.classList.remove("levelx");
    market_name.innerHTML = document.querySelector("main").dataset.marketName;
    el.classList.remove("open");
  };

  btn_home.addEventListener("click", () => {
    setTimeout(() => {
      el.classList.remove("active");
      el.addEventListener("transitionend", () => {
        gk.reset();
        el.classList.remove("open");
        el.classList.remove("display");
      }, {
        once: true
      });
      header.classList.remove("levelx");
      market_name.innerHTML = document.querySelector("main").dataset.marketName;
    }, 300);
  });
});