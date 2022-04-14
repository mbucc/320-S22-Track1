package org.track1.clog.repository;
import java.util.List;

//import org.springframework.data.jpa.domain.Specification;
//import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;
import org.track1.clog.model.BusinessProcessLog;
import java.sql.Timestamp;

@Repository
public interface BusinessProcessLogRepository extends ReadOnlyRepository<BusinessProcessLog, String>, JpaSpecificationExecutor<BusinessProcessLog> {
}