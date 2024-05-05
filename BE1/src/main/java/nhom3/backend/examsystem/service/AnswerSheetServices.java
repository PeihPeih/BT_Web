package nhom3.backend.examsystem.service;

import nhom3.backend.examsystem.repository.AnswerSheetRepository;
import nhom3.backend.examsystem.model.AnswerSheet;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;


@Service
public class AnswerSheetServices {
//	@Autowired
	private final AnswerSheetRepository answerSheetRepository;
	private final AnswerServices answerServices;
	
	public AnswerSheetServices(AnswerSheetRepository answerSheetRepository, AnswerServices answerServices) {
		this.answerSheetRepository = answerSheetRepository;
		this.answerServices = answerServices;
	}
	
	// Get answer sheet by id
	public ResponseEntity<?> getAnswerSheetById(long id){
		Optional<AnswerSheet> optionalAnswerSheet = answerSheetRepository.findById(id);
		return ResponseEntity.ok(optionalAnswerSheet);
	}
	
	public ResponseEntity<?> createAnswerSheet(long examId, long userId, int result, List<Map<String, Object>> answers){
		AnswerSheet answerSheet = new AnswerSheet();
		answerSheet.setExamId(examId);
		answerSheet.setUserId(userId);
		answerSheet.setResult(result);
		
		answerSheetRepository.save(answerSheet);

		answerServices.createAnswers(answers, answerSheet.getId());
		return ResponseEntity.ok(answerSheet);
	}
}
