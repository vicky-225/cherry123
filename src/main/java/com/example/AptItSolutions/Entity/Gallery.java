package com.example.AptItSolutions.Entity;

import java.util.Arrays;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;

@Entity
public class Gallery {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Lob
    @Column(columnDefinition = "LongBlob")
    private byte[] image;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public byte[] getImage() {
		return image;
	}

	public void setImage(byte[] image) {
		this.image = image;
	}

	public Gallery(Long id, byte[] image) {
		super();
		this.id = id;
		this.image = image;
	}

	@Override
	public String toString() {
		return "Gallery [id=" + id + ", image=" + Arrays.toString(image) + "]";
	}

	public Gallery() {
		super();
		// TODO Auto-generated constructor stub
	}

  
}
