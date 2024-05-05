package nhom3.backend.examsystem.repository;

import nhom3.backend.examsystem.model.Exam;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface ExamRepository extends JpaRepository<Exam, Long> {
    List<Exam> findByExamNameContaining(String examName);

    List<Exam> findByExamTypeContaining(String examType);
}
