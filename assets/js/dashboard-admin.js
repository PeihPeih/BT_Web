
var jwt = 'eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJzZWxmIiwic3ViIjoidmR1bmciLCJpYXQiOjE3MTUwMjYwNDIsInJvbGVzIjoiQURNSU4ifQ.fXUFPEJxm5pZZ2IME88C7ckgJrIs0zY_wo8IMQiNtWWXnwpqp7fb5egwVufP9_Ncncw6gkT78eqbpAHJlGwP1Ys3RcWrjWWO32yJhwip2f27HloUTzq8p6l5__9ppP86UqH07j15q8ws_Dmv4f80AsWat1UWfCvv_aWCDmhBOKCAxoqZPCI_MB1mUCNDNSYYurR9VoAChJ6jYFPUO9KNk1NKZ2ZLhjSir4lxiXUnboemSORM0IJVynjpiMMMsGuaEcTj9r_dTb12_taa2AvVgwztdl3bp3DExtkGTcxH-qQ49NAs6sWKG4OYcn3rrUPG5vXNYZRaxwlX4dogxy23iQ';
let BearerJwt = "Bearer ".concat(jwt);

async function getAllExams(){
  const response = await fetch('http://localhost:8080/admin/dashboard_admin/Exam/List', {
    headers: {Authorization: BearerJwt}
  });
  const data = await response.json();
  return data;
}

async function getAllUser(){
  const response = await fetch('http://localhost:8080/admin/dashboard_admin/User/List', {
    headers: {Authorization: BearerJwt}
  });
  const data = await response.json();
  return data;
}

// Hiển thị danh sách kỳ thi
getAllExams().then(data =>
  {
    var stt = 1;
    $('#tBodyExamtable').empty();
    data.forEach(element => {
      var id = String(element.examId);
      var name = String(element.examName);
      var type_exam = String(element.examType);
      var time_start = String(element.startTime);
      var time_end = String(element.endTime);
      var res = "";
      res  = '<tr id = '+id+'>';
      res += '<th class = "stt" scope = "row">'+stt+'</th>';
      res += '<th class = "exam_id" scope = "row">'+id+'</th>';
      res += '<td class = "text-primary">' +name + '</td>';
      res += '<td class = "type_exam">' +type_exam + '</td>';
      res += '<td class = "time_start">' +time_start + '</td>';
      res += '<td class = "time_end">' +time_end + '</td>';
      res += '</tr><br>';
      $('#tBodyExamtable').append(res);
      stt+=1;
    });
    
    
  }
)     

// Hiển thị danh sách người dùng
getAllUser().then(data =>
  {
    $('#tBodyUserTable').empty();
    var stt = 1;
    data.forEach(element => {
      var arr = String(element).split(":");
      var id = arr[0];
      var name = arr[1];
      var authority = arr[2];
      var res = "";
      res  = '<tr id = '+id+'>';
      res += '<th class = "stt" scope = "row">'+stt+'</th>';
      res += '<th class = "exam_id" scope = "row">'+id+'</th>';
      res += '<td class = "text-primary">' +name + '</td>';
      res += '<td class = "type_exam">' +authority+ '</td>';
      res += '</tr><br>';
      $('#tBodyUserTable').append(res);
      stt++;
    });
  }
)     











// Xử lí model bài thi ... đang phát triển
      // // Get the modal
      // var modal = document.getElementById("modalBaiThi");

      // // Get the button that opens the modal
      // var btn = document.getElementById("myBtn");

      // // Get the <span> element that closes the modal
      // var span = document.getElementsByClassName("close")[0];

      // // When the user clicks the button, open the modal 
      // btn.onclick = function() {
      //   modal.style.display = "block";
      // }

      // // When the user clicks on <span> (x), close the modal
      // span.onclick = function() {
      //   modal.style.display = "none";
      // }

      // // When the user clicks anywhere outside of the modal, close it
      // window.onclick = function(event) {
      //   if (event.target == modal) {
      //     modal.style.display = "none";
      //   }
      // }
  
  // // Thêm mới kỳ thi
  // function addExam() {
  //   var examName = prompt("Nhập tên kỳ thi:");
  //   var newExam = {
  //     id: exams.length + 1,
  //     name: examName
  //   };
  
  //   exams.push(newExam);
  //   showExamList();
  // }
  
  // // Chỉnh sửa kỳ thi
  // function editExam(examId) {
  //   var examName = prompt("Nhập tên mới cho kỳ thi:");
  
  //   for (var i = 0; i < exams.length; i++) {
  //     if (exams[i].id === examId) {
  //       exams[i].name = examName;
  //       break;
  //     }
  //   }
  
  //   showExamList();
  // }
  
  // // Xóa kỳ thi
  // function deleteExam(examId) {
  //   for (var i = 0; i < exams.length; i++) {
  //     if (exams[i].id === examId) {
  //       exams.splice(i, 1);
  //       break;
  //     }
  //   }
  
  //   showExamList();
  // }
  
  // // Thêm mới người dùng
  // function addUser() {
  //   var userName = prompt("Nhập tên người dùng:");
  //   var newUser = {
  //     id: users.length + 1,
  //     name: userName
  //   };
  
  //   users.push(newUser);
  //   showUserList();
  // }
  
  // // Chỉnh sửa người dùng
  // function editUser(userId) {
  //   var userName = prompt("Nhập tên mới cho người dùng:");
  
  //   for (var i = 0; i < users.length; i++) {
  //     if (users[i].id === userId) {
  //       users[i].name = userName;
  //       break;
  //     }
  //   }
  
  //   showUserList();
  // }
  
  // // Xóa người dùng
  // function deleteUser(userId) {
  //   for (var i = 0; i < users.length; i++) {
  //     if (users[i].id === userId) {
  //       users.splice(i, 1);
  //       break;
  //     }
  //   }
  
  //   showUserList();
  // }
  
  // // Hiển thị form thêm mới kỳ thi
  // function showAddExamForm() {
  //   var examName = prompt("Nhập tên kỳ thi:");
  //   if (examName) {
  //     var newExam = {
  //       id: exams.length + 1,
  //       name: examName
  //     };
  
  //     exams.push(newExam);
  //     showExamList();
  //   }
  // }
  
  // // Hiển thị form thêm mới người dùng
  // function showAddUserForm() {
  //   var userName = prompt("Nhập tên người dùng:");
  //   if (userName) {
  //     var newUser = {
  //       id: users.length + 1,
  //       name: userName
  //     };
  
  //     users.push(newUser);
  //     showUserList();
  //   }
  // }
  
  // // Khởi chạy ban đầu
  // function initialize() {
  //   // showExamList();
  //   // showUserList();
  // }
  
  // // Gọi hàm initialize khi trang được tải
  // window.onload = function () {
  //   initialize();
  // };