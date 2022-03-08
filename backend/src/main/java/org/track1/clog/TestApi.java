package org.track1.clog;

import javax.persistence.Entity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Entity
@RestController
@RequestMapping("/api")
public class TestApi {

    @GetMapping("")
    public String hello() {
        return "Hello from s6e";
    }
}
