let BearerJwt = 'Bearer ' + localStorage.getItem('token');

function signOut() {
  localStorage.setItem('token', null);
  localStorage.setItem('userId', null);
  return true;
}

async function getAllExams(){
  const response = await fetch('http://localhost:8080/admin/dashboard_admin/Exam/List', {
    headers: {Authorization: BearerJwt}
  });
  const data = await response.json();
  return data;
}

async function getQuestionsByExamId(id){
  const response = await fetch('http://localhost:8080/question/get-all-questions/exam/'+id, {
      method: 'GET',  
      headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}
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

async function deleteExamById(id){
  const response = await fetch('http://localhost:8080/admin/dashboard_admin/Exam2/Delete/'+id, {
    method: 'DELETE',  
    headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}
  });
  const data = await response.text();
  return data;
}

async function deleteQuestionById(id){
  const response = await fetch('http://localhost:8080/question/delete/'+id, {
    method: 'DELETE',  
    headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}
  });
  const data = await response.text();
  return data;
}
async function registerUser (data){
  const response = await fetch('http://localhost:8080/auth/register', {
    method: 'POST',  
    headers: {Authorization: 'Bearer ' + localStorage.getItem('token'),
    'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  if (!response.ok) {
    return 'Network error!';
  }
  return 'Đăng kí thành công!';
}

async function registerAdmin(data){
  const response = await fetch('http://localhost:8080/auth/registerAdmin', {
    method: 'POST',  
    headers: {Authorization: 'Bearer ' + localStorage.getItem('token'),
    'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  if (!response.ok) {
    return 'Network error!';
  }
  return 'Đăng kí thành công!';
}

async function deleteUser(id){
  const response = await fetch('http://localhost:8080/auth/deleteUser/'+id, {
    method: 'DELETE',  
    headers: {Authorization: 'Bearer ' + localStorage.getItem('token')
    },
  });
  if (!response.ok) {
    return 'Network error!';
  }
  return 'Xóa thành công!';
}

async function updateUserPassword(data){
  const response = await fetch('http://localhost:8080/auth/updatePassword', {
    method: 'PUT',  
    headers: {Authorization: 'Bearer ' + localStorage.getItem('token'),
    'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  if (!response.ok) {
    return 'Network error!';
  }
  return 'Đổi mật khẩu thành công!';
}

$(document).ready(function(){
  loadData();
});

function loadData() {
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
        res += '<th class = "examID" scope = "row">'+id+'</th>';
        res += '<td class = "text-primary">' +name + '</td>';
        res += '<td class = "type_exam">' +type_exam + '</td>';
        res += '<td class = "time_start">' +time_start + '</td>';
        res += '<td class = "time_end">' +time_end + '</td>';
        res += '<td>' ;
        res += '<button class = "btnModify submit-btn">Sửa</button>';
        res += '<td>' ;
        res += '<button class = "btnDelete submit-btn">Xóa</button>';
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
        res += '<th class = "user_id" scope = "row">'+id+'</th>';
        res += '<td class = "name">' +name + '</td>';
        res += '<td class = "authority">' +authority+ '</td>';
        res += '<td>' ;
        res += '<button class = "btnModify submit-btn">Sửa</button>';
        res += '<td>' ;
        res += '<button class = "btnDelete submit-btn">Xóa</button>';
        res += '</tr><br>';
        $('#tBodyUserTable').append(res);
        stt++;
      });
    }
  )     
}


// Ấn thêm kì thi
function showAddExamForm() {
  location.href="exam-form.html";
};

// Ấn chỉnh sửa kì thi
$("#tBodyExamtable").on("click", ".btnModify", function() {
  var $row = $(this).closest("tr");    // Find the row
  var id_exam = $row.find(".examID").text(); // Find the text
  console.log(id_exam);
  localStorage.setItem('idExamEdit', id_exam);
  location.href="modify-exam-form.html";
});

// Ấn xóa kì thi
$("#tBodyExamtable").on("click", ".btnDelete", function() {
  var $row = $(this).closest("tr");    // Find the row
  var id_exam = $row.find(".examID").text(); // Find the text
  console.log(id_exam);
  if(confirm("Ban có chắc muốn xóa kì thi này?"))
  {
    async_fun (id_exam);
  }
});

function myDeleteQuestionByIdExam(id) {
  done = "Đã xóa hết câu hỏi!"
  getQuestionsByExamId(id).then(data =>
    {
        data.forEach(element => {
            var questionId = element.questionId;
            deleteQuestionById(questionId).then(data =>
            {
              console.log("Xóa câu hỏi: ", data);
            })
        });
    }
    )
    return new Promise(resolve => {
      setTimeout(function () {
          resolve("\t\t This is first promise");
          console.log("Returned first promise");
      }, 1000);
  });
}

function myDeleteExamById(id_exam) {
  deleteExamById(id_exam).then(data=>
    {
      console.log(data);
      if (data != null)
        {
          if(!alert("Xóa thành công!"))
          {
            loadData();
          }
        }
    }
  )
  return new Promise(resolve => {
    setTimeout(function () {
        resolve("\t\t This is second promise");
        console.log("Returned second promise");
    }, 2000);
});
}

async function async_fun (id) {
 
  const first_promise = await myDeleteQuestionByIdExam(id);
  console.log("After awaiting for 2 seconds," +
      "the promise returned from first function is:");

  const second_promise = await myDeleteExamById(id);
  console.log("After awaiting for 4 seconds, the" +
      "promise returned from second function is:");
  console.log(second_promise);
}

function showAddUserForm() {
  $("#modalThemNguoiDung").modal();
  console.log("Open");
}

function addUser(){
  var username_add = document.getElementById("mdl_username").value;
  var authority_add =  document.getElementById("mdl_type_authority").value;
  var pass_add = document.getElementById("password").value;
  var repass_add = document.getElementById("re_password").value;
  console.log(username_add, authority_add, pass_add, repass_add);

  if (username_add == "" || 
    authority_add == "" ||
    pass_add == "" ||
    repass_add == "")
  {
    alert("Bạn chưa điền đủ thông tin");
  }
  else
  {
    if (pass_add != repass_add)
    {
      alert("Mật khẩu không trùng khớp");
    }
    else
    {
      data = {
        username: username_add,
        password: pass_add
      }
      if (authority_add == "ADMIN")
      {
        registerAdmin(data).then(response =>
        {
          console.log(response);
          if(!alert("Bạn đã thêm tài khoản thành công!"))
          {
            $("#modalThemNguoiDung").hide();
          }
          loadData();
        })
      }
      else
      {
        registerUser(data).then(response =>
        {
          console.log(response);
          if(!alert("Bạn đã thêm tài khoản thành công!"))
          {
            $("#modalThemNguoiDung").hide();
            loadData();
          }
        })
      }
      
    }
  }
  
}

function changePassword() {
  var username_update = document.getElementById("mdl_username_sua").value;
  var pass_update = document.getElementById("password_sua").value;
  var repass_update = document.getElementById("re_password_sua").value;
  if (
    pass_update == "" ||
    repass_update == "")
  {
    alert("Bạn chưa điền đủ thông tin");
  }
  else
  {
    if (pass_update != repass_update)
    {
      alert("Mật khẩu không trùng khớp");
    }
    else
    {  
      data = {
        username: username_update,
        password: pass_update
      }
      updateUserPassword(data).then(response =>
        {
          console.log(response);
          if(!alert("Bạn đã thay đổi mật khẩu thành công!"))
          {
            $("#modalSuaMatKhau").hide();
            loadData();
          }
        })
    }
  }
}

// Ấn chỉnh sửa mật khẩu người dùng
$("#tBodyUserTable").on("click", ".btnModify", function() {
  var $row = $(this).closest("tr");    // Find the row
  var id_user = $row.find(".user_id").text(); // Find the text
  var name_user = $row.find(".name").text(); // Find the text
  var authority_user = $row.find(".authority").text(); // Find the text
  console.log(id_user);
  $('#mdl_username_sua').val(name_user);
  $('#mdl_authority_sua').val(authority_user);
  $("#modalSuaMatKhau").modal("show");
});

// Ấn xóa người dùng
$("#tBodyUserTable").on("click", ".btnDelete", function() {
  var $row = $(this).closest("tr");    // Find the row
  var id_user = $row.find(".user_id").text(); // Find the text
  console.log(id_user);
  if(confirm("Ban có chắc muốn xóa tài khoản này?"))
  {
    deleteUser(id_user).then(response =>
      {
        console.log(response);
        if(!alert("Bạn đã xóa tài khoản thành công!"))
        {
          loadData();
        }
      })
  }
});



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
  
  // Chỉnh sửa kỳ thi
  // function editExam(examId) {

  //   localStorage.setItem('id_exam', i);
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