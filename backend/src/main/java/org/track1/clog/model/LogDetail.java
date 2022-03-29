package org.track1.clog.model;

import java.sql.Timestamp;
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
    @Column(name = "BUSINESS_DOMAIN")
    private String businessDomain;
    @Column(name = "BUSINESS_SUBDOMAIN")
    private String businessSubdomain;
    @Column(name = "VERSION")
    private String version;
    @Column(name = "LOCAL_INSTANCE_ID")
    private String localInstanceId;
    @Column(name = "EAI_TRANSACTION_ID")
    private String eaiTransactionId;
    @Column(name = "EAI_DOMAIN")
    private String eaiDomain;
    @Column(name = "HOSTNAME")
    private String hostname;
    @Column(name = "APPLICATION")
    private String application;
    @Column(name = "EVENT_CONTEXT")
    private String eventContext;
    @Column(name = "COMPONENT")
    private String component;
    @Column(name = "SEVERITY")
    private Integer severity;
    @Column(name = "PRIORITY")
    private Integer priority;
    @Column(name = "CREATION_TIME")
    private Timestamp creationTime;
    @Column(name = "REASONING_SCOPE")
    private String reasoningScope;
    @Column(name = "PROCESS_ID")
    private Integer processId;
    @Column(name = "CATEGORY_NAME")
    private String categoryName;
    @Column(name = "ACTIVITY")
    private String activity;
    @Column(name = "MSG")
    private String msg;
}
