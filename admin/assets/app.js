// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

import test from "./js/test.js";
test();

//fs.writeFileSync("test3.html",  "hello");

const pages = document.querySelector("#pages");

const display_pages = (datas) => {
    let markup = "";
    const ol = (datas) => {
        markup += `<ol>`;
        for (let data in datas) {
            markup += `<li>`;  
            window.electron.createPage(datas[data].slug, "value");
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

    pages.innerHTML = markup;
};

fetch("./datas.json")
    .then((resp) => resp.json())
    .then((datas) => {
      //  display_pages(datas);
    });
