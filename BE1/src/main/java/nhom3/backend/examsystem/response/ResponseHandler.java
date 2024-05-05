package nhom3.backend.examsystem.response;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class ResponseHandler {
	public static ResponseEntity<Object> getResponse(String message, HttpStatus status, Object data)
	{
		Map<String, Object> response = new HashMap<>();
		response.put("message", message);
		response.put("status", status);
		response.put("data", data);
		return new ResponseEntity<>(response, status);
	}
}