package com.bootafoga.pms.security.jwt;

import com.bootafoga.pms.model.Role;
import com.bootafoga.pms.model.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

public final class JwtUserFactory {

    public JwtUserFactory(){
    }

    public static JwtUser create(User user) {
        List<GrantedAuthority> authorities = user.getRoles().stream()
                .map(role -> new SimpleGrantedAuthority(role.getName().name()))
                .collect(Collectors.toList());

        return new JwtUser(
                user.getId(),
                user.getUsername(),
                user.getUsername(),
                user.getEmail(),
                user.getPassword(),
                mapRolesToGrantedAuthorities(user.getRoles()));
    }

    private static List<GrantedAuthority> mapRolesToGrantedAuthorities(List<Role> userRoles){
        return userRoles.stream()
                .map(role -> new SimpleGrantedAuthority(role.getName().name()))
                .collect(Collectors.toList());
    }
}
