document.addEventListener('DOMContentLoaded', () => {
  const panelContainer = document.getElementById('design-panel');
  const editableText = document.getElementById('editable-text');
  const fontSelector = document.getElementById('font-selector');
  const fontSizeSlider = document.getElementById('font-size-slider');
  const uploadFontButton = document.getElementById('upload-font-button');
  const fontUploadInput = document.getElementById('font-upload');
  const downloadButton = document.getElementById('download-panel');
  const prevTemplateButton = document.getElementById('prev-template');
  const nextTemplateButton = document.getElementById('next-template');

  // Template management
  const templates = [
    'images/template1.png',
    'images/template2.png'
	'images/template3.png'
	'images/template4.png'
    // Add more template paths as needed
  ];
  let currentTemplateIndex = 0;

  function updateTemplate(direction) {
    currentTemplateIndex = (currentTemplateIndex + direction + templates.length) % templates.length;
    panelContainer.style.backgroundImage = `url(${templates[currentTemplateIndex]})`;
  }

  prevTemplateButton.addEventListener('click', () => updateTemplate(-1));
  nextTemplateButton.addEventListener('click', () => updateTemplate(1));

  // Initial template load
  panelContainer.style.backgroundImage = `url(${templates[currentTemplateIndex]})`;

  // Text editing
  editableText.addEventListener('input', () => {
    const fontSize = fontSizeSlider.value;
    editableText.style.fontSize = `${fontSize}px`;
  });

  // Font selection
  fontSelector.addEventListener('change', (e) => {
    const selectedFont = e.target.value;
    editableText.style.fontFamily = `"${selectedFont}", sans-serif`;
  });

  // Font size slider
  fontSizeSlider.addEventListener('input', (e) => {
    const fontSize = e.target.value;
    editableText.style.fontSize = `${fontSize}px`;
  });

  // Custom font upload
  uploadFontButton.addEventListener('click', () => {
    fontUploadInput.click();
  });

  fontUploadInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const fontName = file.name.replace(/\.[^/.]+$/, "");
        const fontFace = new FontFace(fontName, `url(${event.target.result})`);
        
        fontFace.load().then((loadedFace) => {
          document.fonts.add(loadedFace);
          
          const customFontGroup = document.getElementById('custom-fonts-group');
          const newOption = document.createElement('option');
          newOption.value = fontName;
          newOption.textContent = fontName;
          customFontGroup.appendChild(newOption);
          
          // Optionally, set the newly uploaded font as selected
          fontSelector.value = fontName;
          editableText.style.fontFamily = `"${fontName}", sans-serif`;
        }).catch(error => {
          console.error('Font loading failed:', error);
          alert('Failed to upload font. Please ensure it is a valid font file.');
        });
      };
      reader.readAsDataURL(file);
    }
  });

  // Download panel as image
  downloadButton.addEventListener('click', () => {
    html2canvas(panelContainer).then(canvas => {
      const link = document.createElement('a');
      link.download = 'design-panel.png';
      link.href = canvas.toDataURL();
      link.click();
    });
  });

  // Add html2canvas library dynamically for download functionality
  const script = document.createElement('script');
  script.src = 'https://html2canvas.hertzen.com/dist/html2canvas.min.js';
  document.body.appendChild(script);
});
