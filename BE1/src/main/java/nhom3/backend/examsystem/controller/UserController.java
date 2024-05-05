package nhom3.backend.examsystem.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/public")
@CrossOrigin("*")
public class UserController {
    @GetMapping("/")
    public String handleHome(){
        return "User accessed!";
    }
}
