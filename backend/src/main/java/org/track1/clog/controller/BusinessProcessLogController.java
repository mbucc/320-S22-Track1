package org.track1.clog.controller;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.track1.clog.model.BusinessProcessLog;
import org.track1.clog.repository.BusinessProcessLogRepository;


//api controller for business process logs
@CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequestMapping("/api")
public class BusinessProcessLogController {
    @Autowired
    BusinessProcessLogRepository bpLogRepository;

    @GetMapping("/business_process_logs")
    public ResponseEntity<List<BusinessProcessLog>> getAllBusinessProcessLogs(@RequestParam(required = false) String eai_transaction_id){
        try{
            List<BusinessProcessLog> logs = new ArrayList<BusinessProcessLog>();
            if(eai_transaction_id.isEmpty()){
                bpLogRepository.findAll().forEach(logs::add);
            }else{
                bpLogRepository.findByEaiTransactionId(eai_transaction_id).forEach(logs::add);
            }
            if(logs.isEmpty()){
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(logs, HttpStatus.OK);
        } catch(Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/business_process_logs/eai_domain")
    public ResponseEntity<List<BusinessProcessLog>> getByEaiDomain(@RequestParam String eai_domain){
        try{
            List<BusinessProcessLog> logs = bpLogRepository.findByEaiDomain(eai_domain);
            if (logs.isEmpty()){
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(logs, HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/business_process_logs/publishing_business_domain")
    public ResponseEntity<List<BusinessProcessLog>> getByPublishingDomain(@RequestParam String publishing_business_domain){
        try{
            List<BusinessProcessLog> logs = bpLogRepository.findByPublishingBusinessDomain(publishing_business_domain);
            if (logs.isEmpty()){
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(logs, HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/business_process_logs/business_process")
    public ResponseEntity<List<BusinessProcessLog>> getByBusinessProcess(@RequestParam String business_process) {
        try {
          List<BusinessProcessLog> logs = bpLogRepository.findByBusinessProcess(business_process);
          if (logs.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
          }
          return new ResponseEntity<>(logs, HttpStatus.OK);
        } catch (Exception e) {
          return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
      }

    //get all business process logs between two times, all timestamps must follow this format: 'yyyy-dd-mm hh.mi.ss.ms' 
    //for example 01-JAN-22 12.55.03.480000 AM would be 2022-01-01 00:55:03.480000
    @GetMapping("/business_process_logs/between_eai_transaction_time")
    public ResponseEntity<List<BusinessProcessLog>> getBetween(@RequestParam Timestamp eai_transaction_time_first, Timestamp eai_transaction_time_last){
        try{
            List<BusinessProcessLog> logs = bpLogRepository.findByEaiTransactionCreateTimeBetween(eai_transaction_time_first,eai_transaction_time_last);
            if (logs.isEmpty()){
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(logs, HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //get all business process logs after a certain time, same format as above
    @GetMapping("/business_process_logs/after_eai_transaction_time")
    public ResponseEntity<List<BusinessProcessLog>> getAfter(@RequestParam Timestamp eai_transaction_time){
        try{
            List<BusinessProcessLog> logs = bpLogRepository.findByEaiTransactionCreateTimeAfter(eai_transaction_time);
            if (logs.isEmpty()){
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(logs, HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //using request mapping so that key1_app_context_name is in the url
    @RequestMapping(value = "/business_process_logs/{key1}", method= RequestMethod.GET)
    public ResponseEntity<List<BusinessProcessLog>> getByKey1NameAndValue(@PathVariable(value="key1") String key1_app_context_name, @RequestParam String key1_app_context_value) {
        try {
          List<BusinessProcessLog> logs = bpLogRepository.findByKey1AppContextNameAndKey1AppContextValue(key1_app_context_name, key1_app_context_value);
          if (logs.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
          }
          return new ResponseEntity<>(logs, HttpStatus.OK);
        } catch (Exception e) {
          return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
      }    

    
    
    

      
}
