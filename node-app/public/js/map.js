ymaps.ready(init);

function init() {
    var myMap = new ymaps.Map("map", {
        center: [55.76, 37.64],
        zoom: 15
    });

    fetch('./js/data.json')
        .then(response => response.json())
        .then(data => {
            ymaps.modules.require(['Heatmap'], function (Heatmap) {
                var heatmapData = data.map(function (item) {
                    // Меняем порядок координат, так как в JSON [долгота, широта], а для тепловой карты нужно [широта, долгота]
                    return [item.geoData.coordinates[1], item.geoData.coordinates[0]];
                });

                var heatmap = new Heatmap(heatmapData, {
                    radius: 20,
                    opacity: 0.8,
                    intensityOfMidpoint: 0.2,
                    dissipating: true,
                    gradient: {
                        0.1: 'rgba(37, 228, 49, 0.8)',
                        0.2: 'rgba(235, 220, 12, 0.8)',
                        0.3: 'rgba(255, 131, 6, 0.8)',
                        0.4: 'rgba(162, 36, 25, 0.8)',
                        1.0: 'rgba(136,32,23,0.89)'
                    }
                });

                heatmap.setMap(myMap);

                data.forEach(function (item) {
                    var coords = [item.geoData.coordinates[1], item.geoData.coordinates[0]];
                    var myPlacemark = new ymaps.Placemark(coords, {
                        balloonContent: item.stop_name
                    }, {
                        preset: 'islands#icon',
                        iconColor: '#0095b6'
                    });

                    //myMap.geoObjects.add(myPlacemark);
                });
            });
        })
        .catch(error => console.error('Ошибка загрузки данных:', error));
}
