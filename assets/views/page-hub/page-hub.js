import Swiper from "/assets/modules/swiper/swiper-bundle.esm.browser.min.js";
import animate from "/assets/modules/animate/animate.js";

let swiper;
let ele;
function enable (el) {  
    ele = el; 
    const slider = el.querySelector(".slider-hub");
    const h1 = el.querySelector("h1");
    const h2 = el.querySelector("h2");
    const baseline = el.querySelector(".baseline");
    const type = el.querySelector(".type");
    const rond0 = el.querySelector(".rond0");
    const rond1 = el.querySelector(".rond1");
    const rond2 = el.querySelector(".rond2");

    animate(h1, 0);
    animate(baseline, 0);
    animate(type, 0);
    animate(rond0, 0);
    animate(rond1, 0);
    animate(rond2, 0);
    
    swiper = new Swiper(slider.querySelector(".swiper"), {
        direction: "vertical",
        slidesPerView: 3,
        centeredSlides: true,
        loop: true,
        on: {
            slideChange: function (e) {
                const currentSlide = e.slides[e.realIndex];
                h2.innerHTML = currentSlide.dataset.title;
                animate(h2, 0);
            },
            init(){
                slider.style.opacity = 1;
            }
        },
    });
}

const disable = () => {
    ele.classList.add('hide');
    ele.addEventListener('transitionend', () => {
        swiper.destroy( true, true );
    }, {once:true});
}

export {enable, disable} ;
