var input = document.getElementById('direccion');
var radio = 500;
var radioExt = 800;

function cargarMapa() {
    var madrid = {
        lat: 40.4381311,
        lng: -3.8196228
    };

    var map = new google.maps.Map(
        document.getElementById('mapa'), {
            zoom: 10,
            center: madrid,
            mapTypeControl: true,
            fullscreenControl: true,
            mapTypeControlOptions: {
                style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
                position: google.maps.ControlPosition.RIGHT_TOP,

            },
            fullscreenControlOptions: {
                position: google.maps.ControlPosition.LEFT_BOTTOM,
            }
        });
    var marker = new google.maps.Marker({
        map: map
    });
    var searchBox = new google.maps.places.SearchBox(input);
    cajabuscar(map, marker, searchBox);
}







function ConsultaAjax(lat, lng, map) {

    map.setCenter(new google.maps.LatLng(lat, lng));

    var circle = new google.maps.Circle({
        strokeColor: 'green',
        strokeOpacity: 0.1,
        strokeWeight: 1,
        fillColor: '#3ef947',
        fillOpacity: 0.29,
        center: map.getCenter(),
        radius: radio,
        map: map,
    });

    var circle = new google.maps.Circle({
        strokeColor: 'red',
        strokeOpacity: 0.1,
        strokeWeight: 1,
        fillColor: 'red',
        fillOpacity: 0.1,
        center: map.getCenter(),
        radius: radioExt,
        map: map,
    });


    var bounds = circle.getBounds();

    map.fitBounds(bounds);

    var southWest = bounds.getSouthWest();
    var northEast = bounds.getNorthEast();


    var minLat = southWest.lat();
    var minLon = southWest.lng();

    var maxLat = northEast.lat();
    var maxLon = northEast.lng();

    /*var icon = {
        path: fontawesome.markers.CAR,
        scale: 0.3,
        strokeWeight: 0.2,
        strokeColor: 'black',
        strokeOpacity: 1,
        fillColor: '#a71d21',
        fillOpacity: 0.7
    };*/

    var icon = {
        url: "/static/img/pall.png",
        scaledSize: new google.maps.Size(30, 20),
        origin: new google.maps.Point(0, 0),
    };

    $.ajax({

        data: {
            'lat1': minLat,
            'lon1': minLon,
            'lat2': maxLat,
            'lon2': maxLon,
        },
        url: '/BusquedaAjax/',
        type: 'get',
        datatype: 'json',

        success: function(data) {

            console.log("consulta hecha")
            var infowindow = new google.maps.InfoWindow;
            var marker, i;

            for (var i = 0; i < data.length; i++) {
                marker = new google.maps.Marker({
                    position: {
                        lat: data[i].fields.lat,
                        lng: data[i].fields.lon
                    },
                    map: map,
                    icon: icon
                });

                google.maps.event.addListener(marker, 'click', (function(marker, i) {
                    return function() {
                        infowindow.setContent("<ul class='nav nav-tabs'>" +
                            "<li class='nav-item'>" +
                            "<a class='nav-link ' href='#'>Parking</a>" +

                            "<ul id='datoPop' class='list-group list-group-flush'>" +
                            "<li class='list-group-item'><b>Nombre:</b>" + " " + data[i].fields.name + "</li>" +
                            "<li class='list-group-item'><b>Dirección:</b>" + " " + data[i].fields.address + "</li>" +
                            "<li class='list-group-item'><b>lmpPID:</b>" + " " + data[i].fields.lmpPID + "</li>" +
                            "<li class='list-group-item'><b>Provider:</b>" + " " + data[i].fields.provider + "</li>" +
                            "<li class='list-group-item'><b>PID:</b>" + " " + data[i].fields.PID + "</li>" +
                            "<li class='list-group-item'><b>Longitud:</b>" + " " + data[i].fields.lon + "</li>" +
                            "<li class='list-group-item'><b>Latitud:</b>" + " " + data[i].fields.lat + "</li>" +
                            "<li class='list-group-item'><b>Pais:</b>" + " " + data[i].fields.country + "</li>" +
                            "<li class='list-group-item'><b>Región:</b>" + " " + data[i].fields.region + "</li>" +
                            "<li class='list-group-item'><b>Area:</b>" + " " + data[i].fields.area + "</li>" +
                            "<li class='list-group-item'><b>Who:</b>" + " " + data[i].fields.who + "</li>" +
                            "<li class='list-group-item'><b>Is_used:</b>" + " " + data[i].fields.is_used + "</li>" +
                            "<li class='list-group-item'><b>Cancelable:</b>" + " " + data[i].fields.cancelable + "</li>" +
                            "<li class='list-group-item'><b>Cancel_mn:</b>" + " " + data[i].fields.cancel_mn + "</li>" +
                            "<li class='list-group-item'><b>Cancel_msg:</b>" + " " + data[i].fields.cancel_msg + "</li>" +
                            "<li class='list-group-item'><b>Max_height:</b>" + " " + data[i].fields.max_height + "</li>" +
                            "<li class='list-group-item'><b>Hour_price:</b>" + " " + data[i].fields.hour_price + "</li>" +
                            "<li class='list-group-item'><b>Day_price:</b>" + " " + data[i].fields.day_price + "</li>" +
                            "<li class='list-group-item'><b>access_msg:</b>" + " " + data[i].fields.access_msg + "</li>" +
                            "<li class='list-group-item'><b>User_val:</b>" + " " + data[i].fields.user_val + "</li>" +
                            "<li class='list-group-item'><b>Lmp_val:</b>" + " " + data[i].fields.lmp_val + "</li>" +
                            "<li class='list-group-item'><b>Ben_val:</b>" + " " + data[i].fields.ben_val + "</li>" +
                            "<li class='list-group-item'><b>Gen_val:</b>" + " " + data[i].fields.gen_val + "</li>" +
                            "<li class='list-group-item'><b>Car_pc:</b>" + " " + data[i].fields.car_pc + "</li>" +
                            "<li class='list-group-item'><b>Human_pc:</b>" + " " + data[i].fields.human_pc + "</li>" +
                            "<li class='list-group-item'><b>Slug:</b>" + " " + data[i].fields.slug + "</li>" +
                            "<li class='list-group-item'><b>Booking Url:</b>" + " " + "<a target='_blank' href=" + data[i].fields.booking_url + ">" + data[i].fields.booking_url + "</a></li >" + "</ul>" + "</li>" + "</ul>");
                        infowindow.open(map, marker);
                    }
                })(marker, i));
            }
        },
    });
}




