package nhom3.backend.examsystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import nhom3.backend.examsystem.model.AnswerSheet;

@Repository
public interface AnswerSheetRepository extends JpaRepository<AnswerSheet, Long>{

}
