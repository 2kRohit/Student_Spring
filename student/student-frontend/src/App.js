import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

const classes = ['I', 'II', 'III', 'IV', 'V', 'V1', 'V11', 'V111', '1X', 'X', 'X11', 'X12'];
const divisions = ['A', 'B', 'C'];
const genders = ['Male', 'Female'];

function App() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    className: '',
    division: '',
    gender: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const getdata = async () => {
    const res = await axios.get('http://localhost:8080/students/list');
    setStudents(res.data);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Validate form data
      if (
        !formData.name ||
        !formData.dob ||
        !formData.className ||
        !formData.division ||
        !formData.gender
      ) {
        alert('Please fill in all fields');
        return;
      }

      // Send data to backend
      const response = await axios.post('http://localhost:8080/students/add', formData);
      if(response.status===201){
        alert('Student Information Successfully added')
      }
else{
  alert('error occured')
}
      // Update student list
      getdata();

      // Clear the form
      setFormData({
        name: '',
        dob: '',
        className: '',
        division: '',
        gender: '',
      });
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  return (
    <div className="App">
      <h1>Student Information Form</h1>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange}
         pattern="^[A-Za-z\s]+$" title="Only letters and spaces are allowed" />

        <label>Date of Birth:</label>
        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          max={new Date().toISOString().split('T')[0]} // Restrict to past dates
        />

        <label>Class:</label>
        <select name="className" value={formData.className} onChange={handleChange}>
          <option value="">Select Class</option>
          {classes.map((cls) => (
            <option key={cls} value={cls}>
              {cls}
            </option>
          ))}
        </select>

        <label>Division:</label>
        <select name="division" value={formData.division} onChange={handleChange}>
          <option value="">Select Division</option>
          {divisions.map((division) => (
            <option key={division} value={division}>
              {division}
            </option>
          ))}
        </select>

        <label>Gender:</label>
        {genders.map((gender) => (
          <label key={gender}>
            <input
              type="radio"
              name="gender"
              value={gender}
              checked={formData.gender === gender}
              onChange={handleChange}
            />
            {gender}
          </label>
        ))}

        <button type="submit">Submit</button>
      </form>

      <h2>Student Details</h2>
      <table>
        <thead>
          <tr>
          <th>Admission Number</th>
            <th>Name</th>
            <th>Date of Birth</th>
            <th>Class</th>
            <th>Division</th>
            <th>Gender</th>
          </tr>
        </thead>
        <tbody>
          {students
            .sort((a, b) => a.name.localeCompare(b.name)) // Sort students by name
            .map((student, index) => (
              <tr key={index}>
                <td>{student.admissionNumber}</td>
                <td>{student.name}</td>
                <td>{student.dob}</td>
                <td>{student.className}</td>
                <td>{student.division}</td>
                <td>{student.gender}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
