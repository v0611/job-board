package com.jobboard.service.repository;

import jakarta.transaction.Transactional;
import org.springframework.stereotype.Repository;
import com.jobboard.service.entity.JobApplication;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.ListCrudRepository;

import java.util.List;

@Repository
public interface ApplicationRepository extends ListCrudRepository<JobApplication, String> {

    @Query("select count(jobapp.id) from JobApplication jobapp where jobapp.jobId = ?1")
    public int countByJobId(String jobId);

    @Query("select jobapp from JobApplication jobapp where jobapp.jobId = ?1")
    @Transactional
    public List<JobApplication> getJobApplicants(String jobId);

    @Query("select jobapp from JobApplication jobapp where id = ?1")
    @Transactional
    public JobApplication getJobApplication(String applicationId);
}
