package romage.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.stereotype.Service;
import romage.backend.entities.User;
import romage.backend.repository.UserRepository;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public User registerOrUpdate(String provider , OidcUser oidcUser){

        String providerSubject = oidcUser.getSubject();
        String name = oidcUser.getClaimAsString("name");
        String email = oidcUser.getClaimAsString("email");

        Optional<User> existingUser = userRepository.findByProviderAndProviderSubject(provider, providerSubject);

        if (existingUser.isPresent()){
            User user = existingUser.get();
            user.setName(name);
            user.setEmail(email);

            return user;

        }

        User newUser = new User();
        newUser.setName(name);
        newUser.setEmail(email);
        newUser.setProvider(provider);
        newUser.setProviderSubject(providerSubject);

        return userRepository.save(newUser);



    }

    public  Optional<User> findByProviderAndSubject(String provider, String subject){

        return userRepository.findByProviderAndProviderSubject(provider,subject);
    }


}
