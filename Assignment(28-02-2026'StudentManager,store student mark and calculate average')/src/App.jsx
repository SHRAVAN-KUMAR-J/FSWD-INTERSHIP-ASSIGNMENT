import React, { useState } from "react";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [marks, setMarks] = useState("");

  const addStudent = () => {
    if (name === "" || marks === "") {
      alert("Please enter name and marks");
      return;
    }

    const newStudent = {
      name: name,
      marks: Number(marks),
    };

    setStudents([...students, newStudent]);
    setName("");
    setMarks("");
  };

  const deleteStudent = (index) => {
    const updatedStudents = students.filter((_, i) => i !== index);
    setStudents(updatedStudents);
  };

  const getGrade = (marks) => {
    if (marks >= 90) return "A";
    if (marks >= 75) return "B";
    if (marks >= 60) return "C";
    if (marks >= 40) return "D";
    return "F";
  };

  const average =
    students.length > 0
      ? (
          students.reduce((sum, s) => sum + s.marks, 0) / students.length
        ).toFixed(2)
      : 0;

  const topper =
    students.length > 0
      ? Math.max(...students.map((s) => s.marks))
      : 0;

  return (
    <div className="container">
      <h1>🎓 Student Manager</h1>

      <div className="form">
        <input
          type="text"
          placeholder="Student Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Marks"
          value={marks}
          onChange={(e) => setMarks(e.target.value)}
        />

        <button onClick={addStudent}>Add Student</button>
      </div>

      <h2>Student List</h2>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Marks</th>
            <th>Grade</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {students.map((s, index) => (
            <tr key={index} className={s.marks === topper ? "topper" : ""}>
              <td>{s.name}</td>
              <td>{s.marks}</td>
              <td>{getGrade(s.marks)}</td>
              <td>
                <button onClick={() => deleteStudent(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Average Marks: {average}</h3>
    </div>
  );
}

export default App;