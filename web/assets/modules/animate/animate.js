const animate = (el, delay1) => {
  el.style.visibility = "visible";
  el.classList.add("animate");
  const value = el.innerHTML;
  const delay = getComputedStyle(el).getPropertyValue("--delay") || ".5";
  const duration = getComputedStyle(el).getPropertyValue("--duration") || ".5";
  const animation = getComputedStyle(el).getPropertyValue("--animation") || "fade";
  const type = getComputedStyle(el).getPropertyValue("--type") || "normal";
  let markup = "";
  let inc = 0;

  const linify = func => {
    const lines = value.split("<br>");
    lines.forEach(line => {
      markup += `<div style="overflow: hidden;">`;
      func(line);
      markup += `</div>`;
    });
  };

  if (type == "letters") {
    linify(line => {
      [...line.trim()].forEach(val => {
        if (val === " ") markup += "&nbsp;";else {
          const style = `animation:${animation} ${duration}s both ${inc * delay + delay1}s`;
          markup += `<span style="${style}">${val}</span>`;
          inc++;
        }
      });
    });
    el.innerHTML = markup;
  }

  if (type == "lines") {
    linify(line => {
      const style = `animation:${animation} ${duration}s both ${inc * delay + delay1}s`;
      markup += `<span style="${style}">${line}</span>`;
      inc++;
    });
    el.innerHTML = markup;
  }

  if (type == "normal") {
    el.style.animation = `${animation} ${duration}s both ${delay1}s`;
    el.classList.add("display");
  }

  if (type == "list") {
    el.querySelectorAll("li").forEach((item, index) => {
      item.style.animation = `${animation} ${duration}s both ${index * delay + delay1}s`;
      el.classList.add("display");
    });
  }

  el.classList.add("display");
};

export default animate;