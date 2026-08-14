const camera = document.getElementById("camera");
const startButton = document.getElementById("startCamera");
const captureButton = document.getElementById("captureButton");

startButton.addEventListener("click", async () => {

  try {

    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: "user"
      },
      audio: false
    });

    camera.srcObject = stream;

    startButton.style.display = "none";
    captureButton.style.display = "block";

  } catch (error) {

    alert("Could not access camera.");

    console.error(error);
  }

});
