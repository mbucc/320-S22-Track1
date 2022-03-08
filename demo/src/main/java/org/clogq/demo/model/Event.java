package org.clogq.demo.model;
import javax.persistence.*;
@Entity
@Table(name = "events")

public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    @Column(name = "activity")
    private String activity;
    @Column(name = "domain")
    private String domain;
    @Column(name = "severity")
    private String severity;

    public Event(){
    }
    public Event(String activity, String domain, String severity){
        this.activity = activity;
        this.domain = domain;
        this.severity = severity;
    }

    public long getId(){
        return id;
    }
    public String getActivity(){
        return activity;
    }
    public void setActivity(String activity){
        this.activity = activity;
    }
    public String getDomain(){
        return domain;
    }
    public void setDomain(String domain){
        this.domain = domain;
    }
    public String getSeverity(){
        return severity;
    }
    public void setSeverity(String severity){
        this.severity = severity;
    }
    @Override
    public String toString(){
        return "Event [id=" + id + ", activity=" + activity + ", domain=" + domain + ", severity=" + severity;
    }

}
