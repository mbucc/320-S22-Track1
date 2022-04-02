package org.track1.clog.model;
import javax.persistence.*;
import java.sql.Timestamp;
@Entity
@Table(name = "LOG_APP_CONTEXT_T")
public class LogAppContext {
    @Id
    @Column(name = "GLOBAL_INSTANCE_ID")
    private String globalInstanceId;
    @Column(name = "APP_CONTEXT_NAME")
    private String appContextName;
    @Column(name = "APP_CONTEXT_VALUE")
    private String appContextValue;

    public LogAppContext(){
    }

    public LogAppContext(String globalInstanceId, String appContextName, String appContextValue){
        this.globalInstanceId = globalInstanceId;
        this.appContextName = appContextName;
        this.appContextValue = appContextValue;  
    }

    public String getGlobalInstanceId(){
        return globalInstanceId;
    }

    public String getAppContextName(){
        return appContextName;
    }

    public String getAppContextValue(){
        return appContextValue;
    }

    @Override
    public String toString(){
        return "Log App Context [global_instance_id=" + globalInstanceId + ", app_context_name=" + appContextName + ", app_context_value=" + appContextValue + "]";
    }

}