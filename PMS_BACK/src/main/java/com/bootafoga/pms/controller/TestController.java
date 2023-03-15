package com.bootafoga.pms.controller;

import com.bootafoga.pms.repository.UserRepository;
import com.bootafoga.pms.security.jwt.JwtTokenProvider;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
