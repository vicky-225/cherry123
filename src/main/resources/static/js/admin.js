



//open Tab

		function openTab(tabName) {
			var i;
			var x = document.getElementsByClassName("tabcontent");
			for (i = 0; i < x.length; i++) {
				x[i].style.display = "none";
			}
			document.getElementById(tabName).style.display = "block";
		}


//Lagout functinality 
   document.getElementById('logoutButton').addEventListener('click', function () {
                Swal.fire({
                  title: 'Logout',
                  text: 'Are you sure you want to logout?',
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonText: 'Yes, logout',
                  cancelButtonText: 'Cancel',
                }).then((result) => {
                  if (result.isConfirmed) {
                    // Perform logout action here
                    // Redirect to index.html
                    window.location.href = 'index';
                  }
                });
              })
              
              //for open the tabs
              
                   function openTab(tabId) {
            // Hide all tab contents
            var tabContents = document.getElementsByClassName("tabcontent");
            for (var i = 0; i < tabContents.length; i++) {
                tabContents[i].style.display = "none";
            }

            // Show the selected tab content
            document.getElementById(tabId).style.display = "block";
        }
        
        
        
        //add new java script code 

function openNewsModal() {
    document.getElementById("addNewsModalButton").style.display = "block";
}


function closeAddNewsModal() {
    document.getElementById("addNewsModalButton").style.display = "none";
}
function Form(event) {
    event.preventDefault(); // Prevent the form from submitting normally

    // Make an AJAX request to submit the form data
    const form = event.target;
    const formData = new FormData(form);

    fetch(form.action, {
      method: form.method,
      body: formData
    })
    .then(response => {
      // Handle the success response
      if (response.ok) {
    	  document.querySelector('#addNewsModalButton').style.display = "none";  // Hide the entire container

        // Use SweetAlert2 for the success popup
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'News added successfully!',
          allowOutsideClick: false  // Disallow clicking outside the alert
        }).then(() => {
			  form.reset();
			refreshNewsData();
        });
      } else {
          Swal.fire({
          icon: 'failure',
          title: 'Form Not submitted',
          text: 'Form Not added successfully!',
          allowOutsideClick: false  // Disallow clicking outside the alert
        })
      }
    })
    .catch(error => {
      // Handle any errors
      console.error('An error occurred while submitting the form:', error);
    });
}
        function refreshNewsData(){
					    fetch("/api/getallnews")
					        .then(response => response.json())
					        .then(data => {
					            allData = data;
					            displayPage(currentPage); // Display the current page
					        });
					}

					function searchFunction() {
					    let input, filter, table, tr, td, i, j, txtValue;
					    input = document.getElementById('searchInput');
					    filter = input.value.toUpperCase();
					    table = document.querySelector('.table');
					    tr = table.getElementsByTagName('tr');

					    for (i = 1; i < tr.length; i++) { // Start from 1 to avoid the headers
					        tr[i].style.display = "none"; // Initially hide all rows
					        td = tr[i].getElementsByTagName('td');
					        for (j = 0; j < td.length; j++) {
					            if (td[j]) {
					                txtValue = td[j].textContent || td[j].innerText;
					                if (txtValue.toUpperCase().indexOf(filter) > -1) {
					                    tr[i].style.display = "";
					                    break; 
					                }
					            }
					        }
					    }
					}

					const ITEMS_PER_PAGE = 5; // Change this to display the number of rows you want per page
					let currentPage = 1;
					let allData = [];

					function displayPage(page) {
					    const start = (page - 1) * ITEMS_PER_PAGE;
					    const end = start + ITEMS_PER_PAGE;

					    const pageData = allData.slice(start, end);

					    document.getElementById("dataContainer1").innerHTML = ""; // Clear current table content

					    pageData.forEach(item => {
					        var row = `<tr>
					            <td>${item.id}</td>
					            <td>${item.date}</td>
					            <td>${item.newsEvent}</td>
					            <td id="editbutton">
					         
					               <button class="edit-button btn btn-primary" onclick="openEditModal(${item.id})">Edit</button>
					               <button class="delete-button" onclick="deleteNews(${item.id})" style="background-color:red">Delete</button>
					            </td>
					        </tr>`;
					        document.getElementById("dataContainer1").innerHTML += row;
					   
					    });

					    displayPaginationLinks();
					}

					function displayPaginationLinks() {
					    const totalItems = allData.length;
					    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

					    let links = "";
					    for (let i = 1; i <= totalPages; i++) {
					        links += `<button onclick="gotoPage(${i})">${i}</button>`;
					    }
					    document.getElementById("news-pagination-container").innerHTML = links;
					}

					function gotoPage(page) {
					    currentPage = page;
					    displayPage(currentPage);
					}

					fetch("/api/getallnews")
					.then(response => response.json())
					.then(data => {
					    allData = data;
					    displayPage(currentPage); // Display the first page
					  

					});
