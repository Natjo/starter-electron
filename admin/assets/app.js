// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
let datas = window.electron.datas();
console.log(pages);
import test from "./js/test.js";
test();

const list_pages = document.querySelector("#pages");
const page_content = document.querySelector("#content");

// find obj in deep array
function findObj(array, slug) {
    let result;
    array.some((child) => (child.slug === slug && (result = child)) || (result = findObj(child.childs || [], slug)));
    return result;
}

const display_page = (slug) => {
    const data = findObj(datas, slug);
    let markup = `
    <header>
        <h1>${data.name}</h1>
        <input type="text" value="${data.slug}">
    </header>`;

    for (let field of data.tpl.fields) {
        console.log(field.items)
        markup += `<section class="field">
        <h2>${field.name}</h2>
        ${field.type === 'field' ? `<input type="text" value="${field.value}">` : ''}
        ${field.type === 'text' ? `<textarea>${field.value}</textarea>` : ''}
        ${field.type === 'wysiwyg' ? `<textarea>${field.value}</textarea>` : ''}
        ${field.type === 'list' ? `<select>${field.items.map(item => `<option>${item.value}</option>`)}</select>` : ''}
        
        </section>`;
    }

    page_content.innerHTML = markup;
};

const display_pages = (datas) => {
    let markup = "";
    const ol = (datas) => {
        markup += `<ol>`;
        for (let data in datas) {
            markup += `<li>`;
            if (datas[data].childs)
                markup += `<details><summary>${datas[data].name} <button class="cta-edit" data-slug="${datas[data].slug}">edit</button></summary>`;
            else
                markup += `${datas[data].name} <button class="cta-edit" data-slug="${datas[data].slug}">edit</button>`;
            ol(datas[data].childs);
            if (datas[data].childs) markup += `</details>`;
            else markup += `</li>`;
        }
        markup += `</ol>`;
    };
    ol(datas);

    list_pages.innerHTML = markup;
    const ctas = document.querySelectorAll(".cta-edit");
    ctas.forEach((cta) => {
        cta.onclick = () => {
            display_page(cta.dataset.slug);
        };
    });
};

display_pages(datas);
