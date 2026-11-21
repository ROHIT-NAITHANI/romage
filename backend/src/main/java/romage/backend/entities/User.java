package romage.backend.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import romage.backend.enums.PlatformRole;

import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    private String providerSubject;

    private String provider;

    private String password;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PlatformRole platformRole = PlatformRole.USER;
}