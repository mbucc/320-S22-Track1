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

    public LogDetail(){
    }

    public LogDetail(String globalInstanceId, String businessDomain, String businessSubdomain, String version, String localInstanceId, String eaiTransactionId, String eaiDomain, 
                     String hostname, String application, String eventContext, String component, Integer severity, Integer priority, Timestamp creationTime, String reasoningScope, 
                     Integer processId, String categoryName, String activity, String msg){
        this.globalInstanceId = globalInstanceId;
        this.businessDomain = businessDomain;
        this.businessSubdomain = businessSubdomain;
        this.version = version;
        this.localInstanceId = localInstanceId;
        this.eaiTransactionId = eaiTransactionId;
        this.eaiDomain = eaiDomain;
        this.hostname = hostname;
        this.application = application;
        this.eventContext = eventContext;
        this.component = component;
        this.severity = severity;
        this.priority = priority;
        this.creationTime = creationTime;
        this.reasoningScope = reasoningScope;
        this.processId = processId;
        this.categoryName = categoryName;
        this.activity = activity;
        this.msg = msg; 
    }

    public String getGlobalInstanceId() {
        return globalInstanceId;
    }

    public String getBusinessDomain() {
        return businessDomain;
    }

    public String getBusinessSubdomain() {
        return businessSubdomain;
    }

    public String getVersion() {
        return version;
    }

    public String getLocalInstanceId() {
        return localInstanceId;
    }

    public String getEaiTransactionId() {
        return eaiTransactionId;
    }

    public String getEaiDomain() {
        return eaiDomain;
    }

    public String getHostname() {
        return hostname;
    }

    public String getApplication() {
        return application;
    }

    public String getEventContext() {
        return eventContext;
    }

    public String getComponent() {
        return component;
    }

    public Integer getSeverity() {
        return severity;
    }

    public Integer getPriority() {
        return priority;
    }

    public Timestamp getCreationTime() {
        return creationTime;
    }

    public String getReasoningScope() {
        return reasoningScope;
    }

    public Integer getProcessId() {
        return processId;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public String getActivity() {
        return activity;
    }

    public String getMsg() {
        return msg;
    }

}
