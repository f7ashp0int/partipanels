document.addEventListener("DOMContentLoaded", () => {
    const fontSelector = document.getElementById("font-selector");
    const fontUpload = document.getElementById("font-upload");
    const editableText = document.getElementById("editable-text");
    const downloadBtn = document.getElementById("download-btn");
    const saveBtn = document.getElementById("save-btn");
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");
    const templateImage = document.getElementById("template-image");
    const fontSizeSlider = document.getElementById("font-size-slider");

    const templates = ["images/template1.png", "images/template2.png", "images/template3.png", "images/template4.png", "images/template5.png"];
    let currentTemplateIndex = 0;
    let finalCanvas = null;

    const fonts = [
        { name: "Alfarn 2", family: "alfarn-2" },
        { name: "Cheee", family: "cheee" },
        { name: "Flegrei", family: "flegrei" },
        { name: "Modak", family: "modak" },
        { name: "Modern Love", family: "modern-love" }
    ];

    // Load the initial template
    const loadTemplate = (index) => {
        templateImage.src = templates[index];
    };
    loadTemplate(currentTemplateIndex);

    // Update text style in real-time
    const updateTextStyle = () => {
        editableText.style.fontFamily = fontSelector.value;
        editableText.style.fontSize = fontSizeSlider.value + 'px';
    };

    // Font upload functionality
    fontUpload.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const newFont = new FontFace(file.name, event.target.result);
                newFont.load().then(() => {
                    document.fonts.add(newFont);
                    const option = document.createElement("option");
                    option.value = newFont.family;
                    option.textContent = newFont.family;
                    fontSelector.appendChild(option);
                });
            };
            reader.readAsDataURL(file);
        }
    });

    // Populate font dropdown
    fonts.forEach((font) => {
        const option = document.createElement("option");
        option.value = font.family;
        option.textContent = font.name;
        fontSelector.appendChild(option);
    });

    // Font change event
    fontSelector.addEventListener("change", updateTextStyle);

    // Font size slider
    fontSizeSlider.addEventListener("input", updateTextStyle);

    // Next/Previous template navigation
    prevBtn.addEventListener("click", () => {
        currentTemplateIndex = (currentTemplateIndex === 0) ? templates.length - 1 : currentTemplateIndex - 1;
        loadTemplate(currentTemplateIndex);
    });

    nextBtn.addEventListener("click", () => {
        currentTemplateIndex = (currentTemplateIndex === templates.length - 1) ? 0 : currentTemplateIndex + 1;
        loadTemplate(currentTemplateIndex);
    });

    // Save button functionality: Update the panel with the selected background and text
    saveBtn.addEventListener("click", () => {
        const panel = document.querySelector(".panel");
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        // Set canvas dimensions to match the panel size
        canvas.width = panel.offsetWidth;
        canvas.height = panel.offsetHeight;

        // Draw the template image
        const img = new Image();
        img.onload = function() {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            // Draw the text on top of the image
            ctx.font = `${fontSizeSlider.value}px ${fontSelector.value}`;
            ctx.fillStyle = "#ffffff"; // White text color
            ctx.fillText(editableText.innerText, 50, 50); // Adjust text position if needed

            // Set the final image as the new template in the panel
            finalCanvas = canvas;
            const finalImage = new Image();
            finalImage.src = canvas.toDataURL("image/png");
            templateImage.src = finalImage.src;
        };
        img.src = templates[currentTemplateIndex];
    });

    // Download button functionality
    downloadBtn.addEventListener("click", () => {
        if (finalCanvas) {
            const link = document.createElement("a");
            link.href = finalCanvas.toDataURL("image/png");
            link.download = "parti_panel_final.png";
            link.click();
        } else {
            alert("Please save the image first!");
        }
    });
});
