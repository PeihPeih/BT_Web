package nhom3.backend.examsystem.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="question")
public class Question{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long questionId;

    @Column(name = "content", length = 65535)
    private String content;

    @Column(name = "choices", length = 65535)
    private String choices;

    @Column(name = "correct_answer")
    private String correctAnswer;

    public void setContent(String content) {
        this.content = content;
    }

    public String getContent() {
        return content;
    }

    @Column(name = "exam_id")
    private Long examId;

    @Column(name = "question_type_id")
    private Long questionTypeId;

    public String getQuestionText() {
        return content;
    }

    public void setQuestionText(String questionText) {
        this.content = questionText;
    }

    public String getChoices() {
        return choices;
    }

    public void setChoices(List<String> choiceList) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        this.choices = objectMapper.writeValueAsString(choiceList);
    }

    public void setChoices(String choices){
        this.choices = choices;
    }

    public String getCorrectAnswer() {
        return correctAnswer;
    }

    public void setCorrectAnswer(List<String> correctAnswerList) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        this.choices = objectMapper.writeValueAsString(correctAnswerList);
    }

    public void setCorrectAnswer(String correctAnswer){
        this.correctAnswer = correctAnswer;
    }

    public Long getExamId() {
        return examId;
    }

    public void setExamId(Long examId) {
        this.examId = examId;
    }

    public Long getQuestionTypeId() {
        return questionTypeId;
    }

    public void setQuestionTypeId(Long questionTypeId) {
        this.questionTypeId = questionTypeId;
    }
    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "exam_id", insertable = false, updatable=false)
    private Exam exam;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "question_type_id", insertable = false, updatable=false)
    private QuestionType questionType;
}

