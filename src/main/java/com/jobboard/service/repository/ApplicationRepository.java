package com.jobboard.service.repository;

import org.springframework.stereotype.Repository;
import com.jobboard.service.entity.JobApplication;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.ListCrudRepository;

@Repository
public interface ApplicationRepository extends ListCrudRepository<JobApplication, String> {

    @Query("select count(*) from JobApplication jobapp where jobapp.jobId like %?1")
    public int countByJobId(String jobId);

}
