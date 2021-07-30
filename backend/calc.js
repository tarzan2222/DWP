// based on Haversine formula: https://en.wikipedia.org/wiki/Haversine_formula

const LondonLatitude = 51.5074; //from Google seach
const LondonLongitude = 0.1278;

module.exports = {
  calcDistance: function (lat1, lon1) {
    lat1 = parseFloat (lat1);
    lon1 = parseFloat (lon1);
    var earthRadius = 3960; // in miles
    var distanceLat = deg2rad(LondonLatitude - lat1); // deg2rad below
    var distanceLon = deg2rad(LondonLongitude - lon1);
    var a =
      Math.sin(distanceLat / 2) * Math.sin(distanceLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(LondonLatitude)) *
        Math.sin(distanceLon / 2) *
        Math.sin(distanceLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var distance = earthRadius * c; // Distance in miles
    return distance;
  }
};

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}