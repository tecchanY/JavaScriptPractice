'use strict';

{
  const ul = document.querySelector('ul');

  console.log(ul.parentNode); // body取得
  console.log(ul.children);
  console.log(ul.children[0]);

  for (let i = 0; i < ul.children.length; i++) {
    console.log(ul.children[i].textContent);
  }

}
