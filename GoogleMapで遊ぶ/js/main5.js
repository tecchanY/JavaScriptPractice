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

    // const geocoder = new google.maps.Geocoder();
    // const location = {'lat': 35.6913237, 'lng': 139.70114420000004};

    // // リバースジオコーディング
    // // さっきとは逆で、LatLngの示すポイントを近しい住所文字列に変換するサービス
    // // ジオコーディングと違うのは、第一引数で指定するパラメータがaddressではなくlocationになるだけ
    // // 結果の住所文字列はresult[0].formatted_addressに設定

    // geocoder.geocode({
    //     location: location,
    // }, function (result, status) {
    // if (status === 'OK') {
    //     addMessage(JSON.stringify(result, null, 2));
    //     map.setCenter(result[0].geometry.location);
    // } else {
    //     addMessage('APIの実行に失敗しました: ' + status);
    // }
    // });

    // // 交通状況を表示
    // const trafficLayer = new google.maps.TrafficLayer();
    // trafficLayer.setMap(map);

    // // 交通機関を表示
    // const transitLayer = new google.maps.TransitLayer();
    // transitLayer.setMap(map);

    // ルート案内を表示
    // DirectionServiceオブジェクトはルート案内の結果を返すサービスクラス
    const directionsService = new google.maps.DirectionsService();
    // DirectionsRendererオブジェクトはルート案内の結果とGoogleMapを連携するサービスクラス
    const directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);

    const request = {
        origin: tokyoTower,
        destination: skyTree,
        // BICYCLING自転車モードとTRANSIT公共交通機関モードは日本ではサポートされていない
        travelMode: 'DRIVING', //自動車モード
    };
    // ルート案内の実行はDirectionServiceオブジェクトのroute()メソッド
    // 第二引数はコールバック関数
    // instructionsとして自然言語でのナビも含まれています。
    // DirectionServicesの結果をGoogleMapとの連携せずに使用することは利用規約で禁止されています。
    // このサービスを利用する際には必ずその結果をGoogleMap上に表示しなければなりません。
    // エラーをコンソールで見ると
    directionsService.route(request, function (result, status) {
        if (status === 'OK') {
            addMessage(JSON.stringify(result, null, 2));
            directionsRenderer.setDirections(result);
        } else {
            addMessage('APIの実行に失敗しました: ' + status);
        }
    })
}

// サービスから受信したレスポンスを画面に表示するための関数
function addMessage(msg) {
    var events = document.getElementById('messages');
    var pre = document.createElement('pre');
    pre.innerHTML = msg;
    events.appendChild(pre);
}
