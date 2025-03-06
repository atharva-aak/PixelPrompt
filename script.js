const inputText = document.getElementById("input");
const image = document.getElementById("image");
const GenBtn = document.getElementById("btn");
const svg = document.getElementById("svg");
const load = document.getElementById("loading");
const ResetBtn = document.getElementById("reset");
const downloadBtn = document.getElementById("download");

async function generate() {
    load.style.display = "block";

    try {
        const response = await fetch("/api/generateImage", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: inputText.value }),
        });

        if (!response.ok) throw new Error("Image generation failed");

        const objectUrl = URL.createObjectURL(await response.blob());
        image.style.display = "block";
        load.style.display = "none";
        image.src = objectUrl;

        downloadBtn.addEventListener("click", () => download(objectUrl));
    } catch (error) {
        alert("Error generating image. Try again later.");
        console.error(error);
    }
}

GenBtn.addEventListener("click", () => {
    generate();
    svg.style.display = "none";
});

inputText.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        generate();
        svg.style.display = "none";
    }
});

ResetBtn.addEventListener("click", () => {
    inputText.value = "";
    window.location.reload();
});

function download(objectUrl) {
    fetch(objectUrl)
        .then((res) => res.blob())
        .then((file) => {
            let a = document.createElement("a");
            a.href = URL.createObjectURL(file);
            a.download = new Date().getTime();
            a.click();
        })
        .catch(() => alert("Failed to Download"));
}
