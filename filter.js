import { filterCoral } from './map.js';   

let radioVals = document.querySelectorAll('input[name="filter"]');
console.log(radioVals);
for (let i = 0; i < radioVals.length; i++) {
    radioVals[i].addEventListener("change", function() {
      let val = this.value;
      filterCoral(val);
    });
  }