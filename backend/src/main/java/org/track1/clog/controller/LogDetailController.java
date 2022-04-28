package org.track1.clog.controller;

import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import java.util.ArrayList;
import java.sql.Timestamp;
import java.util.List;
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
import org.springframework.data.jpa.convert.QueryByExamplePredicateBuilder;
import org.springframework.data.jpa.domain.Specification;
import javax.persistence.criteria.Predicate;

@CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequestMapping("/api")
public class LogDetailController {
    @Autowired
    LogDetailRepository logDetailRepository;

    @GetMapping("/log_detail")
    //severity_low - lower bound, severity_high - upper bound, same for priority
    //all timestamps must follow this format: 'yyyy-dd-mm hh.mi.ss.ms' for example 01-JAN-22 12.55.03.480000 AM would be 2022-01-01 00:55:03.480000
    public ResponseEntity<List<LogDetail>> getByGlobalInstanceId(@RequestParam(required = false) String global_instance_id, @RequestParam(required = false) String business_domain, @RequestParam(required = false) String business_subdomain,
                                                           @RequestParam(required = false) String version, @RequestParam(required = false) String local_instance_id, @RequestParam(required = false) String eai_transaction_id,
                                                           @RequestParam(required = false) String eai_domain, @RequestParam(required = false) String hostname, @RequestParam(required = false) String application,
                                                           @RequestParam(required = false) String event_context, @RequestParam(required = false) String component, @RequestParam boolean sev_info, 
                                                           @RequestParam boolean sev_warn,@RequestParam boolean sev_err, @RequestParam boolean priority_low, @RequestParam boolean priority_med, @RequestParam boolean priority_high, 
                                                           @RequestParam(required = false) Timestamp creation_time_start, @RequestParam(required = false) Timestamp creation_time_end,
                                                           @RequestParam(required = false) String reasoning_scope, @RequestParam(required = false) Integer process_id, @RequestParam(required = false) String category_name,
                                                           @RequestParam(required = false) String activity, @RequestParam(required = false) String msg) {
        
        LogDetail logExample = new LogDetail(global_instance_id,business_domain,business_subdomain,version,local_instance_id,eai_transaction_id,eai_domain,hostname,application,event_context,component,null,null,null,reasoning_scope,process_id,category_name,activity,msg); 
        ExampleMatcher matcher = ExampleMatcher.matching().withIgnoreNullValues();
        Example<LogDetail> logQuery = Example.of(logExample,matcher); 
        try {
            List<LogDetail> logs = logDetailRepository.findAll(getByDatesPriority(sev_info,sev_warn,sev_err,priority_low,priority_med,priority_high,creation_time_start,creation_time_end,logQuery));
            // no data
            if (logs.isEmpty()){
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(logs, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //no longer accepts ranges for severity
    public Specification<LogDetail> getByDatesPriority(boolean sev_info, boolean sev_warn, boolean sev_err, boolean priority_low, boolean priority_med, boolean priority_high, Timestamp start, Timestamp end, Example<LogDetail> example){
        return  (root,query,builder) -> {
            final List<Predicate> predicates = new ArrayList<Predicate>();
            //predicates for each type of severity
            Predicate predInfo = builder.between(root.get("severity"), 10, 29);
            Predicate predWarn = builder.between(root.get("severity"),30,49);
            Predicate predErr = builder.greaterThanOrEqualTo(root.get("severity"),50);
            Predicate allSevPred = builder.disjunction();

            //predicates for each type of severity
            Predicate predLow = builder.equal(root.get("priority"), 10);
            Predicate predMed = builder.equal(root.get("priority"),50);
            Predicate predHigh = builder.equal(root.get("priority"),70);
            Predicate allPrioPred = builder.disjunction();

            if (sev_info){
                allSevPred = builder.or(allSevPred,predInfo);
            }
            if (sev_warn){
                allSevPred = builder.or(allSevPred,predWarn);
            }
            if (sev_err){
                allSevPred = builder.or(allSevPred,predErr);
            }
            //add severity predicates
            predicates.add(allSevPred);

            if (priority_low){
                allPrioPred = builder.or(allPrioPred,predLow);
            }
            if (priority_med){
                allPrioPred = builder.or(allPrioPred,predMed);
            }
            if (priority_high){
                allPrioPred = builder.or(allPrioPred,predHigh);
            }
            //add priority predicates
            predicates.add(allPrioPred);



            //date time ranges
            if (start != null){
                predicates.add(builder.greaterThanOrEqualTo(root.get("creationTime"), start));
            }
            if (end != null){
                predicates.add(builder.lessThanOrEqualTo(root.get("creationTime"), end));
            }

            predicates.add(QueryByExamplePredicateBuilder.getPredicate(root, builder, example));
            Predicate[] predArr = predicates.toArray(new Predicate[predicates.size()]);
            return builder.and(predArr);
        };
    }

    @GetMapping("/log_detail_unique")
    public ResponseEntity<List<String>> getByDistinct(@RequestParam(required = false) String columnName){
        
        try{
            List<String> list = new ArrayList<>();

            switch (columnName) {

                case "eai_domain": list = logDetailRepository.getDistinctLogDetailByEaiDomain();
                break;

                case "business_domain": list = logDetailRepository.getDistinctLogDetailByBusinessDomain();
                break;
                
                case "business_subdomain": list = logDetailRepository.getDistinctLogDetailByBusinessSubDomain();
                break;
                
                case "application": list = logDetailRepository.getDistinctLogDetailByApplication();
                break;

                case "event_context": list = logDetailRepository.getDistinctLogDetailByEventContext();
                break;

                case "component": list = logDetailRepository.getDistinctLogDetailByComponent();
                break;
            }

            if (list.isEmpty()){
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(list,HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}