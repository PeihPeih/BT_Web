package nhom3.backend.examsystem.service;

import nhom3.backend.examsystem.model.Exam;
import nhom3.backend.examsystem.repository.ExamRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ExamService {
    private final ExamRepository examRepository;
    
//    @Autowired
//    public ExamService(ExamRepository examRepository) {
//    	this.examRepository = examRepository;
//    }

    public ResponseEntity<?> getExamById(Long examId){
        Exam exam = examRepository.findById(examId).orElse(null);
        System.out.println(exam);

        if (exam == null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Can't find the exam by id");
        }
        return ResponseEntity.ok(exam);
    }

    // Create exam
    public ResponseEntity<?> createExam(Exam exam){


        examRepository.save(exam);

        return ResponseEntity.ok(exam);
    }

    // Delete exam
    public ResponseEntity<?> deleteExamById(Long examId){
        Exam exam = examRepository.findById(examId).orElse(null);

        if(exam==null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Not found the exam by id");
        }

        examRepository.deleteById(examId);

        return ResponseEntity.status(HttpStatus.OK).body("Deleted exam by id");
    }

    public ResponseEntity<?> getAllExams(){
        List<Exam> exams = examRepository.findAll();
        return ResponseEntity.ok(exams);
    }

    // Edit exam
    public ResponseEntity<?> editExamById(Long examId, Exam newExam){
        Exam exam = examRepository.findById(examId).orElse(null);

        if(exam==null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Not found the exam by id");
        }

        exam.setExamName(newExam.getExamName());
        exam.setExamType(newExam.getExamType());
        exam.setStartTime(newExam.getStartTime());
        exam.setEndTime(newExam.getEndTime());

        examRepository.save(exam);

        return ResponseEntity.status(HttpStatus.OK).body("Edited exam");
    }

    public ResponseEntity<?> getExamByExamName(String examName) {
        List<Exam> exam = examRepository.findByExamNameContaining(examName);

        return ResponseEntity.ok(exam);
    }

    public ResponseEntity<?> getExamByExamType(String examType) {
        List<Exam> exam = examRepository.findByExamTypeContaining(examType);

        return ResponseEntity.ok(exam);
    }
}
