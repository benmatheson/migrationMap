
const migFiltered = mig.filter(d=>!(d.to).includes('Outside'))
mapboxgl.accessToken =
  "pk.eyJ1IjoiYmVubWF0aGVzb24iLCJhIjoiY2lmZDhyZXVxNTI5eHNtbHgyOTYwbHJtMyJ9.Ch8JQXvunpUrv6tGpeJMCA";


console.log('helpme');


// 
var centroids = "./data/centroidsEdit.geojson";


var map = new mapboxgl.Map({
    container: 'map',
      style: "mapbox://styles/mapbox/dark-v9",
  // style: 'mapbox://styles/benmatheson/cjhcx9p8f1gmp2srs3jzhgcu3',
  // style: 'mapbox://styles/benmatheson/cjhcu2hpg1bhd2spnlx6sdxeo',
  // style: 'mapbox://styles/benmatheson/cjhebfhpm2se32rozggixu3np',

  pitch: 0,

  transition: {
    duration: 100,
    delay: 0
  },
  // style: 'mapbox://styles/benmatheson/cjh2yaf301jjm2sru7r1uz7n7',

  center: [-95, 15],
  zoom: 4.2
});





map.on("load", function() {
  
  map.addSource("centroids", {
    type: "geojson",
    // data: 'https://rawgit.com/benmatheson/2011_test/master/ras_ak_red.geojson'
    data: centroids
  });

  map.addLayer({
    id: "ct",
    type: "circle",
    source: "centroids",

    paint: {
      "circle-color":" rgba(225, 237, 0, .5)",
      "circle-radius":7
    }
  });

});


  map.on("mouseenter", "ct", function(e) {
    // Change the cursor style as a UI indicator.


const layers = map.getStyle().layers; 

const last = layers[layers.length-1]
console.log(last);


if (last.id=="monster_id") {

map.removeLayer('monster_id');
map.removeSource('monster_id');

}








    map.getCanvas().style.cursor = "pointer";

    // console.log(e.features[0].geometry.coordinates);
    // var coordinates = e.features[0].geometry.coordinates[0][0].slice();
    var mouse = e.lngLat;

    var metArea =
      e.features[0].properties.NAME;


      console.log('metArea');
      console.log(metArea);


console.log("e.lng");
console.log(e.lngLat);

const dests= migFiltered.filter(d=>d.from==metArea);
console.log("dests")
console.log(dests);


const destArray = dests.map(function(d){

if (centroidsLocation.filter(r=> r.NAME ==d.to)!= null)

{




const loc = centroidsLocation.filter(r=> r.NAME ==d.to);
console.log("loc");
console.log(loc);

const lat =loc[0].lat;
const lon = loc[0].lon;

return {origin: d.from, destination: d.to, lat:lat, lon:lon }

}


return {origin: d.from, destination: "dest", lat:0, lon:0 }


})



console.log("destArray");
console.log(destArray);

const locationArr = centroidsLocation.filter(d=>d.NAME ==metArea);
const monsterArr=[];

destArray.forEach(function (d){
  monsterArr.push([d.lon, d.lat], 
            [ e.lngLat.lng, e.lngLat.lat])
               

});

console.log("da monster")
console.log(monsterArr);

	map.addLayer({
        "id": "monster_id",
        "type": "line",
        "source": {
            "type": "geojson",
            "data": {
                "type": "Feature",
                "properties": {},
                "geometry": {
                    "type": "LineString",
                    "coordinates": monsterArr


                  
                }
            }
        },
        "layout": {
            "line-join": "round",
            "line-cap": "round"
        },
        "paint": {
            // "line-color": "rgba(187, 54, 254, .1)",
            "line-color": "rgba(250,250,250, .1)",
            "line-width": 4
        }
 


}) //closes addlayer

 //closes forEach;

}) //closes event;


// map.on("mouseout", "ct", function(e) {


// console.log("MOUSOUT");

// // const locationArr = centroidsLocation.filter(d=>d.NAME ==metArea1);
// console.log("map.getStyle().layers"); 

// console.log(map.getStyle().layers); 
// const layers = map.getStyle().layers; 




// const last = layers[layers.length-1]
// console.log(last);


// if (last.id=="monster_id") {

// map.removeLayer('monster_id');

// }
// }) //closes mouseexit
