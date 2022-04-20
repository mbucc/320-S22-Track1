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
    @Query(nativeQuery = true, value = "SELECT DISTINCT a.eaiTransactionId FROM BusinessProcessLog a")
    List<String>getDistinctBusinessProcessLogByEaiTransactionId();
    
    @Query(nativeQuery = true, value = "SELECT DISTINCT a.eaiDomain FROM BusinessProcessLog a")
    List<String>getDistinctBusinessProcessLogByEaiDomain();

    @Query(nativeQuery = true, value = "SELECT DISTINCT a.publishingBusinessDomain FROM BusinessProcessLog a")
    List<String>getDistinctBusinessProcessLogByPublishingBusinessDomain();
    
    @Query(nativeQuery = true, value = "SELECT DISTINCT a.businessProcess FROM BusinessProcessLog a")
    List<String>getDistinctBusinessProcessLogByBusinessProcess();
    
    @Query(nativeQuery = true, value = "SELECT DISTINCT a.key1AppContextName FROM BusinessProcessLog a")
    List<String>getDistinctBusinessProcessLogByKey1AppContextName();
    
    @Query(nativeQuery = true, value = "SELECT DISTINCT a.key1AppContextValue FROM BusinessProcessLog a")
    List<String>getDistinctBusinessProcessLogByKey1AppContextValue();
   
    @Query(nativeQuery = true, value = "SELECT DISTINCT a.key2AppContextName FROM BusinessProcessLog a")
    List<String>getDistinctBusinessProcessLogByKey2AppContextName();
    
    @Query(nativeQuery = true, value = "SELECT DISTINCT a.key2AppContextValue FROM BusinessProcessLog a")
    List<String>getDistinctBusinessProcessLogByKey2AppContextValue();
    
    @Query(nativeQuery = true, value = "SELECT DISTINCT a.globalInstanceId FROM BusinessProcessLog a")
    List<String>getDistinctBusinessProcessLogByGlobalInstanceId();
    
    @Query(nativeQuery = true, value = "SELECT DISTINCT a.businessDomain FROM BusinessProcessLog a")
    List<String>getDistinctBusinessProcessLogByBusinessDomain();
    
    @Query(nativeQuery = true, value = "SELECT DISTINCT a.application FROM BusinessProcessLog a")
    List<String>getDistinctBusinessProcessLogByApplication();
    
    @Query(nativeQuery = true, value = "SELECT DISTINCT a.activity FROM BusinessProcessLog a")
    List<String>getDistinctBusinessProcessLogByActivity();


}