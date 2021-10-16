export default (el) => {
    const btns = el.querySelectorAll("[aria-controls]");
    const tabs = el.querySelectorAll("[role=tabpanel]");

    const change = (selected) => {
        const id = selected.getAttribute("aria-controls");
        tabs.forEach((tab) => {
            tab.setAttribute("aria-hidden", true);
        });
        btns.forEach((btn) => {
            btn.setAttribute('aria-expanded', false);
        });
        el.querySelector(`#${id}`).setAttribute("aria-hidden", false);
        selected.setAttribute('aria-expanded', true);
    };

    btns.forEach((btn) => {
        btn.onclick = () => {
            change(btn);
        };
    });
};

