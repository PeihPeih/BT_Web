function numberToLetter(number) {
    const letter = String.fromCharCode(65 + number);
    return letter;
}

function handleExamType() {
    chooseExamBox = document.querySelector("#exam-type")
    examType = chooseExamBox.value
    timeInputBox = document.querySelector("#time-input")
    if (examType === "tinh gio") {
        timeInputBox.style.display = 'block'
    } else {
        timeInputBox.style.display = 'none'
    }
}

function addQuestionForm() {
    var questionList = document.getElementById("question-list");

    var newQuestionForm = document.createElement("div");
    newQuestionForm.classList.add("new-question-form"); // Thêm class cho form

    var questionTypeLabel = document.createElement("label");
    questionTypeLabel.textContent = "Loại câu hỏi:";
    newQuestionForm.appendChild(questionTypeLabel);

    var questionTypeSelect = document.createElement("select");
    // Thêm các tùy chọn cho loại câu hỏi
    var questionTypes = ["Đúng sai", "Trắc nghiệm", "Trả lời ngắn", "Nhiều đáp án"];
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
    newQuestionForm.appendChild(questionDescriptionTextarea);

    newQuestionForm.appendChild(document.createElement("br"));

    var answersChoiceForm = document.createElement("form")
    answersChoiceForm.className = "answers-choice-form"
    newQuestionForm.appendChild(answersChoiceForm)

    newQuestionForm.appendChild(document.createElement("br"));

    var correctAnswerInput = document.createElement("input");
    correctAnswerInput.type = "text";
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
