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
import org.track1.clog.model.BusinessProcess;
import org.track1.clog.repository.BusinessProcessRepository;
import org.springframework.data.jpa.convert.QueryByExamplePredicateBuilder;
import org.springframework.data.jpa.domain.Specification;

@CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequestMapping("/api")
public class BusinessProcessController {
    @Autowired
    BusinessProcessRepository bpRepository;

    @GetMapping("/business_process")
    public ResponseEntity<List<BusinessProcess>> getQuery(@RequestParam(required = false) String business_process,@RequestParam(required = false) String publishing_domain, @RequestParam(required = false) String key1_name, @RequestParam(required = false) String key2_name){
        BusinessProcess bpExample = new BusinessProcess(business_process, publishing_domain, key1_name, key2_name);
        ExampleMatcher matcher = ExampleMatcher.matching().withIgnoreNullValues();
        Example<BusinessProcess> bpQuery = Example.of(bpExample,matcher);
        try{
            List<BusinessProcess> logs = bpRepository.findAll(bpQuery);
            if (logs.isEmpty()){
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(logs, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
    @GetMapping("/business_process_unique")
    public ResponseEntity<List<String>> getByDistinct(){
        
        try{
            List<String> list = bpRepository.getDistinctBusinessProcessByBusinessProcess();
            list.addAll(bpRepository.getDistinctBusinessProcessByPublishingBusinessDomain());
            list.addAll(bpRepository.getDistinctBusinessProcessByKey1AppContextName());
            list.addAll(bpRepository.getDistinctBusinessProcessByKey2AppContextName());

            if (list.isEmpty()){
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(list,HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    **/
}