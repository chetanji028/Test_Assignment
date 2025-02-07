const asyncHandler = require("express-async-handler");
const {
    getAllStudents,
    addNewStudent,
    getStudentDetail,
    setStudentStatus,
    updateStudent,
    deleteStudent
} = require("./students-service");

// Get all students
const handleGetAllStudents = asyncHandler(async (req, res) => {
    const students = await getAllStudents();
    res.status(200).json(students);
});

// Add a new student
const handleAddStudent = asyncHandler(async (req, res) => {
    const student = await addNewStudent(req.body);
    res.status(201).json(student);
});

// Get student by ID
const handleGetStudentDetail = asyncHandler(async (req, res) => {
    const student = await getStudentDetail(req.params.id);
    if (!student) {
        res.status(404);
        throw new Error("Student not found");
    }
    res.status(200).json(student);
});

// Update student details
const handleUpdateStudent = asyncHandler(async (req, res) => {
    const updatedStudent = await updateStudent(req.params.id, req.body);
    res.status(200).json(updatedStudent);
});

// Change student status
const handleStudentStatus = asyncHandler(async (req, res) => {
    const updatedStatus = await setStudentStatus(req.params.id, req.body.status);
    res.status(200).json(updatedStatus);
});

// Delete a student
const handleDeleteStudent = asyncHandler(async (req, res) => {
    await deleteStudent(req.params.id);
    res.status(204).json({ message: "Student deleted successfully" });
});

module.exports = {
    handleGetAllStudents,
    handleGetStudentDetail,
    handleAddStudent,
    handleUpdateStudent,
    handleStudentStatus,
    handleDeleteStudent,
};
