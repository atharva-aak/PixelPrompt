const key = "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";
const inputText = document.getElementById("input");
const image = document.getElementById("image");
const GenBtn = document.getElementById("btn");

async function query(data) {
	const response = await fetch(
		"https://api-inference.huggingface.co/models/ZB-Tech/Text-to-Image",
		{
			headers: {
				Authorization: `Bearer ${key}`
			},
			method: "POST",
			body: JSON.stringify({"inputs": inputText.value}),
		}
	);
	const result = await response.blob();
	return result;
}

async function generate() {

    query().then((response) => {

        const objectUrl = URL.createObjectURL(response);
        image.src = objectUrl;

    });
    
}

GenBtn.addEventListener("click", () =>{
    generate();
});

inputText.addEventListener("keydown", (e) =>{
    if(e.key == "Enter")
    {
        generate();
    }
})
