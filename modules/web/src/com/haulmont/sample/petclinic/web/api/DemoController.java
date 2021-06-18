package com.haulmont.sample.petclinic.web.api;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author kartushev
 * @version $
 */
@RestController("sample_DemoController")
@RequestMapping("/api")
public class DemoController {

    @GetMapping("/bark")
    public String bark() {
        return "Bark!";
    }
}
