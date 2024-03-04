// Dữ liệu mẫu cho danh sách kỳ thi và danh sách người dùng
var exams = [
    { id: 1, name: "Kỳ thi A" },
    { id: 2, name: "Kỳ thi B" },
    { id: 3, name: "Kỳ thi C" }
  ];
  
  var users = [
    { id: 1, name: "Người dùng 1" },
    { id: 2, name: "Người dùng 2" },
    { id: 3, name: "Người dùng 3" }
  ];
  
  // Hiển thị danh sách kỳ thi
  function showExamList() {
    var table = document.getElementById("exam-table");
    table.innerHTML = ""; // Xóa dữ liệu cũ
  
    for (var i = 0; i < exams.length; i++) {
      var row = table.insertRow();
      var idCell = row.insertCell(0);
      var nameCell = row.insertCell(1);
      var editCell = row.insertCell(2);
      var deleteCell = row.insertCell(3);
  
      idCell.innerHTML = exams[i].id;
      nameCell.innerHTML = exams[i].name;
      editCell.innerHTML = "<button onclick='editExam(" + exams[i].id + ")' class='submit-btn' >Chỉnh sửa</button>";
      deleteCell.innerHTML = "<button onclick='deleteExam(" + exams[i].id + ")' class='submit-btn' >Xóa</button>";
    }
  }
  
  // Hiển thị danh sách người dùng
  function showUserList() {
    var table = document.getElementById("user-table");
    table.innerHTML = ""; // Xóa dữ liệu cũ
  
    for (var i = 0; i < users.length; i++) {
      var row = table.insertRow();
      var idCell = row.insertCell(0);
      var nameCell = row.insertCell(1);
      var editCell = row.insertCell(2);
      var deleteCell = row.insertCell(3);
  
      idCell.innerHTML = users[i].id;
      nameCell.innerHTML = users[i].name;
      editCell.innerHTML = "<button onclick='editUser(" + users[i].id + ")' class='submit-btn'>Chỉnh sửa</button>";
      deleteCell.innerHTML = "<button onclick='deleteUser(" + users[i].id + ")' class='submit-btn'>Xóa</button>";
    }
  }
  
  // Hiển thị thống kê
  function showStatistics() {
    var statisticsContainer = document.getElementById("statistics-container");
    statisticsContainer.innerHTML = ""; // Xóa dữ liệu cũ
  
    var statistics = calculateStatistics(); // Tính toán thống kê
  
    var statisticsTable = document.createElement("table");
    statisticsTable.innerHTML = `
      <tr>
        <th>Kỳ thi</th>
        <th>Số lượng người dùng</th>
        <th>Tỷ lệ hoàn thành</th>
        <th>Điểm trung bình</th>
      </tr>
    `;
  
    for (var i = 0; i < statistics.length; i++) {
      var row = statisticsTable.insertRow();
      var examCell = row.insertCell(0);
      var userCountCell = row.insertCell(1);
      var completionRateCell = row.insertCell(2);
      var averageScoreCell = row.insertCell(3);
  
      examCell.innerHTML = statistics[i].exam;
      userCountCell.innerHTML = statistics[i].userCount;
      completionRateCell.innerHTML = statistics[i].completionRate;
      averageScoreCell.innerHTML = statistics[i].averageScore;
    }
  
    statisticsContainer.appendChild(statisticsTable);
    statisticsContainer.style.display = "block";
  }
  
  // Tính toán thống kê (dữ liệu mẫu)
  function calculateStatistics() {
    return [
      { exam: "Kỳ thi A", userCount: 10, completionRate: "80%", averageScore: 8.5 },
      { exam: "Kỳ thi B", userCount: 15, completionRate: "70%", averageScore: 7.8 },
      { exam: "Kỳ thi C", userCount: 12, completionRate: "90%", averageScore: 9.2 }
    ];
  }
  
  // Thêm mới kỳ thi
  function addExam() {
    var examName = prompt("Nhập tên kỳ thi:");
    var newExam = {
      id: exams.length + 1,
      name: examName
    };
  
    exams.push(newExam);
    showExamList();
  }
  
  // Chỉnh sửa kỳ thi
  function editExam(examId) {
    var examName = prompt("Nhập tên mới cho kỳ thi:");
  
    for (var i = 0; i < exams.length; i++) {
      if (exams[i].id === examId) {
        exams[i].name = examName;
        break;
      }
    }
  
    showExamList();
  }
  
  // Xóa kỳ thi
  function deleteExam(examId) {
    for (var i = 0; i < exams.length; i++) {
      if (exams[i].id === examId) {
        exams.splice(i, 1);
        break;
      }
    }
  
    showExamList();
  }
  
  // Thêm mới người dùng
  function addUser() {
    var userName = prompt("Nhập tên người dùng:");
    var newUser = {
      id: users.length + 1,
      name: userName
    };
  
    users.push(newUser);
    showUserList();
  }
  
  // Chỉnh sửa người dùng
  function editUser(userId) {
    var userName = prompt("Nhập tên mới cho người dùng:");
  
    for (var i = 0; i < users.length; i++) {
      if (users[i].id === userId) {
        users[i].name = userName;
        break;
      }
    }
  
    showUserList();
  }
  
  // Xóa người dùng
  function deleteUser(userId) {
    for (var i = 0; i < users.length; i++) {
      if (users[i].id === userId) {
        users.splice(i, 1);
        break;
      }
    }
  
    showUserList();
  }
  
  // Hiển thị form thêm mới kỳ thi
  function showAddExamForm() {
    var examName = prompt("Nhập tên kỳ thi:");
    if (examName) {
      var newExam = {
        id: exams.length + 1,
        name: examName
      };
  
      exams.push(newExam);
      showExamList();
    }
  }
  
  // Hiển thị form thêm mới người dùng
  function showAddUserForm() {
    var userName = prompt("Nhập tên người dùng:");
    if (userName) {
      var newUser = {
        id: users.length + 1,
        name: userName
      };
  
      users.push(newUser);
      showUserList();
    }
  }
  
  // Khởi chạy ban đầu
  function initialize() {
    showExamList();
    showUserList();
  }
  
  // Gọi hàm initialize khi trang được tải
  window.onload = function () {
    initialize();
  };