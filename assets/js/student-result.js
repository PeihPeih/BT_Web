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
        { id: "B21DCCN001", exam: "Lập trình Web", score: 8.5 },
        { id: "B21DCCN001", exam: "An toàn bảo mật hệ thống thông tin", score: 7.2 },
        { id: "B21DCCN001", exam: "Công nghệ phần mềm", score: 9.0 },
    ];

    var student = studentData[studentId];
    if (student) {
        resultDiv.innerHTML = "<p>Sinh viên: " + student.name + " - Mã sinh viên: " + student.id + "</p>";
        var table = "<table><tr><th>Số thứ tự</th><th>Tên kỳ thi</th><th>Điểm</th></tr>";
        var studentExams = data.filter(function (item) {
            return item.id === studentId;
        });
        studentExams.forEach(function (item, index) {
            table += "<tr><td>" + (index + 1) + "</td><td>" + item.exam + "</td><td>" + item.score + "</td></tr>";
        });
        table += "</table>";

        toCSV = document.createElement("div");
        toCSV.className = 'to-csv'

        toCSVBtn = document.createElement("button");
        toCSVIcon = document.createElement("i");
        toCSVIcon.className = "fa-solid fa-file-excel";
        toCSVBtn.appendChild(toCSVIcon);

        toCSVLabel = document.createElement("label");
        toCSVLabel.textContent = "Xuất ra file Excel";

        toCSV.appendChild(toCSVBtn);
        toCSV.appendChild(toCSVLabel);

        console.log(toCSV.innerHTML);

        resultDiv.innerHTML += table;
        resultDiv.appendChild(toCSV);
    } else {
        resultDiv.innerHTML = "<p>Không tìm thấy thông tin cho sinh viên có mã " + studentId + "</p>";
    }
    document.getElementById("student-id").value = "";
});
