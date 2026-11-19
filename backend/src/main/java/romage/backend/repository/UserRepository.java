package romage.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import romage.backend.entities.User;

import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {

    Optional<User> findByProviderAndProviderSubject(String provider, String providerSubject);

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);

}