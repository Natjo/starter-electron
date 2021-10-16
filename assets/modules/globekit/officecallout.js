import { Callout } from "/assets/modules/globekit/globekit.esm.js";

/**
 * This is the definition of the callout that appears over the selected airport
 */
class OfficeCallout extends Callout {
    createElement() {
        // Uncomment this line then click on an airport to see the data object;
        // console.log(this.definition.data);

        // Here is the html element that will be attached to the coord
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

    // This function sets offsets for the htmlElement from the lat/lon coord
    setPosition(position) {
        const nx = position.screen.x - 85;
        const ny = position.screen.y - 223;
        this.element.style.transform = `translate(${nx.toFixed(1)}px, ${ny.toFixed(0)}px)`;
    }
}

export { OfficeCallout };
