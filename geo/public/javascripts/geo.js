var Geo = { };

Geo.getLoc = function (cb) {
    function error (msg) {
        alert('Error using geolocation: ' + msg);
    }

    navigator.geolocation.getCurrentPosition(cb, error);
};