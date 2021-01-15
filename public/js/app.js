var spinnerContainer = document.querySelector('.spinner-container');
spinnerContainer.style.display = 'block';

var generateBtn = document.querySelector('#generateBtn');

var theImage = document.querySelector('#image');
theImage.style.display = 'none';

$('#generateBtn').tooltip();

window.onload = function () {
  generateBtn.style.display = 'block';
  spinnerContainer.style.display = 'none';
  spinnerContainer.style.height = '0';
  spinnerContainer.style.visibility = 'hidden';
  spinnerContainer.style.opacity = '0';
  theImage.style.display = 'block';
};

generateBtn.addEventListener('click', function () {
  fadeOut(this);
  extractColorPalette();
  $('#generateBtn').tooltip('dispose');
  copyToClipboard();
});

// Extract color palette from image
function extractColorPalette() {
  var colorThief = new ColorThief();
  var colorsToExtract = 20; // Change colorsToExtract to any number to get the number of colors you need. (maximum is 20)
  var colors = colorThief.getPalette(theImage, colorsToExtract);
  colors.forEach(function (color) {
    var r = color[0];
    var g = color[1];
    var b = color[2];
    var rgbColor = 'rgb(' + r + ',' + g + ',' + b + ')';
    // Convert R G B channels to hex codes
    var hexR = Number(r).toString(16).toUpperCase();
    var hexG = Number(g).toString(16).toUpperCase();
    var hexB = Number(b).toString(16).toUpperCase();
    // Checking if a hex code length is less than 2 and add a 0
    hexR.length < 2 ? (hexR = hexR.padStart(2, '0')) : hexR;
    hexG.length < 2 ? (hexG = hexG.padStart(2, '0')) : hexG;
    hexB.length < 2 ? (hexB = hexB.padStart(2, '0')) : hexB;
    var hexColor = '#' + hexR + hexG + hexB;

    // Create a div to preview the colors
    var newElement = document.createElement('div');
    newElement.className =
      'd-flex flex-wrap justify-content-center align-items-center previewColor';
    newElement.style.backgroundColor = rgbColor;
    var wrapperDiv = document.querySelector('#wrapper');
    wrapperDiv.appendChild(newElement);
    wrapperDiv.classList.add('animated', 'pulse');

    // Checking if the color is light or dark
    isLightOrDark(r, b, g) >= 127.5
      ? (newElement.innerHTML =
          '<span class="rgbColor color d-block w-100 text-black">' +
          rgbColor +
          '</span> <span class="hexColor color d-block w-100 text-black">' +
          hexColor +
          '</span>')
      : (newElement.innerHTML =
          '<span class="rgbColor color d-block w-100 text-white">' +
          rgbColor +
          '</span> <span class="hexColor color d-block w-100 text-white">' +
          hexColor +
          '</span>');
    document.querySelector('.instruction').style.opacity = '1';
  });
}

// Check if color is light or dark function
function isLightOrDark(r, g, b) {
  return Math.round(Math.sqrt(r * r * 0.299 + g * g * 0.587 + b * b * 0.114));
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
      var toast = $('.toast');
      toast.toast('show');
    });
  });
}

// Fade out function
function fadeOut(el) {
  el.style.WebkitTransition = 'visibility .6s, opacity .6s';
  el.style.opacity = '0';
  el.style.visibility = 'hidden';
}
