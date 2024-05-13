const score = document.querySelector('#score');
console.log(score)
score.innerHTML = localStorage.getItem('result')+ "/10";

