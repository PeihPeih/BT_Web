package nhom3.backend.examsystem.model;

import java.util.List;

import org.json.JSONArray;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="answer")
public class Answer {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id")
	private Long id;
	@Column(name="question_id")
	private long questionId;
	@Column(name="answer_sheet_id")
	private long answerSheetId;
	@Column(name="choices")
	private String choices;
	
	public Answer() {
			
	}
	
	public Answer(Long id, long questionId, long answerSheetId, String choices) {
		this.id = id;
		this.questionId = questionId;
		this.answerSheetId = answerSheetId;
		this.choices = choices;
	}

	public long getQuestionId() {
		return questionId;
	}

	public void setQuestionId(long questionId) {
		this.questionId = questionId;
	}


	public String getChoices() {
		return choices;
	}

	public void setChoices(String choices) {
//		JSONArray jsa = new JSONArray(choices);
//		for(int i = 0; i < jsa.length(); ++i) {
//			this.choices.add(jsa.getString(i));
//		}
	}

	
	public void setChoices(List<String> choices) {
		
		this.choices = new JSONArray(choices).toString();
	}
	
	public long getAnswerSheetId() {
		return answerSheetId;
	}

	public void setAnswerSheetId(long answerSheetId) {
		this.answerSheetId = answerSheetId;
	}
	
}
