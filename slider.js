import { updateMapData } from './map.js';
var slider = document.getElementById("mySlider");
var sliderValueText = document.getElementById("sliderValueText");
var timeout;
console.log(slider);

slider.addEventListener("input", function() {
    clearTimeout(timeout);
    timeout = setTimeout(function() {
        var sliderValue = parseInt(slider.value);
        updateMapData(sliderValue);
        // slider will update if the year is "selected" for more than 350 milliseconds. Gets rid of cycling through displaying all years
        // if user "jumps" to a specific year on slider.
    }, 350);
    sliderValueText.textContent = (slider.value === "2025" ? "All" : slider.value);
});