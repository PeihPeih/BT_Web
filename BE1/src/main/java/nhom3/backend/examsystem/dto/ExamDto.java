package nhom3.backend.examsystem.dto;

public class ExamDto {
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Double getAvgResult() {
        return avgResult;
    }

    public void setAvgResult(Double avgResult) {
        this.avgResult = avgResult;
    }

    public Double getAnswerSheetRatio() {
        return answerSheetRatio;
    }

    public void setAnswerSheetRatio(Double answerSheetRatio) {
        this.answerSheetRatio = answerSheetRatio;
    }

    private Long id;
    private String name;
    private String type;
    private Double avgResult;
    private Double answerSheetRatio;

    // ... getters and setters
}
