document.getElementById("search-form").addEventListener("submit", function (event) {
    event.preventDefault();
    var studentId = document.getElementById("student-id").value;
    var resultDiv = document.getElementById("result");
    // Assume data is fetched from database or API
    var studentData = {
        "B21DCCN001": { name: "Nguyễn Văn A", id: "B21DCCN001" },
        "B21DCCN002": { name: "Trần Thị B", id: "B21DCCN002" },
        "B21DCCN003": { name: "Lê Văn C", id: "B21DCCN003" }
    };
    var data = [
        { id: "B21DCCN001", subject: "Môn học 1", score: 8.5 },
        { id: "B21DCCN001", subject: "Môn học 2", score: 7.2 },
        { id: "B21DCCN001", subject: "Môn học 3", score: 9.0 },
    ];

    var student = studentData[studentId];
    if (student) {
        resultDiv.innerHTML = "<p>Sinh viên: " + student.name + " - Mã sinh viên: " + student.id + "</p>";
        var table = "<table><tr><th>Số thứ tự</th><th>Tên môn học</th><th>Điểm</th></tr>";
        var studentExams = data.filter(function (item) {
            return item.id === studentId;
        });
        studentExams.forEach(function (item, index) {
            table += "<tr><td>" + (index + 1) + "</td><td>" + item.subject + "</td><td>" + item.score + "</td></tr>";
        });
        table += "</table>";
        resultDiv.innerHTML += table;
    } else {
        resultDiv.innerHTML = "<p>Không tìm thấy thông tin cho sinh viên có mã " + studentId + "</p>";
    }
    document.getElementById("student-id").value = ""; // Clear input after search
});
