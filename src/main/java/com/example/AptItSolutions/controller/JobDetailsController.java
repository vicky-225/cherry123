package com.example.AptItSolutions.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.AptItSolutions.Entity.JobDetails;
import com.example.AptItSolutions.service.JobDetailsService;

@RestController
@RequestMapping("/apijobdetails")
public class JobDetailsController {
	@Autowired
    private  JobDetailsService jobDetailsService;

   

    @PostMapping("/savejob")

    public String createJobDetails(@RequestParam("phoneNumber") String phoneNumber,
                                   @RequestParam("email") String email,
                                   @RequestParam("jobTitle") String jobTitle,
                                   @RequestParam("keySkills") String keySkills,
                                   @RequestParam("yearsOfExperience") int yearsOfExperience,
                                   @RequestParam("jobDescription") String jobDescription) {
        JobDetails jobDetails = new JobDetails();
        jobDetails.setPhoneNumber(phoneNumber);
        jobDetails.setEmail(email);
        jobDetails.setJobTitle(jobTitle);
        jobDetails.setKeySkills(keySkills);
        jobDetails.setYearsOfExperience(yearsOfExperience);
        jobDetails.setJobDescription(jobDescription);

        jobDetailsService.saveJobDetails(jobDetails);
        return "redirect:/adminDashboard";
    }


    @GetMapping("/alljobs")
    public ResponseEntity<List<JobDetails>> getAllJobDetails() {
        List<JobDetails> jobDetailsList = jobDetailsService.getAllJobDetails();
        return new ResponseEntity<>(jobDetailsList, HttpStatus.OK);
    }

    @GetMapping("/getbyid/{id}")
    public ResponseEntity<JobDetails> getJobDetailsById(@PathVariable("id") Long id) {
        JobDetails jobDetails = jobDetailsService.getJobDetailsById(id);
        if (jobDetails != null) {
            return new ResponseEntity<>(jobDetails, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

//    @PutMapping("/jobupdating/{id}")
//    public ResponseEntity<JobDetails> updateJobDetails(@PathVariable("id") Long id, @RequestBody JobDetails updatedJobDetails) {
//        JobDetails jobDetails = jobDetailsService.getJobDetailsById(id);
//        if (jobDetails != null) {
//            jobDetails.setPhoneNumber(updatedJobDetails.getPhoneNumber());
//            jobDetails.setEmail(updatedJobDetails.getEmail());
//            jobDetails.setJobTitle(updatedJobDetails.getJobTitle());
//            jobDetails.setKeySkills(updatedJobDetails.getKeySkills());
//            jobDetails.setYearsOfExperience(updatedJobDetails.getYearsOfExperience());
//            jobDetails.setJobDescription(updatedJobDetails.getJobDescription());
//
//            JobDetails savedJobDetails = jobDetailsService.saveJobDetails(jobDetails);
//            return new ResponseEntity<>(savedJobDetails, HttpStatus.OK);
//        } else {
//            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//        }
//    }
    
    @PutMapping("/jobupdating/{id}")
    public JobDetails updateJobDetails(@PathVariable Long id, @RequestParam("phoneNumber") String phoneNumber,
                                       @RequestParam("email") String email, @RequestParam("jobTitle") String jobTitle,
                                       @RequestParam("keySkills") String keySkills, @RequestParam("yearsOfExperience") int yearsOfExperience,
                                       @RequestParam("jobDescription") String jobDescription) {
        JobDetails updatedJobDetails = jobDetailsService.getJobDetailsById(id);
        
            updatedJobDetails.setPhoneNumber(phoneNumber);
            updatedJobDetails.setEmail(email);
            updatedJobDetails.setJobTitle(jobTitle);
            updatedJobDetails.setKeySkills(keySkills);
            updatedJobDetails.setYearsOfExperience(yearsOfExperience);
            updatedJobDetails.setJobDescription(jobDescription);
           
        
        return jobDetailsService.updateJobApplication(id, updatedJobDetails);
    }


    @DeleteMapping("/deletejob/{id}")
    public ResponseEntity<HttpStatus> deleteJobDetails(@PathVariable("id") Long id) {
        JobDetails jobDetails = jobDetailsService.getJobDetailsById(id);
        if (jobDetails != null) {
            jobDetailsService.deleteJobDetails(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
