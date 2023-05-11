package com.example.cafebackend.service;

import com.example.cafebackend.configuration.JWT.JWTUtil;
import com.example.cafebackend.dto.UserInfoDto;
import com.example.cafebackend.dto.UserLoginDto;
import com.example.cafebackend.dto.UserRegisterDto;
import com.example.cafebackend.entity.Order;
import com.example.cafebackend.entity.Role;
import com.example.cafebackend.entity.User;
import com.example.cafebackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private OrderService orderService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JWTUtil jwtUtil;


    public User save(User user) {
        return userRepository.save(user);
    }

    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    User findUserByUsername(String username) {
        return userRepository.findUserByUsername(username).orElse(null);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findUserByUsername(username).orElseThrow(() -> new UsernameNotFoundException("No user with username = " + username));
    }

    public User getUserAuth(Authentication authentication) {
        return (User) loadUserByUsername(authentication.getName());
    }

    public UserInfoDto mapToInfoDto(User user) {
        return UserInfoDto.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .roles(user.getRoles())
                .phone(user.getPhone())
                .build();
    }

    public ResponseEntity<?> validateRegister(UserRegisterDto userRegisterDto, BindingResult bindingResult) {

        if (existsByUsername(userRegisterDto.getUsername())) {
            bindingResult.addError(new FieldError("user", "username", "Пользователь с таким никнеймом уже существует"));
        }
        if (existsByEmail(userRegisterDto.getEmail())) {
            bindingResult.addError(new FieldError("user", "email", "Пользователь с такой почтой уже существует"));
        }
        if (bindingResult.hasErrors()) {
            return new ResponseEntity<>(bindingResult.getFieldErrors(), HttpStatus.CONFLICT);
        } else {
            User user = registerUser(userRegisterDto);
            Order order = Order.builder().user(user).build();
            orderService.save(order);
            String token = jwtUtil.generateToken(userRegisterDto.getUsername());
            return new ResponseEntity<>(Collections.singletonMap("token", token), HttpStatus.ACCEPTED);
        }
    }

    public User registerUser(UserRegisterDto userRegisterDto) {
        User user = User.builder()
                .username(userRegisterDto.getUsername())
                .email(userRegisterDto.getEmail())
                .phone(userRegisterDto.getPhone())
                .roles(Set.of(Role.ROLE_USER))
                .password(passwordEncoder.encode(userRegisterDto.getPassword()))
                .build();
        return save(user);
    }

    public ResponseEntity<?> loginUser(UserLoginDto userLoginDto) {

        UsernamePasswordAuthenticationToken authInputToken =
                new UsernamePasswordAuthenticationToken(userLoginDto.getUsername(), userLoginDto.getPassword());
        authenticationManager.authenticate(authInputToken);
        Map<String, Object> map = new HashMap<>();
        String token = jwtUtil.generateToken(userLoginDto.getUsername());
        map.put("token", token);
        User user = findUserByUsername(userLoginDto.getUsername());
        UserInfoDto userInfo = mapToInfoDto(user);
        map.put("user", userInfo);
        return new ResponseEntity<>(map, HttpStatus.ACCEPTED);

    }

    public ResponseEntity<?> showUserInfo(Authentication authentication) {
        User user = getUserAuth(authentication);
        UserInfoDto userInfo = mapToInfoDto(user);
        return ResponseEntity.ok(userInfo);
    }
}
