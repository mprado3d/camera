const camera = document.getElementById("camera");
const startButton = document.getElementById("startCamera");
const captureButton = document.getElementById("captureButton");

let cameraStream = null;

startButton.addEventListener("click", async () => {

  try {

    cameraStream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: "user"
      },
      audio: false
    });

    camera.srcObject = cameraStream;

    startButton.style.display = "none";
    captureButton.style.display = "block";

  } catch (error) {

    alert("Could not access camera.");
    console.error(error);

  }

});


captureButton.addEventListener("click", () => {

  // Camera flash
  const flash = document.createElement("div");

  flash.style.position = "fixed";
  flash.style.inset = "0";
  flash.style.background = "white";
  flash.style.zIndex = "9999";
  flash.style.opacity = "1";
  flash.style.transition = "opacity 250ms ease";

  document.body.appendChild(flash);

  // Hide shutter button
  captureButton.style.display = "none";

  // Stop camera
  if (cameraStream) {

    cameraStream.getTracks().forEach(track => {
      track.stop();
    });

  }

  // Fade flash
  setTimeout(() => {

    flash.style.opacity = "0";

  }, 100);

  // Remove flash
  setTimeout(() => {

    flash.remove();

  }, 400);

});
