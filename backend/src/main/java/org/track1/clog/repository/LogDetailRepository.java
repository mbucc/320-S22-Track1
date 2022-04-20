package org.track1.clog.repository;

import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;
import org.track1.clog.model.LogDetail;

@Repository
public interface LogDetailRepository extends ReadOnlyRepository<LogDetail, String>,JpaSpecificationExecutor<LogDetail> {
    @Query(nativeQuery = true, value = "SELECT DISTINCT a.globalInstanceId FROM LogDetail a")
    List<String>getDistinctLogDetailByGlobalInstanceId();
    
    @Query(nativeQuery = true, value = "SELECT DISTINCT a.businessDomain from LogDetail a")
    List<String>getDistinctLogDetailByBusinessDomain();

    @Query(nativeQuery = true, value = "SELECT DISTINCT a.businessSubDomain from LogDetail a")
    List<String>getDistinctLogDetailByBusinessSubDomain();

    @Query(nativeQuery = true, value = "SELECT DISTINCT a.version from LogDetail a")
    List<String>getDistinctLogDetailByVersion();

    @Query(nativeQuery = true, value = "SELECT DISTINCT a.localInstanceId from LogDetail a")
    List<String>getDistinctLogDetailByLocalInstanceId();
    
    @Query(nativeQuery = true, value = "SELECT DISTINCT a.eaiTransactionId from LogDetail a")
    List<String>getDistinctLogDetailByEaiTransactionId();

    @Query(nativeQuery = true, value = "SELECT DISTINCT a.eaiDomain from LogDetail a")
    List<String>getDistinctLogDetailByEaiDomain();

    @Query(nativeQuery = true, value = "SELECT DISTINCT a.hostname from LogDetail a")
    List<String>getDistinctLogDetailByHostname();

    @Query(nativeQuery = true, value = "SELECT DISTINCT a.application from LogDetail a")
    List<String>getDistinctLogDetailByApplication();

    @Query(nativeQuery = true, value = "SELECT DISTINCT a.eventContext from LogDetail a")
    List<String>getDistinctLogDetailByEventContext();

    @Query(nativeQuery = true, value = "SELECT DISTINCT a.component from LogDetail a")
    List<String>getDistinctLogDetailByComponent();

    @Query(nativeQuery = true, value = "SELECT DISTINCT a.severity from LogDetail a")
    List<Integer>getDistinctLogDetailBySeverity();

    @Query(nativeQuery = true, value = "SELECT DISTINCT a.priority from LogDetail a")
    List<Integer>getDistinctLogDetailByPriority();

    @Query(nativeQuery = true, value = "SELECT DISTINCT a.reasoningScope from LogDetail a")
    List<String>getDistinctLogDetailByReasoningScope();

    @Query(nativeQuery = true, value = "SELECT DISTINCT a.processId from LogDetail a")
    List<Integer>getDistinctLogDetailByProcessId();

    @Query(nativeQuery = true, value = "SELECT DISTINCT a.categoryName from LogDetail a")
    List<String>getDistinctLogDetailByCategoryName();

    @Query(nativeQuery = true, value = "SELECT DISTINCT a.activity from LogDetail a")
    List<String>getDistinctLogDetailByActivity();

    @Query(nativeQuery = true, value = "SELECT DISTINCT a.msg from LogDetail a")
    List<String>getDistinctLogDetailByMsg();

    
}
