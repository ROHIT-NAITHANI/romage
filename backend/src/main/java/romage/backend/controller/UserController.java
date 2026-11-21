package romage.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import romage.backend.dto.UserResponseDto;
import romage.backend.entities.User;
import romage.backend.exception.UserNotFoundException;
import romage.backend.service.UserService;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/")
    public String home(){
        return """
                PublicHome
                
                Login using : localhost/me
                """;
    }

    @GetMapping("/user")
    public ResponseEntity<UserResponseDto> getCurrentUser(
            @AuthenticationPrincipal OidcUser oidcUser) {

        User user = userService.findByProviderAndSubject("google", oidcUser.getSubject()).orElseThrow(
                () -> new UserNotFoundException("UserNotFound")
        );

        UserResponseDto userResponseDto = new UserResponseDto(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getPlatformRole()
        );

        return ResponseEntity.ok(userResponseDto);

    }
}
