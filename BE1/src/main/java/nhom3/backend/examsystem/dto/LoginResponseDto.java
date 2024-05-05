package nhom3.backend.examsystem.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.extern.java.Log;
import nhom3.backend.examsystem.model.User;

public class LoginResponseDto {
    @Getter
    @Setter
    private User user;
    @Getter
    @Setter
    private String jwt;

    public LoginResponseDto(){
        super();
    }

    public LoginResponseDto(User user, String jwt) {
        this.user = user;
        this.jwt = jwt;
    }
}
