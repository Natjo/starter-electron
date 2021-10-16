

function onePage(params) {
    const pages = document.querySelectorAll(".page");
    const history = [];
    let index;
    const transitione = document.getElementById("transition");
    let views_arr = [];
    const btn_back = header.querySelector(".cta-back");



    const modules = (el, ok) => {
        const page_views = el.querySelectorAll("[data-views]");
        const length = page_views.length;
        let inc = 0;
        if (length === 0) ok();
        else {
            page_views.forEach((el) => {
                import(`/assets/views/${el.dataset.views}/${el.dataset.views}.js`)
                .then((view) => {
                    if (view.enable) {
                        view.enable(el);
                        views_arr.push(view);
                    } else {
                        view.default(el);
                    }

                    if (inc == length - 1) ok();
                    inc++;
                });
            });
        }
    };

    function displayPage(num) {
        pages.forEach((page, index) => {
            if (index === num) {
                page.removeAttribute("hidden");
            } else {
               /* if (views_arr.length) {
                    views_arr.forEach((mod) => {
                        mod.disable(pages[index]);
                    });
                    views_arr = [];
                }*/
                page.setAttribute("hidden", true);
                page.innerHTML = "";
            }
        });
    }

    const linkPage = () => {
        pages[index].querySelectorAll(".cta-page").forEach((btn) => {
            btn.onclick = (e) => {
                e.preventDefault();
                loadPage(btn.getAttribute("href"), btn.dataset.name);
            };
        });
    };

    const loadPage = (slug, loaded) => {
        index = slug.split("/").length - 2;

        transitione.classList.add("start");
        if (views_arr.length) {
            views_arr.forEach((mod) => {
                mod.disable();
            });
            views_arr = [];
        }  
        if (typeof params.onstart === "function") params.onstart(index);
        transitione.addEventListener("animationend",() => {
                fetch(slug, {
                    cache: "reload",
                })
                    .then(function (response) {
                        return response.text();
                    })
                    .then(function (html) {
                        history.push(slug);
                        const hash = slug.split("#")[1];
                        pages[index].innerHTML = html;
                        displayPage(index);
                      
                        modules(pages[index], () => {
                            if (typeof params.onchange === "function") {
                                params.onchange(index, pages[index], slug);
                            }
                            if (hash) {
                                setTimeout(() => {
                                    document
                                        .getElementById(hash)
                                        .scrollIntoView();
                                }, 1);
                            }
                            
                            linkPage();
                            transitione.classList.add("end"); if (typeof loaded === "function") loaded();
                            transitione.addEventListener("animationend",() => {
                                transitione.classList.remove("start");
                                transitione.classList.remove("end");
                                
                               
                                if (typeof params.onfinish === "function") params.onfinish();
                            },{ once: true }
                            );
                        });
                    })
                    .catch(function (err) {
                        console.warn("Something went wrong.", err);
                    });
            },
            { once: true }
        );
    };

    this.load = (slug) => {
        loadPage(slug);
    };

    this.prev = () => {
        loadPage(history[history.length - 2]);
    };
    btn_back.onclick = (e) => {
        e.preventDefault();
        loadPage(history[history.length - 2]);
    };
       
    this.start = (slug, loaded) => {
        modules(document, () => {
            loadPage(slug, () => {
                loaded();
            });
        })
    }
}

export default onePage;