function ConsultaAjaxBooking(lat, lng, map) {

    map.setCenter(new google.maps.LatLng(lat, lng));


    var circle = new google.maps.Circle({
        strokeColor: 'green',
        strokeOpacity: 0.1,
        strokeWeight: 1,
        fillColor: '#3ef947',
        fillOpacity: 0.29,
        center: map.getCenter(),
        radius: radio,
        map: map,
    });

    var circle = new google.maps.Circle({
        strokeColor: 'red',
        strokeOpacity: 0.1,
        strokeWeight: 1,
        fillColor: 'red',
        fillOpacity: 0.1,
        center: map.getCenter(),
        radius: radioExt,
        map: map,
    });


    var bounds = circle.getBounds();

    map.fitBounds(bounds);

    var southWest = bounds.getSouthWest();
    var northEast = bounds.getNorthEast();


    var minLat = southWest.lat();
    var minLon = southWest.lng();

    var maxLat = northEast.lat();
    var maxLon = northEast.lng();

    var icon2 = {
        url: "/static/img/car.png",
        scaledSize: new google.maps.Size(40, 42),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(2, 45)
    };

    $.ajax({

        data: {
            'lat1': minLat,
            'lon1': minLon,
            'lat2': maxLat,
            'lon2': maxLon,
        },
        url: '/BookingsliteSearchAjax/',
        type: 'get',
        success: function(data) {
            console.log("consulta hecha con BookingsliteSearchAjax")
            var infowindow = new google.maps.InfoWindow;
            var marker, i;

            for (var i = 0; i < data.length; i++) {
                marker = new google.maps.Marker({
                    position: {
                        lat: data[i].fields.lat,
                        lng: data[i].fields.lon
                    },
                    map: map,
                    icon: icon2
                });


                google.maps.event.addListener(marker, 'click', (function(marker, i) {
                    return function() {
                        infowindow.setContent(
                            "<a class='nav-link ' href='#'>Booking</a>" +
                            "<ul id='datoPop' class='list-group list-group-flush'>" +

                            "<li class='list-group-item'><b>timestamp:</b>" + " " + data[i].fields.timestamp + "</li>" +
                            "<li class='list-group-item'><b>when:</b>" + " " + data[i].fields.when + "</li>" +
                            "<li class='list-group-item'><b>short_code:</b>" + " " + data[i].fields.short_code + "</li>" +
                            "<li class='list-group-item'><b>lat:</b>" + " " + data[i].fields.lat + "</li>" +
                            "<li class='list-group-item'><b>lon:</b>" + " " + data[i].fields.lon + "</li>" +
                            "<li class='list-group-item'><b>position:</b>" + " " + data[i].fields.position + "</li>" +
                            "<li class='list-group-item'><b>parking_found:</b>" + " " + data[i].fields.parking_found + "</li>" +
                            "<li class='list-group-item'><b>selected_name:</b>" + " " + data[i].fields.selected_name + "</li>" +
                            "<li class='list-group-item'><b>selected_lmpPID:</b>" + " " + data[i].fields.selected_lmpPID + "</li>" +
                            "<li class='list-group-item'><b>trello_url:</b>" + " " + data[i].fields.trello_url + "</li>" +
                            "</ul>");
                        infowindow.open(map, marker);
                    }
                })(marker, i));
            }
        },
    });
}






