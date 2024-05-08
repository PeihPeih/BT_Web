
var jwt = 'eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJzZWxmIiwic3ViIjoidmR1bmciLCJpYXQiOjE3MTUwMjYwNDIsInJvbGVzIjoiQURNSU4ifQ.fXUFPEJxm5pZZ2IME88C7ckgJrIs0zY_wo8IMQiNtWWXnwpqp7fb5egwVufP9_Ncncw6gkT78eqbpAHJlGwP1Ys3RcWrjWWO32yJhwip2f27HloUTzq8p6l5__9ppP86UqH07j15q8ws_Dmv4f80AsWat1UWfCvv_aWCDmhBOKCAxoqZPCI_MB1mUCNDNSYYurR9VoAChJ6jYFPUO9KNk1NKZ2ZLhjSir4lxiXUnboemSORM0IJVynjpiMMMsGuaEcTj9r_dTb12_taa2AvVgwztdl3bp3DExtkGTcxH-qQ49NAs6sWKG4OYcn3rrUPG5vXNYZRaxwlX4dogxy23iQ';
let BearerJwt = "Bearer ".concat(localStorage.getItem('token'));

async function findAllExamsWithStats(){
  const response = await fetch('http://localhost:8080/admin/statistic/', {
    headers: {Authorization: BearerJwt}
  });
  const data = await response.json();
  return data;
}

async function getAllNameExam(){
  const response = await fetch('http://localhost:8080/admin/statistic/getAllNameExam', {
    headers: {Authorization: BearerJwt}
  });
  const data = await response.json();
  return data;
}

async function findAllExamsIDWithStats(id) {
  const response = await fetch('http://localhost:8080/admin/statistic/'+id, {
    headers: {Authorization: BearerJwt}
  });
  const data = await response.json();
  return data;
}
  
getAllNameExam().then(data =>
    {
      var res = '<option value="all">Tất cả</option>';
      data.forEach(element => {
        var arr = String(element).split(":");
        var id = arr[0];
        var name = arr[1];
        res += '<option value="'+id+'">'+name+'</option>';
      });
      $('#selectorExam').empty();
      $('#selectorExam').append(res);
    }
  )

  // Hiển thị dữ liệu thống kê
  function showStatistics() {
    var examIDFilter = $("#selectorExam").val();
    console.log(examIDFilter);
    if (examIDFilter !== "all") {
      findAllExamsIDWithStats(parseInt(examIDFilter)).then(data =>
        {
          var tyLeHoanThanh = data.tyLeHoanThanh;
          var diemtb = data.diemtb;
          var phanPhoiDiem = data.phanPhoiDiem;
          var strphanPhoiDiem = "";
          phanPhoiDiem.forEach(element => {
            strphanPhoiDiem += element + "<br>";
          });
          var tongSolanThamGia = data.tongSolanThamGia;
          document.getElementById("tongSolanThamGia").innerHTML = tongSolanThamGia;
          document.getElementById("tyLeHoanThanh").innerHTML = tyLeHoanThanh;
          document.getElementById("diemtb").innerHTML = diemtb;
          document.getElementById("phanPhoiDiem").innerHTML = strphanPhoiDiem;
          console.log(data);
        }
      )
    }
    else
    {
      findAllExamsWithStats().then(data =>
        {
          var tyLeHoanThanh = data.tyLeHoanThanh;
          var diemtb = data.diemtb;
          var phanPhoiDiem = data.phanPhoiDiem;
          var strphanPhoiDiem = "";
          phanPhoiDiem.forEach(element => {
            strphanPhoiDiem += element + "<br>";
          });
          var tongSolanThamGia = data.tongSolanThamGia;
          document.getElementById("tongSolanThamGia").innerHTML = tongSolanThamGia;
          document.getElementById("tyLeHoanThanh").innerHTML = tyLeHoanThanh;
          document.getElementById("diemtb").innerHTML = diemtb;
          document.getElementById("phanPhoiDiem").innerHTML = strphanPhoiDiem;
          console.log(data);
        }
      )
    }
  }
  
  // Xuất PDF
  function exportPDF() {
    // Code xuất PDF
    console.log("Xuất PDF");
  }
  
  // Xuất Excel
  function exportExcel() {
    // Code xuất Excel
    console.log("Xuất Excel");
  }
  
  // Gán sự kiện cho các nút và chạy hàm hiển thị thống kê ban đầu
  function initialize() {
    showStatistics();
    
    var examFilter = document.getElementById("selectorExam");
    examFilter.addEventListener("change", showStatistics);
    
    var exportPDFButton = document.getElementById("exportPDF");
    exportPDFButton.addEventListener("click", exportPDF);
    
    var exportExcelButton = document.getElementById("exportExcel");
    exportExcelButton.addEventListener("click", exportExcel);
  }
  
  window.onload = function() {
    initialize();
  };