# Geolocator App Documentation
## Introduction
The Geolocator App is a web application designed to provide geolocation services to users. It allows users to mark locations on a map, view them, and perform various operations related to geographical data. This document outlines the architecture, setup instructions, and usage guidelines for the Geolocator App.

## Technologies Used
### Backend:
Express.js </br>
Mongoose</br>
MongoDB</br>
### Frontend:
React</br>
React Leaflet</br>
Chakra UI</br>
### Authentication:
JSON Web Token (jsonwebtoken)</br>

## Setup Instructions
#### Backend Setup

Navigate to the backend directory.

```bash
cd backend
```

Install dependencies.
```bash
npm i
```

Configure environment variables. Ensure you have MongoDB installed and running. Create a .env file and provide necessary environment variables (e.g., mongoURL, JWT_SECRET, PORT).</br>

Start the backend server.</br>
```bash
npm run server
```

#### Frontend Setup
Navigate to the frontend directory.
```bash
cd frontend
```
Install dependencies.
```bash
npm install
```
Start the frontend development server.
```bash
npm run dev
```

## Deployment
Backend Deployment: https://skyserve-assignment.onrender.com/
Frontend Deployment: https://sky-serve-geojson.vercel.app/

## Features

- Login/Signup functionality
  
 ![LoginPage_Pic](https://github.com/Nishant6571/skyServe_assignment/blob/main/frontend/src/assets/image1.png)
  
<br>

 ![LoginPage_Pic](https://github.com/Nishant6571/skyServe_assignment/blob/main/frontend/src/assets/image2.png)

  <br>

- Modal showing Login successfull
  
 ![DashboardPage_Pic](https://github.com/Nishant6571/skyServe_assignment/blob/main/frontend/src/assets/image3.png)
 
<br>
  

- Map component
  
![](https://github.com/Nishant6571/skyServe_assignment/blob/main/frontend/src/assets/image4.png)

<br>

- Autheticated user can select the area on the map.
  
![ProfilePage_Pic](https://github.com/Nishant6571/skyServe_assignment/blob/main/frontend/src/assets/image5.png)

<br>

  

- At last user can save the data by clicking on save button.
  
![AboutPage_Pic](https://github.com/Nishant6571/skyServe_assignment/blob/main/frontend/src/assets/image6.png)

<br>


### Conclusion
The Geolocator App provides a seamless platform for users to mark, view, edit, and delete locations on a map. With its intuitive interface and robust backend, it offers an efficient solution for managing geographical data.
  
