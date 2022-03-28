package org.track1.clog.repository;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.track1.clog.model.BusinessProcessLog;
import java.sql.Timestamp;

@Repository
public interface BusinessProcessLogRepository extends ReadOnlyRepository<BusinessProcessLog, String> {

    List<BusinessProcessLog> findByEaiTransactionId(String eai_transaction_id);
    
    List<BusinessProcessLog> findByEaiDomain(String eai_domain);
    
    List<BusinessProcessLog> findByPublishingBusinessDomain(String publishing_business_domain);
    
    List<BusinessProcessLog> findByBusinessProcess(String business_process);

    //find between two eai timestamps
    List<BusinessProcessLog> findByEaiTransactionCreateTimeBetween(Timestamp eai_transaction_create_time_first, Timestamp eai_transaction_create_time_last);

    //find after eai timestamp
    List<BusinessProcessLog> findByEaiTransactionCreateTimeAfter(Timestamp eai_transaction_create_time);
    
    List<BusinessProcessLog> findByKey1AppContextNameAndKey1AppContextValue(String key1_app_context_name, String key1_app_context_value);

    List<BusinessProcessLog> findByGlobalInstanceId(String global_instance_id);
    
    List<BusinessProcessLog> findByApplication(String application);
    
    List<BusinessProcessLog> findByActivity(String activity);
}