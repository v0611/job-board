package com.jobboard.service.controller;

import com.jobboard.service.entity.Job;
import com.jobboard.service.entity.JobApplication;
import com.jobboard.service.repository.ApplicationRepository;
import com.jobboard.service.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;

@RestController
public class JobController {

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private ApplicationRepository applicationRepository;

    @GetMapping("/api/jobs")
    public ResponseEntity<List<Job>> getJobs() {
        var jobs = jobRepository.findAll();

        jobs.forEach(job -> {
            job.setApplicants(applicationRepository.countByJobId(job.getId()));
        });

        return ResponseEntity.ok(jobs);
    }

    @GetMapping("/api/jobs/{id}")
    public ResponseEntity<Job> getJob(@PathVariable String id) {
        var job = jobRepository.findById(id);
        return job.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/api/jobs/{id}")
    public void deletejob(@PathVariable String id) {
        jobRepository.deleteById(id);
    }

    @PostMapping("/api/jobs")
    public ResponseEntity<Job> createJob(@RequestBody Job job) {
        job.setId(null);
        job.setPostedDate(LocalDateTime.now());
        var response = jobRepository.save(job);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/api/jobs/{id}")
    public ResponseEntity<Job> updateJob(@PathVariable String id, @RequestBody Job job) {
        job.setId(id);
        var prev = jobRepository.findById(id);
        if (prev.isEmpty())
            return ResponseEntity.notFound().build();

        var current = prev.get();
        current.merge(job);
        jobRepository.save(current);
        return ResponseEntity.ok(current);
    }

    @PostMapping("/api/jobs/apply")
    public ResponseEntity<JobApplication> applyForJob(@RequestPart("name") String name,
            @RequestPart("jobId") String jobId, @RequestPart("file") MultipartFile file) {

        var isExistent = jobRepository.existsById(jobId);
        if (!isExistent)
            return ResponseEntity.notFound().build();

        var application = new JobApplication();

        application.setName(name);
        application.setJobId(jobId);
        try {
            application.setFile(file.getBytes());
        } catch (IOException e) {
            return ResponseEntity.unprocessableEntity().build();
        }

        return ResponseEntity.ok(applicationRepository.save(application));
    }

    @GetMapping("/api/jobs/{id}/applicants")
    public ResponseEntity<List<JobApplication>> getJobApplicants(@PathVariable String id) {
        if(id == null)
            return ResponseEntity.notFound().build();
        var isExistent = jobRepository.existsById(id);

        if (!isExistent)
            return ResponseEntity.notFound().build();

        return ResponseEntity.ok(applicationRepository.getJobApplicants(id));
    }

    @GetMapping("/api/jobs/{jobId}/applicants/{applicantId}/resume")
    public ResponseEntity<byte[]> getFile(@PathVariable String applicantId) {
        var application = applicationRepository.getJobApplication(applicantId);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + application.getName() + "_resume.pdf" + "\"")
                .body(application.getFile());
    }

}
