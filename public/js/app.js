var spinnerContainer = document.querySelector('.spinner-container');
spinnerContainer.classList.add('d-block');

var theImage = document.getElementById('image');
theImage.classList.add('invisible');

var generateBtn = document.getElementById('generateBtn');
var tooltip = new bootstrap.Tooltip(generateBtn)

var refreshBtn = document.getElementById('refreshBtn');
refreshBtn.addEventListener('click', function () {
  location.reload();
  return false;
});

window.onload = function () {
  generateBtn.classList.remove('d-none');
  generateBtn.classList.add('d-block');
  spinnerContainer.classList.add('d-none');
  spinnerContainer.classList.add('invisible');
  spinnerContainer.style.height = '0';
  spinnerContainer.style.opacity = '0';
  theImage.classList.remove('invisible');
};

generateBtn.addEventListener('click', function () {
  fadeOut(this);
  extractColorPalette();
  tooltip.dispose();
  copyToClipboard();
});

// Extract color palette from image
function extractColorPalette() {
  var colorThief = new ColorThief();
  var colorsToExtract = 16; // Change to any number between 2 and 20
  var palette = colorThief.getPalette(theImage, colorsToExtract);
  palette.forEach(function (color) {
    var r = color[0];
    var g = color[1];
    var b = color[2];
    var rgbColor = 'rgb(' + r + ',' + g + ',' + b + ')';
    // Convert R G B channels to hex codes
    var hexR = r.toString(16).toUpperCase();
    var hexG = g.toString(16).toUpperCase();
    var hexB = b.toString(16).toUpperCase();
    // Checking if a hex code length is less than 2 and add a 0
    hexR.length < 2 ? (hexR = hexR.padStart(2, '0')) : hexR;
    hexG.length < 2 ? (hexG = hexG.padStart(2, '0')) : hexG;
    hexB.length < 2 ? (hexB = hexB.padStart(2, '0')) : hexB;
    var hexColor = '#' + hexR + hexG + hexB;

    // Create a div to preview each color of the palette
    var swatch = document.createElement('div');
    swatch.className =
      'swatch d-inline-flex flex-wrap align-content-center shadow-sm animated pulse';
    swatch.style.backgroundColor = rgbColor;
    var swatches = document.querySelector('#swatches');
    swatches.appendChild(swatch);

    // Checking if the color is light or dark
    isLightOrDark(r, b, g) >= 127.5
      ? (swatch.innerHTML =
          '<span class="rgbColor color d-block w-100 text-black" title="RGB Color">' +
          rgbColor +
          '</span> <span class="hexColor color d-block w-100 text-black" title="HEX Color">' +
          hexColor +
          '</span>')
      : (swatch.innerHTML =
          '<span class="rgbColor color d-block w-100 text-white" title="RGB Color">' +
          rgbColor +
          '</span> <span class="hexColor color d-block w-100 text-white" title="HEX Color">' +
          hexColor +
          '</span>');
    document.querySelector('.instruction').style.opacity = '1';
  });
}

// Check if color is light or dark function
function isLightOrDark(r, g, b) {
  return Math.round(
    Math.sqrt(
      Math.pow(r, 2) * 0.299 + Math.pow(g, 2) * 0.587 + Math.pow(b, 2) * 0.114
    )
  );
}

// Copy color to clipboard
function copyToClipboard() {
  var colors = document.querySelectorAll('.color');
  colors.forEach(function (color) {
    color.addEventListener('click', function (event) {
      var selectedColor = event.target.innerText;
      var aux = document.createElement('input');
      aux.setAttribute('value', selectedColor);
      document.body.appendChild(aux);
      aux.select();
      document.execCommand('copy');
      document.body.removeChild(aux);
      document.querySelector('.toast-text').textContent =
        selectedColor + ' is copied to your clipboard';
      var toastTrigger = document.querySelector('.toast');
      var toast = new bootstrap.Toast(toastTrigger);
      toast.show();
    });
  });
}

// Fade out function
function fadeOut(el) {
  el.style.WebkitTransition = 'visibility .6s, opacity .6s';
  el.style.opacity = '0';
  el.classList.add('invisible');
}
