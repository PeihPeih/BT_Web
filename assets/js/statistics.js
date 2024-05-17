
let BearerJwt = 'Bearer ' + localStorage.getItem('token');
function signOut() {
  localStorage.setItem('token', null);
  localStorage.setItem('userId', null);
  return true;
}



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
          // var strphanPhoiDiem = "";
          // phanPhoiDiem.forEach(element => {
          //   strphanPhoiDiem += element + "<br>";
          // });
          var tongSolanThamGia = data.tongSolanThamGia;
          document.getElementById("tongSolanThamGia").innerHTML = tongSolanThamGia;
          document.getElementById("tyLeHoanThanh").innerHTML = tyLeHoanThanh + "%";
          document.getElementById("diemtb").innerHTML = diemtb;
          // document.getElementById("phanPhoiDiem").innerHTML = strphanPhoiDiem;
          draw(phanPhoiDiem);
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
          // var strphanPhoiDiem = "";
          // phanPhoiDiem.forEach(element => {
          //   strphanPhoiDiem += element + "<br>";
          // });
          var tongSolanThamGia = data.tongSolanThamGia;
          document.getElementById("tongSolanThamGia").innerHTML = tongSolanThamGia;
          document.getElementById("tyLeHoanThanh").innerHTML = tyLeHoanThanh + "%";
          document.getElementById("diemtb").innerHTML = diemtb;
          // document.getElementById("phanPhoiDiem").innerHTML = strphanPhoiDiem;
          draw(phanPhoiDiem);
          console.log(data);
        }
      )
    }
  }
  
  function draw(phanPhoiDiem)
  {
    var arrayPhanPhoiDiem = {};
    phanPhoiDiem.forEach(element => {
      var tmp = element.split(":");
      arrayPhanPhoiDiem[parseFloat(tmp[0])] = parseInt(tmp[1]);
    });

    var labels = [];
    for (i = 0; i <= 10; i += 0.1)
    {
        labels.push(Number((parseFloat(i)).toFixed(1)));
    }
    var values = [];
    labels.forEach(element => {
      if (arrayPhanPhoiDiem[element] == undefined)
        {
          values.push(0);
        }
      else
      {
        values.push(arrayPhanPhoiDiem[element]);
      }
    });

    drawChart(labels, values);
    
  }

  Array.prototype.max = function() {
    return Math.max.apply(null, this);
  };

  function drawChart(labels, values) {
    var ctx = document.getElementById("chart").getContext("2d");
    var graph = Chart.getChart("chart");
    if (graph) graph.destroy();
    var chart = new Chart(ctx, 
    {
        type: "bar",
        data: 
        {
          labels: labels,
          datasets: [{
              label: "Số lần xuất hiện",
              data: values,
              backgroundColor: "rgba(54, 162, 235, 0.7)",
              // fill: false,
          }]
        },
        options: 
        {
          scales: {
              y: {
              beginAtZero: true,
              stepSize: 1,
              precision: 0,
              min : 0,
              max: values.max() + 2
              }
          }
        }
    });
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