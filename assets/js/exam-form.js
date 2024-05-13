function numberToLetter(number) {
    const letter = String.fromCharCode(65 + number);
    return letter;
}

function handleExamType() {
    chooseExamBox = document.querySelector("#exam-type")
    examType = chooseExamBox.value
    timeInputBox = document.querySelector("#time-input")
    // if (examType === "tinh gio") {
    // timeInputBox.style.display = 'block'
    // } else {
    // timeInputBox.style.display = 'none'
    // }
}

function addQuestionForm() {
    var questionList = document.getElementById("question-list");

    var newQuestionForm = document.createElement("div");
    newQuestionForm.classList.add("new-question-form"); // Thêm class cho form

    var questionTypeLabel = document.createElement("label");
    questionTypeLabel.textContent = "Loại câu hỏi:";
    newQuestionForm.appendChild(questionTypeLabel);

    var questionTypeSelect = document.createElement("select");
    questionTypeSelect.id = 'select-type'
    // Thêm các tùy chọn cho loại câu hỏi
    var questionTypes = ["Đúng sai", "Trắc nghiệm", "Nhiều đáp án"];
    for (var i = 0; i < questionTypes.length; i++) {
        var option = document.createElement("option");
        option.text = questionTypes[i];
        questionTypeSelect.add(option);
    }

    questionTypeSelect.addEventListener("change", function () {
        handleQuestionType(newQuestionForm, questionTypeSelect.value);
    })
    newQuestionForm.appendChild(questionTypeSelect);

    newQuestionForm.appendChild(document.createElement("br"));

    var questionDescriptionLabel = document.createElement("label");
    questionDescriptionLabel.textContent = "Mô tả câu hỏi:";
    newQuestionForm.appendChild(questionDescriptionLabel);

    var questionDescriptionTextarea = document.createElement("textarea");
    questionDescriptionTextarea.className = 'question-content'
    newQuestionForm.appendChild(questionDescriptionTextarea);

    newQuestionForm.appendChild(document.createElement("br"));

    var answersChoiceForm = document.createElement("form")
    answersChoiceForm.className = "answers-choice-form"
    newQuestionForm.appendChild(answersChoiceForm)

    newQuestionForm.appendChild(document.createElement("br"));

    var correctAnswerInput = document.createElement("input");
    correctAnswerInput.type = "text";
    correctAnswerInput.className = 'correct-answer'
    correctAnswerInput.placeholder = "Câu trả lời đúng";
    newQuestionForm.appendChild(correctAnswerInput);

    var removeQuestionButton = document.createElement("button");
    removeQuestionButton.textContent = "Xóa";
    removeQuestionButton.id = 'remove-btn'
    // Gọi hàm để xóa câu hỏi khi người dùng nhấn nút
    removeQuestionButton.onclick = function () { removeQuestion(newQuestionForm); };
    newQuestionForm.appendChild(removeQuestionButton);

    newQuestionForm.appendChild(document.createElement("br"));

    questionList.appendChild(newQuestionForm);
}

function handleQuestionType(questionForm, questionType) {
    answersChoiceForm = questionForm.querySelector(".answers-choice-form");
    // console.log(typeof (answersChoiceForm))
    if (questionType == "Trắc nghiệm" || questionType == "Nhiều đáp án") {
        addAnswer(answersChoiceForm);
    } else {
        const choiceItems = answersChoiceForm.querySelectorAll('div');
        choiceItems.forEach((item) => {
            answersChoiceForm.removeChild(item);
        })
    }
}

