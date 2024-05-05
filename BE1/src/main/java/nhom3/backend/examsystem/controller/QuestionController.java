package nhom3.backend.examsystem.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import nhom3.backend.examsystem.model.Question;
import nhom3.backend.examsystem.service.QuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/question")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:8090")
public class QuestionController {
    private final QuestionService questionService;

    // Create new question
    @PostMapping("/create-question/{examId}")
    public ResponseEntity<?> createQuestion(@RequestBody Question question, @PathVariable("examId") Long examId) throws JsonProcessingException {
        return questionService.createQuestion(question, examId);
    }

    // Get question by id
    @GetMapping("/{questionId}")
    public ResponseEntity<?> getQuestionById(@PathVariable("questionId") Long questionId) {
        return questionService.getQuestionById(questionId);
    }

    // Get all questions
    @GetMapping("/get-all-questions")   
    public ResponseEntity<?> getAllQuestions() {
        return questionService.getAllQuestions();
    }

    // Get question by exam's id
    @GetMapping("/get-all-questions/exam/{examId}")
    public ResponseEntity<?> getQuestionsByExamId(@PathVariable("examId") Long examId) {
        return questionService.getQuestionsByExamId(examId);
    }

    @GetMapping("/get-all-questions/type/{questionTypeId}")
    public ResponseEntity<?> getQuestionsByQuestionTypeId(@PathVariable("questionTypeId") Long questionTypeId) {
        return questionService.getQuestionsByQuestionTypeId(questionTypeId);
    }

    // Delete question by id
    @DeleteMapping("/delete/{questionId}")
    public ResponseEntity<?> deleteQuestionById(@PathVariable("questionId") Long questionId) {
        return questionService.deleteQuestionById(questionId);
    }

    // Edit question by id
    @PutMapping("/edit/{questionId}")
    public ResponseEntity<?> editQuestionById(@PathVariable("questionId") Long questionId, @RequestBody Question newQuestion) throws JsonProcessingException {
        return questionService.editQuestionById(questionId, newQuestion);
    }
}
