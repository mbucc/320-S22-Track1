package org.track1.clog.repository;
import java.util.List;

//import org.springframework.data.jpa.domain.Specification;
//import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.track1.clog.model.BusinessProcess;
//import java.sql.Timestamp;

@Repository
public interface BusinessProcessRepository extends ReadOnlyRepository<BusinessProcess, String>, JpaSpecificationExecutor<BusinessProcess> {
    @Query(nativeQuery = true, value = "SELECT DISTINCT a.businessProcess FROM BusinessProcess a")
    List<String>getDistinctBusinessProcessByBusinessProcess();

    @Query(nativeQuery = true, value = "SELECT DISTINCT a.publishingBusinessDomain FROM BusinessProcess a")
    List<String>getDistinctBusinessProcessByPublishingBusinessDomain();

    @Query(nativeQuery = true, value = "SELECT DISTINCT a.key1AppContextName FROM BusinessProcess a")
    List<String>getDistinctBusinessProcessByKey1AppContextName();

    @Query(nativeQuery = true, value = "SELECT DISTINCT a.key2AppContextName FROM BusinessProcess a")
    List<String>getDistinctBusinessProcessByKey2AppContextName();
}
