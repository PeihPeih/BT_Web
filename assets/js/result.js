


const urlParams = new URLSearchParams(window.location.search);

fetch('http://localhost:8080/question/get-all-questions', {
    headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
})
.then(response => response.json())
.then(data => {
    let count = 0;
    data.forEach((item) => {
        if(item.examId == urlParams.get('id')){
            count++;
        }
    
    })
    const score = document.querySelector('#score');
    score.innerHTML = `${(localStorage.getItem('result') / count * 10).toFixed(2)} `;
});