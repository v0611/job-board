package com.jobboard.service.repository;

import com.jobboard.service.entity.Job;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JobRepository extends ListCrudRepository<Job, String>, CrudRepository<Job, String> {



}
