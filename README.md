# SurveyKaro

SurveyKaro is a customizable survey creation tool that enables Survey administrators and researchers to create, distribute, and analyze surveys seamlessly. With real-time responses and detailed analytical reports, SurveyKaro is designed to simplify the survey process for both creators and respondents.

## 🚀 Features
- **Survey Creation**: Create customizable surveys with various question types, including multiple-choice, rating scales, and more.
- **Real-time Responses**: Collect and store survey responses seamlessly.
- **Detailed Analysis**: View analytical reports with graphs and statistics to interpret survey data.
- **User Authentication**: Secure login and registration system using JWT.
- **User-Friendly Interface**: Responsive and intuitive UI built with React.

## 🛠️ Tech Stack

### Frontend
- **React.js**: For building dynamic user interfaces.
- **React Router**: To handle routing between pages.
- **Axios**: For making API calls.
- **React-Icons**: For adding icons to the UI.

### Backend
- **Node.js**: Server-side JavaScript runtime.
- **Express.js**: Web framework for Node.js.
- **MongoDB**: NoSQL database for data storage.
- **Mongoose**: Object Data Modeling (ODM) library for MongoDB.
- **JWT**: For secure user authentication.

### Tools & Platforms
- **Postman**: For API testing.
- **Git**: Version control.
- **GitHub**: Repository hosting.

## ⚙️ Installation

### Prerequisites
- Node.js and npm installed on your machine.
- MongoDB installed or use a cloud database like MongoDB Atlas.

### Setup Instructions

1. Clone the repository:
    ```bash
    git clone https://github.com/Saifhuseni/SurveyKaro.git
    cd SurveyKaro
    ```

2. **Backend Setup**:
    ```bash
    cd backend
    npm install
    ```
    Create a `.env` file in the backend directory and add:
    ```makefile
    MONGO_URI=your-mongodb-connection-string
    JWT_SECRET=your-jwt-secret
    PORT=5000
    ```
    Start the backend server:
    ```bash
    npm start
    ```

3. **Frontend Setup**:
    ```bash
    cd ../frontend
    npm install
    ```
    Create a `.env` file in the frontend directory and add:
    ```arduino
    REACT_APP_API_URL=http://localhost:5000
    ```
    Start the frontend development server:
    ```bash
    npm start
    ```

4. **Visit the Application**:
   - Frontend: [http://localhost:5000](http://localhost:5000)
   - Backend: [http://localhost:5000](http://localhost:5000)

## 📊 API Endpoints

| HTTP Method | Endpoint                                  | Description                                 |
|-------------|-------------------------------------------|---------------------------------------------|
| POST        | /api/auth/register                        | Register a new user                         |
| POST        | /api/auth/login                           | Login a user                                |
| GET         | /api/users/profile                        | Get User Profile                            |
| POST        | /api/surveys                             | Create a Survey                             |
| GET         | /api/surveys                             | Get All Surveys Created by User            |
| GET         | /api/surveys/:id                        | Get a Specific Survey                       |
| PUT         | /api/surveys/:id                        | Update a Survey                             |
| DELETE      | /api/surveys/:id                        | Delete a Survey                             |
| POST        | /api/surveys/:id/response               | Submit Survey Response                      |
| GET         | /api/surveys/:id/results                 | Get Survey Results and Analysis                         |


## 🎨 UI Screenshots
**Homepage**
![homescreen](https://github.com/user-attachments/assets/13aa7f17-7711-4b4d-90f1-e1e7b859d969)
  
  
**Loginpage**
![Login](https://github.com/user-attachments/assets/afa0d1d6-1fbc-4768-97fd-d36247be45a2)


**Register Page**
![Register](https://github.com/user-attachments/assets/0fe5458c-5408-47e8-b6cc-e6b5cdf6d3a9)


**Dashboard**
![Dashboard](https://github.com/user-attachments/assets/4b1a2d9c-433c-4ebc-8a68-14c48c371aff)


**Create Survey page**
![createSurvey](https://github.com/user-attachments/assets/831cf291-bd58-4fa9-8844-ff9f008c1fb7)


**View All Survey page**
![Viewsurveys](https://github.com/user-attachments/assets/92167d3e-9de1-4e0d-b743-9e8e628b637a)


**View Particular Survey page**
![viewparticularsurvey](https://github.com/user-attachments/assets/5f6e92f7-c088-4e52-ba8c-83f215b6855d)


![survey Management](https://github.com/user-attachments/assets/baf12298-333f-4b5c-a6d4-ee82d0d8ec0c)


**Update  Survey page**
![updatesurvey](https://github.com/user-attachments/assets/1885114a-cbc8-4d31-8df9-e2bd618f644d)


**Survey Analysis page**
![survey Analysis 1](https://github.com/user-attachments/assets/53ebe213-2c61-4ca9-b230-3592d9a7c169)

![Survey Analysis 2](https://github.com/user-attachments/assets/f918e866-39d6-4e86-a207-9aea1ff8abf6)

![survey Analysis 3](https://github.com/user-attachments/assets/41d8afe7-f230-479c-be4a-808567fa552e)





## 🚀 How It Works
1. **Create a Survey**: Survey administrators create surveys with various types of questions.
2. **Share the Survey**: Distribute the  unique survey code to respondents.
3. **Respond to the Survey**: Respondents fill out surveys and submit their responses.
4. **Analyze Results**: Survey administrators view analysis with visual representations of collected data.

## 👨‍💻 Development Workflow
- **Backend**: Handles user authentication, survey CRUD operations, and data analysis.
- **Frontend**: Manages user interactions, data presentation, and calls to backend APIs.
- **Database**: MongoDB stores user details, surveys, and responses.

## Contributors
- **[Saif Huseni](https://github.com/saifhuseni)** - Developer
- **[Smit Bhansali](https://github.com/Smituz/)** - Developer



⭐️ If you like this project, don't forget to give it a star!
