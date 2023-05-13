package com.bootafoga.pms.service;

import com.bootafoga.pms.model.User;
import com.bootafoga.pms.payload.dto.UserDTO;
import com.bootafoga.pms.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Iterable<User> findAll(){
        return userRepository.findAll();
    }

    public User findById(String id){
        return userRepository.findById(id).orElse(null);
    }

    public void remove(User user){
        userRepository.delete(user);
    }

    public User save(User user){
        return userRepository.save(user);
    }

    public User mapProjectDtoToEntity(UserDTO userDTO) {
        User user = new User();
        user.setId(userDTO.getId());
        return user;
    }
}
