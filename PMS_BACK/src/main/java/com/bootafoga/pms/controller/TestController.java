package com.bootafoga.pms.controller;

import com.bootafoga.pms.model.ERole;
import com.bootafoga.pms.model.Role;
import com.bootafoga.pms.model.User;
import com.bootafoga.pms.payload.request.LoginRequest;
import com.bootafoga.pms.repository.UserRepository;
import com.bootafoga.pms.security.jwt.JwtTokenProvider;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/test")
public class TestController {
	private final AuthenticationManager authenticationManager;
	private final UserRepository userRepository;
	private final JwtTokenProvider jwtTokenProvider;

	public TestController(AuthenticationManager authenticationManager,
						  UserRepository userRepository,
						  JwtTokenProvider jwtTokenProvider) {
		this.authenticationManager = authenticationManager;
		this.userRepository = userRepository;
		this.jwtTokenProvider = jwtTokenProvider;
	}


	@CrossOrigin
	@GetMapping("/all")
	public String allAccess() {
		return "Public Content.";
	}

	@CrossOrigin
	@GetMapping("/user")
	public String userAccess() {
		return "User Content.";
	}

	@GetMapping("/mod")
	public String moderatorAccess() {
		return "Moderator Board.";
	}

	@GetMapping("/admin")
	public String adminAccess() {
		return "Admin Board.";
	}

	@PostMapping("/test")
	public ResponseEntity<?> test(@Valid @RequestBody LoginRequest loginRequest) {
		String username = loginRequest.getUsername();

		authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, loginRequest.getPassword()));

		User user = userRepository.findByUsername(username)
				.orElseThrow(() -> new UsernameNotFoundException("User with name " + username + " not found"));

		String token = jwtTokenProvider.createToken(username, user.getRoles());
		List<ERole> roles = user.getRoles().stream().map(Role::getName).collect(Collectors.toList());
		Map<Object, Object> response = new HashMap<>();
		response.put("username", username);
		response.put("token", token);
		response.put("roles", roles);
		return ResponseEntity.ok(response);
	}
}
