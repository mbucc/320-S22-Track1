package org.track1.clog.repository;
import java.util.List;

//import org.springframework.data.jpa.domain.Specification;
//import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;
import org.track1.clog.model.LogAppContext;
// import java.sql.Timestamp;

@Repository
public interface LogAppContextRepository extends ReadOnlyRepository<LogAppContext, String>, JpaSpecificationExecutor<LogAppContext> {

    List<LogAppContext> findByGlobalInstanceId(String global_instance_id);
    
    List<LogAppContext> findByAppContextName(String app_context_name);
    
    List<LogAppContext> findByAppContextValue(String app_context_value);

}