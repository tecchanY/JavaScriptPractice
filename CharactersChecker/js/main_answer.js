(function () {
    'use strict';

    // 起こすイベントと変更したい数値の要素を取得したい
    var comment = document.getElementById('comment');
    var label = document.getElementById('label');

    // 定数は全部大文字にするのが慣習っぽい
    var LIMIT = 30;
    var WARNING = 10;

    label.innerHTML = LIMIT;

    comment.addEventListener('keyup', function() {
        var remaining = LIMIT - this.value.length;
        // maxlengthがあるので必要なし
        // if (remaining < 0) {
        //     remaining = 0;
        //     return;
        // }
        label.innerHTML = remaining;
        // if (remaining < WARNING) {
        //     label.className = 'warning';
        // } else {
        //     // これを書かないと一度文字色が変わったら戻らなくなってしまう
        //     label.className = '';
        // }
        label.className = remaining < WARNING ? 'warning' : '';
    });

})();
