# Exam_PG6301_TMT

## Endpoints:

- **GET** /api/activities
- **POST** /api/loggedHours
- **GET** /api/loggedHours
- **POST** /api/activities/new
- **PUT** /api/activities/
- **DELETE** /api/activities/

To build and run the app you need to do this:

Ensure you have the required environment tools:

* Node.js and npm (Node.js package manager)
* MongoDB installed and running locally or a MongoDB Atlas cluster set up
* Clone the repository
* Run "npm install"
* run "cd client" -> "npm install" -> "cd.." -> "cd server" > "npm install" in the terminal
* The .env file should be in the repository but if not create a .env file inside the server folder. Here is the mongoDB url: MONGODB_URL=mongodb+srv://visk010:HUhF4EXYRFarQvbe@cluster0.c3x0cky.mongodb.net/
* type "npm run dev" in the terminal
* To build both client and server type "npm run build" in terminal
* To run in production mode type "npm start" in the terminal
* This will run the server and you can access it at http://localhost:3000/

I managed to complete these tasks:

I did not get any longer because i did not understand everything, but i hope this is sufficent for a standing grade since this is the last grade i need to complete my bachelors degree.

I had big problems with getting the testing to work, i tried everything and i dont know how i could fix it.

* **R1** Requirements **necessary**, but not **sufficient**, for an **E**
* Write a homepage with React
* Have at least 2 other React pages that can be accessed via React-Router
* At least one page should have some "state", with a change that should be triggered from
  the interface.
* From each page, be able to navigate back (either to previous page or to homepage)
  without using the browser "Back" button.
* **R2** Requirements **necessary**, but not **sufficient**, for a **D**
* Create a RESTful API that handles at least one GET, one POST, one PUT, and one
  DELETE calls and uses JSON for data transfer.
* The frontend must use that RESTful API (for example, using fetch).
* All endpoints must be listed in README.md
* The solution should use continuous integration (in this case GitHub actions). Your code
  should be uploaded onto a github repository, and on every push to the master branch, the CI
  script should run the tests associated with your project. 

* **T1** Task requirements **necessary**, but not **sufficient**, for an **E**
* An employee should be able to see
- the activities that are available to them,
- how many hours they have already logged,
- log hours on one or more of those activities, so long as they are still under the
  maximum amount of hours.
* When the application starts in developer mode, you must have some basic test data,
  representing a valid example of use. If you cannot setup the REST API (requirement for grade
  D, see requirement R2), then hardcode such an example in the frontend.
* **T2** Task requirements **necessary**, but not **sufficient**, for an **D**
* A manager should be able to create, modify, and delete tasks that employees can register
  time to. There is no registration page for employees (as all employment is presumed to be
  handled by either the managers or some other mechanism).
* Your database should include some predefined employee and manager accounts for
  testing purposes.