package romage.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import romage.backend.entities.User;
import romage.backend.exception.UserNotFoundException;
import romage.backend.service.UserService;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;

    @GetMapping("/")
    public String home(){
        return """
                PublicHome
                
                Login using : localhost/me
                """;
    }

    @GetMapping("/profile")
    public ResponseEntity<Map<String, Object>> getCurrentUser(
            @AuthenticationPrincipal OidcUser oidcUser) {

        User user = userService.findByProviderAndSubject("google", oidcUser.getSubject()).orElseThrow();

        Map<String,Object> response = new HashMap<>();

        response.put(
                "internaluserId",
                user.getId()
        );
        response.put(
                "provider",
                user.getProvider()
        );

        response.put(
                "subject",
                oidcUser.getSubject()
        );

        response.put(
                "name",
                oidcUser.getClaimAsString("name")
        );

        response.put(
                "email",
                user.getEmail()
        );



        return ResponseEntity.ok(response);

    }
}
