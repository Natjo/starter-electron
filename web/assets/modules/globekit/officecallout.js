import { Callout } from "/assets/modules/globekit/globekit.esm.js";

class OfficeCallout extends Callout {
  createElement() {
    const div = document.createElement("div");
    div.className = "office-callout";
    div.innerHTML = `
        <div class="callout-container">
            <svg class="icon" width="100" height="100" aria-hidden="true" viewBox="0 0 58 58">
                <use xlink:href="assets/img/icons.svg#${this.definition.data.picto}"></use>
            </svg>

            <div class="text">
                <h3 class="tl1">${this.definition.data.name}</h3>

                <div class="town">${this.definition.data.town}</div> 

                <h4>Details</h4>  
                <ul>
                ${this.definition.data.details.map(val => `<li>${val}</li>`).join('')}
                </ul>

                <h4>Technology</h4>  
                <ul>
                ${this.definition.data.technology.map(val => `<li>${val}</li>`).join('')}
                </ul>

                <h4>Characteristics</h4>
                <ul>
                ${this.definition.data.characteristics.map(val => `<li>${val}</li>`).join('')}
                </ul>
            </div> 
        </div>`;
    return div;
  }

  setPosition(position) {
    const nx = position.screen.x - 85;
    const ny = position.screen.y - 223;
    this.element.style.transform = `translate(${nx.toFixed(1)}px, ${ny.toFixed(0)}px)`;
  }

}

export { OfficeCallout };