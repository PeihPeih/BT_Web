const workplace = document.querySelector(".qanda");
const helpplace = document.querySelector(".help_wrapper>.num_qa");
const timer = document.querySelector("#time");

creatQA = (stt, question, options)=>{
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

createCheckAnswer = (stt) => {
  helpplace.innerHTML += `<button class="checkans">${stt}</button>`
}

fetch('./qanda.json')
  .then(response => response.json())
  .then(data => {
    for (let i = 0; i<data.length;i++){
      creatQA(i+1, data[i].question, data[i].options);
      createCheckAnswer(i+1);
    }
    checkSelectedAnswer();
    submitExam(data);
  })
  .catch(error => console.error('Error fetching JSON:', error))

// Time counter
var count = 3600;
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
submitExam = (question) => {
  const submit_btn = document.querySelector(".submit-btn");
  const form = document.querySelector("#form");
  submit_btn.addEventListener('click', (event) => {
    event.preventDefault();
    if(checkFullSelected(question)) {
      form.submit();
      window.alert("Bạn đã nộp bài!")
    }
    else{
      window.alert("Vui lòng trả lời hết các câu hỏi!")
    }
  })
}

checkFullSelected = (question)=>{
  console.log(document.querySelectorAll('.selected').length, question.length);
  if(document.querySelectorAll('.selected').length != question.length){
    return false;
  }
  return true;
}