import { gk } from '/assets/app.js';
export default (el => {
  const header = document.querySelector("#header");
  const market_name = header.querySelector(".market-name");
  const cta_all = el.querySelector('.cta');
  const planet = document.getElementById('planet');

  cta_all.onclick = e => {
    e.preventDefault();
    planet.classList.add("display", "open");
    header.classList.remove("level1");
    header.classList.add("levelx");
    market_name.innerHTML = "MAP";
    planet.addEventListener('transitionend', () => {
      gk.open(document.querySelector('main').dataset.market);
      planet.classList.toggle("active");
    }, {
      once: true
    });
  };
});