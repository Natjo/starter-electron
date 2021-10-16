import { GlobeKitView, Icosphere, Points, CalloutManager, CalloutDefinition } from "/assets/modules/globekit/globekit.esm.js";
import { OfficeCallout } from "/assets/modules/globekit/officecallout.js";
const apiKey = "{YOUR_GLOBEKIT_API_KEY}";

class MyGlobeKit {
  constructor(canvas, slug) {
    this.gkOptions = {
      apiKey,
      wasmPath: "/assets/modules/globekit/gkweb_bg.wasm",
      attributes: {
        alpha: true,
        width: 10
      },
      clearColor: [0.0, 0.0, 0.0, 0.0]
    };
    this.gkview = new GlobeKitView(canvas, this.gkOptions, () => {});
    this.gkview.ambientController.isEnabled = false;
    this.gkview.movementModel.setLatLon(41, -111);
    this.gkview.movementModel.setAlt(4);
    this.slug = slug;
    this.calloutManager = new CalloutManager(document.getElementById("callout-manager"));
    this.gkview.registerCalloutManager(this.calloutManager);

    this.calloutManager.onAutoRemove = def => {};

    this.list = null;

    this.gkview.onSelection = list => {
      this.list = list;
      list.drawables.forEach(el => {
        if (el.obj.id === this.points.id) {
          if (el.selection !== undefined) {
            const sel = el.selection[0][0];
            this.calloutManager.removeAllCallouts();
            this.calloutManager.addCallout(new CalloutDefinition(sel.lat, sel.lon, OfficeCallout, sel.properties));
            const arcParams = {
              from: [sel.lat, sel.lon],
              to: [41, -111],
              startColor: "#ffffff",
              startAlpha: 1.0,
              midWidth: 4
            };
          } else {
            this.calloutManager.removeAllCallouts();
          }
        }
      });
    };

    this.icosphere = new Icosphere("/assets/img/worldmap.jpg");
    this.icosphere.setInteractive(true, true, false);
    this.gkview.addDrawable(this.icosphere, () => {
      this.gkview.startDrawing();
    });
  }

  addPoints(file) {
    this.points = new Points();
    this.points.setInteractive(true, true, false);
    this.points.maxSelectionDistance = 200;

    this.points.transform = (element, point) => {
      point.size = 10;
      if (element.properties.type === "feed") point.color = [238 / 255, 119 / 255, 102 / 255, 1];else if (element.properties.type === "epc") point.color = [128 / 255, 199 / 255, 160 / 255, 1];else if (element.properties.type === "completed") point.color = [0 / 255, 112 / 255, 239 / 255, 1];
      return point;
    };

    fetch(`assets/json/${file}.json`).then(response => response.json()).then(data => {
      this.points.addGeojson(data);
    });
    this.gkview.addDrawable(this.points);
  }

  removePoints() {
    if (this.points) {
      this.points.datastore.deleteDataset();
      this.points.dataPointCount = 0;
      this.points.update();
      this.gkview.scene.update();
      this.points.addGeojson({
        type: "FeatureCollection",
        features: []
      });
      this.gkview.addDrawable(this.points);
    }
  }

  resize() {
    setTimeout(() => {
      var resizeEvent = new Event("resize");
      window.dispatchEvent(resizeEvent);
    }, 1);
  }

  open(file) {
    let inc = 0;
    let int = setInterval(() => {
      inc = inc + 0.01;
      this.gkview.movementModel.setAlt(4 - inc);

      if (inc > 1.1) {
        clearInterval(int);
        this.addPoints(file);
      }
    }, 1);
  }

  close() {
    if (this.list) {
      this.list.drawables.forEach(el => {
        if (el.obj.id === this.points.id) {
          if (el.selection !== undefined) {
            this.calloutManager.removeAllCallouts();
          } else {
            this.calloutManager.removeAllCallouts();
          }
        }
      });
    }

    this.removePoints();
    let inc = 0;
    let int = setInterval(() => {
      inc = inc - 0.01;
      this.gkview.movementModel.setAlt(2.9 - inc);

      if (inc < -1.1) {
        clearInterval(int);
      }
    }, 1);
  }

  reset() {
    this.removePoints();
    this.gkview.movementModel.setAlt(4);
  }

}

export { MyGlobeKit };