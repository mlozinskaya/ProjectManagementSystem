package com.bootafoga.pms.controller;

import com.bootafoga.pms.model.ERole;
import com.bootafoga.pms.model.Role;
import com.bootafoga.pms.model.User;
import com.bootafoga.pms.payload.request.LoginRequest;
import com.bootafoga.pms.payload.request.SignupRequest;
import com.bootafoga.pms.payload.response.MessageResponse;
import com.bootafoga.pms.repository.RoleRepository;
import com.bootafoga.pms.repository.UserRepository;
import com.bootafoga.pms.security.jwt.JwtTokenProvider;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;


@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final RoleRepository roleRepository;
    private final PasswordEncoder encoder;

    @Autowired
    public AuthController(AuthenticationManager authenticationManager,
                          UserRepository userRepository, JwtTokenProvider jwtTokenProvider,
                          RoleRepository roleRepository, PasswordEncoder encoder) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.jwtTokenProvider = jwtTokenProvider;
        this.roleRepository = roleRepository;
        this.encoder = encoder;
    }

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        String username = loginRequest.getUsername();

        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, loginRequest.getPassword()));

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User with name " + username + " not found"));

        String token = jwtTokenProvider.createToken(username, user.getRoles());
        List<ERole> roles = user.getRoles().stream().map(Role::getName).collect(Collectors.toList());
        Map<Object, Object> response = new HashMap<>();
        response.put("username", username);
        response.put("userId", user.getId());
        response.put("token", token);
        response.put("roles", roles);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Username is already taken!"));
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email is already in use!"));
        }

        // Create new user's account
        User user = new User(signUpRequest.getUsername(),
                signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword()));

        Set<String> strRoles = signUpRequest.getRole();
        List<Role> roles = new ArrayList<>();

        if (strRoles == null) {
            Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(userRole);
        } else {
            strRoles.forEach(role -> {
                ERole roleType;

                switch (role) {
                    case "admin":
                        roleType = ERole.ROLE_ADMIN;
                        break;
                    case "mod":
                        roleType = ERole.ROLE_MODERATOR;
                        break;
                    default:
                        roleType = ERole.ROLE_USER;
                        break;
                }

                Role newRole = roleRepository.findByName(roleType)
                        .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                roles.add(newRole);
            });
        }

        user.setRoles(roles);
        userRepository.save(user);

        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }
}