function deleteNews(id) {
	  Swal.fire({
	    title: 'Are you sure?',
	    text: 'You are about to delete this news item.',
	    icon: 'warning',
	    showCancelButton: true,
	    confirmButtonText: 'Yes, delete it!',
	    cancelButtonText: 'No, cancel',
	    reverseButtons: true,
	  }).then((result) => {
	    if (result.isConfirmed) {
	      // User confirmed, proceed with deletion
	      fetch(`/api/deletenews/${id}`, {
	        method: 'DELETE',
	      })
	      .then(response => {
	        if (response.ok) {
	          Swal.fire({
	            icon: 'success',
	            title: 'Success',
	            text: 'News deleted successfully!',
	          }).then(() => {
	        	  refreshNewsData();
	        	
	        	  
	        	  // Reload the page after successful deletion
	          });
	        } else {
	          throw new Error('Delete request failed.');
	        }
	      })
	      .catch(error => {
	        console.error(error);
	        Swal.fire({
	          icon: 'error',
	          title: 'Error',
	          text: 'An error occurred while deleting the news.',
	        });
	      });
	    } else if (result.dismiss === Swal.DismissReason.cancel) {
	      // User canceled, do nothing
	    }
	  });
	}
function closeModal() {
    document.getElementById("editNewsModal").style.display = "none";
}

//Open the edit modal and pre-populate data
async function openEditModal(id) {
    try {
        let response = await fetch("/api/get/" + id);
        let data = await response.json();

        document.getElementById("editTextarea").value = data.newsEvent;

        let form = document.getElementById("editnewsForm");
        form.action = "/api/update/" + id;

        $('#editNewsModal').modal('show');
    } catch (error) {
        console.error("Failed to fetch data", error);
    }
}

// Handle form submission
function submitForm(event) {
    event.preventDefault(); // Prevent the form from submitting normally

    Swal.fire({
        title: 'Submit Form?',
        text: 'Are you sure you want to submit this form?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, submit it!',
        cancelButtonText: 'No, cancel',
        reverseButtons: true,
    }).then((result) => {
        if (result.isConfirmed) {
            const form = event.target;
            const formData = new FormData(form);

            fetch(form.action, {
                method: form.method,
                body: formData
            })
            
            .then(response => {
                if (response.ok) {
    document.getElementById("editNewsModal").style.display = "none";

                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Form submitted successfully!',
                           allowOutsideClick: false 
                    }).then(() => {
                        refreshNewsData(); 

                    });
                } else {
                    throw new Error('Form submission failed.');
                }
            })
            .catch(error => {
                console.error('An error occurred while submitting the form:', error);
            });
        }
    });
}





//Galler java script code 




		function saveGallery() {
    document.getElementById("addGalleryModalButton").style.display = "block";
}
function closeAddGalleryModal() {
    document.getElementById("addGalleryModalButton").style.display = "none";
}


function submitGalleryForm(event) {
  event.preventDefault(); // Prevent the form from submitting normally

  // Get the file input element
  const fileInput = event.target.querySelector('#image');

  // Check if the file input has files selected
  if (!fileInput.files.length) {
    // Display an error message to the user (you can use SweetAlert2 or other methods)
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Please select an image before submitting.',
      allowOutsideClick: false
    });
    return; // Prevent form submission
  }

  // Make an AJAX request to submit the form data
  const form = event.target;
  const formData = new FormData(form);

  fetch(form.action, {
    method: form.method,
    body: formData
  })
    .then(response => {
      // Handle the success response
      if (response.ok) {
        document.querySelector('#addGalleryModalButton').style.display = "none";  // Hide the entire container

        // Use SweetAlert2 for the success popup
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Image added successfully!',
          allowOutsideClick: false
        }).then(() => {
          form.reset();
          refreshimage();
        });
      } else {
        Swal.fire({
          icon: 'failure',
          title: 'Form Not submitted',
          text: 'Form Not added successfully!',
          allowOutsideClick: false
        });
      }
    })
    .catch(error => {
      // Handle any errors
      console.error('An error occurred while submitting the form:', error);
    });
}

		
		