function cajabuscar(map, marker, searchBox) {
    map.addListener('bounds_changed', function() {
        searchBox.setBounds(map.getBounds());
    });

    document.getElementById('miboton').onclick = function() {

        google.maps.event.trigger(input, 'focus', {})
        google.maps.event.trigger(input, 'keydown', {
            keyCode: 13

        });
    };

    var markers = [];
    searchBox.addListener('places_changed', function() {
        var places = searchBox.getPlaces();
        if (places.length == 0) {
            return;
        }

        markers.forEach(function(marker) {
            marker.setMap(null);
        });
        markers = [];

        var bounds = new google.maps.LatLngBounds();
        places.forEach(function(place) {
            if (!place.geometry) {
                console.log("Returned place contains no geometry buscador");
                return;
            }

            markers.push(new google.maps.Marker({
                map: map,
                position: place.geometry.location
            }));

            if (place.geometry.viewport) {

                console.log(" entro al if del geometry buscador");
                bounds.union(place.geometry.viewport);
                console.log(bounds)
                marker.setMap(map);
            } else {
                console.log("Else geometry buscador");
                bounds.extend(place.geometry.location);
            }

            var lat = place.geometry.location.lat();
            var lng = place.geometry.location.lng();
            console.log("latitiud y longitud" + lat + lng);

            ConsultaAjax(lat, lng, map);
            ConsultaAjaxBooking(lat, lng, map);
            ConsultaHoy(lat, lng, map);
        });
    });
}












