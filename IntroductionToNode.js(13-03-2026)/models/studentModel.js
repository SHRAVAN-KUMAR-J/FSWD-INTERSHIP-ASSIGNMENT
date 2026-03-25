let students=[
    {id:1,name:"John Doe",course:"Computer Science"},
    {id:2,name:"Jane Smith",course:"Mathematics"},
];
const getAllStudents=()=>{
    return students;
}
const getStudentById=(id)=>{
    return students.find(student=>student.id===id);
}
const addStudent=(studentData)=>{
    const newStudent={
        id:students.length+1,
        ...studentData
    }
    students.push(newStudent);
    return newStudent;
};
module.exports={getAllStudents,getStudentById,addStudent};