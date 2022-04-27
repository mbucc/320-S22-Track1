package org.track1.clog.repository;
import java.util.List;
import org.springframework.data.jpa.repository.Query;
//import org.springframework.data.jpa.domain.Specification;
//import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;
import org.track1.clog.model.BusinessProcessLog;
import java.sql.Timestamp;

@Repository
public interface BusinessProcessLogRepository extends ReadOnlyRepository<BusinessProcessLog, String>, JpaSpecificationExecutor<BusinessProcessLog> {
    @Query(nativeQuery = true, value = "SELECT DISTINCT a.EAI_TRANSACTION_ID FROM BusinessProcessLog a")
    List<String>getDistinctBusinessProcessLogByEaiTransactionId();
    
    @Query(nativeQuery = true, value = "SELECT DISTINCT a.EAI_DOMAIN FROM BUSINESS_PROCESS_LOG_T a")
    List<String>getDistinctBusinessProcessLogByEaiDomain();

    @Query(nativeQuery = true, value = "SELECT DISTINCT a.PUBLISHING_BUSINESS_DOMAIN FROM BUSINESS_PROCESS_LOG_T a")
    List<String>getDistinctBusinessProcessLogByPublishingBusinessDomain();
    
    @Query(nativeQuery = true, value = "SELECT DISTINCT a.BUSINESS_PROCESS FROM BUSINESS_PROCESS_LOG_T a")
    List<String>getDistinctBusinessProcessLogByBusinessProcess();
    
    @Query(nativeQuery = true, value = "SELECT DISTINCT a.KEY1_APP_CONTEXT_NAME FROM BUSINESS_PROCESS_LOG_T a")
    List<String>getDistinctBusinessProcessLogByKey1AppContextName();
    
    @Query(nativeQuery = true, value = "SELECT DISTINCT a.KEY1_APP_CONTEXT_VALUE FROM BUSINESS_PROCESS_LOG_T a")
    List<String>getDistinctBusinessProcessLogByKey1AppContextValue();
   
    @Query(nativeQuery = true, value = "SELECT DISTINCT a.KEY2_APP_CONTEXT_NAME FROM BUSINESS_PROCESS_LOG_T a")
    List<String>getDistinctBusinessProcessLogByKey2AppContextName();
    
    @Query(nativeQuery = true, value = "SELECT DISTINCT a.KEY2_APP_CONTEXT_VALUE FROM BUSINESS_PROCESS_LOG_T a")
    List<String>getDistinctBusinessProcessLogByKey2AppContextValue();
    
    @Query(nativeQuery = true, value = "SELECT DISTINCT a.GLOBAL_INSTANCE_ID FROM BUSINESS_PROCESS_LOG_T a")
    List<String>getDistinctBusinessProcessLogByGlobalInstanceId();
    
    @Query(nativeQuery = true, value = "SELECT DISTINCT a.BUSINESS_DOMAIN FROM BUSINESS_PROCESS_LOG_T a")
    List<String>getDistinctBusinessProcessLogByBusinessDomain();
    
    @Query(nativeQuery = true, value = "SELECT DISTINCT a.APPLICATION FROM BUSINESS_PROCESS_LOG_T a")
    List<String>getDistinctBusinessProcessLogByApplication();
    
    @Query(nativeQuery = true, value = "SELECT DISTINCT a.ACTIVITY FROM BUSINESS_PROCESS_LOG_T a")
    List<String>getDistinctBusinessProcessLogByActivity();


}