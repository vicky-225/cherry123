package com.example.AptItSolutions.Entity;

import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;

@Entity
public class JobApplication {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String email;
    private long mobile;
    private String fatherName;
    private Date dateOfBirth;
    private String totalExperience;
    private String relativeExperience;
    private String keySkills;
    private String strengths;
    private String presentDesignation;
    private String companyAddress;
    private double presentCTC;
    private double expectedCTC;
    private String noticePeriod;
    
    @Lob
    @Column(columnDefinition="LongBlob")
    private byte[] resume;

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public long getMobile() {
        return mobile;
    }

    public void setMobile(long mobile) {
        this.mobile = mobile;
    }

    public String getFatherName() {
        return fatherName;
    }

    public void setFatherName(String fatherName) {
        this.fatherName = fatherName;
    }

    public Date getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(Date dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getTotalExperience() {
        return totalExperience;
    }

    public void setTotalExperience(String totalExperience) {
        this.totalExperience = totalExperience;
    }

    public String getRelativeExperience() {
        return relativeExperience;
    }

    public void setRelativeExperience(String relativeExperience) {
        this.relativeExperience = relativeExperience;
    }

    public String getKeySkills() {
        return keySkills;
    }

    public void setKeySkills(String keySkills) {
        this.keySkills = keySkills;
    }

    public String getStrengths() {
        return strengths;
    }

    public void setStrengths(String strengths) {
        this.strengths = strengths;
    }

    public String getPresentDesignation() {
        return presentDesignation;
    }

    public void setPresentDesignation(String presentDesignation) {
        this.presentDesignation = presentDesignation;
    }

    public String getCompanyAddress() {
        return companyAddress;
    }

    public void setCompanyAddress(String companyAddress) {
        this.companyAddress = companyAddress;
    }

    public double getPresentCTC() {
        return presentCTC;
    }

    public void setPresentCTC(double presentCTC) {
        this.presentCTC = presentCTC;
    }

    public double getExpectedCTC() {
        return expectedCTC;
    }

    public void setExpectedCTC(double expectedCTC) {
        this.expectedCTC = expectedCTC;
    }

    public String getNoticePeriod() {
        return noticePeriod;
    }

    public void setNoticePeriod(String noticePeriod) {
        this.noticePeriod = noticePeriod;
    }

    public byte[] getResume() {
        return resume;
    }

    public void setResume(byte[] resume) {
        this.resume = resume;
    }

    // Constructors

    public JobApplication() {
        super();
    }

    public JobApplication(Long id, String name, String email, long mobile, String fatherName, Date dateOfBirth,
            String totalExperience, String relativeExperience, String keySkills, String strengths,
            String presentDesignation, String companyAddress, double presentCTC, double expectedCTC,
            String noticePeriod, byte[] resume) {
        super();
        this.id = id;
        this.name = name;
        this.email = email;
        this.mobile = mobile;
        this.fatherName = fatherName;
        this.dateOfBirth = dateOfBirth;
        this.totalExperience = totalExperience;
        this.relativeExperience = relativeExperience;
        this.keySkills = keySkills;
        this.strengths = strengths;
        this.presentDesignation = presentDesignation;
        this.companyAddress = companyAddress;
        this.presentCTC = presentCTC;
        this.expectedCTC = expectedCTC;
        this.noticePeriod = noticePeriod;
        this.resume = resume;
    }
}
