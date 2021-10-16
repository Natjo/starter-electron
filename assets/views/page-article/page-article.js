import animate from "/assets/modules/animate/animate.js";
import reveal from "/assets/modules/reveal/reveal.js";

let ele;

function BgColor(){
    let index = 0;
    let oldIndex = -1;
    let el;
    let strates;
    const wh_middle = window.innerHeight / 2;
    
    const scroll = () => {
        index = 0;
        for(let strate of strates){
            if(strate.offsetTop > window.pageYOffset + wh_middle){
                index++
            }
        }    
        if(oldIndex != index){
     
            if(strates[strates.length - 1 - index].classList.contains('light')){
                el.classList.add('light');
            }else{
                el.classList.remove('light');
            }
        }
        oldIndex = index;
    }
   
    this.start = (element) => {
        el = element;
        strates = el.querySelectorAll('.strate');
        index = 0;
        oldIndex = -1;
        window.addEventListener('scroll', scroll);
    }
    this.stop = () => {
        window.removeEventListener('scroll', scroll);
    }
}

const bgColor = new BgColor();

function enable(el) {
    ele = el;
    const sections = el.querySelectorAll(".hero-primary p, .rond0, .rond1, .rond2, h1, .hero-secondary h2, h3, .block-desc p, blockquote, figcaption, .list-crew, .block-wysiwyg p, .block-video,.list-key_numbers, .block-img_2, .card-project");
    const section_bg = el.querySelector('.section-bg '); 
    section_bg.style.opacity = 1;
    let inc = 0;

    reveal(sections, 0, (el) => {
        animate(el, inc*.15);
        el.addEventListener('animationend', () => {
            inc--;
        },{once:true});
        inc++;
    });
    bgColor.start(el);
}
const disable = () => {
    ele.classList.add('hide');
    ele.classList.remove('light');
    bgColor.stop();
}

export { enable, disable };
