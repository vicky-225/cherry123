package com.example.AptItSolutions.Entity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
@Entity
public class JobDetails {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;
private String phoneNumber;
private String email;
private String jobTitle;
private String keySkills;
private int yearsOfExperience;

@Column(length = 5000)
private String jobDescription;
public Long getId() {
	return id;
}
public void setId(Long id) {
	this.id = id;
}
public String getPhoneNumber() {
	return phoneNumber;
}
public void setPhoneNumber(String phoneNumber) {
	this.phoneNumber = phoneNumber;
}
public String getEmail() {
	return email;
}
public void setEmail(String email) {
	this.email = email;
}
public String getJobTitle() {
	return jobTitle;
}
public void setJobTitle(String jobTitle) {
	this.jobTitle = jobTitle;
}
public String getKeySkills() {
	return keySkills;
}
public void setKeySkills(String keySkills) {
	this.keySkills = keySkills;
}
public int getYearsOfExperience() {
	return yearsOfExperience;
}
public void setYearsOfExperience(int yearsOfExperience) {
	this.yearsOfExperience = yearsOfExperience;
}
public String getJobDescription() {
	return jobDescription;
}
public void setJobDescription(String jobDescription) {
	this.jobDescription = jobDescription;
}
public JobDetails(Long id, String phoneNumber, String email, String jobTitle, String keySkills,
		int yearsOfExperience, String jobDescription) {
	super();
	this.id = id;
	this.phoneNumber = phoneNumber;
	this.email = email;
	this.jobTitle = jobTitle;
	this.keySkills = keySkills;
	this.yearsOfExperience = yearsOfExperience;
	this.jobDescription = jobDescription;
}
@Override
public String toString() {
	return "JobDetails [id=" + id + ", phoneNumber=" + phoneNumber + ", email=" + email + ", jobTitle=" + jobTitle
			+ ", keySkills=" + keySkills + ", yearsOfExperience=" + yearsOfExperience + ", jobDescription="
			+ jobDescription + "]";
}
public JobDetails() {
	super();
	// TODO Auto-generated constructor stub
}


}
