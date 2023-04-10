package com.bootafoga.pms.security.jwt;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

public class JwtUser implements UserDetails {
    private final String id;
    private final String username;
    private final String name;
    private final String email;
    private final String password;
    private final Collection<? extends GrantedAuthority> authorities;

    public JwtUser(String id, String username, String name, String email, String password,
                   Collection<? extends GrantedAuthority> authorities) {
        this.id = id;
        this.username = username;
        this.name = name;
        this.password = password;
        this.email = email;
        this.authorities = authorities;
    }



    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
