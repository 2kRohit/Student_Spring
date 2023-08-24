package com.example.studentbackend.controller;

import com.example.studentbackend.model.Student;
import com.example.studentbackend.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/students")
@CrossOrigin("*")
public class StudentController {

    @Autowired
    private StudentRepository studentRepository;

    @PostMapping("/add")
    public ResponseEntity<?> addStudent(@Valid @RequestBody Student student, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body("Validation errors: " + bindingResult.getAllErrors());
        }

        // Generate unique admission number
        String admissionNumber = generateAdmissionNumber();
        student.setAdmissionNumber(admissionNumber);

        Student savedStudent = studentRepository.save(student);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedStudent);
    }

    @GetMapping("/list")
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    private String generateAdmissionNumber() {
        long studentCount = studentRepository.count() + 1;
        String formattedCount = String.format("%03d", studentCount);
        return "R-" + formattedCount;
    }
}
