export function showObservation() {
    // Create the observation popup dynamically
    var observationPopup = document.createElement('div');
    observationPopup.className = 'observation-popup';
    
    var observationContent = document.createElement('div');
    observationContent.className = 'observation-content';
    
    var closeBtn = document.createElement('span');
    closeBtn.className = 'close-btn';
    closeBtn.textContent = 'x';
    closeBtn.onclick = function() {
        closePopup();
    };
    
    var observationTitle = document.createElement('h2');
    observationTitle.textContent = 'Observation Details';
    
    var tabsContainer = document.createElement('div');
    tabsContainer.className = 'tabs-container';
    
    var colorTab = document.createElement('div');
    colorTab.className = 'tab';
    colorTab.textContent = 'Color';
    colorTab.onclick = function() {
        setActiveTab('color');
    };
    
    var locationTab = document.createElement('div');
    locationTab.className = 'tab';
    locationTab.textContent = 'Location';
    locationTab.onclick = function() {
        setActiveTab('location');
    };

    
    var dateTab = document.createElement('div');
    dateTab.className = 'tab';
    dateTab.textContent = 'Date';
    dateTab.onclick = function() {
        setActiveTab('date');
    };

    var coralTab = document.createElement('div');
    coralTab.className = 'tab';
    coralTab.textContent = 'Coral Type';
    coralTab.onclick = function() {
        setActiveTab('coral');
    };

    var conditionsTab = document.createElement('div');
    conditionsTab.className = 'tab';
    conditionsTab.textContent = 'Conditions';
    conditionsTab.onclick = function() {
        setActiveTab('conditions');
    };

    var contentContainer = document.createElement('div');
    contentContainer.className = 'content-container';

    var colorData = document.createElement('div');
    colorData.className = 'tab-data';
    colorData.textContent = 'Coral Color Range: '
    colorData.dataset.tab = 'color';

    var colorContent = document.createElement('div');
    colorContent.className = 'tab-content';
    colorContent.textContent = 'In the top right corner you will see a color key that denotes what letter and number combination corresponds to which color of the coral. Different species of coral have different colors, not unlike the colors we see in flowers or fruits. For each coral observed, the person recording looked at the darkest and lightest part of the coral to come up with that specific coral’s color range. If an observation reported a coral range of C2-C6 this means the lightest part of that coral was closest to the light pink coloring of C2, and the darkest part of that coral was closest to the C6 coloring, which is a dark red. The lighter the color, the more bleached the coral.';
    colorContent.dataset.tab = 'color'; 

    var locationData = document.createElement('div');
    locationData.className = 'tab-data';
    locationData.textContent = 'Observation Location: ';
    locationData.dataset.tab = 'location';

    var locationContent = document.createElement('div');
    locationContent.className = 'tab-content';
    locationContent.textContent = 'The first information you will see is the location of the data collection. Having a location is important in noting trends across time, so researchers can see how coral in specific sites have changed over time.';
    locationContent.dataset.tab = 'location'; 

    var dateData = document.createElement('div');
    dateData.className = 'tab-data';
    dateData.textContent = 'Observation Date: ';
    dateData.dataset.tab = 'date';

    var dateContent = document.createElement('div');
    dateContent.className = 'tab-content';
    dateContent.textContent = 'Look at the date to see how corals in different sites differ through the years. Our observations range from 2002-2024. ';
    dateContent.dataset.tab = 'date'; 

    var coralData = document.createElement('div');
    coralData.className = 'tab-data';
    coralData.textContent = 'Coral Type: '
    coralData.dataset.tab = 'coral';

    var coralContent = document.createElement('div');
    coralContent.className = 'tab-content';
    coralContent.innerHTML = `
    <ul>
        <li>
            Branching corals: These corals are a type of hard corals that are characterized by their secondary branches stemming from a base or trunk (similar to a tree). Branching corals are most commonly found in the Indo-Pacific, and the tips of these corals can be used to differentiate between genera. <em>Source: University of San Diego – Coral Net</em>
        </li>
        <li>
            Plate corals: These corals are a type of hard corals that are characterized by their broad, flat shape. Plate corals are found around the world and have adapted to living in deeper water by spreading out their skeleton to reach more sunlight. The best way to differentiate between plating coral genera is to look at their polyps. <em>Source: Reef Builders</em>
        </li>
        <li>
            Boulder corals: These corals are a type of hard corals that are also known as massive corals. They are characterized by their broad, round shape. They are dense and solid and found around the world. Patterns, shape, and polyps are useful when differentiating between boulder coral genera. <em>Source: Smithsonian Institute</em>
        </li>
        <li>
            Soft corals: Soft corals, unlike hard corals, do not have a stony skeleton. They are not reef-building corals, but are present in reefs around the world. They are often characterized as resembling grass, fans, or whips. <em>Source: NOAA</em>
        </li>
    </ul>
`;    coralContent.dataset.tab = 'coral'; 

    var lightData = document.createElement('div');
    lightData.className = 'tab-data';
    lightData.textContent = 'Light conditions: '
    lightData.dataset.tab = 'conditions';

    var waterData = document.createElement('div');
    waterData.className = 'tab-data';
    waterData.textContent = 'Water temperature: '
    waterData.dataset.tab = 'conditions';

    var depthData = document.createElement('div');
    depthData.className = 'tab-data';
    depthData.textContent = 'Depth: '
    depthData.dataset.tab = 'conditions';

    var conditionsContent = document.createElement('div');
    conditionsContent.className = 'tab-content';
    conditionsContent.innerHTML = `
    <ul>
        <li>Light conditions: This observation corresponds to the type of lighting present at the time of observation. It is important to include light conditions, as this can impact color perception.</li>
        <li>Water temperature: This observation was recorded in degrees Celsius at the time of observation. Water temperature can directly impact coral bleaching and is an important variable to consider when looking at bleaching trends.</li>
        <li>Depth: Different ways of observing corals limit how deep one can observe. For example, a snorkeler may be limited to only a couple meters, whereas a scuba diver can reach depths of 20 meters.</li>
    </ul>
    `;

    conditionsContent.dataset.tab = 'conditions'; 
    
    // Append elements to build the observation popup
    tabsContainer.appendChild(colorTab);
    tabsContainer.appendChild(locationTab);
    tabsContainer.appendChild(dateTab);
    tabsContainer.appendChild(coralTab);
    tabsContainer.appendChild(conditionsTab);
    
    contentContainer.appendChild(colorData);
    contentContainer.appendChild(colorContent);
    contentContainer.appendChild(locationData);
    contentContainer.appendChild(locationContent);
    contentContainer.appendChild(dateData);
    contentContainer.appendChild(dateContent);
    contentContainer.appendChild(coralData);
    contentContainer.appendChild(coralContent);
    contentContainer.appendChild(lightData);
    contentContainer.appendChild(waterData);
    contentContainer.appendChild(depthData);
    contentContainer.appendChild(conditionsContent);
    
    observationContent.appendChild(closeBtn);
    observationContent.appendChild(observationTitle);
    observationContent.appendChild(tabsContainer);
    observationContent.appendChild(contentContainer);
    
    observationPopup.appendChild(observationContent);
    document.body.appendChild(observationPopup);
}

function setActiveTab(tabName) {
    // Hide content of all tabs
    var allContents = document.querySelectorAll('.tab-content, .tab-data');
    allContents.forEach(function(content) {
        content.style.display = 'none';
    });
    
    var allData = document.querySelectorAll(`.tab-content[data-tab='${tabName}'], .tab-data[data-tab='${tabName}']`);
    allData.forEach(function(data) {
        if (data) {
            data.style.display = 'block';
        }
    });
    var content = document.querySelector(`.tab-content[data-tab='${tabName}']`);
    content.style.display = 'block';
    

}


function closePopup() {
    var popupContainer = document.querySelector('.observation-popup');
    if (popupContainer) {
        document.body.removeChild(popupContainer);
    }
}