function ConsultaHoy(lat, lng, map) {


    map.setCenter(new google.maps.LatLng(lat, lng));


    var circle = new google.maps.Circle({
        strokeColor: 'green',
        strokeOpacity: 0.1,
        strokeWeight: 1,
        fillColor: '#3ef947',
        fillOpacity: 0.29,
        center: map.getCenter(),
        radius: radio,
        map: map,
    });

    var circle = new google.maps.Circle({
        strokeColor: 'red',
        strokeOpacity: 0.1,
        strokeWeight: 1,
        fillColor: 'red',
        fillOpacity: 0.1,
        center: map.getCenter(),
        radius: radioExt,
        map: map,
    });


    var bounds = circle.getBounds();

    map.fitBounds(bounds);

    var southWest = bounds.getSouthWest();
    var northEast = bounds.getNorthEast();


    var minLat = southWest.lat();
    var minLon = southWest.lng();

    var maxLat = northEast.lat();
    var maxLon = northEast.lng();


    $.ajax({

        data: {
            'lat1': minLat,
            'lon1': minLon,
            'lat2': maxLat,
            'lon2': maxLon,
        },
        url: '/BookingsliteSearchAjax/',
        type: 'get',
        success: function(data) {
                console.log("consulta hecha con Bookingtime")
                var infowindow = new google.maps.InfoWindow;
                var marker;

                $('#select_sh').change(function() {
                    var dia = $('#select_sh').val();
                    marker.forEach(function(marker) {
                        marker.setMap(null);
                    });                 




                    if (dia == 'uno') {
                        var hoy = new Date();
                        console.log("entro al IF del dia uno:" + dia);
                        var icon2 = {
                            url: "/static/img/carHoy.png",
                            scaledSize: new google.maps.Size(40, 42),
                            origin: new google.maps.Point(0, 0),
                            anchor: new google.maps.Point(2, 45)
                        };
                    } else if (dia == 'dos') {
                        var Hoy = new Date();
                        var hoy = new Date(Hoy.getTime() - 24 * 60 * 60 * 1000);
                        console.log("entro al IF del dia dos:" + hoy);
                        var icon2 = {
                            url: "/static/img/carAyer.png",
                            scaledSize: new google.maps.Size(40, 42),
                            origin: new google.maps.Point(0, 0),
                            anchor: new google.maps.Point(2, 45)
                        };

                    } else if (dia == 'tres') {
                        var Hoy = new Date();
                        var hoy = new Date((Hoy.getTime() - 24 * 60 * 60 * 1000) - 24 * 60 * 60 * 1000);
                        console.log("entro al IF del tres:" + hoy);
                        var icon2 = {
                            url: "/static/img/carTresdias.png",
                            scaledSize: new google.maps.Size(40, 42),
                            origin: new google.maps.Point(0, 0),
                            anchor: new google.maps.Point(2, 45)
                        };
                    } else if (dia == 'cero') {
                        var hoy = new Date();
                        console.log("entro al CERO:" + dia);
                    }
                    var hoyString = new Date(hoy.getTime() - (hoy.getTimezoneOffset() * 60000)).toISOString().split("T")[0];

                    var acumulador = 0

                    for (var i = 0; i < data.length; i++) {
                        var date = new Date(data[i].fields.timestamp);
                        var dateString = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().split("T")[0];

                        console.log("Entro en el FOR " + hoyString)
                        if (dateString == hoyString) {
                            acumulador += 50
                            console.log(acumulador)
                            marker = new google.maps.Marker({
                                position: {
                                    lat: data[i].fields.lat,
                                    lng: data[i].fields.lon
                                },
                                map: map,
                                icon: icon2
                            });
                            console.log(data[i].fields.short_code)
                            google.maps.event.addListener(marker, 'click', (function(marker, i) {
                                return function() {
                                    infowindow.setContent("<div style='left: " + acumulador + "px; width: 50px; height: 50px; background-color: green;  '></div>" +
                                        "<a class='nav-link ' href='#'>Booking</a>" +
                                        "<ul id='datoPop' class='list-group list-group-flush' >" +

                                        "<li class='list-group-item'><b>timestamp:</b>" + " " + data[i].fields.timestamp + "</li>" +
                                        "<li class='list-group-item'><b>when:</b>" + " " + data[i].fields.when + "</li>" +
                                        "<li class='list-group-item'><b>short_code:</b>" + " " + data[i].fields.short_code + "</li>" +
                                        "<li class='list-group-item'><b>lat:</b>" + " " + data[i].fields.lat + "</li>" +
                                        "<li class='list-group-item'><b>lon:</b>" + " " + data[i].fields.lon + "</li>" +
                                        "<li class='list-group-item'><b>position:</b>" + " " + data[i].fields.position + "</li>" +
                                        "<li class='list-group-item'><b>parking_found:</b>" + " " + data[i].fields.parking_found + "</li>" +
                                        "<li class='list-group-item'><b>selected_name:</b>" + " " + data[i].fields.selected_name + "</li>" +
                                        "<li class='list-group-item'><b>selected_lmpPID:</b>" + " " + data[i].fields.selected_lmpPID + "</li>" +
                                        "<li class='list-group-item'><b>trello_url:</b>" + " " + data[i].fields.trello_url + "</li>" +
                                        "</ul>");
                                    infowindow.open(map, marker);
                                }
                            })(marker, i));
                        }
                    }
                })

            }
    });
}






function muestraOculta(parrafo,enla) {
    var elemento = document.getElementById(parrafo);
    var enlace = document.getElementById(enla);
    if (elemento.style.display != "none") {
        elemento.style.display = "none";
        enlace.innerHTML = "<div><i class='fas fa-chevron-down' style='color:#a71d21;'></i></div>";
        }
    else{
        elemento.style.display = "block"
        enlace.innerHTML = "<div><i class='fas fa-chevron-up' style='color:#a71d21;'></i></div>";
        }
}
