const axios = require('axios');
require('dotenv').config();

const apiUrl = 'http://localhost:5001'; // API'nizin URL'si

const exampleTeacherId = "507f1f77bcf86cd799439011";
const exampleStudentId1 = "507f191e810c19729de860ea";
const exampleStudentId2 = "507f191e810c19729de860eb";
const courseId = "507f1f77bcf86cd799439011";


describe('Course Endpoints', () => {
  let courseId;
  let assignmentId;

  it('should create a new course', async () => {
    const res = await axios.post(`${apiUrl}/courses`, {
      title: 'Advanced Mathematics',
      description: 'An advanced course on differential equations and linear algebra.',
      teacherId: exampleTeacherId,
      students: [exampleStudentId1, exampleStudentId2]
    });
    expect(res.status).toEqual(201);
    courseId = res.data._id; // save to new ID
    expect(res.data.title).toEqual('Test Course');
  });

  it('should update a course', async () => {
    const res = await axios.put(`${apiUrl}/courses/${courseId}`, {
      title: 'Updated Test Course',
      description: 'Updated description.',
      students: [exampleStudentId1, exampleStudentId2]
    });
    expect(res.status).toEqual(200);
    expect(res.data.title).toEqual('Updated Test Course');
  });

  it('should delete a course', async () => {
    const res = await axios.delete(`${apiUrl}/courses/${courseId}`);
    expect(res.status).toEqual(200);
  });

  it('should create an assignment', async () => {
    const res = await axios.post(`${apiUrl}/courses/${courseId}/assignments`, {
      title: 'Test Assignment',
      description: 'This is a test assignment.',
      dueDate: new Date('2024-12-01')
    });
    expect(res.status).toEqual(201);
    assignmentId = res.data._id; // save to new assignment ID
    expect(res.data.title).toEqual('Test Assignment');
  });

  it('should update an assignment', async () => {
    const res = await axios.put(`${apiUrl}/assignments/${assignmentId}`, {
      title: 'Updated Test Assignment',
      description: 'Updated description.',
      dueDate: new Date('2025-01-01')
    });
    expect(res.status).toEqual(200);
    expect(res.data.title).toEqual('Updated Test Assignment');
  });

  it('should delete an assignment', async () => {
    const res = await axios.delete(`${apiUrl}/assignments/${assignmentId}`);
    expect(res.status).toEqual(200);
  });
});

