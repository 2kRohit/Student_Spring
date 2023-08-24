package com.example.studentbackend.repository;

import com.example.studentbackend.model.Student;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface StudentRepository extends MongoRepository<Student, String> {
}
