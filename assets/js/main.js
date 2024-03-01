const cardList = document.querySelectorAll('.container');
const cardWrapper = document.querySelector('.cards_wrapper');
const form = document.querySelector('form');

var arr = []
cardList.forEach(item=>{
  arr.push({
    name:item.getAttribute('type').split(",")
  })
})

form.addEventListener('submit', (event)=>{
    event.preventDefault();

    type_exam = form.querySelector('#type_exam').value;
    time = form.querySelector('#status').value;
    subject = form.querySelector('#subject').value;
    
    let condition = [type_exam, time, subject]
    console.log(condition)

    if(checkCondition(condition)){
      filter(arr, condition);
    }
});

function filter(arr, condition){
  for(let i = 0 ; i < arr.length;i++){
    removeClass('disappear');
    if (arr[i].name !== condition){
      add('disappear');
    }
  }
  if(condition === 'Tất cả'){
    for(let i = 0 ; i < arr.length;i++){
      removeClass('disappear');
    } 
  }
}

removeClass = (item, class_name) => {
  if(item.classList.contains(class_name)){
      item.classList.remove(class_name);
    }
}

addClass = (item, class_name) => {
  if(item.classList.contains(class_name)){
    item.classList.add(class_name);
  }
}


checkCondition = (condition) => {
  condition.forEach(item => {
    if (item !== '') return true;
  })
  return false;
}

checkFilter = (element, condition)=>{
  for()
}