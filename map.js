import { showWelcome } from './welcome-popup.js';
import { openPopup } from './observation.js';


mapboxgl.accessToken = 'pk.eyJ1IjoiZHNjYXJiMjEiLCJhIjoiY2x0cnR3cWlqMGtmZzJucDU2eDR2eWpyMCJ9.nfk8bnbhwkUmEHDhKZv3zA';

var map;
var cleanData;

// Set default features, add points layer
async function initializeMap(cleanData) {
    map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/dscarb21/clvnttkga01ir01qrclu4a7z8',
        scrollZoom: true,
        zoom: 1.7,
        minZoom: 1.7,
        center: [115, 0]
    });

    map.on('load', () => {
        addLayers(map, cleanData);
        clickHoverListener(map);
        showWelcome();
    });
}

// Function to add observations layer to the map
function addLayers() {
    map.addSource("observations", {
        type: "geojson",
        data: {
            type: "FeatureCollection",
            features: cleanData.map(rowToFeature)
        }
    });

    map.addLayer(
        {
            id: "coral-point",
            type: "circle",
            source: "observations",
            paint: {
                "circle-color": ['get', 'color'],
                "circle-stroke-color": "white",
                "circle-blur": ["interpolate", ["linear"], ["zoom"], 1, 1, 7, 0],
                "circle-stroke-width": ["interpolate", ["linear"], ["zoom"], 6, 0, 9, 1],
                "circle-opacity": ["interpolate", ["linear"], ["zoom"], 1.5, 0.2, 7, 1],
                "circle-radius": ["interpolate", ["linear"], ["zoom"], 1.5, 13, 15, 3],
            }
        },
        "waterway-label"
    );
}

export function updateMapData(yr, type) {
    console.log("Year: " + yr);
    console.log("Type: " + type);
    if (yr == 2025 && type == "*") {
        map.setFilter("coral-point", true) 
    } else if (yr != 2025 && type == "*") {
        map.setFilter('coral-point', ["==", ['to-number', ['get','year']], yr]);
    } else if (yr == 2025 && type != "*") {
        map.setFilter('coral-point', ["==", ['get','type'], type]);
    } else {
        map.setFilter('coral-point', ["all",
        ["==", ['to-number', ['get','year']], yr],
        ["==", ['get','type'], type]
     ])
    }
}

// CSV row to GeoJSON
function rowToFeature(row) {
    return {
        type: "Feature",
        geometry: {
            type: "Point",
            coordinates: [parseFloat(row.Longitude), parseFloat(row.Latitude)]
        },
        properties: {
            color: row["Calculated average color"],
            colorRange: row["Color Range By Letter"],
            type: row["Coral type"],
            lightest: row["Lightest color code"],
            darkest: row["Darkest color code"],
            site: row["Site name"],
            group: row["Group name"],
            depth: parseFloat(row["Depth (m)"]),
            condition: row["Light condition"],
            temp: parseFloat(row["Water temperature (C)"]),
            date: row["Observation date"],
            year: parseInt(row["Year"]),
            species: row["Species"]
        }
    };
}

// This is called once in code, but map.on continuously checks for updates when the map is loaded, acts as a "Listener"
function clickHoverListener(map) {
    // When a click event occurs on an unclustered point, show a popup
    map.on('click', 'coral-point', (e) => {
        //showObservation();
        openPopup();

        const coordinates = e.features[0].geometry.coordinates.slice();
        const p = e.features[0].properties;
        const date = p.date.split("T")[0];
        var color = p.colorRange.replace(/[\[\]']+/g, '').replace(/-/g, ' - ');


        const eventData = {
            color: color,
            site: p.site,
            date: date,
            type: p.type,
            condition: p.condition,
            temp: p.temp,
            depth: p.depth
        };

        const event = new CustomEvent('coralPointClicked', { detail: eventData });
        window.dispatchEvent(event);
    });
    
    // Change cursor style on hover
    map.on('mouseenter', 'coral-point', () => {
        map.getCanvas().style.cursor = 'pointer';
    });
    map.on('mouseleave', 'coral-point', () => {
        map.getCanvas().style.cursor = '';
    });
}

function parseCsv(csvFile) {
    return new Promise((resolve, reject) => {
        Papa.parse(csvFile, {
            header: true,
            download: true,
            complete: function (results) {
                resolve(results.data);
            },
            error: function (error) {
                reject(error);
            }
        });
    });
}

async function main() {
    try {
        cleanData = await parseCsv("clean_data.csv");
        initializeMap(cleanData);
    } catch (error) {
        console.error("Error parsing CSV:", error);
    }
}

// Execute main function
main();
