(function () {
    'use strict';

    let characters_left = document.getElementById('characters_left');
    let characters = document.getElementById('characters');
    let characters_max = 140;

    function countCharacters() {
        characters_left.value = characters_max - characters.value;
        characters_left.innerHTML = characters_left.value;
    };

})();
