const workplace = document.querySelector(".qanda");
const helpplace = document.querySelector(".help_wrapper>.num_qa");
const timer = document.querySelector("#time");

creatQA = (stt, question, options)=>{
  workplace.innerHTML += `<form class="qanda">
        <div class = "sentences">
          <p class="question">${stt}. ${question}</p>
          <input type="radio" class="answer" name = "${stt}" value="${options[0]}"> ${options[0]}<br>
          <input type="radio" class="answer" name = "${stt}" value="${options[1]}" checked> ${options[1]}<br>
          <input type="radio" class="answer" name = "${stt}" value="${options[2]}"> ${options[2]}<br>
          <input type="radio" class="answer" name = "${stt}" value="${options[3]}"> ${options[3]}<br>
          Đáp án đúng: ${options[2]} 
        </div>

      </form>`
}

createCheckAnswer = (stt) => {
  helpplace.innerHTML += `<button class="checkans">${stt}</button>`
}

async function getResults(){
  const queryString = window.location.search;
  const urlParameters = new URLSearchParams(queryString);
  let response = await fetch(`http://localhost:8080/exam/result/${urlParameters.get("id")}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    },
  });
  let data = await response.json();
  console.log(data);
  var correctAnswers = document.getElementById('correct-answers');
  var totalQuestions = document.getElementById('total-questions');
  var score = document.getElementById('score');
  console.log(data.count, data.total);
  correctAnswers.textContent = data.count;
  totalQuestions.textContent = data.total;
  score.textContent = Math.round(count/total * 100)/10;
}
getResults();
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



checkFullSelected = (question)=>{
  console.log(document.querySelectorAll('.selected').length, question.length);
  if(document.querySelectorAll('.selected').length != question.length){
    return false;
  }
  return true;
}

getResults();
// Fix dữ liệu
// var correctAnswers = 7;
// var totalQuestions = 10;
// var score = (correctAnswers / totalQuestions) * 10;

// // Hiển thị số câu trả lời đúng và tổng số câu
// document.getElementById('correct-answers').textContent = correctAnswers;
// document.getElementById('total-questions').textContent = totalQuestions;

// Tính toán và hiển thị điểm số
document.getElementById('score').textContent = score.toFixed(2);

// Cho phép người dùng xem lại câu trả lời và đáp án đúng
function showAnswers() {
    // var answersDiv = document.getElementById('answers');
    // var html = '<div class="qanda"></div>';
    // // Đoạn mã JavaScript để hiển thị câu trả lời và đáp án đúng sẽ điền vào đây
    // html += '<p>1. Question 1 - Your answer: A, Correct answer: B</p>';
    // html += '<p>2. Question 2 - Your answer: C, Correct answer: C</p>';
    // // Thêm các dòng tương tự cho các câu hỏi khác
    // answersDiv.innerHTML = html;
    // answersDiv.style.display = 'block';
    fetch('./qanda.json')
  .then(response => response.json())
  .then(data => {
    for (let i = 0; i<data.length;i++){
      creatQA(i+1, data[i].question, data[i].options);
    }
    checkSelectedAnswer();
  })
  .catch(error => console.error('Error fetching JSON:', error))
}