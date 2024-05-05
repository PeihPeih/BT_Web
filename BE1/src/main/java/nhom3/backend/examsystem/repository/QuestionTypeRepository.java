package nhom3.backend.examsystem.repository;

import nhom3.backend.examsystem.model.Exam;
import nhom3.backend.examsystem.model.Question;
import nhom3.backend.examsystem.model.QuestionType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionTypeRepository extends JpaRepository<QuestionType, Long> {

}
