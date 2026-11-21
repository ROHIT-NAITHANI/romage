package romage.backend.dto;

import java.util.UUID;

public record HotelResponseDto(
        UUID id,
        String name,
        String address,
        String phone
) {}