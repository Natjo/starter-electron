import onePage from "./modules/onePage/onePage.js";
import headerNav from "./modules/headerNav/header.js";
import { MyGlobeKit } from '/assets/modules/globekit/headquarters.js';
import preload from "/assets/modules/preload/preload.js";
const header = document.querySelector("#header");
const planet = document.getElementById("planet");
const canvas = document.getElementById('globekit-canvas');
const loading = document.querySelector("#loading");
const gk = new MyGlobeKit(canvas, planet.dataset.slug);
const background = document.getElementById('background');
const headernav = new headerNav({
  onclick(slug) {
    layout.load(slug);
  }

});
const layout = new onePage({
  onstart(level) {
    if (level === 0) {
      background.classList.remove('market');
      planet.classList.remove('display');
    }

    if (level === 1) {
      background.classList.add('market');
    }

    if (level === 2) {
      background.classList.add('market');
      planet.classList.remove('display');
    }
  },

  onchange(level, page, slug) {
    headernav.change(level, page, slug);

    if (level === 1) {
      planet.classList.add('display');
    }
  }

});
preload(() => {
  layout.start("hub/", () => {
    loading.classList.add("loaded");
    loading.addEventListener('transitionend', () => {
      setTimeout(() => {
        document.getElementById("transition").style.opacity = 0;
        loading.remove();
      }, 1000);
    }, {
      once: true
    });
    header.classList.add("display");
  });
});
export { gk };