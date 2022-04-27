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
import org.track1.clog.model.BusinessProcessLog;
import org.track1.clog.repository.BusinessProcessLogRepository;
import org.springframework.data.jpa.convert.QueryByExamplePredicateBuilder;
import org.springframework.data.jpa.domain.Specification;


//api controller for business process logs
@CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequestMapping("/api")
public class BusinessProcessLogController {
    @Autowired
    BusinessProcessLogRepository bpLogRepository;
    
    //no filtering done on null variables
    //eai_transaction_time_start - time to filter for all times >= eai_transaction_time_start
    //eai_transaction_time_end - time to filter for all times <= eai_transaction_time_end
    //all timestamps must follow this format: 'yyyy-dd-mm hh.mi.ss.ms' for example 01-JAN-22 12.55.03.480000 AM would be 2022-01-01 00:55:03.480000
    @GetMapping("/business_process_logs")
    public ResponseEntity<List<BusinessProcessLog>> getQuery(@RequestParam(required = false) String eai_transaction_id, @RequestParam(required = false) String eai_domain, @RequestParam(required = false) String publishing_business_domain, 
                                                            @RequestParam(required = false) String business_process, @RequestParam(required = false) Timestamp eai_transaction_time_start, @RequestParam(required = false) Timestamp eai_transaction_time_end, @RequestParam(required = false) String key1_app_context_name, 
                                                            @RequestParam(required = false) String key1_app_context_value, @RequestParam(required = false) String key2_app_context_name, @RequestParam(required = false) String key2_app_context_value,
                                                            @RequestParam(required = false) String global_instance_id, @RequestParam(required = false) String business_domain, @RequestParam(required = false) String application,
                                                            @RequestParam(required = false) String activity){
        BusinessProcessLog bpLog = new BusinessProcessLog(eai_transaction_id,eai_domain,publishing_business_domain,business_process,null,key1_app_context_name,key1_app_context_value,key2_app_context_name,key2_app_context_value,global_instance_id,business_domain,application,activity);
        ExampleMatcher matcher = ExampleMatcher.matching().withIgnoreNullValues();
        Example<BusinessProcessLog> exampleQuery = Example.of(bpLog, matcher);
        try{
            List<BusinessProcessLog> logs = bpLogRepository.findAll(getFromDates(eai_transaction_time_start, eai_transaction_time_end,exampleQuery));
            if (logs.isEmpty()){
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(logs, HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //builds a specification object to extend functionality for ExampleMatcher queries to finding ranges
    public Specification<BusinessProcessLog> getFromDates(Timestamp start, Timestamp end, Example<BusinessProcessLog> example){
        return (root, query, builder) -> {
            final List<Predicate> predicates = new ArrayList<Predicate>();
            if (start != null){
                predicates.add(builder.greaterThanOrEqualTo(root.get("eaiTransactionCreateTime"), start));
            }
            if (end != null){
                predicates.add(builder.lessThanOrEqualTo(root.get("eaiTransactionCreateTime"), end));
            }
            predicates.add(QueryByExamplePredicateBuilder.getPredicate(root, builder, example));
            Predicate[] predArr = predicates.toArray(new Predicate[predicates.size()]);
            return builder.and(predArr);
        };
    }

    @GetMapping("/business_process_logs_unique")
    public ResponseEntity<List<String>> getByDistinct(@RequestParam(required = false) String columnName){
        
        try{
            List<String> list = new ArrayList<>();

            switch (columnName) {

                case "eai_domain": list = bpLogRepository.getDistinctBusinessProcessLogByEaiDomain();
                break;

                case "publishing_business_domain": list = bpLogRepository.getDistinctBusinessProcessLogByPublishingBusinessDomain();
                break;

                case "business_domain": list = bpLogRepository.getDistinctBusinessProcessLogByBusinessDomain();
                break;
            }

            // List<String> list = bpLogRepository.getDistinctBusinessProcessLogByEaiTransactionId();
            // list.addAll(bpLogRepository.getDistinctBusinessProcessLogByEaiDomain());
            // list.addAll(bpLogRepository.getDistinctBusinessProcessLogByPublishingBusinessDomain());
            // list.addAll(bpLogRepository.getDistinctBusinessProcessLogByBusinessProcess());
            // list.addAll(bpLogRepository.getDistinctBusinessProcessLogByKey1AppContextName());
            // list.addAll(bpLogRepository.getDistinctBusinessProcessLogByKey1AppContextValue());
            // list.addAll(bpLogRepository.getDistinctBusinessProcessLogByKey2AppContextName());
            // list.addAll(bpLogRepository.getDistinctBusinessProcessLogByKey2AppContextValue());
            // list.addAll(bpLogRepository.getDistinctBusinessProcessLogByGlobalInstanceId());
            // list.addAll(bpLogRepository.getDistinctBusinessProcessLogByBusinessDomain());
            // list.addAll(bpLogRepository.getDistinctBusinessProcessLogByApplication());
            // list.addAll(bpLogRepository.getDistinctBusinessProcessLogByActivity());

            if (list.isEmpty()){
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(list,HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

      
}
