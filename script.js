const searchForm = document.getElementById('search-form');
const locationInput = document.getElementById('location');
const priceRangeInput = document.getElementById('price-range');
const amenitiesInput = document.getElementById('amenities');
const mapContainer = document.getElementById('map-container');
let map;


searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = locationInput.value;
    const priceRange = priceRangeInput.value;
    const amenities = amenitiesInput.value;


    fetch('/api/properties', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            location,
            priceRange,
            amenities
        })
    })
    .then((response) => response.json())
    .then((data) => {
        
        displayProperties(data);
    })
    .catch((error) => console.error(error));
});

function displayProperties(properties) {
    
    map = new google.maps.Map(mapContainer, {
        center: { lat: 37.7749, lng: -122.4194 },
        zoom: 12
    });

    properties.forEach((property) => {
        const marker = new google.maps.Marker({
            position: { lat: property.lat, lng: property.lng },
            map:
