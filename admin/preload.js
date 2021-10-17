const { contextBridge, ipcRenderer } = require("electron");
const fs = require("fs-extra");
const path = require("path");
const postcss = require("postcss");
const cssnested = require("postcss-nested");
const cssCustomMedia = require("postcss-custom-media");
const autoprefixer = require("autoprefixer");
const uglifycss = require("uglifycss");
const babel = require("@babel/core");
const watch = require("node-watch");
const isProd = process.argv[2] == "--prod" ? true : false;
const src = "../assets/";
const dist = "../web/";
const root = __dirname.replace("admin", "");
let datas;
let layout = {}
let templates = {};

const core = {
    styles: [],
    initTime: new Date(),
    compile(file, dist_name, ext) {
        if (ext == ".js") this.babel(fs.readFileSync(file, "utf8"), dist_name);
        else if (ext == ".css") {
        } else fs.copySync(file, dist_name);
    },
    dirScan(dir) {
        const recursive = (dir) => {
            fs.readdirSync(dir).forEach((res) => {
                const file = path.resolve(dir, res);
                const stat = fs.statSync(file);
                if (stat && stat.isDirectory()) recursive(file);
                else if (!/.DS_Store$/.test(file)) {
                    if (/.css$/.test(file)) {
                        core.styles.push(file);
                    } else if (!/\/styles\//.test(file)) {
                        const name = file.replace(root, "");
                        const filename = path.parse(name).base;
                        const ext = path.extname(filename);
                        core.compile(file, dist + name, ext);
                    } else {
                    }
                }
            });
        };
        recursive(dir);
    },
    rmDir(dirPath, removeSelf) {
        if (removeSelf === undefined) removeSelf = true;
        try {
            var files = fs.readdirSync(dirPath);
        } catch (e) {
            return;
        }
        for (let file of files) {
            const filePath = `${dirPath}/${file}`;
            fs.statSync(filePath).isFile()
                ? fs.unlinkSync(filePath)
                : core.rmDir(filePath);
        }
        removeSelf && fs.rmdirSync(dirPath);
    },
    time: () => (time = (new Date() - core.initTime) / 1000),
    babel(result, dest) {
        result = babel.transform(result, {
            minified: isProd ? true : false,
            comments: false,
            presets: isProd ? [["minify", { builtIns: "entry" }]] : [],
        }).code;

        fs.ensureDirSync(path.dirname(dest));
        fs.writeFileSync(dest, result);
    },
    postcss(result, dest) {
        postcss([
            cssnested,
            cssCustomMedia({ importFrom: `${src}styles/customMedias.css` }),
            autoprefixer({ add: true }),
        ])
            .process(result, { from: "undefined" })
            .then((result) => {
                const minify = isProd
                    ? uglifycss.processString(result.css)
                    : result.css;
                fs.ensureDirSync(path.dirname(dest));
                fs.writeFileSync(dest, minify);
            });
    },
    console(folder, filename, evt) {
        let status;
        if (evt == "remove") status = `31mremoved`;
        if (evt == "update") status = `32mupdated`;
        if (evt == "add") status = `36madded`;
        console.log(
            `\x1b[90m\x1b[3m(${folder})\x1b[39m\x1b[23m`,
            `\x1b[1m${filename}\x1b[22m`,
            `\x1b[${status}\x1b[39m`,
            `\x1b[3m${core.time()}s\x1b[23m`
        );
    },
    compile_syles() {
        let str = "";
        for (let file of core.styles) {
            str += fs.readFileSync(`${file}`, "utf8");
        }
        core.postcss(str, `${dist}assets/styles/styles.css`);
    },
    pages(datas) {
        const recursive = (datas) => {
            for (let data in datas) {
                fs.ensureDirSync(`../web/${datas[data].slug}`);
                let args = {};
                for (let field of datas[data].tpl.fields) {
                    args[field.slug] = field.value;
                }
                const page = eval("`" + templates[datas[data].tpl.slug] + "`");
                fs.writeFileSync(`../web/${datas[data].slug}/index.html`, page);
                recursive(datas[data].childs);
            }
        };
        recursive(datas);
    },
    templates() {
        const dir = "../content/templates/";
        const recursive = (dir) => {
            fs.readdirSync(dir).forEach((res) => {
                const file = path.resolve(dir, res);
                const stat = fs.statSync(file);
                if (stat && stat.isDirectory()) recursive(file);
                else if (!/.DS_Store$/.test(file)) {
                    const name = file.replace(root, "");
                    const dir = name.split('/')[2];
                    templates[dir] = fs.readFileSync("../"+name, 'utf8');
                }
            });
        };
        recursive(dir);
    },

    layout() {
        const dir = '../content/layout/'
        const recursive = (dir) => {
            fs.readdirSync(dir).forEach((res) => {
                const file = path.resolve(dir, res);
                const stat = fs.statSync(file);
                if (stat && stat.isDirectory()) recursive(file);
                else if (!/.DS_Store$/.test(file)) {
                    const name = file.replace(root, "");
                    const filename = path.parse(name).base;
                    const ext = path.extname(filename);
                    const gg = filename.replace(ext, '');
                    console.log(name,gg);
                    layout[gg] = fs.readFileSync("../"+name, 'utf8');
                }
            });
        };
        recursive(dir);
    },
};



core.layout();
core.templates();


fetch("./datas.json")
    .then((resp) => resp.json())
    .then((result) => {
        datas = result;
        core.pages(datas);
    });


core.rmDir(`${dist}`);
core.dirScan(src);
core.compile_syles();

console.log(`${core.time()}s`);

contextBridge.exposeInMainWorld("electron", {
    createPage: (slug, value) => {
        fs.ensureDirSync(`../web/${slug}`);
        fs.writeFileSync(`../web/${slug}/index.html`, value);
    },
    copyFile: (file, dist_name) => {
        fs.copySync(file, dist_name);
    },
    datas: () => datas,
    getPage: (slug) => {
       
    },
});
