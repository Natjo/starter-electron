export default (el => {
  const btn = el.querySelector("button");
  const video = el.querySelector("video");

  btn.onclick = () => {
    if (video.requestFullscreen) video.requestFullscreen();else if (video.webkitRequestFullscreen) video.webkitRequestFullscreen();else if (video.msRequestFullScreen) video.msRequestFullScreen();
  };

  video.addEventListener("fullscreenchange", event => {
    if (document.fullscreenElement) {
      video.play();
    } else {
      video.pause();
      video.currentTime = 0;
    }
  });
});