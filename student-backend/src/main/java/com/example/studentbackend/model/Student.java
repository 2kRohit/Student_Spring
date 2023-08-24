package com.example.studentbackend.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

@Data
@Document(collection = "students")
public class Student {
    @Id
    private String id;

    @NotEmpty(message = "Name is required")
    @Size(min = 2, max = 100, message = "Name must be between 2 and 100 characters")
    private String name;

    @NotEmpty(message = "Date of Birth is required")
    private String dob;

    @NotEmpty(message = "Class is required")
    private String className;

    @NotEmpty(message = "Division is required")
    private String division;

    @NotEmpty(message = "Gender is required")
    private String gender;

    private String admissionNumber;
}
