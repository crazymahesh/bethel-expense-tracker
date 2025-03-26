# Bethel Expense Tracker

This is a full-stack expense tracker application built with Node.js for the backend and Angular for the frontend. It allows users to sign up, log in, add, edit, delete, and filter expenses by date and category.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)
- [License](#license)

## Features

- User authentication with JWT
- Landing page
- Add, edit, delete, and view expenses
- Filter expenses by date range and category
- Total expenses calculation for the all-time and filtered expenses like month and year.


## Technologies Used

- Backend: Node.js, Express.js, MongoDB, Mongoose, JWT, Nodemailer
- Frontend: Angular, Tailwind CSS

## Prerequisites

- Node.js (v14.x or later)
- Angular CLI (v19.x or later)
- MongoDB (local or remote instance)

## Installation

### Backend

1. Clone the repository:

    ```sh
    git clone https://github.com/crazymahesh/bethel-expense-tracker.git
    cd bethel-expense-tracker/backend
    ```

2. Install dependencies:

    ```sh
    npm install
    ```

3. Create a `.env` file in the `backend` directory with the following content:

    ```bash
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    EMAIL_USER=your-email@gmail.com
    EMAIL_PASS=your-email-password
    ```

4. Start the backend server:

    ```sh
    npm start
    ```

### Frontend

1. Navigate to the frontend directory:

    ```sh
    cd bethel-expense-tracker
    ```

2. Install dependencies:

    ```sh
    npm install
    ```

3. Start the frontend server:

    ```sh
    ng serve
    ```

## Running the Application

- The backend server will run on `http://localhost:5000`.
- The frontend server will run on `http://localhost:4200`.

## API Endpoints


### Expenses

- **GET /api/expenses**: Get all expenses 
- **GET /api/expenses/:id**: Get an expense by ID
- **POST /api/expenses**: Add a new expense
- **PUT /api/expenses/:id**: Update an existing expense
- **DELETE /api/expenses/:id**: Delete an expense

## Usage

1. **Add Expense**: Use the form to add a new expense.
2. **View Expenses**: View a list of all your expenses. Use the filter options to filter by date range and category.
3. **Edit Expense**: Click on an expense to edit its details.
4. **Delete Expense**: Click the delete button to remove an expense.

