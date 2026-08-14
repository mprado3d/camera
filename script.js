const camera = document.getElementById("camera");
const startButton = document.getElementById("startCamera");
const captureButton = document.getElementById("captureButton");

let cameraStream = null;

// Figma - Loading Avatar
const FIGMA_URL =
  "https://www.figma.com/proto/PKmXC8DJImXJUCg3TkTkRD/Turn-Me-Into-a-Netflix-Show?node-id=29-80&t=Vp4isEqp0TTz8fbj-0&scaling=scale-down&content-scaling=fixed&page-id=0%3A1";

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

  // Prevent double tap
  captureButton.disabled = true;

  // Create camera flash
  const flash = document.createElement("div");

  flash.style.position = "fixed";
  flash.style.inset = "0";
  flash.style.background = "white";
  flash.style.zIndex = "9999";
  flash.style.opacity = "1";
  flash.style.transition = "opacity 250ms ease";

  document.body.appendChild(flash);

  captureButton.style.display = "none";

  // Stop camera
  if (cameraStream) {

    cameraStream.getTracks().forEach(track => {
      track.stop();
    });

    cameraStream = null;
  }

  camera.srcObject = null;

  // Fade flash
  setTimeout(() => {
    flash.style.opacity = "0";
  }, 100);

  // Go directly to Figma Loading Avatar
  setTimeout(() => {
    window.location.href = FIGMA_URL;
  }, 400);

});
