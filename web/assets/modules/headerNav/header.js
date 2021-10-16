import Swiper from "/assets/modules/swiper/swiper-bundle.esm.browser.min.js";

function headerNav(params) {
  const btn_nav = document.querySelector("#btn-nav");
  const header = document.querySelector("#header");
  const market_name = header.querySelector(".market-name");
  const ctas_page = document.querySelectorAll("#header .cta-page, #nav .cta-page");
  const nav = document.getElementById("nav");
  const swiper = nav.querySelector(".swiper");
  const slides = swiper.querySelectorAll(".swiper-slide");
  const level0 = nav.querySelectorAll(".level0");
  const links = nav.querySelectorAll("a");
  let slug_market = "lng_gas";
  let slug_article;
  let isOpen = false;
  let level0_active;
  level0.forEach(ul => {
    ul.querySelectorAll(".item-0").forEach((li, i) => {
      li.style.animationDelay = `${i * 0.15}s`;
    });
  });

  const display_level0 = () => {
    level0.forEach((market_link, index) => {
      if (market_link.dataset.market === slug_market) {
        market_link.classList.add("active");
        level0_active = market_link;
      } else {
        market_link.classList.remove("active");
      }
    });
  };

  const open = () => {
    isOpen = true;
    display_level0();
    level0_active.classList.add("active");
    swiper.classList.add('display');
    nav.classList.add("open");
    btn_nav.classList.add("active");
  };

  const close = () => {
    isOpen = false;
    level0_active.classList.add("hide");
    swiper.classList.remove('display');
    setTimeout(() => {
      nav.classList.remove("open");
      btn_nav.classList.remove("active");
      level0_active.classList.remove("hide");
      level0_active.classList.remove("active");
    }, 200);
  };

  btn_nav.onclick = () => {
    nav.classList.contains("open") ? close() : open();
  };

  ctas_page.forEach(btn => {
    btn.onclick = e => {
      e.preventDefault();

      if (nav.classList.contains("open")) {
        close();
        nav.addEventListener("transitionend", () => {
          params.onclick(btn.getAttribute("href"));
        }, {
          once: true
        });
      } else {
        params.onclick(btn.getAttribute("href"));
      }
    };
  });
  const mySwiper = new Swiper(nav.querySelector(".swiper"), {
    direction: "vertical",
    slidesPerView: 3,
    centeredSlides: true,
    loop: true,
    parallax: true,
    on: {
      slideChange: function (e) {
        const currentSlide = e.slides[e.realIndex];
        slug_market = currentSlide.dataset.market;
        isOpen && display_level0();
      }
    }
  });

  this.change = (level, page, slug) => {
    level > 0 ? header.classList.add("level1") : header.classList.remove("level1");
    level > 1 ? header.classList.add("level2") : header.classList.remove("level2");
    const market = page.querySelector("main").dataset.marketName;
    if (market) market_name.innerHTML = market;
    const slug_split = slug.split("/");
    slug_market = slug_split[1] || "lng_gas";
    slug_article = slug_split[2];
    slides.forEach((slide, index) => {
      if (slide.dataset.market === slug_market) {
        mySwiper.slideToLoop(index);
      }
    });
    links.forEach(link => {
      const href = link.getAttribute("href");
      if (href.split("#")[0] === `hub/${slug_market}/${slug_article}/`) link.classList.add("active");else link.classList.remove("active");
    });
  };
}

export default headerNav;