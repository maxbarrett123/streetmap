function myFunction() {

  var data = '';

  var map = L.map('map').setView([50.836166, -0.119300], 14);
  if (map.tap) map.tap.disable();
  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
    maxZoom: 16
  }).addTo(map);

  map._layersMinZoom = 10;

  // Add custom overlay
  /*
    var	bounds = new L.LatLngBounds(
      new L.LatLng(50.834166, -0.164660),
      new L.LatLng(50.816169, -0.119300));

    map.fitBounds(bounds);

    var overlay = new L.ImageOverlay("http://ontheworldmap.com/uk/city/brighton/brighton-tourist-attractions-map.jpg", bounds, {
      opacity: 1,
      interactive: true,
      attribution: '&copy; Brighton Council.'
    });

    map.addLayer(overlay);
  */

  // add var "code"
  var code = '1xznOooD52LdoQyFNCD_ZOFAzF9j4eyJAmsTGeNAT9Yw'

  // loop through spreadsheet with Tabletop


  var query = getUrlVars()["id"];

  Tabletop.init({
    key: code,
    callback: function (sheet, tabletop) {

      for (var i in sheet) {
        data = sheet[i];

        if (query.slice(4) === data.id) { // Remove ref from list URLs 
          var icon = L.icon.fontAwesome({
            iconClasses: 'fa ' + data.fonticon, // you _could_ add other icon classes, not tested.
            markerColor: data.markercolor,
            iconColor: data.iconcolor
          });
          /*
          var icon = L.icon({
              iconUrl: data.icon,
              iconSize:     [52, 60], // size of the icon
              iconAnchor:   [26, 60], // point of the icon which will correspond to marker's location
              popupAnchor: [0, -60]
          });
          */
          if (data.iconori === "left") {
            icon = L.icon({
              iconUrl: data.icon,
              iconSize: [60, 52],
              iconAnchor: [60, 26],
              popupAnchor: [-35, -26]
            });
          };
          if (data.iconori === "right") {
            icon = L.icon({
              iconUrl: data.icon,
              iconSize: [60, 52],
              iconAnchor: [0, 26],
              popupAnchor: [35, -26]
            })
          };

          L.Icon.extend({
            options: {
              id: 'ref' + data.id
            }
          });



          //var marker = L.marker(map.unproject([data.latitude, data.longitude], {icon: icon, id:'ref'+data.id}).getCenter().addTo(map);
          var marker = L.marker([data.latitude, data.longitude], {
              icon: icon,
              id: 'ref' + data.id
            })
            .addTo(map)
            .bindPopup("<strong style='color: #84b819'>ref" + data.id + ' ' + data.category + "</strong><br>" +
              data.description + " | " + data.city + "<br>Head: " + data.heading).openPopup();

          //Set class for marker icon
          L.DomUtil.addClass(marker._icon, 'ref' + data.id);
        }
      }
    },
    simpleSheet: true
  })
}










function getUrlVars() {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
    vars[key] = value;
  });
  return vars;
}