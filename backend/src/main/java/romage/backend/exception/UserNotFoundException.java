package romage.backend.exception;

public class UserNotFoundException extends RuntimeException {

    public UserNotFoundException(String errorMsg){
        super(errorMsg);

    }


}