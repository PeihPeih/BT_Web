const cardList = document.querySelectorAll('.container');
const cardWrapper = document.querySelector('.cards_wrapper');
const form = document.querySelector('form');

var arr = []
cardList.forEach(item=>{
  arr.push({
    name:item.getAttribute(
    'type'
    )
  })
})

var condition = '';
form.addEventListener('submit', (event)=>{
    event.preventDefault();

    condition = form.querySelector('#type_exam').value;

    if(condition != ''){
      filter(arr, condition);
    }
});

function filter(arr, condition){
  for(let i = 0 ; i < arr.length;i++){
    if(cardList[i].classList.contains('disappear')){
      cardList[i].classList.remove('disappear');
    }
    if (arr[i].name !== condition){
      cardList[i].classList.add("disappear");
    }
  }
}