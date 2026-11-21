package romage.backend.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import romage.backend.dto.CreateHotelDto;
import romage.backend.dto.HotelResponseDto;
import romage.backend.entities.Hotel;
import romage.backend.entities.HotelMembership;
import romage.backend.entities.User;
import romage.backend.enums.HotelRole;
import romage.backend.exception.UserNotFoundException;
import romage.backend.repository.HotelMembershipRepository;
import romage.backend.repository.HotelRepository;
import romage.backend.repository.UserRepository;

import java.util.List;
import java.util.UUID;


@Service
@RequiredArgsConstructor
public class HotelService {

    private final UserRepository userRepository;
    private final HotelRepository hotelRepository;
    private final HotelMembershipRepository hotelMembershipRepository;

    @Transactional
    public HotelResponseDto createHotel(CreateHotelDto dto) {

        User user = userRepository.findByEmail(dto.ownerEmail())
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        Hotel hotel = new Hotel();
        hotel.setName(dto.name());
        hotel.setAddress(dto.address());
        hotel.setCity(dto.city());
        hotel.setCountry(dto.country());
        hotel.setPhone(dto.contactNumber());
        hotel.setEmail(dto.email());

        hotel = hotelRepository.save(hotel);

        HotelMembership membership = new HotelMembership();
        membership.setHotel(hotel);
        membership.setUser(user);
        membership.setHotelRole(HotelRole.OWNER);

        hotelMembershipRepository.save(membership);

        return new HotelResponseDto(
                hotel.getId(),
                hotel.getName(),
                hotel.getAddress(),
                hotel.getPhone()
        );
    }

    @Transactional
    public List<HotelResponseDto> getHotels(UUID userId) {

        List<HotelMembership> memberships =
                hotelMembershipRepository.findByUserId(userId);

        return memberships.stream()
                .map(membership -> {
                    Hotel hotel = membership.getHotel();

                    return new HotelResponseDto(
                            hotel.getId(),
                            hotel.getName(),
                            hotel.getAddress(),
                            hotel.getPhone()
                    );
                })
                .toList();
    }

}