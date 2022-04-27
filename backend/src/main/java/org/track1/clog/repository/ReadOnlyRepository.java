package org.track1.clog.repository;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;

//read only repository interface with methods to find by Id and by all

@NoRepositoryBean
public interface ReadOnlyRepository<T,ID> extends JpaRepository<T,ID> {
    Optional<T> findById(ID id);
    List<T> findAll();
}
