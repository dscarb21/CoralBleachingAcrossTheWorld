import { showObservation } from './observation-popup.js';
import { showWelcome } from './welcome-popup.js';

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
                "circle-color": "green",
                "circle-stroke-color": "white",
                "circle-blur": ["interpolate", ["linear"], ["zoom"], 1, 1, 3, 0],
                "circle-stroke-width": ["interpolate", ["linear"], ["zoom"], 4, 0, 7, 1],
                "circle-radius": ["interpolate", ["linear"], ["zoom"], 1.5, 9, 15, 3],
            }
        },
        "waterway-label"
    );
}

function updateMapData(value) {
    console.log("Year: " + value);
    if (value != 2025) {
        map.setFilter('coral-point', ["==", ['to-number', ['get','year']], value]);
    } else {
        map.setFilter("coral-point", true)
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
            color: row["Average color"],
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
        showObservation();

        const coordinates = e.features[0].geometry.coordinates.slice();
        const p = e.features[0].properties;
        const date = p.date.split("T")[0];
        var color = p.lightest;
        if (p.lightest != p.darkest) {
            color += ' - ' + p.darkest;
        }
        const depth = 'Depth: ' + p.depth + ' m';
        const cond = 'Light condition: ' + p.condition;
        const temp = 'Water temperature: ' + p.temp + 'ºC';
        const group = 'Collected by ' + p.group;

        // Set color data in colorContent container
        document.querySelector('.tab-data[data-tab="color"]').textContent += color;
        document.querySelector('.tab-data[data-tab="location"]').textContent += p.site;
        document.querySelector('.tab-data[data-tab="date"]').textContent += date;
        document.querySelector('.tab-data[data-tab="coral"]').textContent += p.type;
    });
    
    // Change cursor style on hover
    map.on('mouseenter', 'coral-point', () => {
        map.getCanvas().style.cursor = 'pointer';
    });
    map.on('mouseleave', 'coral-point', () => {
        map.getCanvas().style.cursor = '';
    });
}

// Use Papa.parse to parse csv into readable array. Seems efficient enough, maybe another library is better?
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
