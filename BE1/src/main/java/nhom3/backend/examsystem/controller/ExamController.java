package nhom3.backend.examsystem.controller;

import nhom3.backend.examsystem.model.Exam;
import nhom3.backend.examsystem.service.ExamService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/exam")
@CrossOrigin(origins = "http://localhost:8090")
public class ExamController {
    private final ExamService examService;

    // Get exam by id
    @GetMapping("/{examId}")
    public ResponseEntity<?> getExamById(@PathVariable("examId") Long examId){
        return examService.getExamById(examId);
    }

    // Get all exams
    @GetMapping("/get-all-exams")
    public ResponseEntity<?> getAllExams(){
        return examService.getAllExams();
    }

    // Create new exam
    @PostMapping("/create-exam")
    public ResponseEntity<?> createExam(@RequestBody Exam exam){
        return examService.createExam(exam);
    }

    // Delete exam by id
    @DeleteMapping("/delete-exam/{examId}")
    public ResponseEntity<?> deleteExamById(@PathVariable("examId") Long examId){
        return examService.deleteExamById(examId);
    }

    // Edit exam by id
    @PutMapping("/edit/{examId}")
    public ResponseEntity<?> editExam(@PathVariable("examId") Long examId, @RequestBody Exam newExam){
        return examService.editExamById(examId, newExam);
    }

    // Search exam by name
    @GetMapping("/exam-name/{examName}")
    public ResponseEntity<?> getExamByExamName(@PathVariable("examName") String examName){
        return examService.getExamByExamName(examName);
    }

    // Search exam by type
    @GetMapping("/exam-type/{examType}")
    public ResponseEntity<?> getExamByExamType(@PathVariable("examType") String examType){
        return examService.getExamByExamType(examType);
    }
}
