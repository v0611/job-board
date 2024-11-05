package com.jobboard.service.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.time.LocalDateTime;

@Entity
public class Job {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    private String title;
    private String description;
    private Integer salary;
    private String location;
    private LocalDateTime postedDate;

    public void merge(Job job){
        if(job.description != null){
            this.description = job.description;
        }

        if(job.title != null){
            this.title = job.title;
        }

        if(job.salary != null){
            this.salary = job.salary;
        }

        if(job.location != null){
            this.location = job.location;
        }
    }

    public String getId() {
        return id;
    }

    public Job setId(String id) {
        this.id = id;
        return this;
    }

    public String getTitle() {
        return title;
    }

    public Job setTitle(String title) {
        this.title = title;
        return this;
    }

    public String getDescription() {
        return description;
    }

    public Job setDescription(String description) {
        this.description = description;
        return this;
    }

    public int getSalary() {
        return salary;
    }

    public Job setSalary(int salary) {
        this.salary = salary;
        return this;
    }

    public String getLocation() {
        return location;
    }

    public Job setLocation(String location) {
        this.location = location;
        return this;
    }

    public LocalDateTime getPostedDate() {
        return postedDate;
    }

    public Job setPostedDate(LocalDateTime postedDate) {
        this.postedDate = postedDate;
        return this;
    }
}
