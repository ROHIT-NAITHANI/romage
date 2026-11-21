package romage.backend.dto;



import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;


public record CreateHotelDto(

        @NotBlank(message = "Hotel name is required")
        @Size(max = 150, message = "Hotel name cannot exceed 150 characters")
        String name,

        @NotBlank(message = "Hotel address is required")
        @Size(max = 255, message = "Hotel address cannot exceed 255 characters")
        String address,

        @NotBlank(message = "Hotel city is required")
        @Size(max = 100, message = "Hotel city cannot exceed 100 characters")
        String city,

        @NotBlank(message = "Hotel country is required")
        @Size(max = 100, message = "Hotel country cannot exceed 100 characters")
        String country,

        @NotBlank(message = "Contact number is required")
        @Size(max = 20, message = "Contact number cannot exceed 20 characters")
        String contactNumber,

        @NotBlank(message = "email is required")
        @Size(max = 50, message = "Contact number cannot exceed 20 characters")
        String email,

        @NotBlank
        @Email
        String ownerEmail



) {}