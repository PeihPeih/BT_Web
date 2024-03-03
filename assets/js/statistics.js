// Dữ liệu mẫu
var results = [
    { exam: "exam1", score: 75 },
    { exam: "exam2", score: 85 },
    { exam: "exam1", score: 90 },
    { exam: "exam3", score: 70 },
    { exam: "exam2", score: 80 },
    { exam: "exam3", score: 95 },
    { exam: "exam1", score: 65 },
    { exam: "exam2", score: 75 },
    { exam: "exam3", score: 85 },
  ];
  
  // Hiển thị dữ liệu thống kê
  function showStatistics() {
    var examFilter = document.getElementById("exam").value;
    
    var filteredResults = results;
    if (examFilter !== "all") {
      filteredResults = results.filter(function(result) {
        return result.exam === examFilter;
      });
    }
    
    var totalAttempts = filteredResults.length;
    var completionRate = totalAttempts > 0 ? (totalAttempts / results.length * 100).toFixed(2) + "%" : "0%";
    
    var totalScore = filteredResults.reduce(function(acc, result) {
      return acc + result.score;
    }, 0);
    var averageScore = totalAttempts > 0 ? (totalScore / totalAttempts).toFixed(2) : 0;
    
    var scoreDistribution = {};
    filteredResults.forEach(function(result) {
      if (scoreDistribution[result.score]) {
        scoreDistribution[result.score]++;
      } else {
        scoreDistribution[result.score] = 1;
      }
    });
    
    var scoreDistributionHTML = "";
    for (var score in scoreDistribution) {
      scoreDistributionHTML += score + " điểm: " + scoreDistribution[score] + "<br>";
    }
    
    document.getElementById("totalAttempts").textContent = totalAttempts;
    document.getElementById("completionRate").textContent = completionRate;
    document.getElementById("averageScore").textContent = averageScore;
    document.getElementById("scoreDistribution").innerHTML = scoreDistributionHTML;
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
    
    var examFilter = document.getElementById("exam");
    examFilter.addEventListener("change", showStatistics);
    
    var exportPDFButton = document.getElementById("exportPDF");
    exportPDFButton.addEventListener("click", exportPDF);
    
    var exportExcelButton = document.getElementById("exportExcel");
    exportExcelButton.addEventListener("click", exportExcel);
  }
  
  window.onload = function() {
    initialize();
  };