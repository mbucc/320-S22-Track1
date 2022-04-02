package org.track1.clog.model;
import javax.persistence.*;
import java.sql.Timestamp;
@Entity
@Table(name = "BUSINESS_PROCESS_LOG_T")
public class BusinessProcess {
    @Id
    @Column(name = "BUSINESS_PROCESS")
    private String businessProcess;
    @Column(name = "PUBLISHING_BUSINESS_DOMAIN")
    private String publishingBusinessDomain;
    @Column(name = "KEY1_APP_CONTEXT_NAME")
    private String key1AppContextName;
    @Column(name = "KEY2_APP_CONTEXT_NAME")
    private String key2AppContextName;

    public BusinessProcess(){
    }

    public BusinessProcess(String business_process, String publishing_business_domain, String key1_app_context_name, String key2_app_context_name){
        this.businessProcess = business_process;
        this.publishingBusinessDomain = publishing_business_domain;
        this.key1AppContextName = key1_app_context_name;
        this.key2AppContextName = key2_app_context_name; 
    }

    public String getBusiness_process(){
        return businessProcess;
    }

    public String getPublishing_business_domain(){
        return publishingBusinessDomain;
    }

    public String getKey1_app_context_name(){
        return key1AppContextName;
    }

    public String getKey2_app_context_name(){
        return key2AppContextName;
    }


    @Override
    public String toString(){
        return "Business Process [business_process=" + businessProcess + ", publishing_business_domain=" + publishingBusinessDomain
        + ", key1_app_context_name=" + key1AppContextName + ", key2_app_context_name=" + key2AppContextName + "]";
    }

}