export function openPopup() {
    document.getElementById("obs-popup").style.display = "block";
    var close = document.getElementById("obs-close");
    close.onclick = function() {
        document.getElementById("obs-popup").style.display = "none";
    };
}

var color;
var site;
var date;
var type;
var condition; 
var temp;
var depth;

window.addEventListener('coralPointClicked', function (event) {
    var eventData = event.detail;

    color = eventData.color;
    site = eventData.site;
    date = eventData.date;
    type = eventData.type;
    condition = eventData.condition;
    temp = eventData.temp;
    depth = eventData.depth;

    openTab("color")
});


export function openTab(tabName) {
    document.getElementById("data").style.display = "block";
    document.getElementById("content").style.display = "block";

    var tablinks = document.getElementsByClassName("tablinks");

    for (var i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }

    // Activate clicked tab link
    document.getElementById(tabName + "Tab").classList.add("active");

    var contentDiv = document.getElementById("content");
    var dataDiv = document.getElementById("data");
    var coralImageDiv = document.getElementById("coralImage");

    // Hide image div
    coralImageDiv.style.display = "none";

    switch (tabName) {
        case "color":
            contentDiv.textContent = "Use the color key in the top right to determine the range of colors observed. Different species of coral have different colors, not unlike the colors we see in flowers or fruits. Each row on the key represents a different color. For each coral, the observer noted the darkest and lightest part to come up with that specific coral’s color range. The lighter the color, the more bleached the coral. Note that some observations spread across multiple corals of differing color, leading to multiple color ranges. ";
            dataDiv.textContent = color;
            break;
        case "location":
            contentDiv.textContent = "The first information you will see is the location of the data collection. Having a location is important in noting trends across time, so researchers can see how coral in specific sites have changed over time.";
            dataDiv.textContent = site;
            break;
        case "date":
            contentDiv.textContent = "Look at the date to see how corals in different sites differ through the years. Our observations range from 2002-2024.";
            dataDiv.textContent = date;
            break;
        case "type":
            // Show image div
            coralImageDiv.style.display = "block";
            dataDiv.textContent = type;
            switch (type) {
                case "Branching corals":
                    coralImageDiv.innerHTML = '<img src="coral_icons/branch.png" alt="Branching Coral">';
                    contentDiv.textContent = 'These corals are a type of hard corals that are characterized by their secondary branches stemming from a base or trunk (similar to a tree). Branching corals are most commonly found in the Indo-Pacific, and the tips of these corals can be used to differentiate between genera. Source: University of San Diego – Coral Net';
                    break;
                case "Plate corals":
                    coralImageDiv.innerHTML = '<img src="coral_icons/plate.png" alt="Plate Coral">';
                    contentDiv.textContent = 'These corals are a type of hard corals that are characterized by their broad, flat shape. Plate corals are found around the world and have adapted to living in deeper water by spreading out their skeleton to reach more sunlight. The best way to differentiate between plating coral genera is to look at their polyps. Source: Reef Builders';
                    break;
                case "Boulder corals":
                    coralImageDiv.innerHTML = '<img src="coral_icons/boulder.png" alt="Boulder Coral">';
                    contentDiv.textContent = 'These corals are a type of hard corals that are also known as massive corals. They are characterized by their broad, round shape. They are dense and solid and found around the world. Patterns, shape, and polyps are useful when differentiating between boulder coral genera. Source: Smithsonian Institute';
                    break;
                case "Soft corals":
                    coralImageDiv.innerHTML = '<img src="coral_icons/soft.png" alt="Soft Coral">';
                    contentDiv.textContent = 'Soft corals, unlike hard corals, do not have a stony skeleton. They are not reef-building corals, but are present in reefs around the world. They are often characterized as resembling grass, fans, or whips. Source: NOAA';
                    break;
                default:
                    break;
            }
            break;
        case "conditions":
            contentDiv.innerHTML = `
            <ul>
                <li>Light conditions: This observation corresponds to the type of lighting present at the time of observation. It is important to include light conditions, as this can impact color perception.</li>
                <li>Water temperature: This observation was recorded in degrees Celsius at the time of observation. Water temperature can directly impact coral bleaching and is an important variable to consider when looking at bleaching trends.</li>
                <li>Depth: Different ways of observing corals limit how deep one can observe. For example, a snorkeler may be limited to only a couple meters, whereas a scuba diver can reach depths of 20 meters.</li>
            </ul>
            `;
            dataDiv.innerHTML = "Light Conditions: " + condition + "<br>Water Temperature: " + temp + "°C<br>Depth: " + depth + "m";
            break;
        default:
            contentDiv.textContent = "N/A";
            dataDiv.textContent = "";
            break;
    }
}


var tabButtons = document.getElementsByClassName("tablinks");
for (var i = 0; i < tabButtons.length; i++) {
    tabButtons[i].addEventListener("click", function(event) {
        var tabName = this.getAttribute("id").replace("Tab", "");
        openTab(tabName);
    });
}


