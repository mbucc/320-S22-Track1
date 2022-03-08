package org.clogq.demo.repository;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.clogq.demo.model.Event;
public interface EventRepository extends JpaRepository<Event, Long> {
    List<Event> findByDomain(String domain);
    List<Event> findBySeverity(String severity);
}