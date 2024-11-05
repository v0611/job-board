package com.jobboard.service.controller;

import com.jobboard.service.entity.Job;
import com.jobboard.service.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
public class JobController {

    @Autowired
    private JobRepository jobRepository;

    @GetMapping("/api/jobs")
    public List<Job> getJobs(){
        return jobRepository.findAll();
    }

    @GetMapping("/api/jobs/{id}")
    public ResponseEntity<Job> getJob(@PathVariable String id){
        var job = jobRepository.findById(id);
        return job.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/api/jobs/{id}")
    public void deletejob(@PathVariable String id){
        jobRepository.deleteById(id);
    }

    @PostMapping("/api/jobs")
    public ResponseEntity<Job> createJob(@RequestBody Job job){
        job.setId(null);
        job.setPostedDate(LocalDateTime.now());
        var response = jobRepository.save(job);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/api/jobs/{id}")
    public ResponseEntity<Job> updateJob(@PathVariable String id, @RequestBody Job job){
        job.setId(id);
        var prev = jobRepository.findById(id);
        if(prev.isEmpty()) return ResponseEntity.notFound().build();

        var current = prev.get();
        current.merge(job);
        jobRepository.save(current);
        return ResponseEntity.ok(current);
    }

}
