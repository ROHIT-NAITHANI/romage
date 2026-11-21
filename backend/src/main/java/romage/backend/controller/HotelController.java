package romage.backend.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.web.bind.annotation.*;
import romage.backend.dto.CreateHotelDto;
import romage.backend.dto.HotelResponseDto;
import romage.backend.entities.User;
import romage.backend.exception.UserNotFoundException;
import romage.backend.service.HotelService;
import romage.backend.service.UserService;

import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
public class HotelController {

    private final UserService userService;
    private final HotelService hotelService;

    @GetMapping("hotels/{userId}")
    public ResponseEntity<List<HotelResponseDto>> getHotels(
            @PathVariable UUID userId,
            @AuthenticationPrincipal OidcUser oidcUser) {

        User user = getAuthenticatedUser(oidcUser);
        if (!user.getId().equals(userId)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        return ResponseEntity.ok(hotelService.getHotels(user.getId()));
    }

    @PostMapping("/admin/hotels")
    public ResponseEntity<HotelResponseDto> createHotel(
            @Valid @RequestBody CreateHotelDto dto) {

        HotelResponseDto response = hotelService.createHotel(dto);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    private User getAuthenticatedUser(OidcUser oidcUser) {
        return userService.findByProviderAndSubject(
                "google", oidcUser.getSubject()
        ).orElseThrow(() -> new UserNotFoundException("User not found"));
    }
}
