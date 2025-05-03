package com.example.AptItSolutions.controller;

import java.io.IOException;
import java.sql.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.AptItSolutions.Entity.JobApplication;
import com.example.AptItSolutions.service.JobApplicationService;

@RestController
@RequestMapping("/jobapplication")
public class JobApplicationController {
    private final JobApplicationService jobApplicationService;

    @Autowired
    public JobApplicationController(JobApplicationService jobApplicationService) {
        this.jobApplicationService = jobApplicationService;
    }

    @PostMapping("/job-applications")
    public ResponseEntity<JobApplication> createJobApplication(
            @RequestParam("name") String name,
            @RequestParam("email") String email,
            @RequestParam("mobile") long mobile,
            @RequestParam("fatherName") String fatherName,
            @RequestParam("dateOfBirth") Date dateOfBirth,
            @RequestParam("totalExperience") String totalExperience,
            @RequestParam("relativeExperience") String relativeExperience,
            @RequestParam("keySkills") String keySkills,
            @RequestParam("strengths") String strengths,
            @RequestParam("presentDesignation") String presentDesignation,
            @RequestParam("companyAddress") String companyAddress,
            @RequestParam("presentCTC") double presentCTC,
            @RequestParam("expectedCTC") double expectedCTC,
            @RequestParam("noticePeriod") String noticePeriod,
            @RequestParam("resume") MultipartFile resume) {

        // Create a JobApplication object and set the values from request parameters
        JobApplication jobApplication = new JobApplication();
        jobApplication.setName(name);
        jobApplication.setEmail(email);
        jobApplication.setMobile(mobile);
        jobApplication.setFatherName(fatherName);
        jobApplication.setDateOfBirth(dateOfBirth);
        jobApplication.setTotalExperience(totalExperience);
        jobApplication.setRelativeExperience(relativeExperience);
        jobApplication.setKeySkills(keySkills);
        jobApplication.setStrengths(strengths);
        jobApplication.setPresentDesignation(presentDesignation);
        jobApplication.setCompanyAddress(companyAddress);
        jobApplication.setPresentCTC(presentCTC);
        jobApplication.setExpectedCTC(expectedCTC);
        jobApplication.setNoticePeriod(noticePeriod);

        try {
            // Set the resume byte array from the uploaded file
            jobApplication.setResume(resume.getBytes());
        } catch (IOException e) {
            // Handle the exception
        }

        // Save the job application using the service
        JobApplication savedJobApplication = jobApplicationService.saveJobApplication(jobApplication);

        return new ResponseEntity<>(savedJobApplication, HttpStatus.CREATED);
    }

    @GetMapping("/job-applications")
    public ResponseEntity<List<JobApplication>> getAllJobApplications() {
        List<JobApplication> jobApplications = jobApplicationService.getAllJobApplications();
        return new ResponseEntity<>(jobApplications, HttpStatus.OK);
    }

    @GetMapping("/job-applications/{id}")
    public ResponseEntity<JobApplication> getJobApplicationById(@PathVariable Long id) {
        JobApplication jobApplication = jobApplicationService.getJobApplicationById(id);
        if (jobApplication != null) {
            return new ResponseEntity<>(jobApplication, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/job-applications/{id}")
    public ResponseEntity<JobApplication> updateJobApplication(
            @PathVariable Long id,
            @ModelAttribute JobApplication updatedApplication) {
        JobApplication existingJobApplication = jobApplicationService.getJobApplicationById(id);
        if (existingJobApplication != null) {
            updatedApplication.setId(existingJobApplication.getId());
            JobApplication savedJobApplication = jobApplicationService.saveJobApplication(updatedApplication);
            return new ResponseEntity<>(savedJobApplication, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @DeleteMapping("/jobapplications/{id}")
    public ResponseEntity<Void> deleteJobApplication(@PathVariable Long id) {
        boolean isDeleted = jobApplicationService.deleteJobApplication(id);
        if (isDeleted) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
