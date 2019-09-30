var cities = {
    '東京': { lat: 35.6811673, lng: 139.7648629 },
    '大阪': { lat: 34.7024854, lng: 135.4937619 },
    '名古屋': { lat: 35.170915, lng: 136.8793482 },
    '札幌': { lat: 43.0670794, lng: 141.3504979 },
    '福岡': { lat: 36.708298, lng: 136.9298093 },
    '仙台': { lat: 38.2601316, lng: 140.8802488 },
    '高松': { lat: 34.350869, lng: 134.046663 },
    '那覇': { lat: 26.212401, lng: 127.680932 },
};

var skyTree = { lat: 35.7100627, lng: 139.8085117 };
var tokyoTower = { lat: 35.658581, lng: 139.745433 };

function initMap() {
    const map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 35.6811673, lng: 139.7648629 },
        zoom: 15,
    });
    var select = document.getElementById('cities');
    // selectが変更されるとそれに連動してcenterが変更される
    select.addEventListener('change', function (e) {
        var key = e.target.value;
        map.setCenter(cities[key]);
    });
    var marker1 = new google.maps.Marker({
        position: tokyoTower,
        map: map,
        title: '東京タワー',
        // アイコンを表示
        icon: {
            // urlには相対パスでもOK
            url: 'https://assets.codeprep.jp/books/googlemap/tokyo_tower.png',
            scaledSize: new google.maps.Size(50, 100)
        }

    });
    var marker2 = new google.maps.Marker({
        position: skyTree,
        map: map,
        title: 'スカイツリー',
        icon: {
            // urlには相対パスでもOK
            url: 'https://assets.codeprep.jp/books/googlemap/sky_tree.png',
            scaledSize: new google.maps.Size(50, 100)
        }

    });

    marker1.addListener('click', function () {
        // open()メソッドの第一引数はMapオブジェクト、第二引数は関連付けするMarkerオブジェクト
        // 一方の情報ウインドウが開いてるときは他方を閉じる
        infoWindow2.close();
        infoWindow1.open(map, marker1);
    });

    marker2.addListener('click', function () {
        infoWindow1.close();
        infoWindow2.open(map, marker2);
    });

    const bus = new google.maps.Marker({
        position: skyTree,
        map: map,
        title: '観光バス',
        icon: {
            url: 'https://assets.codeprep.jp/books/googlemap/bus.png',
            scaledSize: new google.maps.Size(50, 25)
        },
        animation: google.maps.Animation.BOUNCE,
        // マーカーが重なった場合のどれを上にするかの制御
        zIndex: 1000
    });

    const busPosition = {
        lat: skyTree.lat,
        lng: skyTree.lng
    };
    const busIntervalHandle = setInterval(() => {
        // 東京タワーの位置を超えたらsetIntervalを解除する
        // ついでにBOUNCEも解除する
        if (busPosition.lat <= tokyoTower.lat && busPosition.lng <= tokyoTower.lng) {
            bus.setAnimation(null);
            clearInterval(busIntervalHandle);
        }
        // バスをちょっとずつ動かす
        if (busPosition.lat > tokyoTower.lat) {
            busPosition.lat -= 0.0005;
        }
        if (busPosition.lng > tokyoTower.lng) {
            busPosition.lng -= 0.0005;
        }
        bus.setPosition(busPosition);

    }, 200);

    // 場所を指定
    var path = [];
    path.push(tokyoTower);
    path.push(cities['東京']);
    path.push(skyTree);

    // // 指定のpathの範囲が塗りつぶされたPolygonが生成
    // const polygon = new google.maps.Polygon({
    //     path: path,
        // strokeColor: '#FF0000',
        // strokeOpacity: 1.0,
        // strokeWeight: 2,
    //     // 塗りつぶしの色と透過度を指定
        // fillColor: '#FF0000',
        // fillColor: 0.3,
        // editable: true,
        // draggable: true,
    // });
    // polygon.setMap(map);

    // const rect = new google.maps.Rectangle({
    //     strokeColor: '#FF0000',
    //     strokeOpacity: 1.0,
    //     strokeWeight: 2,
    //     fillColor: '#FF0000',
    //     fillColor: 0.3,
    //     bounds: {
    //         north: skyTree.lat,
    //         south: tokyoTower.lat,
    //         west: tokyoTower.lng,
    //         east: skyTree.lng,
    //     },
    //     editable: true,
    //     draggable: true,
    // });
    // rect.setMap(map);

    const line = new google.maps.Circle({
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillColor: 0.3,
        center: cities['東京'],
        radius: 2000,
        editable: true,
        draggable: true,
    });
    line.setMap(map);

}

// サービスから受信したレスポンスを画面に表示するための関数
function addMessage(msg) {
    var events = document.getElementById('messages');
    var pre = document.createElement('pre');
    pre.innerHTML = msg;
    events.appendChild(pre);
}
