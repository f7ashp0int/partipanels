document.addEventListener("DOMContentLoaded", () => {
    const fontSelector = document.getElementById("font-selector");
    const fontUpload = document.getElementById("font-upload");
    const editableText = document.getElementById("editable-text");
    const fontSizeSlider = document.getElementById("font-size-slider");
    const downloadBtn = document.getElementById("download-btn");
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");
    const templateImage = document.getElementById("template-image");

    const templates = ["images/template1.png", "images/template2.png", "images/template3.png", "images/template4.png", "images/template5.png"];
    let currentTemplateIndex = 0;

    const loadTemplate = (index) => {
        templateImage.src = templates[index];
    };
    loadTemplate(currentTemplateIndex);

    prevBtn.addEventListener("click", () => {
        currentTemplateIndex = (currentTemplateIndex - 1 + templates.length) % templates.length;
        loadTemplate(currentTemplateIndex);
    });

    nextBtn.addEventListener("click", () => {
        currentTemplateIndex = (currentTemplateIndex + 1) % templates.length;
        loadTemplate(currentTemplateIndex);
    });

    // Load fonts from fonts folder
    const fontFiles = ["Alfarn 2", "Cheee", "Flegrei", "Modak", "Modern Love"];
    fontFiles.forEach((font) => {
        const option = document.createElement("option");
        option.value = font;
        option.textContent = font;
        fontSelector.appendChild(option);
    });

    fontUpload.addEventListener("change", (e) => {
        const fontFile = e.target.files[0];
        if (fontFile) {
            const fontName = fontFile.name.split(".")[0];
            const fontUrl = URL.createObjectURL(fontFile);
            const newFont = new FontFace(fontName, `url(${fontUrl})`);
            newFont.load().then((loadedFont) => {
                document.fonts.add(loadedFont);
                const option = document.createElement("option");
                option.value = fontName;
                option.textContent = fontName;
                fontSelector.appendChild(option);
            });
        }
    });

    fontSelector.addEventListener("change", (e) => {
        editableText.style.fontFamily = e.target.value;
    });

    fontSizeSlider.addEventListener("input", (e) => {
        editableText.style.fontSize = `${e.target.value}px`;
    });

    downloadBtn.addEventListener("click", () => {
        html2canvas(document.querySelector(".panel")).then((canvas) => {
            const link = document.createElement("a");
            link.download = "panel.png";
            link.href = canvas.toDataURL();
            link.click();
        });
    });
});
