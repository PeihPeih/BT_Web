package nhom3.backend.examsystem.controller;

import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import lombok.RequiredArgsConstructor;
import nhom3.backend.examsystem.dto.ExamDto;
import nhom3.backend.examsystem.model.AnswerSheet;
import nhom3.backend.examsystem.model.Exam;
import nhom3.backend.examsystem.service.AnswerSheetServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/admin/statistic")
@RequiredArgsConstructor
public class StatisticController {
    @Autowired
    private EntityManager entityManager;

    private final AnswerSheetServices answerSheetServices;
    // thống kê tất cả các bài kiểm tra, điểm trung bình mỗi bài, tỉ lệ làm bài

    @GetMapping("/all")
    public List<ExamDto> findAllExamsWithStats() {
        List<ExamDto> exams = new ArrayList<>();
        List<Object[]> results = entityManager.createNativeQuery(
                "select exam.id, exam.name, exam.type, avg(answer_sheet.result), count(*) from exam left join answer_sheet on exam.id = answer_sheet.exam_id group by exam.id"
        ).getResultList();

         Object cnt = entityManager.createNativeQuery("select count(*) from user inner join user_role on user.user_id = user_role.user_id inner join role on user_role.role_id = role.role_id where role.authority = 'USER' group by user.user_id").getSingleResult();
         Long count = (Long) cnt;
        for (Object[] result : results) {
            Double avgResult =Double.parseDouble(result[3].toString());

            Long totalAnswersheets = (Long) result[4];

            ExamDto examDto = new ExamDto();
            examDto.setId((Long) result[0]);
            examDto.setName((String) result[1]);
            examDto.setType((String)result[2]);
            examDto.setAvgResult(avgResult);
            examDto.setAnswerSheetRatio((double) totalAnswersheets/count);

            exams.add(examDto);
        }

        return exams;
    }
    // xem danh sách kết quả tất cả bài thi của 1 sinh viên tìm bằng mã sinh viên
    @GetMapping("/{userId}")
    public List<AnswerSheet> findAllAnswerSheetsByUserId(@PathVariable("userId") long userId) {
        String query = "SELECT a FROM AnswerSheet a WHERE a.userId = :userId";
        Query q = entityManager.createQuery(query);
        q.setParameter("userId", userId);

        List<AnswerSheet> answersheets = q.getResultList();

        return answersheets;
    }
}
