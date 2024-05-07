const workplace = document.querySelector(".qanda");
const helpplace = document.querySelector(".help_wrapper>.num_qa");
const timer = document.querySelector("#time");
const selectedPart = document.querySelector(".selected-part").innerHTML;
const partBtns = document.querySelectorAll(".part");

const urlParams = new URLSearchParams(window.location.search);

async function getQuestionOfExam(){
  const response = await fetch('http://localhost:8080/question/get-all-questions', {

    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  });
  const data = await response.json();
  return data;
}

async function getExamById(id){
  const response = await fetch(`http://localhost:8080/exam/${id}`, {

    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  });
  const data = await response.json();
  return data;
}

getQuestionOfExam().then(data => { 
  let count = 1;
  data.forEach((item) => {
  if(item.examId == urlParams.get('id')){
    getExamById(item.examId).then(data1 => {
      document.querySelector(".title>h2").innerHTML = data1.examName;
    })
    const content = item.content;
    const choices = JSON.parse(item.choices);
    let escapedArray = choices.map(item => item.replace(/</g, '&lt;').replace(/>/g, '&gt;'));
    createQA2(count, content, escapedArray);
    createCheckAnswer(count);
    count++;
    timer.innerHTML = urlParams.get('time')+":00";
    checkSelectedAnswer();
    submitExam(count-1);
  }})


});

// Time counter
var count =  urlParams.get('time')*60;
const interval = 1000; // 1 giây

function counter() {
    count--; // Tăng biến đếm lên mỗi lần hàm được gọi
    timer.innerHTML = convertSecond2Minutes(count);
    if (count === 0){
      window.alert("Đã hết giờ làm bài");
      clearInterval(timerr);
    }
}

const timerr = setInterval(counter, interval);

convertSecond2Minutes = (second)=>{
  let minutes = Math.floor(second / 60);
  let seconds = second % 60;
  if (minutes < 10) minutes = "0" + minutes;
  if (seconds < 10) seconds = "0" + seconds;
  return `${minutes}:${seconds}`;
}


// Checkbox selected answer
checkSelectedAnswer = ()=>{
  const questions = document.getElementsByClassName('question');
  const checkAns = document.getElementsByClassName('checkans');

  for(let i = 0;i<questions.length;i++){
    let answers = questions[i].parentElement.getElementsByClassName('answer');
    for(let j = 0; j < answers.length;j++){
      answers[j].addEventListener('change', ()=>{
        if(answers[j].checked){
          checkAns[i].classList.add('selected');
        }
      })
    } 
  }
}

// Nộp bài thi
submitExam = (question_length) => {
  const submit_btn = document.querySelector(".submit-btn");
  const form = document.querySelector("#form");
  submit_btn.addEventListener('click', (event) => {
    event.preventDefault();
    if(checkFullSelected(question_length)) {
      form.submit();

      window.alert("Bạn đã nộp bài!");
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const id = urlParams.get('id');
      window.location.href = `result.html?id=${id}`;
    }
  })
}

checkFullSelected = (question_length)=>{
  console.log(document.querySelectorAll('.selected').length, question_length);
  if(document.querySelectorAll('.selected').length != question_length){
    return false;
  }
  return true;
}

createQA2 = (stt, question, options)=>{
  workplace.innerHTML += `<form class="qanda">
        <div class = "sentences">
          <p class="question">${stt}. ${question}</p>
          <input type="radio" class="answer" name = "${stt}" value="${options[0]}"> ${options[0]}<br>
          <input type="radio" class="answer" name = "${stt}" value="${options[1]}"> ${options[1]}<br>
          <input type="radio" class="answer" name = "${stt}" value="${options[2]}"> ${options[2]}<br>
          <input type="radio" class="answer" name = "${stt}" value="${options[3]}"> ${options[3]}<br> 
        </div>

      </form>`
}

createQA1 = (stt, question, options)=>{
  workplace.innerHTML += `<form class="qanda">
        <div class = "sentences">
          <p class="question">${stt}. ${question}</p>
          <input type="radio" class="answer" name = "${stt}" value="${options[0]}"> ${options[0]}<br>
          <input type="radio" class="answer" name = "${stt}" value="${options[1]}"> ${options[1]}<br>
        </div>

      </form>`
}

createQA3 = (stt, question, options)=>{
  workplace.innerHTML += `<form class="qanda">
        <div class = "sentences">
          <p class="question">${stt}. ${question}</p>
          <input type="checkbox" class="answer" value="${options[0]}"> ${options[0]}<br>
          <input type="checkbox" class="answer" value="${options[1]}"> ${options[1]}<br>
          <input type="checkbox" class="answer" value="${options[2]}"> ${options[2]}<br>
          <input type="checkbox" class="answer" value="${options[3]}"> ${options[3]}<br> 
        </div>
      </form>`
}


createCheckAnswer = (stt) => {
  helpplace.innerHTML += `<button class="checkans">${stt}</button>`
}
