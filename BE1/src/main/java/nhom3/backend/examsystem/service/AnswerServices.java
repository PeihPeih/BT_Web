package nhom3.backend.examsystem.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import nhom3.backend.examsystem.model.Answer;
import nhom3.backend.examsystem.repository.AnswerRepository;

@Service
public class AnswerServices {

	@Autowired
	private final AnswerRepository answerRepository;
	public AnswerServices(AnswerRepository answerRespository) {
		this.answerRepository = answerRespository;
	}

	public ResponseEntity<?> createAnswer(long questionId, long answerSheetId, List<String> choices){
		Answer answer = new Answer();
		answer.setQuestionId(questionId);
		answer.setAnswerSheetId(answerSheetId);
		answer.setChoices(choices);
		answerRepository.save(answer);
		return null;
	}
	
	
	public ResponseEntity<?> createAnswers(List<Map<String, Object>> answers, long answerSheetId){
		for(int i = 0; i < answers.size(); ++i) {
			Map<String, Object> answer = answers.get(i);
			Integer questionIdInt = (Integer) answer.get("questionId");
			Long questionId = Long.valueOf(questionIdInt.longValue());
			String choicesJson = (String) answer.get("choices");

			JSONArray jsa = new JSONArray(choicesJson);
			List<String> choices = new ArrayList<String>();
			for(int j = 0; j < jsa.length(); ++j) {
				choices.add(jsa.getString(j));
			}
			this.createAnswer(questionId, answerSheetId, choices);
		}
		return null;
	}
}
