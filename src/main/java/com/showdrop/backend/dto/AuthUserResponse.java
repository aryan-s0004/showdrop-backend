package com.showdrop.backend.dto;

import com.showdrop.backend.entity.User;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AuthUserResponse {

    private Long id;
    private String name;
    private String email;
    private Integer age;
    private String phone;
    private String city;
    private String role;

    public static AuthUserResponse from(User user) {
        return AuthUserResponse.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .age(user.getAge())
                .phone(user.getPhone())
                .city(user.getCity())
                .role(user.getRole() != null ? user.getRole().name() : "USER")
                .build();
    }
}
