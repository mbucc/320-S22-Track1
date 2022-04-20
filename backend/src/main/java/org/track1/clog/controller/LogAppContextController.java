package org.track1.clog.controller;

import org.springframework.data.domain.Example;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import javax.persistence.criteria.Predicate;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.track1.clog.model.LogAppContext;
import org.track1.clog.repository.LogAppContextRepository;
import org.springframework.data.jpa.convert.QueryByExamplePredicateBuilder;
import org.springframework.data.jpa.domain.Specification;


//api controller for business process logs
// @CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequestMapping("/api")
public class LogAppContextController {
    @Autowired
    LogAppContextRepository logAppContextRepository;
    
    
    @GetMapping("/log_app_context")
    public ResponseEntity<List<LogAppContext>> getQuery(@RequestParam(required = false) String global_instance_id, @RequestParam(required = false) String app_context_name, @RequestParam(required = false) String app_context_value){
        LogAppContext logAppC = new LogAppContext(global_instance_id,app_context_name,app_context_value);
        ExampleMatcher matcher = ExampleMatcher.matching().withIgnoreNullValues();
        Example<LogAppContext> lacQuery = Example.of(logAppC, matcher);
        try{
            List<LogAppContext> logs = logAppContextRepository.findAll(lacQuery);
            if (logs.isEmpty()){
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(logs, HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}