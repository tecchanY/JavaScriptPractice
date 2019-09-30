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

    // ジオコーディングは、住所を示す文字列をLatLngに変換するサービス
    // 他のもそうだが、各種サービスを利用するときはAPIの設定で有効化されてるかをまず確認する
    // これ以降のサービスは無料プランでは回数制限があるので、リミット超過エラーが出たら次の日まで待つ
    const geocoder = new google.maps.Geocoder();
    const address = '東京都新宿区新宿3丁目38－1'; // 新宿駅
    // geocode()メソッドの第1引数はジオコーディングを行うためのオプションを指定したオブジェクトで、
    // 第2引数はコールバック関数
    // 第1引数の通常の使い方での必須パラメータはaddressのみです。(addressの代わりにplaceIdを使用する方法もあります)
    // 第2引数のコールバックではresults(結果の配列)とstatus(結果のステータス文字列)を引数とする関数を指定
    geocoder.geocode({
        address: address,
    }, function (results, status) {
        if (status === 'OK') {
            // JavaScriptのvalueをJSONのstringに変換
            // 多分ここら辺は定型的な書き方
            // レスポンスの詳細は表示されるメッセージを確認
            // addMessage()メソッドは下のほうに記載
            addMessage(JSON.stringify(results, null, 2));
            // 結果のLatLngはresults[0].geometry.locationに設定されてる(レスポンスの詳細に表示あり)
            map.setCenter(results[0].geometry.location);
        } else {
            addMessage('APIの実行に失敗しました: ' + status);
        }
    });

}

// サービスから受信したレスポンスを画面に表示するための関数
function addMessage(msg) {
    var events = document.getElementById('messages');
    var pre = document.createElement('pre');
    pre.innerHTML = msg;
    events.appendChild(pre);
}
