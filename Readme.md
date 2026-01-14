HR MANAGEMENT SYSTEM – BACKEND:

 PART A: PROJECT README (CODE OVERVIEW):

  PROJECT OVERVIEW:
This project is the backend for a Human Resource Management System (HRMS).
It provides RESTful APIs for:

. Authentication and authorization
. Employee profile management
. Leave request handling
. Attendance tracking
. Shift creation and assignment.

The backend is built using Node.js, Express, and MongoDB, with JWT-based authentication and role-based access control to separate Employee and Manager responsibilities.

The system was implemented incrementally across 8 backend sprints, starting from basic authentication to full shift and attendance management.
 TECH STACK
. Node.js
. Express.js
. MongoDB & Mongoose
. JWT (JSON Web Token)
. bcryptjs
. Postman (API testing).


PART B: API DOCUMENTATION (HOW TO USE THE APIs):

This section explains how to test and use each API endpoint, including:

. HTTP Method
. URL
. Authorization token
. Request body (where applicable)
. Expected behavior.


    AUTHENTICATION APIs:

. Register User (employee/manager)

POST /api/auth/register

Body:
{
  "name": "John Doe",
  "email": "john@email.com",
  "password": "password123",
  "role": "admin | manager | employee"
}
  <!-- Note:
Role values must be lowercase
Email must be unique. -->

. Login User (employee/manager)

POST /api/auth/login

Body:
{
  "email": "john@email.com",
  "password": "password123"
}

Response:
{
  "token": "JWT_TOKEN"
}
  <!-- The token must be used for all protected routes. -->

            EMPLOYEE APIs
. Employee View My Profile

GET /api/employees/me

Authorization:
Bearer EMPLOYEE_TOKEN

. Employee Update My Profile
PUT /api/employees/me

Authorization:
Bearer EMPLOYEE_TOKEN

. Employee Apply Leave

POST /api/leaves

Authorization:
Bearer EMPLOYEE_TOKEN

Body:
{
  "reason": "Medical leave",
  "startDate": "2026-01-20",
  "endDate": "2026-01-22"
}
 <!-- Leave is created with status pending. -->

. Employee View Own Leave History

GET /api/leaves/history

Authorization:
Bearer EMPLOYEE_TOKEN

 <!-- Used to retrieve leaveId. -->

. Employee Cancel Leave

DELETE /api/leaves/:id

Authorization:
Bearer EMPLOYEE_TOKEN
 <!-- :id _ Leave ID from leave history
 Only pending leaves can be cancelled. -->

. Employee Clock-In

POST /api/attendance/clock-in

Authorization:
Bearer EMPLOYEE_TOKEN
 <!-- Employee must have a shift assigned. -->

. Employee Clock-Out

POST /api/attendance/clock-out

Authorization:
Bearer EMPLOYEE_TOKEN

. Employee Attendance History

GET /api/attendance/history

Authorization:
Bearer EMPLOYEE_TOKEN


       MANAGER APIs:
. Manager View All Employees

GET /api/employees

Authorization:
Bearer MANAGER_TOKEN
 <!-- Used to retrieve employeeId for manager actions. -->

. Manager View Employee Leave History

GET /api/employees/:id/leaves

Authorization:
Bearer MANAGER_TOKEN
<!-- :id → Employee ID from View All Employees -->

. Manager View All Leaves

GET /api/leaves/all

Authorization:
Bearer MANAGER_TOKEN

. Manager Approve / Reject Leave

PUT /api/leaves/:id

Authorization:
Bearer MANAGER_TOKEN

Body:
{
  "status": "approved | rejected"
}
 <!-- :id → Leave ID from View All Leaves -->

. Manager Create Shift

POST /api/shifts

Authorization:
Bearer MANAGER_TOKEN

Body:
{
  "name": "Morning Shift",
  "startTime": "09:00",
  "endTime": "17:00"
}
 <!-- Response contains shiftId. -->


. Manager Assign Shift to Employee

POST /api/shifts/assign

Authorization:
Bearer MANAGER_TOKEN

Body:
{
  "employeeId": "EMPLOYEE_ID",
  "shiftId": "SHIFT_ID"
}

<!-- employeeId → from View All Employees
shiftId → from Create Shift -->

          API TESTING NOTES:

.All APIs are tested using Postman
.JWT tokens are required for all protected routes
.Employee tokens cannot access manager routes and vice versa
.Role-based access control is strictly enforced
.Proper error handling and status codes are implemented