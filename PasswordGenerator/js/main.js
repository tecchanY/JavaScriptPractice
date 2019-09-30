(function () {
    'use strict';

    var slider = document.getElementById('slider');
    var label = document.getElementById('label');
    var btn = document.getElementById('btn');
    var result = document.getElementById('result');
    var numbers = document.getElementById('numbers');
    var symbols = document.getElementById('symbols');

    function getPassword() {
        var seed_letters = 'abcdefghijklmnopqrstuvwxyz';
        var seed_numbers = '0123456789';
        var seed_symbols = '!#$%&';

        var len = slider.value;
        var pwd = '';

        var seed = seed_letters + seed_letters.toUpperCase();
        if (numbers.checked === true) {
            seed += seed_numbers;
        };
        if (symbols.checked) {
            seed += seed_symbols;
        };

        // for (let i = 0; i < len; i++) {
        //     pwd += seed[Math.floor(Math.random() * seed.length)];
        // }

        // while文を使うとlenが0になるまで繰り返し
        while (len--) {
            pwd += seed[Math.floor(Math.random() * seed.length)];
        };

        result.value = pwd;
    };

    slider.addEventListener('change', function () {
        label.innerHTML = this.value;
    });

    btn.addEventListener('click', function () {
        getPassword();
        // result.value = 'asdfgh';
    });

    result.addEventListener('click', function () {
        this.select();
    });

    getPassword();

})();
