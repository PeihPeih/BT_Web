const cardList = document.querySelectorAll('.container');
const cardWrapper = document.querySelector('.cards_wrapper');
const form = document.querySelector('form');

var arr = []
cardList.forEach(item=>{
  arr.push({
    name:item.getAttribute('type').split(", ")
  })
})

form.addEventListener('submit', (event)=>{
    event.preventDefault();

    type_exam = form.querySelector('#type_exam').value.trim();
    time = form.querySelector('#status').value.trim();
    subject = form.querySelector('#subject').value.trim();

    let condition = [type_exam, time, subject]
    filter(arr, condition);
});


// Filter
filter = (arr, condition) => {
  cardList.forEach(item => removeClass(item, 'disappear'));

  for(let i = 0 ; i < arr.length;i++){
    if (!checkFilter(arr[i].name, condition)){
      addClass(cardList[i],'disappear');
    }
  }
}

removeClass = (item, class_name) => {
  if(item.classList.contains(class_name)){
      item.classList.remove(class_name);
    }
}

console.log(arr);

addClass = (item, class_name) => {
  if(!item.classList.contains(class_name)){
    item.classList.add(class_name);
  }
}

// Nếu không đủ hết điều kiện thì trả về true
checkFilter = (element, condition) => {
  if(condition[0] === 'Tất cả'){
    for(let i = 0 ; i < arr.length;i++){
      condition[0] = false;
    } 
  }
  for (let item of condition) {
    if(item){
      console.log(element, item);
      if (!element.includes(item)) {
        console.log(1);
        return false;
      }
    }
  }
  return true;
}

console.log(['Luyện tập', ' Tự do', ' Toán rời rạc'].includes('Tự do'))