let imageDataset = [];
let currentPage1 = 1;
const itemsPerPage = 5;

function displayImages() {
    const searchTerm = document.getElementById("searchBox").value;
    const filteredData = imageDataset.filter(item => item.id.toString().includes(searchTerm));
    
    const startIndex = (currentPage1 - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const dataToDisplay = filteredData.slice(startIndex, endIndex);

    const tbody = document.getElementById("dataContainer2");
    tbody.innerHTML = '';

    dataToDisplay.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${item.id}</td>
            <td><img src="data:image/jpeg;base64,${item.image}" alt="Image" width="50"></td>
           
		            <td id="button-container" class="button-container">
		            <button class="edit-btn" onclick="openEditImageModal(${item.id})">Edit</button>

		                <button class="delete-btn" onclick="deleteimage(${item.id})">Delete</button>
		            </td>
		      
        `;
        tbody.appendChild(tr);
    });

    updatePaginationControls(filteredData.length);
}

function updatePaginationControls(totalLength) {
    const totalPages = Math.ceil(totalLength / itemsPerPage);
    let pagination = "";

    for (let i = 1; i <= totalPages; i++) {
        pagination += `<button onclick="changePage(${i})">${i}</button>`;
    }

    document.getElementById("pagination-controls").innerHTML = pagination;
}

function searchImages() {
    currentPage1 = 1; // Reset to first page when searching
    displayImages();
}

function changePage(pageNum) {
    currentPage1 = pageNum;
    displayImages();
}

// Fetching and refreshing the images
function fetchData() {
    fetch("/imageapi/All")
        .then(response => response.json())
        .then(data => {
            imageDataset = data;
            displayImages();
        });
}

function refreshImages() {
    fetchData();
}

document.addEventListener('DOMContentLoaded', function() {
    fetchData();
});

		function deleteimage(id) {
			  // Show a confirmation dialog before proceeding with deletion
			  Swal.fire({
			    title: 'Are you sure?',
			    text: 'You are about to delete this image.',
			    icon: 'warning',
			    showCancelButton: true,
			    confirmButtonText: 'Yes, delete it!',
			    cancelButtonText: 'No, cancel',
			    reverseButtons: true,
			  }).then((result) => {
			    if (result.isConfirmed) {
			      // User confirmed, proceed with deletion
			      fetch(`/imageapi/deleteimage/${id}`, {
			        method: 'DELETE',
			      })
			      .then(response => {
			        if (response.ok) {
			          Swal.fire({
			            icon: 'success',
			            title: 'Success',
			            text: 'Image deleted successfully!',
			          }).then(() => {
			        	  refreshimage(); // Reload the page after successful deletion
			          });
			        } else {
			          throw new Error('Delete request failed.');
			        }
			      })
			      .catch(error => {
			        console.error(error);
			      });
			    } else if (result.dismiss === Swal.DismissReason.cancel) {
			      // User canceled, do nothing
			    }
			  });
			}
function closeModalImage() {
		    document.getElementById("editImageModal").style.display = "none";
		}
		async function openEditImageModal(id) {
		    try {
		        let response = await fetch("/imageapi/getbyimage/" + id);
		        let data = await response.json();
		        var imageElement = document.createElement("img");
		        imageElement.src = "data:image/jpeg;base64," + data.image;
		        document.getElementById("image").innerHTML = ""; // Clear current image content
		        document.getElementById("image").appendChild(imageElement);

		        var form = document.getElementById("editimagForm");
		        form.action = "/imageapi/imagehhh/" + id;
		        
		        // Show the modal
		        $('#editImageModal').modal('show');
		    } catch (error) {
		    }
		}
		function submitImageForm(event) {
		    event.preventDefault(); // Prevent the form from submitting normally

		    Swal.fire({
		        title: 'Submit Form?',
		        text: 'Are you sure you want to submit this form?',
		        icon: 'warning',
		        showCancelButton: true,
		        confirmButtonText: 'Yes, submit it!',
		        cancelButtonText: 'No, cancel',
		        reverseButtons: true,
		    }).then((result) => {
		        if (result.isConfirmed) {
		            const form = event.target;
		            const formData = new FormData(form);

		            fetch(form.action, {
		                method: form.method,
		                body: formData
		            })
		            .then(response => {
		                if (response.ok) {
		                    Swal.fire({
		                        icon: 'success',
		                        title: 'Success',
		                        text: 'Form submitted successfully!',
		                    }).then(() => {
		                        $('#editImageModal').hide(); 
		                        refreshimage();
		                    });
		                } else {
		                    throw new Error('Form submission failed.');
		                }
		            })
		            .catch(error => {
		                console.error('An error occurred while submitting the form:', error);
		            });
		        }
		    });
		}
		
		
		//Careers Tab functionality all the java script
		
		function openCarrersModal() {
    document.getElementById("addCareersModalButton").style.display = "block";
}


function closeAddCareersModal() {
    document.getElementById("addCareersModalButton").style.display = "none";
}
		
				function submitCareersForm(event) {
			event.preventDefault(); // Prevent the form from submitting normally

			// Make an AJAX request to submit the form data
			const form = event.target;
			const formData = new FormData(form);

			fetch(form.action, {
				method: form.method,
				body: formData
			})
				.then(response => {
					// Handle the success response
					if (response.ok) {
    	  document.querySelector('#addCareersModalButton').style.display = "none";  // Hide the entire container
						  Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'carers added successfully!',
          allowOutsideClick: false  // Disallow clicking outside the alert
        }).then(() => {
			form.reset();
			getalljobs();
			
        });
      } else {
          Swal.fire({
          icon: 'failure',
          title: 'Form Not submitted',
          text: 'Form Not added successfully!',
          allowOutsideClick: false  // Disallow clicking outside the alert
        })
      }
    })
				
				.catch(error => {
					// Handle any errors
					console.error('An error occurred while submitting the form:', error);
				});
		}
		
							function searchjob() {
							    let input, filter, table, tr, td, i, j, txtValue;
							    input = document.getElementById('searchjob');
							    filter = input.value.toUpperCase();
							    table = document.querySelector('#tab2 .table');
							    tr = table.getElementsByTagName('tr');

							    for (i = 1; i < tr.length; i++) { // Start from 1 to avoid the headers
							        tr[i].style.display = "none"; // Initially hide all rows
							        td = tr[i].getElementsByTagName('td');
							        for (j = 0; j < td.length; j++) {
							            if (td[j]) {
							                txtValue = td[j].textContent || td[j].innerText;
							                if (txtValue.toUpperCase().indexOf(filter) > -1) {
							                    tr[i].style.display = "";
							                    break; 
							                }
							            }
							        }
							    }
							}
							const ITEMS_PER_PAGE_CAREERS = 5; 
							let currentPageCareers = 1;
							let allDataCareers = [];

							function displayPageCareers(page) {
							    const start = (page - 1) * ITEMS_PER_PAGE_CAREERS;
							    const end = start + ITEMS_PER_PAGE_CAREERS;

							    const pageData = allDataCareers.slice(start, end);

							    document.getElementById("dataContainer3").innerHTML = ""; 

							    pageData.forEach(item => {
							        var row = `<tr>
							            <td>${item.id}</td>
							            <td>${item.phoneNumber}</td>
							            <td>${item.email}</td>
							            <td>${item.jobTitle}</td>
							            <td>${item.keySkills}</td>
							            <td>${item.yearsOfExperience}</td>
							            <td>${item.jobDescription}</td>
							            <td id="editbutton" class="button-container">
							               <button class="edit-button btn btn-primary" onclick="getcareers(${item.id})">Edit</button>

							                <button class="delete-btn" onclick="deletejob(${item.id})">Delete</button>
							            </td>
							        </tr>`;
							        document.getElementById("dataContainer3").innerHTML += row;
							    });

							    displayPaginationLinksCareers();
							}

							function displayPaginationLinksCareers() {
							    const totalItems = allDataCareers.length;
							    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE_CAREERS);

							    let links = "";
							    for (let i = 1; i <= totalPages; i++) {
							        links += `<button onclick="gotoPageCareers(${i})">${i}</button>`;
							    }
							    document.getElementById("pagination-container-careers").innerHTML = links;
							}

							function gotoPageCareers(page) {
							    currentPageCareers = page;
							    displayPageCareers(currentPageCareers);
							}

							fetch("/apijobdetails/alljobs")
							.then(response => response.json())
							.then(data => {
							    allDataCareers = data;
							    displayPageCareers(currentPageCareers); 
							});
							
							
							function getalljobs(){
								fetch("/apijobdetails/alljobs")
								.then(response => response.json())
								.then(data => {
								    allDataCareers = data;
								    displayPageCareers(currentPageCareers); 
								});	
							}
 function deletejob(id) {
			  // Show a confirmation dialog before proceeding with deletion
			  Swal.fire({
			    title: 'Are you sure?',
			    text: 'You are about to delete this job.',
			    icon: 'warning',
			    showCancelButton: true,
			    confirmButtonText: 'Yes, delete it!',
			    cancelButtonText: 'No, cancel',
			    reverseButtons: true,
			  }).then((result) => {
			    if (result.isConfirmed) {
			      // User confirmed, proceed with deletion
			      fetch(`/apijobdetails/deletejob/${id}`, {
			        method: 'DELETE',
			      })
			      .then(response => {
			        if (response.ok) {
			          Swal.fire({
			            icon: 'success',
			            title: 'Success',
			            text: 'Job deleted successfully!',
			          }).then(() => {
			        	  getalljobs(); // Reload the page after successful deletion
			          });
			        } else {
			          throw new Error('Delete request failed.');
			        }
			      })
			      .catch(error => {
			        console.error(error);
			      });
			    } else if (result.dismiss === Swal.DismissReason.cancel) {
			      // User canceled, do nothing
			    }
			  });
			}
		function closeCareer() {
		    document.getElementById("editCareerModal").style.display = "none";
		}
		function getcareers(id){
		    // Fetch data using the id passed to the function
		    fetch("/apijobdetails/getbyid/" + id)
		        .then(response => response.json())
		        .then(data => {
		            document.getElementById("phoneNumber").value = data.phoneNumber;
		            document.getElementById("email").value = data.email;
		            document.getElementById("jobTitle").value = data.jobTitle;
		            document.getElementById("keySkills").value = data.keySkills;
		            document.getElementById("yearsOfExperience").value = data.yearsOfExperience;
		            document.getElementById("jobDescription").value = data.jobDescription;

		            // Update the form action attribute
		            var form = document.getElementById("editcareerForm");
		            form.action = "/apijobdetails/jobupdating/" + id;
		            
		            // Show the modal
		            $('#editCareerModal').modal('show');
		        })
		        .catch(error => {
		            console.error("Error fetching data:", error);
		        });
		};


		
		function submitEditCareersForm(event) {
		    event.preventDefault(); // Prevent the form from submitting normally

		    // Show a confirmation dialog before proceeding with submission
		    Swal.fire({
		        title: 'Submit Form?',
		        text: 'Are you sure you want to submit this form?',
		        icon: 'warning',
		        showCancelButton: true,
		        confirmButtonText: 'Yes, submit it!',
		        cancelButtonText: 'No, cancel',
		        reverseButtons: true,
		    }).then((result) => {
		        if (result.isConfirmed) {
		            // User confirmed, proceed with form submission
		            const form = event.target;
		            const formData = new FormData(form);

		            fetch(form.action, {
		                method: form.method,
		                body: formData
		            })
		            .then(response => {
		                if (response.ok) {
					document.getElementById("editCareerModal").style.display = "none";

		                    Swal.fire({
		                        icon: 'success',
		                        title: 'Success',
		                        text: 'Form submitted successfully!',
		                    }).then(() => {
		                    	getalljobs();
		                    	   $('#editCareerModal').hide(); 
		                    });
		                } else {
		                    throw new Error('Form submission failed.');
		                }
		            })
		            .catch(error => {
		                console.error('An error occurred while submitting the form:', error);
		            });
		        }
		    });
		}

		//Job Application Response Page
		function searchCareersdetails() {
						    let input, filter, table, tr, td, i, j, txtValue;
						    input = document.getElementById('searchCareersdetails');
						    filter = input.value.toUpperCase();
						    table = document.querySelector('#tab4 .table');
						    tr = table.getElementsByTagName('tr');

						    for (i = 1; i < tr.length; i++) { // Start from 1 to avoid the headers
						        tr[i].style.display = "none"; // Initially hide all rows
						        td = tr[i].getElementsByTagName('td');
						        for (j = 0; j < td.length; j++) {
						            if (td[j]) {
						                txtValue = td[j].textContent || td[j].innerText;
						                if (txtValue.toUpperCase().indexOf(filter) > -1) {
						                    tr[i].style.display = "";
						                    break; 
						                }
						            }
						        }
						    }
						}
						// Different names as per your request
						const CAREERS_ITEMS_PER_PAGE = 5; // This defines the number of items per page
						let careersCurrentPage = 1; // The initial page is set to 1
						let careersAllData = []; // This will store all fetched data for pagination

						function displayCareersPage(page) {
						    const start = (page - 1) * CAREERS_ITEMS_PER_PAGE;
						    const end = start + CAREERS_ITEMS_PER_PAGE;
						    const pageData = careersAllData.slice(start, end);

						    document.getElementById("dataContainer4").innerHTML = ""; // Clear current table content
						    pageData.forEach(item => {
						        var row = `<tr>
						            <td>${item.id}</td>
						            <td>${item.name}</td>
						            <td>${item.email}</td>
						            <td>${item.mobile}</td>
						            <td>${item.dateOfBirth}</td>
						            <td>${item.relativeExperience}</td>
						           
						            <td>
						                <a class="resume-link" href="data:application/pdf;base64, ${item.resume}" download="resume.pdf">
						                  Download PDF
						                </a></td>
						                  <td> <button class="delete-btn" onclick="deleteJobApplication(${item.id})">Delete</button>
						            </td>
						        </tr>`;
						        document.getElementById("dataContainer4").innerHTML += row;
						    });

						    displayCareersPaginationLinks();
						}
						
	function deleteJobApplication(id) {
    // Display a SweetAlert confirmation dialog
    Swal.fire({
        title: 'Are you sure?',
        text: 'You won\'t be able to revert this!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            // User confirmed the deletion
            // Send a DELETE request to delete the job application with the specified ID
            fetch(`/jobapplication/jobapplications/${id}`, {
                method: 'DELETE'
            })
            .then(response => {
                if (response.ok) {
                    // Job application deleted successfully, you can refresh the data and display the updated table
                    fetch("/jobapplication/job-applications")
                    .then(response => response.json())
                    .then(data => {
                        careersAllData = data;
                        displayCareersPage(careersCurrentPage);
                        this.save();
                    });
                } else {
                    // Handle deletion failure
                    console.error('Failed to delete job application');
                }
            })
            .catch(error => {
                console.error('An error occurred while deleting the job application:', error);
            });
        }
    });
}

						function displayCareersPaginationLinks() {
						    const totalItems = careersAllData.length;
						    const totalPages = Math.ceil(totalItems / CAREERS_ITEMS_PER_PAGE);

						    let links = "";
						    for (let i = 1; i <= totalPages; i++) {
						        links += `<button onclick="gotoCareersPage(${i})">${i}</button>`;
						    }
						    document.getElementById("careers-pagination-container").innerHTML = links;
						}

						function gotoCareersPage(page) {
						    careersCurrentPage = page;
						    displayCareersPage(careersCurrentPage);
						}

						fetch("/jobapplication/job-applications")
						.then(response => response.json())
						.then(data => {
						    careersAllData = data; // Populate the allData array with the fetched data
						    displayCareersPage(careersCurrentPage); // Display the first page initially
						});
						
						
						
						//Contact us Details Page 
						
							
						function searchcontact() {
						    let input, filter, table, tr, td, i, j, txtValue;
						    input = document.getElementById('searchcontact');
						    filter = input.value.toUpperCase();
						    table = document.querySelector('#tab6 .table');
						    tr = table.getElementsByTagName('tr');

						    for (i = 1; i < tr.length; i++) { // Start from 1 to avoid the headers
						        tr[i].style.display = "none"; // Initially hide all rows
						        td = tr[i].getElementsByTagName('td');
						        for (j = 0; j < td.length; j++) {
						            if (td[j]) {
						                txtValue = td[j].textContent || td[j].innerText;
						                if (txtValue.toUpperCase().indexOf(filter) > -1) {
						                    tr[i].style.display = "";
						                    break; 
						                }
						            }
						        }
						    }
						}
						const CONTACT_ITEMS_PER_PAGE = 5; 
						let contactCurrentPage = 1; 
						let contactAllData = []; 

						function displayContactPage(page) {
						    const start = (page - 1) * CONTACT_ITEMS_PER_PAGE;
						    const end = start + CONTACT_ITEMS_PER_PAGE;
						    const pageData = contactAllData.slice(start, end);

						    document.getElementById("dataContainer6").innerHTML = ""; 
						    pageData.forEach(item => {
						        var row = `<tr>
						            <td>${item.id}</td>
						            <td>${item.firstName}</td>
						            <td>${item.lastName}</td>
						            <td>${item.phoneNumber}</td>
						            <td>${item.email}</td>
						            <td>${item.message}</td>
						             <td><button onclick="deleteContact(${item.id})">Delete</button></td>
						        </tr>`;
						        document.getElementById("dataContainer6").innerHTML += row;
						    });

						    displayContactPaginationLinks();
						}

						function displayContactPaginationLinks() {
						    const totalItems = contactAllData.length;
						    const totalPages = Math.ceil(totalItems / CONTACT_ITEMS_PER_PAGE);

						    let links = "";
						    for (let i = 1; i <= totalPages; i++) {
						        links += `<button onclick="gotoContactPage(${i})">${i}</button>`;
						    }
						    document.getElementById("contact-pagination-container").innerHTML = links;
						}

						function gotoContactPage(page) {
						    contactCurrentPage = page;
						    displayContactPage(contactCurrentPage);
						}

						fetch("/contactdetails/getallcontacts")
						.then(response => response.json())
						.then(data => {
						    contactAllData = data; 
						    displayContactPage(contactCurrentPage); 
						});

function deleteContact(id) {
    // Display a confirmation dialog
    Swal.fire({
        title: 'Are you sure?',
        text: 'You won\'t be able to revert this!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            // User confirmed the deletion
            // Send a request to delete the contact with the specified ID
            fetch(`/contactdetails/${id}`, {
                method: 'DELETE'
            })
            .then(response => {
                if (response.ok) {
                   
                } else {
                    // Handle deletion failure
                    console.error('Failed to delete contact');
                }
            })
            .catch(error => {
                console.error('An error occurred while deleting the contact:', error);
            });
        }
    });
}




				
			
						
//ScrollNews java Script code 
		function addNewScrollNews() {
    document.getElementById("addscrollModalButton").style.display = "block";
}


function closeAddScrollModal() {
    document.getElementById("addscrollModalButton").style.display = "none";
}
function submitScrollForm(event) {
			event.preventDefault(); // Prevent the form from submitting normally

			// Make an AJAX request to submit the form data
			const form = event.target;
			const formData = new FormData(form);

			fetch(form.action, {
				method: form.method,
				body: formData
			})
				.then(response => {
					// Handle the success response
					if (response.ok) {
						    	  document.querySelector('#addscrollModalButton').style.display = "none";  // Hide the entire container
						  Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'ScollNews added successfully!',
          allowOutsideClick: false  // Disallow clicking outside the alert
        }).then(() => {
			   form.reset();
			getScrollnews();
        });
      } else {
          Swal.fire({
          icon: 'failure',
          title: 'Form Not submitted',
          text: 'Form Not added successfully!',
          allowOutsideClick: false  // Disallow clicking outside the alert
        })
      }
    })
		
				.catch(error => {
					// Handle any errors
					console.error('An error occurred while submitting the form:', error);
				});
		}


	function searchscrollnews() {
						    let input, filter, table, tr, td, i, j, txtValue;
						    input = document.getElementById('searchscrollnews');
						    filter = input.value.toUpperCase();
						    table = document.querySelector('#tab5 .table');
						    tr = table.getElementsByTagName('tr');

						    for (i = 1; i < tr.length; i++) { // Start from 1 to avoid the headers
						        tr[i].style.display = "none"; // Initially hide all rows
						        td = tr[i].getElementsByTagName('td');
						        for (j = 0; j < td.length; j++) {
						            if (td[j]) {
						                txtValue = td[j].textContent || td[j].innerText;
						                if (txtValue.toUpperCase().indexOf(filter) > -1) {
						                    tr[i].style.display = "";
						                    break; 
						                }
						            }
						        }
						    }
						}
						// Different variable names specific to scrollnews pagination
						const SCROLLNEWS_ITEMS_PER_PAGE = 5; 
						let scrollnewsCurrentPage = 1; 
						let scrollnewsAllData = []; 

						function displayScrollNewsPage(page) {
						    const start = (page - 1) * SCROLLNEWS_ITEMS_PER_PAGE;
						    const end = start + SCROLLNEWS_ITEMS_PER_PAGE;
						    const pageData = scrollnewsAllData.slice(start, end);

						    document.getElementById("dataContainer").innerHTML = ""; // Clear current table content
						    pageData.forEach(item => {
						        var row = `<tr>
						            <td>${item.id}</td>
						            <td>${item.scrollNews}</td>
						            <td id="editbutton" >
						               
						                <button class="edit-button btn btn-primary" onclick="getScroll(${item.id})">Edit</button>
						                <button onclick="deleteScrollNews(${item.id})" style="background-color:red">Delete</button>
						            </td>
						        </tr>`;
						        document.getElementById("dataContainer").innerHTML += row;
						    });

						    displayScrollNewsPaginationLinks();
						}

						function displayScrollNewsPaginationLinks() {
						    const totalItems = scrollnewsAllData.length;
						    const totalPages = Math.ceil(totalItems / SCROLLNEWS_ITEMS_PER_PAGE);

						    let links = "";
						    for (let i = 1; i <= totalPages; i++) {
						        links += `<button onclick="gotoScrollNewsPage(${i})">${i}</button>`;
						    }
						    document.getElementById("scrollnews-pagination-container").innerHTML = links;
						}

						function gotoScrollNewsPage(page) {
						    scrollnewsCurrentPage = page;
						    displayScrollNewsPage(scrollnewsCurrentPage);
						}

						fetch("/scrollnews/getallscrollnews")
						.then(response => response.json())
						.then(data => {
						    scrollnewsAllData = data; // Populate the scrollnewsAllData array with the fetched data
						    displayScrollNewsPage(scrollnewsCurrentPage); // Display the first page initially
						});
						
						
				function getScrollnews(){
					fetch("/scrollnews/getallscrollnews")
					.then(response => response.json())
					.then(data => {
					    scrollnewsAllData = data; // Populate the scrollnewsAllData array with the fetched data
					    displayScrollNewsPage(scrollnewsCurrentPage); // Display the first page initially
					});
						}
						
						function deleteScrollNews(id) {
  // Show a confirmation dialog before proceeding with deletion
  Swal.fire({
    title: 'Are you sure?',
    text: 'You are about to delete this scroll news item.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, cancel',
    reverseButtons: true,
  }).then((result) => {
    if (result.isConfirmed) {
      // User confirmed, proceed with deletion
      fetch(`/scrollnews/deleteby/${id}`, {
        method: 'DELETE',
      })
      .then(response => {
        if (response.ok) {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Scroll news item deleted successfully!',
          }).then(() => {
        	  getScrollnews(); // Reload the page after successful deletion
          });
        } else {
          throw new Error('Delete request failed.');
        }
      })
      .catch(error => {
        console.error(error);
      });
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      // User canceled, do nothing
    }
  });
}


  function closeScrollModel() {
	    document.getElementById("editScrollNewsModal").style.display = "none";
	}
  function getScroll(id) {
	    // Fetch scroll news data using the id passed to the function
	    fetch("/scrollnews/getbyId/" + id)
	        .then(response => response.json())
	        .then(data => {
	            document.getElementById("scrollNews").value = data.scrollNews;
	            
	            // Update the form action attribute
	            var form = document.getElementById("editForm");
	            form.action = "/scrollnews/updating/" + id;
	            
	            // Show the modal
	            $('#editScrollNewsModal').modal('show');
	        })
	        .catch(error => {
	            console.error("Error fetching data:", error);
	        });
	}

    function submitEditScrollForm(event) {
        event.preventDefault(); // Prevent the form from submitting normally

        // Show a confirmation dialog before proceeding with submission
        Swal.fire({
            title: 'Submit Form?',
            text: 'Are you sure you want to submit this form?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, submit it!',
            cancelButtonText: 'No, cancel',
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                // User confirmed, proceed with form submission
                const form = event.target;
                const formData = new FormData(form);

                fetch(form.action, {
                    method: form.method,
                    body: formData
                })
                .then(response => {
                    if (response.ok) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Success',
                            text: 'Form submitted successfully!',
                        }).then(() => {
                        	getScrollnews();
                        	   $('#editScrollNewsModal').hide(); 
                        });
                    } else {
                        throw new Error('Form submission failed.');
                    }
                })
                .catch(error => {
                    console.error('An error occurred while submitting the form:', error);
                });
            }
        });
    }
