document.addEventListener("DOMContentLoaded", () => {
    const fontSelector = document.getElementById("font-selector");
    const fontUpload = document.getElementById("font-upload");
    const editableText = document.getElementById("editable-text");
    const downloadBtn = document.getElementById("download-btn");
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");
    const templateImage = document.getElementById("template-image");
    const fontSizeSlider = document.getElementById("font-size-slider");

    const templates = ["images/template1.png", "images/template2.png", "images/template3.png", "images/template4.png", "images/template5.png"];
    let currentTemplateIndex = 0;

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

    // Download button functionality
    downloadBtn.addEventListener("click", () => {
        html2canvas(document.querySelector(".panel"), {
            backgroundColor: null,  // No background
            width: 640,  // Retaining 640px width (original resolution)
            height: 320, // Retaining 320px height (original resolution)
            allowTaint: true,  // Allow images to be tainted
            useCORS: true,  // Handle cross-origin issues
        }).then((canvas) => {
            const link = document.createElement("a");
            link.href = canvas.toDataURL("image/png");
            link.download = "parti_panel.png";  // Keep original quality
            link.click();
        });
    });
});
