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
        // 航空写真モード
        // mapTypeId: 'satellite',
        // 通常ビューと航空写真モードの複合ビューになる
        // mapTypeId: 'hybrid',
        // 地形情報に基づく物理地図になる
        // mapTypeId: 'terrain',
        // MapTypeコントロールは地図の左上に表示されてる地図タイプを切り替えるボタンのこと
        // mapTypeControl: false,
        // zoomControl: false,
        // streetViewControl: false,
        // scaleControl: false,
        // fullscreenControl: false,
        // disableDoubleClickZoom: false,
        // // タッチデバイス向けの動作を指定するプロパティ
        // gestureHandling: 'none',
        // // マウスのホイール操作を制御
        // scrollwheel: false,
    });
    // setTimeout(() => {
    //     map.setZoom(1);
    // }, 1000);
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
        // label: 'A',
        // draggable: true,
        // DROPは最初に1回だけ実行
        // animation: google.maps.Animation.DROP
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
        // ラベルの仕様を指定
        // label: {
        //     // color: 'blue',
        //     // fontFamily: 'sans-serif',
        //     // fontsize: '10px',
        //     // fontweight: 'bold',
        //     text: 'スカイツリー'
        // },
        // draggable: true,
        // BOUNCEは明示的にanimationをクリア(nullに設定)するまで実行
        // animation: google.maps.Animation.BOUNCE
        icon: {
            // urlには相対パスでもOK
            url: 'https://assets.codeprep.jp/books/googlemap/sky_tree.png',
            scaledSize: new google.maps.Size(50, 100)
        }

    });
    // BOUNCEを外すためのイベントリスナー
    // marker2.addListener('click', function () {
    //     if (marker2.getAnimation() !== null) {
    //         marker2.setAnimation(null);
    //     } else {
    //         marker2.setAnimation(google.maps.Animation.BOUNCE);
    //     }
    // });
    // クリックするごとにマーカーを追加
    // map.addListener('click', function (event) {
    //     new google.maps.Marker({
    //         // latLngはLが大文字であることに注意
    //         position: event.latLng,
    //         map: map
    //     });
    // });
    // 現在位置を取得してマーカーに表示
    // 第一引数が取得に成功した場合のコールバック関数
    // ちなみにwatchPosition()メソッドを使うとユーザーの位置を追跡する
    // navigator.geolocation.getCurrentPosition(function (position) {
    //     var latLng = {
    //         // 定型的な書き方
    //         lat: position.coords.latitude,
    //         lng: position.coords.longitude
    //     };
    //     // 取得に成功した場合の処理
    //     map.setCenter(latLng);
    //     map.setZoom(15);
    //     new google.maps.Marker ({
    //         position: latLng,
    //         map: map
    //     });
    // });

    // 情報ウインドウ（マーカーに関連付けて任意のHTML含むポップアップウインドウのこと）を表示
    var infoWindow1 = new google.maps.InfoWindow({
        // なんか表示されないなーと思ったら、CSSでtextをwhiteにしてたのがポップアップにも適用されてて同化してた。。。
        content: `<div>
            <h3>東京タワー</h3>
            <p>とても大きい</p>
        </div>
        `
    });
    marker1.addListener('click', function () {
        // open()メソッドの第一引数はMapオブジェクト、第二引数は関連付けするMarkerオブジェクト
        // 一方の情報ウインドウが開いてるときは他方を閉じる
        infoWindow2.close();
        infoWindow1.open(map, marker1);
    });

    var infoWindow2 = new google.maps.InfoWindow({
        content: `<div>
            <h3>スカイツリー</h3>
            <p>もっと大きい</p>
        </div>
        `
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

}

// サービスから受信したレスポンスを画面に表示するための関数
function addMessage(msg) {
    var events = document.getElementById('messages');
    var pre = document.createElement('pre');
    pre.innerHTML = msg;
    events.appendChild(pre);
}
