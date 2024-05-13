let BearerJwt = 'Bearer ' + localStorage.getItem('token');

async function findAllAnswerSheetsByUserId(id){
  const response = await fetch('http://localhost:8080/admin/statistic/student/'+id, {
    headers: {Authorization: 'Bearer ' + localStorage.getItem('token') }
  });
  const data = await response.json();
  return data;
}
var studentId = document.getElementById("student-id").value; 
var student = { 'name': null, "id": studentId };
var data2 = [];
var isHasStu = false;
function myFunFindAllAnswerSheetsByUserId(id) {
    findAllAnswerSheetsByUserId(id).then(data =>
        {
            // console.log(data);
            // console.log(data.length);
            // console.log(data[0]);
            if(data.length > 1) isHasStu = true; 
            student = { 'name': data[0].toString(), "id": id.toString() }
            data2 = [];
            for (i = 1 ; i < data.length; i += 1)
            {
                var id_exam = data[i].id;
                var exam_name = data[i].examName;
                var mark = data[i].mark;
                // console.log(id_exam, ";", exam_name, ";", mark);
                data2.push({ "id": id_exam, "exam": exam_name, "score": mark });
            }
        }
    )
    return new Promise(resolve => {
        setTimeout(function () {
            resolve("\t\t This is first promise");
            console.log("Returned first promise");
        }, 200);
    });
}
// document.getElementById("search-form").addEventListener("submit", function (event) {
//     event.preventDefault();
//     var studentId = document.getElementById("student-id").value; 
//     async_fun(studentId);   
// });

$('#search-btn').click(function(){
    studentId = document.getElementById("student-id").value; 
    async_fun(studentId);   
});

async function async_fun (studentId)
{
    isHasStu = false;
    const first_promise = await myFunFindAllAnswerSheetsByUserId(studentId);
    const second_promise = await duaThongTinRaHTML(data2);
}
function duaThongTinRaHTML(data3) {
    var resultDiv = document.getElementById("result");
    // console.log("Here is student name:", student.name);
    if (isHasStu) {
        resultDiv.innerHTML = "<p>Sinh viên: " + student.name + " - Mã sinh viên: " + student.id + "</p>";

        var table = "<table><tr><th>Số thứ tự</th><th>Tên kỳ thi</th><th>Điểm</th></tr>";
        // console.log(data3);
        data3.forEach(function (item, index) {
            // console.log(item);
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

        resultDiv.innerHTML += table;
        resultDiv.appendChild(toCSV);
    } else {
        resultDiv.innerHTML = "<p>Không tìm thấy thông tin cho sinh viên có mã " + studentId + "</p>";
    }
    // document.getElementById("student-id").value = "";
    return new Promise(resolve => {
        setTimeout(function () {
            resolve("\t\t This is second promise");
            // console.log("Returned second promise");
        }, 400);
    });
}
