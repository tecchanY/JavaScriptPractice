(function () {
    'use strict';

    var timer = document.getElementById('timer');
    var min = document.getElementById('min');
    var sec = document.getElementById('sec');
    var reset = document.getElementById('reset');
    var start = document.getElementById('start');

    var startTime;
    var timeLeft;
    // var timeToCountDown = 4 * 1000;
    var timeToCountDown = 0;
    var timeId;
    var isRunnning = false;

    // 時間を追加したりリセットしたりする機能
    function updateTimer(t) {
        var d = new Date(t);
        var m = d.getMinutes();
        var s = d.getSeconds();
        var ms = d.getMilliseconds();
        var timerString;
        m = ('0' + m).slice(-2);
        s = ('0' + s).slice(-2);
        ms = ('00' + ms).slice(-3);
        timerString = m + ':' + s + ':' + ms;
        // timer.textContent = m + ':' + s + ':' + ms;
        timer.textContent = timerString;
        // タイトルにもカウントダウンを表示
        document.title = timerString;
    }

    function countDown() {
        timeId = setTimeout(function () {
            // var elapsedTime = Date.now() - startTime;
            // timeLeft = timeToCountDown - elapsedTime;
            timeLeft = timeToCountDown - (Date.now() - startTime);
            // console.log(timeLeft);
            if (timeLeft < 0) {
                isRunnning = false;
                start.textContent = 'Start';

                clearTimeout(timeId);
                timeLeft = 0;
                timeToCountDown = 0;
                updateTimer(timeLeft);
                return;
            }
            updateTimer(timeLeft);

            // 繰り返し処理して表示するので再起させる
            countDown();
            // 10msec単位で表示するので
        }, 10);
    }

    start.addEventListener('click', function () {
        if (isRunnning === false) {
            isRunnning = true;
            start.textContent = 'Stop';
            startTime = Date.now();
            countDown();
        } else {
            // これがない動作中はisRunnning=trueなのでstartボタン2回目を押しても再開しない
            isRunnning = false;
            // Startに戻す
            start.textContent = 'Start';
            timeToCountDown = timeLeft;
            // countDown()を止めるため
            clearTimeout(timeId);
        }
    })

    min.addEventListener('click', function () {
        // タイマーが動いてるときは時間を追加できないようにする
        if (isRunnning) {
            return;
        }
        timeToCountDown += 60 * 1000;
        // 60分を超えたときに00:00.000にする
        if (timeToCountDown >= 60 * 60 * 1000) {
            timeToCountDown = 0;
        }

        updateTimer(timeToCountDown);
    })

    sec.addEventListener('click', function () {
        if (isRunnning) {
            return;
        }
        timeToCountDown += 1000;
        // 60分を超えたときに00:00.000にする
        if (timeToCountDown >= 60 * 60 * 1000) {
            timeToCountDown = 0;
        }
        updateTimer(timeToCountDown);
    })

    reset.addEventListener('click', function () {
        timeToCountDown = 0;
        updateTimer(timeToCountDown);
    })

})();
