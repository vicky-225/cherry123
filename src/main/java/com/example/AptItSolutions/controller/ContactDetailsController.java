package com.example.AptItSolutions.controller;




import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.AptItSolutions.Entity.ContactDetails;
import com.example.AptItSolutions.service.ContactDetailsService;
@RestController
@RequestMapping("/contactdetails")
public class ContactDetailsController {
	@Autowired
    private  ContactDetailsService contactDetailsService;

    

	@PostMapping("/savingDetail")
	public ResponseEntity<ContactDetails> saveContactDetails(@RequestParam("firstName") String firstName,
	                                                         @RequestParam("lastName") String lastName,
	                                                         @RequestParam("phoneNumber") String phoneNumber,
	                                                         @RequestParam("email") String email,
	                                                         @RequestParam("message") String message) {
	    ContactDetails contactDetails = new ContactDetails(null, firstName, lastName, phoneNumber, email, message);
	    ContactDetails savedContactDetails = contactDetailsService.saveContactDetails(contactDetails);
	    return new ResponseEntity<>(savedContactDetails, HttpStatus.CREATED);
	}

    @GetMapping("/getallcontacts")
    public ResponseEntity<List<ContactDetails>> getAllContactDetails() {
        List<ContactDetails> contactDetailsList = contactDetailsService.getAllContactDetails();
        return new ResponseEntity<>(contactDetailsList, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ContactDetails> getContactDetailsById(@PathVariable Long id) {
        ContactDetails contactDetails = contactDetailsService.getContactDetailsById(id);
        return new ResponseEntity<>(contactDetails, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ContactDetails> updateContactDetails(
            @PathVariable Long id,
            @RequestBody ContactDetails updatedContactDetails) {
        ContactDetails contactDetails = contactDetailsService.updateContactDetails(id, updatedContactDetails);
        return new ResponseEntity<>(contactDetails, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteContactDetails(@PathVariable Long id) {
        contactDetailsService.deleteContactDetails(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}