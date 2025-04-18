package com.htilssu.sport.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.htilssu.sport.data.dtos.LoginDto;
import com.htilssu.sport.data.models.Account;
import com.htilssu.sport.data.util.JwtUtil;
import com.htilssu.sport.repository.AccountRepository;
import org.springframework.validation.annotation.Validated;

@Service
public class LoginService {

    private final AccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public LoginService(AccountRepository accountRepository, PasswordEncoder passwordEncoder) {
        this.accountRepository = accountRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public String login(@Validated LoginDto loginDto) {
        Optional<Account> accountOpt = accountRepository.findByEmail(loginDto.email());

        if (accountOpt.isPresent()) {
            Account account = accountOpt.get();

            if (passwordEncoder.matches(loginDto.password(), account.getPassword())) {
                return JwtUtil.generateToken(account);
            }
        }
        return null;
    }
}