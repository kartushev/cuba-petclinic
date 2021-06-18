package com.haulmont.sample.petclinic.service;

import org.springframework.stereotype.Service;

import java.util.Random;

@Service(MockService.NAME)
public class MockServiceBean implements MockService {

    @Override
    public String getRandomString() {
        return String.valueOf(new Random().nextLong());
    }
}