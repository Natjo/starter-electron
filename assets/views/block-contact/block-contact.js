export default (el) => {
    const contact = document.querySelector(".block-contact");
    const btn_open = contact.querySelector(".btn-open");
    const btn_close = contact.querySelector(".btn-close");

    btn_open.onclick = () => {
        contact.classList.add("open");
    };
    btn_close.onclick = () => {
        contact.classList.remove("open");
    };
};
