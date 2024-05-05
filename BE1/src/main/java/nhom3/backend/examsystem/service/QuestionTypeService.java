package nhom3.backend.examsystem.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import nhom3.backend.examsystem.model.Exam;
import nhom3.backend.examsystem.model.Question;
import nhom3.backend.examsystem.model.QuestionType;
import nhom3.backend.examsystem.repository.QuestionRepository;
import nhom3.backend.examsystem.repository.QuestionTypeRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class QuestionTypeService {
    private final QuestionRepository questionRepository;

    private final QuestionTypeRepository questionTypeRepository;
    
//    @Autowired
//    public QuestionTypeService(QuestionRepository questionRepository, QuestionTypeRepository questionTypeRepository) {
//    	this.questionRepository = questionRepository;
//    	this.questionTypeRepository = questionTypeRepository;
//    }

    // Create
    public ResponseEntity<?> createQuestionType(QuestionType questionType, Long questionId) {
        Question question = questionRepository.findById(questionId).orElse(null);
        if(question==null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Not found the question by id");
        }
        QuestionType qt = new QuestionType();

        qt.setQuestionTypeId(questionId);
        qt.setName(questionType.getName());

        questionTypeRepository.save(qt);

        return ResponseEntity.ok(qt);
    }

    // Get question's type by id
    public ResponseEntity<?> getQuestionTypeById(Long questionTypeId){
        Optional<QuestionType> optionalQuestionType = questionTypeRepository.findById(questionTypeId);
        return ResponseEntity.ok(optionalQuestionType);
    }


    // Get all question's types
    public ResponseEntity<?> getAllQuestionTypes(){
        List<QuestionType> questionTypesList = questionTypeRepository.findAll();
        return ResponseEntity.ok(questionTypesList);
    }



    // Delete
    public ResponseEntity<?> deleteQuestionTypeById(Long questionTypeId){
        QuestionType qt = questionTypeRepository.findById(questionTypeId).orElseThrow();
        questionRepository.deleteById(questionTypeId);
        return ResponseEntity.status(HttpStatus.OK).body("Deleted question's type by id");
    }

    // Edit
    public ResponseEntity<?> editQuestionTypeById(Long questionTypeId, QuestionType newQuestionType) {
        QuestionType qt = questionTypeRepository.findById(questionTypeId).orElseThrow();

        qt.setQuestionTypeId(newQuestionType.getQuestionTypeId());
        qt.setName(newQuestionType.getName());

        questionTypeRepository.save(qt);

        return ResponseEntity.ok(qt);
    }
}
