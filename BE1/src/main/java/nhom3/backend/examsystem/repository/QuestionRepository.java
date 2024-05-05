package nhom3.backend.examsystem.repository;

import nhom3.backend.examsystem.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {
    List<Question> findByExamId(Long examId);

    List<Question> findByQuestionTypeId(Long examId);

}
