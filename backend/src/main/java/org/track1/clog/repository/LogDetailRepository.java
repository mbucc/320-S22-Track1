package org.track1.clog.repository;

import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;
import org.track1.clog.model.LogDetail;

@Repository
public interface LogDetailRepository extends ReadOnlyRepository<LogDetail, String>,JpaSpecificationExecutor<LogDetail> {
    @Query(nativeQuery = true, value = "SELECT DISTINCT a.GLOBAL_INSTANCE_ID FROM LOG_DETAILS_T a")
    List<String>getDistinctLogDetailByGlobalInstanceId();
    
    @Query(nativeQuery = true, value = "SELECT DISTINCT a.BUSINESS_DOMAIN from LOG_DETAILS_T a")
    List<String>getDistinctLogDetailByBusinessDomain();

    @Query(nativeQuery = true, value = "SELECT DISTINCT a.BUSINESS_SUBDOMAIN from LOG_DETAILS_T a")
    List<String>getDistinctLogDetailByBusinessSubDomain();

    @Query(nativeQuery = true, value = "SELECT DISTINCT a.VERSION from LOG_DETAILS_T a")
    List<String>getDistinctLogDetailByVersion();

    @Query(nativeQuery = true, value = "SELECT DISTINCT a.LOCAL_INSTANCE_ID from LOG_DETAILS_T a")
    List<String>getDistinctLogDetailByLocalInstanceId();
    
    @Query(nativeQuery = true, value = "SELECT DISTINCT a.EAI_TRANSACTION_ID from LOG_DETAILS_T a")
    List<String>getDistinctLogDetailByEaiTransactionId();

    @Query(nativeQuery = true, value = "SELECT DISTINCT a.EAI_DOMAIN from LOG_DETAILS_T a")
    List<String>getDistinctLogDetailByEaiDomain();

    @Query(nativeQuery = true, value = "SELECT DISTINCT a.HOSTNAME from LOG_DETAILS_T a")
    List<String>getDistinctLogDetailByHostname();

    @Query(nativeQuery = true, value = "SELECT DISTINCT a.APPLICATION from LOG_DETAILS_T a")
    List<String>getDistinctLogDetailByApplication();

    @Query(nativeQuery = true, value = "SELECT DISTINCT a.EVENT_CONTEXT from LOG_DETAILS_T a")
    List<String>getDistinctLogDetailByEventContext();

    @Query(nativeQuery = true, value = "SELECT DISTINCT a.COMPONENT from LOG_DETAILS_T a")
    List<String>getDistinctLogDetailByComponent();

    @Query(nativeQuery = true, value = "SELECT DISTINCT a.SEVERITY from LOG_DETAILS_T a")
    List<Integer>getDistinctLogDetailBySeverity();

    @Query(nativeQuery = true, value = "SELECT DISTINCT a.PRIORITY from LOG_DETAILS_T a")
    List<Integer>getDistinctLogDetailByPriority();

    @Query(nativeQuery = true, value = "SELECT DISTINCT a.REASONING_SCOPE from LOG_DETAILS_T a")
    List<String>getDistinctLogDetailByReasoningScope();

    @Query(nativeQuery = true, value = "SELECT DISTINCT a.PROCESS_ID from LOG_DETAILS_T a")
    List<Integer>getDistinctLogDetailByProcessId();

    @Query(nativeQuery = true, value = "SELECT DISTINCT a.CATEGORY_NAME from LOG_DETAILS_T a")
    List<String>getDistinctLogDetailByCategoryName();

    @Query(nativeQuery = true, value = "SELECT DISTINCT a.ACTIVITY from LOG_DETAILS_T a")
    List<String>getDistinctLogDetailByActivity();

    @Query(nativeQuery = true, value = "SELECT DISTINCT a.MSG from LOG_DETAILS_T a")
    List<String>getDistinctLogDetailByMsg();

    
}