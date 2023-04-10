package com.bootafoga.pms.controller;

import com.bootafoga.pms.model.User;
import com.bootafoga.pms.payload.dto.UserDTO;
import com.bootafoga.pms.payload.response.MessageResponse;
import com.bootafoga.pms.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/list")
    public List<User> list() {
        return (List<User>) userService.findAll();
    }

    @PostMapping("/save")
    public ResponseEntity<?> save(@RequestBody UserDTO userDTO) {
        User user = userService.mapProjectDtoToEntity(userDTO);
        userService.save(user);

        return ResponseEntity.ok(new MessageResponse("User saved successfully!"));
    }

    @PostMapping("/remove")
    public ResponseEntity<?> remove(@RequestBody UserDTO userDTO) {
        User user = userService.findById(userDTO.getId()).orElse(null);

        if (user != null){
            userService.remove(user);
        }

        return ResponseEntity.ok(new MessageResponse("User removed successfully!"));
    }
}
