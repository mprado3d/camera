const camera = document.getElementById("camera");
const startButton = document.getElementById("startCamera");
const captureButton = document.getElementById("captureButton");

let cameraStream = null;

startButton.addEventListener("click", async () => {

  try {

    cameraStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false
    });

    camera.srcObject = cameraStream;

    startButton.style.display = "none";
    captureButton.style.display = "block";

  } catch (error) {

    console.error("Camera error:", error);

    alert(
      "Could not start camera.\n\n" +
      error.name + ": " + error.message
    );

  }

});


captureButton.addEventListener("click", () => {

  const flash = document.createElement("div");

  flash.style.position = "fixed";
  flash.style.inset = "0";
  flash.style.background = "white";
  flash.style.zIndex = "9999";
  flash.style.opacity = "1";
  flash.style.transition = "opacity 250ms ease";

  document.body.appendChild(flash);

  captureButton.style.display = "none";

  if (cameraStream) {

    cameraStream.getTracks().forEach(track => {
      track.stop();
    });

    cameraStream = null;

  }

  camera.srcObject = null;

  setTimeout(() => {
    flash.style.opacity = "0";
  }, 100);

  setTimeout(() => {
    flash.remove();
  }, 400);

});
