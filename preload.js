window.addEventListener("DOMContentLoaded", () => {

    const pages = document.querySelector("#pages");

    const display_pages = (datas) => { 
        let markup = "";
        const ol = (datas) => {
            markup += `<ol>`;
            for (let data in datas) {
                markup += `<li>`;
                if(datas[data].childs) markup += `<details><summary>${datas[data].name}</summary>`;
                else markup += `${datas[data].name}`;
                ol(datas[data].childs);
                if(datas[data].childs) markup += `</details>`;
                else 
                markup += `</li>`;
            }
            markup += `</ol>`;
        };
        ol(datas);

        pages.innerHTML = markup;
    };

    fetch("./datas.json")
        .then((resp) => resp.json())
        .then((datas) => {
            display_pages(datas);
        });
});
