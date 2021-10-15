import { Callout } from './globekit.esm.js';

/**
 * This is the definition of the callout that appears over the selected airport
 */
class OfficeCallout extends Callout {
  createElement() {

    // Uncomment this line then click on an airport to see the data object;
    // console.log(this.definition.data);

    // Here is the html element that will be attached to the coord
    const div = document.createElement('div');
    div.className = 'office-callout';
    div.innerHTML = `<div class="callout-container">
      <h3 class="tl1">${this.definition.data.name}</h3>
      <img src="assets/pin.png"> 
      <table>
        <tbody>
          <tr>
            <td>Employees:</td>
            <td>${this.definition.data.employees}</td>
          </tr>
          <tr>
            <td>Bigfoot Tours Sold:</td>
            <td>${this.definition.data.bigfoot_tours_sold}</td>
          </tr>
        </tbody>
      </table>
    </div>`;
    return div;
  }

  // This function sets offsets for the htmlElement from the lat/lon coord
  setPosition(position) {
    const nx = position.screen.x - 85;
    const ny = position.screen.y - 123;
    this.element.style.transform = `translate(${nx.toFixed(1)}px, ${ny.toFixed(0)}px)`;
  }
}

export { OfficeCallout };
