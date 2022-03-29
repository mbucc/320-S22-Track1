package org.track1.clog.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "LOG_DETAILS_T")
public class LogDetail {
    @Id
    @Column(name = "GLOBAL_INSTANCE_ID")
    private String globalInstanceId;
}
