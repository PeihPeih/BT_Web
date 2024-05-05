package nhom3.backend.examsystem;

import nhom3.backend.examsystem.model.User;
import nhom3.backend.examsystem.repository.RoleRepository;
import nhom3.backend.examsystem.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;
import nhom3.backend.examsystem.model.Role;

import java.util.HashSet;
import java.util.Set;

@SpringBootApplication
public class ExamSystemApplication {

	public static void main(String[] args) {
		SpringApplication.run(ExamSystemApplication.class, args);
	}

	@Bean
	CommandLineRunner run(UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder){
		return args -> {

//			if(roleRepository.findByAuthority("ADMIN").isPresent()) System.out.println("ok");
//			Role adminRole = roleRepository.save(new Role("ADMIN"));
////			roleRepository.save(new Role("USER"));
//
//			Set<Role> roles = new HashSet<>();
//			roles.add(adminRole);
//
//			User admin = new User( "admin", passwordEncoder.encode("password"), roles);
//			userRepository.save(admin);
			if(roleRepository.findByAuthority("ADMIN").isPresent()) return;
			Role adminRole = roleRepository.save(new Role("ADMIN"));
			roleRepository.save(new Role("USER"));

			Set<Role> roles = new HashSet<>();
			roles.add(adminRole);

			User admin = new User( "admin", passwordEncoder.encode("password"), roles);

			userRepository.save(admin);
		};
	}
}
