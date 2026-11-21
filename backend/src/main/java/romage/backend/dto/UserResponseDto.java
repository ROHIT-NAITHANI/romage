package romage.backend.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import romage.backend.enums.PlatformRole;

import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
public class UserResponseDto {
    private UUID uuid;
    private String name;
    private String email;
    private PlatformRole platformRole;
}
