package com.showdrop.backend.service;

import com.showdrop.backend.dto.AuthUserResponse;
import com.showdrop.backend.dto.LoginRequest;
import com.showdrop.backend.dto.LoginResponse;
import com.showdrop.backend.dto.RegisterRequest;
import com.showdrop.backend.entity.User;
import com.showdrop.backend.exception.ResourceNotFoundException;
import com.showdrop.backend.repository.UserRepository;
import com.showdrop.backend.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    @Transactional
    public AuthUserResponse register(RegisterRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email already registered");
        }
        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail().trim().toLowerCase())
                .passwordHash(passwordEncoder.encode(request.getPassword()))
                .age(request.getAge())
                .phone(request.getPhone())
                .city(request.getCity())
                .role(com.showdrop.backend.enums.Role.USER)
                .isActive(true)
                .loyaltyPoints(0)
                .build();
        user = userRepository.save(user);
        return AuthUserResponse.from(user);
    }

    @Transactional(readOnly = true)
    public LoginResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail().trim().toLowerCase())
                .orElseThrow(() -> new BadCredentialsException("Invalid email or password"));
        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            throw new BadCredentialsException("Invalid email or password");
        }
        if (Boolean.FALSE.equals(user.getIsActive())) {
            throw new BadCredentialsException("Account is disabled");
        }
        String token = jwtService.generateToken(user.getEmail());
        long expiresInMs = jwtService.getExpirationMs();
        return LoginResponse.builder()
                .token(token)
                .type(LoginResponse.BEARER)
                .expiresInMs(expiresInMs)
                .user(AuthUserResponse.from(user))
                .build();
    }

    @Transactional(readOnly = true)
    public AuthUserResponse getCurrentUser(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return AuthUserResponse.from(user);
    }
}
