package org.track1.clog.controller;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.track1.clog.model.LogDetail;
import org.track1.clog.repository.LogDetailRepository;

@CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequestMapping("/api")
public class LogDetailController {
    @Autowired
    LogDetailRepository logDetailRepository;

    @GetMapping("/log_detail")
    public ResponseEntity<LogDetail> getByGlobalInstanceId(@RequestParam String globalInstanceId) {
        try {
            Optional<LogDetail> logDetails = logDetailRepository.findById(globalInstanceId);

            // no data
            if (!logDetails.isPresent())
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);

            return new ResponseEntity<>(logDetails.get(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
