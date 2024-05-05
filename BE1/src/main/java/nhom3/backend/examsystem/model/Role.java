package nhom3.backend.examsystem.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;

@Setter
@Entity
@Table(name = "role")
public class Role  implements GrantedAuthority {
    @Getter
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="role_id")
    private Long roleId;

    private String authority;

    public Role(){
        super();
    }

    public Role(String authority){
        this.authority = authority;
    }
    public Role(Long id, String authority){
        this.roleId = id;
        this.authority = authority;
    }
    @Override
    public String getAuthority() {
        return this.authority;
    }

}