function addAnswer(answersChoiceForm) {

    const choiceItems = answersChoiceForm.querySelectorAll('div');
    const cnt = choiceItems.length

    var divBox = document.createElement("div");
    divBox.id = 'answers-area';

    answerLabel = document.createElement("label")
    answerLabel.textContent = numberToLetter(cnt) + ".";
    answerLabel.style.padding = "10px";
    divBox.appendChild(answerLabel);

    textAnswer = document.createElement("textarea");
    textAnswer.className = "text-answer";
    divBox.appendChild(textAnswer);

    addAnswerBtn = document.createElement("button");
    addAnswerBtn.className = "add-answer-btn"
    addAnswerBtn.innerHTML = '<i class= "fa-solid fa-plus"></i>';
    addAnswerBtn.type = "button";

    addAnswerBtn = document.createElement("button");
    addAnswerBtn.className = "add-answer-btn";
    addAnswerBtn.innerHTML = '<i class= "fa-solid fa-plus"></i>';
    addAnswerBtn.type = "button";
    addAnswerBtn.onclick = function () {
        addAnswer(answersChoiceForm);
    };
    divBox.appendChild(addAnswerBtn);

    removeAnswerBtn = document.createElement("button");
    removeAnswerBtn.className = "remove-answer-btn";
    removeAnswerBtn.innerHTML = '<i class="fa-solid fa-minus"></i>';
    removeAnswerBtn.type = "button";
    removeAnswerBtn.onclick = function () {
        answersChoiceForm.removeChild(divBox);
        const items = answersChoiceForm.querySelectorAll('div');
        items.forEach((item, index) => {
            answerLabel = item.querySelector("label");
            answerLabel.textContent = numberToLetter(index) + ".";
        })
    };

    divBox.appendChild(removeAnswerBtn);

    answersChoiceForm.appendChild(divBox);
}


function removeQuestion(questionForm) {
    var questionList = document.getElementById("question-list");
    questionList.removeChild(questionForm);
}

const submitBtn = document.querySelector('.submit-btn')


submitBtn.addEventListener('click', async (e) => {
    e.preventDefault()

    const token = localStorage.getItem('token')

    const examName = document.querySelector('#exam-name').value
    console.log(`examName: ${examName}`)

    const examType = document.querySelector('#exam-type').value
    console.log(`examType: ${examType}`)

    const getTime = (timeInp) => {

        const year = timeInp.substring(0, 4)
        const month = timeInp.substring(5, 7)
        const day = timeInp.substring(8, 10)
        const start = timeInp.substring(11) + ':00'

        const resultTime = `${day}/${month}/${year} ${start}`

        return resultTime

    }

    const startTimeInp = document.querySelector('#start-time-input').value

    const startTime = getTime(startTimeInp)
    console.log(`startTime: ${startTime}`)

    const duration = document.querySelector('#exam-time').value
    console.log(`duration: ${duration}`)

    const date = new Date(startTimeInp)
    date.setTime(date.getTime() + duration * 60000)

    // const date = endTimeInp.toLocaleString()
    const endTime = ("0" + date.getDate()).slice(-2) + "/" + ("0" + (date.getMonth() + 1)).slice(-2) + "/" + date.getFullYear() + " " + ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2) + ':00';
    console.log(`endTime: ${endTime}`)

    const examObj = {
        examName,
        examType,
        startTime,
        endTime
    }

    const response = await fetch('http://localhost:8080/exam/create-exam', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },

        body: JSON.stringify(examObj)
    });

    if (!response.ok) {
        throw new Error('Network error!');
    }

    const responseData = await response.json();
    console.log(responseData)

    const examId = responseData['examId']

    const questionForms = document.getElementsByClassName('new-question-form')

    const typeToId = {
        'Trắc nghiệm': 1,
        'Nhiều đáp án': 2,
        'Đúng sai': 3
    }
    for (const questionForm of questionForms) {
        const selectType = questionForm.querySelector('#select-type')
        const questionType = selectType.value
        const questionTypeId = typeToId[questionType]

        console.log(`questionTypeId: ${questionTypeId}`)

        const content = questionForm.querySelector('.question-content').value

        console.log(`content: ${content}`)

        const answers = questionForm.getElementsByClassName('text-answer')
        const choices = []
        for (const answer of answers) {
            choices.push(answer.value)
        }

        console.log(`choices: ${choices}`)

        const correctAnswer = questionForm.querySelector('.correct-answer').value.split(',')

        console.log(`correctAnswer: ${correctAnswer}`)

        const questionObj = {
            content,
            choices: JSON.stringify(choices),
            questionTypeId,
            correctAnswer: JSON.stringify(correctAnswer)
        }

        console.log(questionObj)
        console.log(`examId: ${examId}`)
        const response = await fetch(`http://localhost:8080/question/create-question/${examId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },

            body: JSON.stringify(questionObj)
        });

        if (!response.ok) {
            throw new Error('Network error!');
        }

        const responseData = await response.json();
        console.log(responseData)
    }

    window.location.href = 'dashboard_admin.html'
})