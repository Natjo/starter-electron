import animate from "/assets/modules/animate/animate.js";
import reveal from "/assets/modules/reveal/reveal.js";

let ele;

function enable (el) { 
    ele = el; 
    
    const els = el.querySelectorAll("h1, .desc, .articles, h2, .offers, .block-discover, .hero-secondary h2, .rond0, .rond1, .rond2");//"
    let delay = 0;

    reveal(els, 0, (el) => {
        animate(el, delay * .15);
        delay++;
    });

   
}

const disable = () => {
    ele.classList.add('hide');
}

export {enable, disable} ;