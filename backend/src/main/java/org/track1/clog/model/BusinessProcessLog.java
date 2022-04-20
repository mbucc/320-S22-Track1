package org.track1.clog.model;
import javax.persistence.*;
import java.sql.Timestamp;
@Entity
@Table(name = "BUSINESS_PROCESS_LOG_T")
public class BusinessProcessLog {
    @Id
    @Column(name = "EAI_TRANSACTION_ID")
    private String eaiTransactionId;
    @Column(name = "EAI_DOMAIN")
    private String eaiDomain;
    @Column(name = "PUBLISHING_BUSINESS_DOMAIN")
    private String publishingBusinessDomain;
    @Column(name = "BUSINESS_PROCESS")
    private String businessProcess;
    @Column(name = "EAI_TRANSACTION_CREATE_TIME")
    private Timestamp eaiTransactionCreateTime;
    @Column(name = "KEY1_APP_CONTEXT_NAME")
    private String key1AppContextName;
    @Column(name = "KEY1_APP_CONTEXT_VALUE")
    private String key1AppContextValue;
    @Column(name = "KEY2_APP_CONTEXT_NAME")
    private String key2AppContextName;
    @Column(name = "KEY2_APP_CONTEXT_VALUE")
    private String key2AppContextValue;
    @Column(name = "GLOBAL_INSTANCE_ID")
    private String globalInstanceId;
    @Column(name = "BUSINESS_DOMAIN")
    private String businessDomain;
    @Column(name = "APPLICATION")
    private String application;
    @Column(name = "ACTIVITY")
    private String activity;

    public BusinessProcessLog(){
    }

    public BusinessProcessLog(String eai_transaction_id, String eai_domain, String publishing_business_domain, String business_process, Timestamp eai_transaction_create_time, String key1_app_context_name, String key1_app_context_value, String key2_app_context_name, String key2_app_context_value, String global_instance_id, String business_domain, String application, String activity){
        this.eaiTransactionId = eai_transaction_id;
        this.eaiDomain = eai_domain;
        this.publishingBusinessDomain = publishing_business_domain;
        this.businessProcess = business_process;
        this.eaiTransactionCreateTime = eai_transaction_create_time;
        this.key1AppContextName = key1_app_context_name;
        this.key1AppContextValue = key1_app_context_value;
        this.key2AppContextName = key2_app_context_name;
        this.key2AppContextValue = key2_app_context_value;
        this.globalInstanceId = global_instance_id;
        this.businessDomain = business_domain;
        this.application = application;
        this.activity = activity;   
    }

    public String getEai_transaction_id(){
        return eaiTransactionId;
    }

    public String getEai_domain(){
        return eaiDomain;
    }

    public String getPublishing_business_domain(){
        return publishingBusinessDomain;
    }

    public String getBusiness_process(){
        return businessProcess;
    }

    public Timestamp getEai_transaction_create_time(){
        return eaiTransactionCreateTime;
    }

    public String getKey1_app_context_name(){
        return key1AppContextName;
    }

    public String getKey1_app_context_value(){
        return key1AppContextValue;
    }

    public String getKey2_app_context_name(){
        return key2AppContextName;
    }

    public String getKey2_app_context_value(){
        return key2AppContextValue;
    }

    public String getGlobal_instance_id(){
        return globalInstanceId;
    }

    public String getBusiness_domain(){
        return businessDomain;
    }

    public String getApplication(){
        return application;
    }

    public String getActivity(){
        return activity;
    }

    @Override
    public String toString(){
        return "Business Process Log [eai_transaction_id=" + eaiTransactionId + ", eai_domain=" + eaiDomain + ", publishing_business_domain=" + publishingBusinessDomain + ", business_process="
        + businessProcess + ", eai_transaction_create_time=" + eaiTransactionCreateTime + ", key1_app_context_name=" + key1AppContextName + ", key1_app_context_value=" + key1AppContextValue
        + ", key2_app_context_name=" + key2AppContextName + ", key2_app_context_value=" + key2AppContextValue + ", global_instance_id=" + globalInstanceId + ", business_domain=" + businessDomain
        + ", application=" + application + ", activity=" + activity + "]";
    }

}