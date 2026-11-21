package romage.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import romage.backend.entities.HotelMembership;

import java.util.List;
import java.util.UUID;

public interface HotelMembershipRepository extends JpaRepository<HotelMembership , UUID> {

    List<HotelMembership> findByUserId(UUID userId);
}
