package org.track1.clog.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;
import org.track1.clog.model.LogDetail;

@Repository
public interface LogDetailRepository extends ReadOnlyRepository<LogDetail, String>,JpaSpecificationExecutor<LogDetail> {
}
