package nhom3.backend.examsystem.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import nhom3.backend.examsystem.model.Question;
import nhom3.backend.examsystem.model.QuestionType;
import nhom3.backend.examsystem.service.QuestionTypeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/questionType")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:8090")
public class QuestionTypeController {
    private final QuestionTypeService questionTypeService;

    // Create new question
    @PostMapping("/create-question-type/{questionId}")
    public ResponseEntity<?> createQuestion(@RequestBody QuestionType questiontype, @PathVariable("examId") Long questionId)  {
        return questionTypeService.createQuestionType(questiontype, questionId);
    }

    // Get question's by id
    @GetMapping("/{questionTypeId}")
    public ResponseEntity<?> getQuestionById(@PathVariable("questionTypeId") Long questionTypeId) {
        return questionTypeService.getQuestionTypeById(questionTypeId);
    }

    // Get all question's types
    @GetMapping("/get-all-question-types")
    public ResponseEntity<?> getAllQuestionTypes() {
        return questionTypeService.getAllQuestionTypes();
    }

    // Delete question's type by id
    @DeleteMapping("/delete/{questionTypeId}")
    public ResponseEntity<?> deleteQuestionTypeById(@PathVariable("questionTypeId") Long questionTypeId) {
        return questionTypeService.deleteQuestionTypeById(questionTypeId);
    }

    // Edit question's type by id
    @PutMapping("/edit/{questionTypeId}")
    public ResponseEntity<?> editQuestionTypeById(@PathVariable("questionTypeId") Long questionTypeId, @RequestBody QuestionType newQuestionType) {
        return questionTypeService.editQuestionTypeById(questionTypeId, newQuestionType);
    }
}
