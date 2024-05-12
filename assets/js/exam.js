const workplace = document.querySelector(".qanda");
const helpplace = document.querySelector(".help_wrapper>.num_qa");
const timer = document.querySelector("#time");

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
  var count = 1;
  // Tạo câu hỏi loại 1
  data.forEach((item) => {
    if(item.examId == urlParams.get('id')){

      getExamById(item.examId).then(data1 => {
        document.querySelector(".title>h2").innerHTML = data1.examName;
      })
      const content = item.content;
      const choices = item.choices.slice(1, -1).split(', ');
      const questionType = item.questionTypeId;
      let escapedArray = choices.map(item => item.replace(/</g, '&lt;').replace(/>/g, '&gt;'));

      if(questionType == 1){
        createQA1(count, content, escapedArray, questionType);
        createCheckAnswer(count);
        count++;
      }
    }
  })

  // Tạo câu hỏi loại 2
  data.forEach((item) => {
    if(item.examId == urlParams.get('id')){

      getExamById(item.examId).then(data1 => {
        document.querySelector(".title>h2").innerHTML = data1.examName;
      })
      const content = item.content;
      const choices = item.choices.slice(1, -1).split(', ');
      const questionType = item.questionTypeId;
      let escapedArray = choices.map(item => item.replace(/</g, '&lt;').replace(/>/g, '&gt;'));

      if(questionType == 2){
        createQA2(count, content, escapedArray, questionType);
        createCheckAnswer(count);
        count++;
      }
    }
  })

  // Tạo câu hỏi loại 3
  data.forEach((item) => {
    if(item.examId == urlParams.get('id')){

      getExamById(item.examId).then(data1 => {
        document.querySelector(".title>h2").innerHTML = data1.examName;
      })
      const content = item.content;
      const choices = item.choices.slice(1, -1).split(', ');
      const questionType = item.questionTypeId;
      let escapedArray = choices.map(item => item.replace(/</g, '&lt;').replace(/>/g, '&gt;'));

      if(questionType == 3){
        createQA3(count, content, escapedArray, questionType);
        createCheckAnswer(count);
        count++;
      }
    }
  })

  let arrQuestion = document.querySelectorAll('.sentences');

  showQuestionByPart(1, arrQuestion);

  changePart(arrQuestion);

  timer.innerHTML = urlParams.get('time')+":00";
  checkSelectedAnswer();
  
  submitExam(count-1);
});

// Time counter
var counts =  urlParams.get('time')*60;
const interval = 1000; // 1 giây

function counter() {
    counts--; // Tăng biến đếm lên mỗi lần hàm được gọi
    timer.innerHTML = convertSecond2Minutes(counts);
    if (counts === 0){
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
  submit_btn.addEventListener('click', async (event) => {
    event.preventDefault();
    if(checkFullSelected(question_length)) {

      window.alert("Bạn đã nộp bài!");
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const id = urlParams.get('id'); // Exam id
      const userId = localStorage.getItem('userId');
      const answers = [];
      const questions = document.querySelectorAll('.sentences');
      for(let i = 0; i<questions.length; i++){ 
        const answer = questions[i].querySelectorAll('.answer');
        const choices = [];
        for(let j = 0; j<answer.length; j++){
          if(answer[j].checked){
            choices.push(String.fromCharCode(65+j));
          }
        }
        const qa = {
          "questionId": i+1,
          "choices": "['" + choices.join("', '") + "']"
        }
        answers.push(qa);
      }
      const data = {
        "userId": parseInt(userId),
        "examId": parseInt(id),
        "answers": answers
      }
      const submitData = await fetch('http://localhost:8080/submission/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', charset: 'UTF-8',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(data)
      });

      const submitResponse = await submitData.json();
      localStorage.setItem('result', submitResponse.data.result); 
      console.log(localStorage.getItem('result'));
      window.location.href = `result.html?id=${id}`;
    }
  })
}

checkFullSelected = (question_length)=>{
  if(document.querySelectorAll('.selected').length != question_length){
    return false;
  }
  return true;
}

// Trắc nghiệm 1 câu
createQA1 = (stt, question, options, questionTypeId)=>{
  workplace.innerHTML += `<form class="qanda">
        <div class = "sentences" typeId = ${questionTypeId}>
          <p class="question">${stt}. ${question}</p>
          <input type="radio" class="answer" name = "${stt}" value="${options[0]}"> ${options[0]}<br>
          <input type="radio" class="answer" name = "${stt}" value="${options[1]}"> ${options[1]}<br>
          <input type="radio" class="answer" name = "${stt}" value="${options[2]}"> ${options[2]}<br>
          <input type="radio" class="answer" name = "${stt}" value="${options[3]}"> ${options[3]}<br> 
        </div>

      </form>`
}

// Đúng sai
createQA3 = (stt, question, options, questionTypeId)=>{
  workplace.innerHTML += `<form class="qanda">
        <div class = "sentences" typeId = ${questionTypeId}> 
          <p class="question">${stt}. ${question}</p>
          <input type="radio"  class="answer" name = "${stt}" value="${options[0]}"> ${options[0]}<br>
          <input type="radio"  class="answer" name = "${stt}" value="${options[1]}"> ${options[1]}<br>
        </div>

      </form>`
}

// Nhiều đáp án
createQA2 = (stt, question, options, questionTypeId)=>{
  workplace.innerHTML += `<form class="qanda">
        <div class = "sentences" typeId = ${questionTypeId}>
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

// Chọn phần
changePart = (arrQuestion)=>{
  const partBtns = document.querySelectorAll(".part");
  partBtns.forEach((partBtn) => {
    partBtn.addEventListener("click", (event) => {
      event.preventDefault();

      // Chuyển màu nút đc chọn
      partBtns.forEach(partBtn => {
        partBtn.classList.remove('selected-part');
      });

      partBtn.classList.add('selected-part');

      const part  = document.querySelector(".selected-part").innerHTML.split(" ")[1];''
      showQuestionByPart(part, arrQuestion);
    });
  });
}

showQuestionByPart = (part, arrQuestion) => { 
  arrQuestion.forEach(item => {
      addClass(item, 'passive');
      removeClass(item, 'active');
      if (item.getAttribute('typeid') == part){
        addClass(item, 'active');
      }
    });
}

removeClass = (item, class_name) => {
  if(item.classList.contains(class_name)){
      item.classList.remove(class_name);
    }
}

addClass = (item, class_name) => {
  if(!item.classList.contains(class_name)){
    item.classList.add(class_name);
  }
}
