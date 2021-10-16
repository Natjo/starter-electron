function preload(func) {
  let inc = 0;
  const percent = document.querySelector('.percent');
  const gauge = percent.querySelector('.gauge');

  function preloadImg(src) {
    let img = new Image();

    img.onload = function () {
      if (imgs.length - 1 == inc) func();
      inc++;
      gauge.style.width = `${inc * 100 / imgs.length}%`;
    };

    img.src = src;
  }

  const imgs = ['assets/img/worldmap.jpg', 'assets/img/worldmap.jpg', 'assets/img/backgrounds/bgnav.png', 'assets/img/backgrounds/bg-hub.png', 'assets/img/hub/lng_gas/market.jpg', 'assets/img/hub/lng_gas/offer-1.jpg', 'assets/img/hub/lng_gas/offer-2.jpg', 'assets/img/hub/lng_gas/offer-3.jpg', 'assets/img/hub/lng_gas/global_leader_in_gaz_plant_design_and_construction/bg-0.jpg', 'assets/img/hub/lng_gas/global_leader_in_gaz_plant_design_and_construction/bg-1.jpg', 'assets/img/hub/lng_gas/global_leader_in_gaz_plant_design_and_construction/bg-2.jpg', 'assets/img/hub/lng_gas/global_leader_in_gaz_plant_design_and_construction/bg-3.jpg', 'assets/img/hub/lng_gas/global_leader_in_gaz_plant_design_and_construction/bg-4.jpg', 'assets/img/hub/lng_gas/global_leader_in_gaz_plant_design_and_construction/posterframe.jpg', 'assets/img/hub/lng_gas/global_leader_in_gaz_plant_design_and_construction/projet-0.jpg', 'assets/img/hub/lng_gas/global_leader_in_gaz_plant_design_and_construction/projet-1.jpg', 'assets/img/hub/lng_gas/global_leader_in_gaz_plant_design_and_construction/projet-2.jpg', 'assets/img/hub/lng_gas/global_leader_in_gaz_plant_design_and_construction/projet-3.jpg', 'assets/img/hub/lng_gas/global_leader_in_gaz_plant_design_and_construction/projet-4.jpg', 'assets/img/hub/lng_gas/global_leader_in_gaz_plant_design_and_construction/img-0.jpg', 'assets/img/hub/lng_gas/global_leader_in_gaz_plant_design_and_construction/img-1.jpg', 'assets/img/hub/lng_gas/global_leader_in_gaz_plant_design_and_construction/citation-0.jpg', 'assets/img/hub/lng_gas/global_leader_in_gaz_plant_design_and_construction/citation-1.jpg', 'assets/img/hub/hydrogen/market.jpg', 'assets/img/hub/hydrogen/offer-1.jpg', 'assets/img/hub/hydrogen/offer-2.jpg', 'assets/img/hub/hydrogen/offer-3.jpg', 'assets/img/hub/ethylene/market.jpg'];

  for (let img of imgs) {
    preloadImg(img);
  }
}

export default preload;