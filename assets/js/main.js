async function getAllExam(){
  const response = await fetch('http://localhost:8080/exam/get-all-exams', {

    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  });
  const data = await response.json();
  return data;
}

let url = new URL(window.location.href);
let params = new URLSearchParams(url.search);

 getAllExam().then(data => {
    const typeExam = new Set();
    for (let i = 0; i<data.length;i++){
      typeExam.add(data[i].examType);
    }
    if (!params.toString()) {
      for (let i = 0; i<data.length;i++){
       createExamForm(data[i].examId,data[i].examType, data[i].examName, data[i].startTime, data[i].endTime);
      }
      for (let i = 0; i<Math.ceil(data.length/5);i++){
        createPageBtn(i+1);
      }
      const examForm = document.querySelectorAll('.container');
      console.log(examForm[0].classList.add('active'));
      changeNumPage(examForm); 
    }
    else{
      getExamAllowQuery(params.get('type'));
      
    }
    createTypeDroplist(typeExam);
  });


createTypeDroplist = (arr) => {
  var type_exam = document.getElementById('type_exam');
  arr.forEach(item => {
    type_exam.innerHTML += `<option value="${item}">${item}</option>`;
  });
  type_exam.innerHTML += `<option value="Tất cả">Tất cả</option>`;
}

createExamForm = (id, type, name, startTime, endTime) => {
  const start_time = newDate(startTime);
  const end_time = newDate(endTime);
  const diff = (end_time - start_time)/1000/60;
  const cardWrapper = document.querySelector('.cards_wrapper');
  if (id >= 6 && cardWrapper.querySelectorAll('.container').length > 4){
    cardWrapper.innerHTML += 
  `<div class="container passive" type = ${type} examId = ${id} time =${diff}>
    <div class="card">
      <div class="info">
        <h3 class="name">${name}</h3>
        <p class="describe"><i class="fa-regular fa-clock"></i> ${diff} phút | <i class="fa-solid fa-user-pen"></i> 187423 | <i class="fa-regular fa-comment"></i> 168</p>
        <p class="question">${diff} câu hỏi</p>
      </div>
      <a href="exam.html?id=${id}&time=${diff}" class="do">Làm bài</a>
    </div>
  </div>`;
  }
  else{
    cardWrapper.innerHTML += 
  `<div class="container" type = ${type} examId = ${id}>
    <div class="card">
      <div class="info">
        <h3 class="name">${name}</h3>
        <p class="describe"><i class="fa-regular fa-clock"></i> ${diff} phút | <i class="fa-solid fa-user-pen"></i> 187423 | <i class="fa-regular fa-comment"></i> 168</p>
        <p class="question">40 câu hỏi</p>
      </div>
      <a href="exam.html?id=${id}&time=${diff}" class="do">Làm bài</a>
    </div>
  </div>`;
  }
}

createPageBtn = (number) => {
  const numPage = document.querySelector('.num_pages');

  if(number == 1){
    numPage.innerHTML+=`<button class="selected btn-page" >${number}</button> `}
  else{
    numPage.innerHTML += `<button class = "btn-page">${number}</button>`;
  }
}

changeNumPage = (arrExam) => {
  const pageBtn = document.querySelectorAll('.btn-page');
  pageBtn.forEach(item => {
    item.addEventListener('click', (event) => {
      event.preventDefault();
      pageBtn.forEach(item => removeClass(item, 'selected'));
      addClass(item, 'selected');
      showExamForm(item.innerHTML, arrExam);
    });
  });
}

showExamForm = (numPage, arrExam) => { 
  arrExam.forEach(item => {addClass(item, 'passive'), removeClass(item, 'active')});
  for (let i = 5*(numPage-1); i<5*numPage; i++){
    addClass(arrExam[i], 'active');
  }
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

function newDate(date) {
  let a = date.split(" ");
  let days = a[0].split("/");
  a[0] = days[2]+"-"+days[1]+"-"+days[0];
  return new Date(a[0]+"T"+a[1]);
}

// Search exam
const searchBtn = document.querySelector('.search');
searchBtn.addEventListener('click', (event) => {
  event.preventDefault();
  // Exam's attribute
  const type = document.getElementById('type_exam').value;
  const obj = {
    type: type
    }
  const queryString = new URLSearchParams(obj).toString();
  const searchUrl = 'index.html?'+queryString;
  
  if (type == "Tất cả"){
    window.location.href = 'index.html';
  }
  else if (type != ""){
    console.log(1);
    const examForm = document.querySelectorAll('.container');
    examForm.forEach(item => {addClass(item, 'passive'), removeClass(item, 'active')});

    window.location.href = searchUrl;
  }
  
});

async function getExamAllowQuery(type) {
  console.log(1);
  const response1 = await fetch(`http://localhost:8080/exam/exam-type/${type}`, {
    headers: {Authorization: 'Bearer eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJzZWxmIiwic3ViIjoidXNlcjQiLCJpYXQiOjE3MTQ5Mjk5MjUsInJvbGVzIjoiVVNFUiJ9.YVZ2rCw4LlEdTIElnbfaZ2D3btyd_qviT2SaO3re2r7nBaKDF6kLp7CyxzYHvfDVuLyMo40nDfjfkC_SJOXu_pEtGnAdpkFiMsy-qNjYWkkFFsA3YPqtf2LSGAGKeKM96thzC-oEHzCd1-Ikm8VVpngUgmlB17MxGjsqMWMgpbZnx5ni90Lu_wcYjwCD7fDrEIpITDIihuvgNBhS_l4iwxmy9jfuqJh-wn85TeR_dJyUgbwD2gRFQeaktJ8K2sKWhwQ4rCtHYDNIdhavde11SHTS91bh-f9GtCDzA2q9zkb3PtmjptlveFWvjkOsYdD5jNXDvdsj4x57dCPY-wDIig'}
  });
  const data = await response1.json();
  for (let i = 0; i<data.length;i++){
    createExamForm(data[i].examId,data[i].examType, data[i].examName, data[i].startTime, data[i].endTime);
   }
   for (let i = 0; i<Math.ceil(data.length/5);i++){
     createPageBtn(i+1);
   }
   const examForm = document.querySelectorAll('.container');
   changeNumPage(examForm); 
  // Now you have data from both APIs
}