import React, { useEffect, useState } from 'react';
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
    try {
    const res = await axios.get('http://localhost:8080/students/list');
    setStudents(res.data);}
    catch (error) {
      console.error('Error adding student:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!formData.name || !formData.dob || !formData.className || !formData.division || !formData.gender) {
        alert('Please fill in all fields');
        return;
      }

      const response = await axios.post('http://localhost:8080/students/add', formData);
      if (response.status === 201) {
        alert('Student Information Successfully added');
      } else {
        alert('Error occurred');
      }

      getdata();

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
    <div className='bg-sky-300 mt-0'>
      <br></br>
      <h1 className='text-4xl font-bold text-center '>Student Information</h1>
    <div className=" py-12   flex justify-center items-center  ">
      <div className="max-w-xl h-full w-full bg-sky-100 p-8  shadow-md rounded-md -mt-44 border-4 border-grey-100">
        <h2 className="text-3xl font-semibold mb-6 text-center">Add Student Details</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="off"
              required
              value={formData.name}
              onChange={handleChange}
              className="appearance-none block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900"
            />
          </div>
          <div>
            <label htmlFor="dob" className="block text-sm font-medium text-gray-700">
              Date of Birth
            </label>
            <input
              id="dob"
              name="dob"
              type="date"
              required
              max={new Date().toISOString().split('T')[0]}
              value={formData.dob}
              onChange={handleChange}
              className="appearance-none block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900"
            />
          </div>
          <div>
            <label htmlFor="className" className="block text-sm font-medium text-gray-700">
              Class
            </label>
            <select
              id="className"
              name="className"
              required
              value={formData.className}
              onChange={handleChange}
              className="appearance-none block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900"
            >
              <option value="">Select Class</option>
              {classes.map((cls) => (
                <option key={cls} value={cls}>
                  {cls}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="division" className="block text-sm font-medium text-gray-700">
              Division
            </label>
            <select
              id="division"
              name="division"
              required
              value={formData.division}
              onChange={handleChange}
              className="appearance-none block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900"
            >
              <option value="">Select Division</option>
              {divisions.map((division) => (
                <option key={division} value={division}>
                  {division}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Gender</label>
            <div className="mt-2 space-x-4">
              {genders.map((gender) => (
                <label key={gender} className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio"
                    name="gender"
                    value={gender}
                    checked={formData.gender === gender}
                    onChange={handleChange}
                  />
                  <span className="ml-2 text-sm text-gray-700">{gender}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      <div className="max-w-full bg-sky-100 p-8 shadow-md rounded-md ml-6 -mt-8 border-4 border-grey-100">
        <h2 className="text-3xl font-semibold mb-6 text-center">Student Details</h2>
        <table className="w-full border">
          <thead>
            <tr>
              <th className="px-4 py-2">Admission Number</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Date of Birth</th>
              <th className="px-4 py-2">Class</th>
              <th className="px-4 py-2">Division</th>
              <th className="px-4 py-2">Gender</th>
            </tr>
          </thead>
          <tbody>
            {students
            .sort((a, b) => a.name.localeCompare(b.name)) // Sort students by name
            .map((student, index) => (
              <tr key={index}>
                <td className="px-4 py-2">{student.admissionNumber}</td>
                <td className="px-4 py-2">{student.name}</td>
                <td className="px-4 py-2">{student.dob}</td>
                <td className="px-4 py-2">{student.className}</td>
                <td className="px-4 py-2">{student.division}</td>
                <td className="px-4 py-2">{student.gender}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div></div>
  );
}

export default App;
