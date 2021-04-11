
const video = document.getElementById("video");
const init = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
            width: 400,
            height: 400
        }
    });

    try {
        video.srcObject = stream;
    } catch (err) {
        video.src = window.URL.createObjectURL(stream);
    }
    await faceapi.nets.tinyFaceDetector.load("models/");
}

const onPlay = () => {
    const inputSize = 512;
    const scoreThreshold = 0.5;

    const options = new faceapi.TinyFaceDetectorOptions({
        inputSize,
        scoreThreshold
    })
    setInterval(async () => {
        const result = await faceapi.detectSingleFace(
            video,
            options
        );

        if (result) {
            console.log("result", result)
        }
    }, 500);
}

window.addEventListener('DOMContentLoaded', (_) => {
    init()
});
