mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v12',
    center: listing.geometry.coordinates,
    zoom: 10
});

// Marker + Popup
const marker = new mapboxgl.Marker({ color: 'red' })
    .setLngLat(listing.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({ offset: 25 })
            .setHTML(`<h5>${listing.location}</h5><p>Exact location will be shared after booking</p>`)
    )
    .addTo(map);

// Zoom & Rotate Controls
const nav = new mapboxgl.NavigationControl();
map.addControl(nav, 'top-left');
