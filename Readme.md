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
. Postman (API testing)
. CORS.


PART B: API DOCUMENTATION (HOW TO USE THE APIs):

This section explains how to test and use each API endpoint, including:

. HTTP Method
. URL
. Authorization token
. Request body (where applicable)
. Expected behavior.


    AUTHENTICATION APIs:
HRMS API Documentation


1. Register Manager

Endpoint: /api/auth/register

Method: POST

Headers: Content-Type: application/json

Body:

{

  "name": "John Manager",

  "email": "manager@example.com",

  "password": "password123",

  "role": "manager"

}

Response: Returns manager details with ID



2. Login Manager

Endpoint: /api/auth/login

Method: POST

Body:

{

  "email": "manager@example.com",

  "password": "password123"

}

Response: Returns JWT token for protected routes



3. Manager Approve/Reject Leave

Endpoint: /api/leaves/:id

Method: PUT

Headers: Authorization: Bearer <JWT_TOKEN>

Body:

{

  "status": "approved" // or "rejected"

}

Get Leave ID: when an employee applies for leave( the first id is your employee ID while the second is your leave id).



4. Manager View All Leaves

Endpoint: /api/leaves/all

Method: GET

Headers: Authorization: Bearer <JWT_TOKEN>

Response: Array of all leave requests



5. Manager View All Employees

Endpoint: /api/employees

Method: GET

Headers: Authorization: Bearer <JWT_TOKEN>

Response: Array of all employee details (IDs, names, emails, roles)



6. Manager View Employee Leave History

Endpoint: /api/leaves/all

Method: GET

Headers: Authorization: Bearer <JWT_TOKEN>


7. Manager View Employee Details

Endpoint: /api/employees/:employeeId

Method: GET

Headers: Authorization: Bearer <JWT_TOKEN>


8. Forbidden: Manager Apply Leave

Endpoint: /api/leaves/

Method: POST

Headers: Authorization: Bearer <JWT_TOKEN>

Body:

{

  "fromDate": "2026-01-20",

  "toDate": "2026-01-22",

  "reason": "Vacation"

}

Expected Response: 403 Forbidden (managers cannot apply leave)



9. Manager Create Shift

Endpoint: /api/shifts

Method: POST

Headers: Authorization: Bearer <JWT_TOKEN>

Body:

{

  "shiftName": "Morning",

  "startTime": "09:00",

  "endTime": "17:00"

}

Response: Shift details with ID



10. Manager Assign Shift to Employee

Endpoint: /api/shifts/assign

Method: POST

Headers: Authorization: Bearer <JWT_TOKEN>



11. Register Employee

Endpoint: /api/auth/register

Method: POST

Body:

{

  "name": "Jane Employee",

  "email": "jane@example.com",

  "password": "password123",

  "role": "employee"

}

Response: Employee ID (use in other requests)



12. Login Employee

Endpoint: /api/auth/login

Method: POST

Body:

{ "email": "...", "password": "..." }

Response: JWT token



13. Employee View Own Leave History

Endpoint: /api/leaves/history

Method: GET

Headers: Authorization: Bearer <JWT_TOKEN>

Response: Array of employee's leave requests



14. Forbidden: Employee Access Manager Route

Test: api/employees with employee token

Expected Response: 403 Forbidden



15. Employee Update My Profile

Endpoint: /api/employees/me

Method: PUT

Headers: Authorization: Bearer <JWT_TOKEN>

Body Example:

{

  "name": "Jane Updated",

  "email": "jane_updated@example.com"

}



16. Employee Cancel Leave

Endpoint: /api/leaves/leaveId

Method: DELETE

Headers: Authorization: Bearer <JWT_TOKEN>



17. Employee Clock-In

Endpoint: /api/attendance/clock-in

Method: POST

Headers: Authorization: Bearer <JWT_TOKEN>



18. Employee Clock-Out

Endpoint: /api/attendance/clock-out

Method: POST

Headers: Authorization: Bearer <JWT_TOKEN>



19. Employee Apply Leave

Endpoint: /api/leaves/

Method: POST

Headers: Authorization: Bearer <JWT_TOKEN>

Body Example:

{

  "fromDate": "2026-01-20",

  "toDate": "2026-01-22",

  "reason": "Sick leave"

}
In your response the first ID here is your employee ID while the second one is your leave ID



20. Employee Attendance History

Endpoint: /api/attendance/history

Method: GET

Headers: Authorization: Bearer <JWT_TOKEN>



21. Unauthorized: No Token
 api/leaves/all

Test: Access any protected route without token

Expected Response: 401 Unauthorized



22. Unauthorized: Invalid Token
       api/leaves

Test: Access any protected route with invalid token

Expected Response: 401 Unauthorized



 API TESTING NOTES:

.All APIs are tested using Postman
.JWT tokens are required for all protected routes
.Employee tokens cannot access manager routes and vice versa
.Role-based access control is strictly enforced
.Proper error handling and status codes are implemented


    Testing Workflow & ID Notes

1. Register/Login manager → get token

2. Register/Login employee → get token

3. Manager creates shift → get shift ID

4. Manager assigns shift to employee → get employee ID

5. Employee applies leave → get leave ID

6. Manager approves/rejects leave

7. Employee views leave history, cancels leave, clocks in/out

8. Test forbidden routes (manager apply leave, employee access manager route)

Test unauthorized routes (no token or invalid token).