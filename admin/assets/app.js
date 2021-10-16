// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
let pages = window.electron.pages();
import test from "./js/test.js";
test();

const list_pages = document.querySelector("#pages");
const display_pages = (datas) => {
    let markup = "";
    const ol = (datas) => {
        markup += `<ol>`;
        for (let data in datas) {
            markup += `<li>`;  
            if (datas[data].childs)
                markup += `<details><summary>${datas[data].name}</summary>`;
            else markup += `${datas[data].name}`;
            ol(datas[data].childs);
            if (datas[data].childs) markup += `</details>`;
            else markup += `</li>`;
        }
        markup += `</ol>`;
    };
    ol(datas);

    list_pages.innerHTML = markup;
};




display_pages(pages);