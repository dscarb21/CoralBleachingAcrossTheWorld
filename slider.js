import { updateMapData } from './map.js';
var slider = document.getElementById("mySlider");
var sliderValueText = document.getElementById("sliderValueText");
let radioVals = document.querySelectorAll('input[name="filter"]');
var timeout;

slider.addEventListener("input", function() {
    clearTimeout(timeout);
    timeout = setTimeout(function() {
        var sliderValue = parseInt(slider.value);
        let currRadio = document.querySelector('input[name="filter"]:checked');
        updateMapData(sliderValue, currRadio.value);
        // slider will update if the year is "selected" for more than 350 milliseconds. Gets rid of cycling through displaying all years
        // if user "jumps" to a specific year on slider.
    }, 350);
    sliderValueText.textContent = (slider.value === "2025" ? "All" : slider.value);
});

for (let i = 0; i < radioVals.length; i++) {
    radioVals[i].addEventListener("change", function() {
      let val = this.value;
      updateMapData(parseInt(slider.value), val);
    });
};