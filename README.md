**React + Azure Functions CRUD Application**

**📖 Project Overview**

This project demonstrates a full‑stack application with:

 **Frontend:** A React application that allows users to view, update, and delete their profile data (location, interests, email).
 
 **Backend:** Azure Functions(AZF) APIs that perform CRUD operations against Azure Table Storage.
 
 **Data Flow:** The frontend calls the backend APIs, which interact with Azure Table Storage to persist user data.

Future enhancements include

**Azure AD / Azure AD B2C integration** for secure user authentication and identity management.

**🛠 Tech Stack**

**Frontend:** React, React Bootstrap

**Backend:** Azure Functions (Node.js runtime)

**Database:** Azure Table Storage

**Authentication (planned):** Azure AD B2C

**Other:** Azure Storage Explorer for local testing

**✨ Features**

  **User Profile Management:**
  
  1.View logged‑in user’s data
  
  2.Update interests and location
  
  3.Delete user data
  
  4.CORS implementation to enable secure cross‑origin requests between frontend and backend.
  
  5.Fetch all user data from Azure Table Storage
  
  **Status Messages:**
  
  Informative alerts for success/error states

**🚀 Setup Instructions**

**Frontend (React)**

1.Navigate to the frontend folder.

2.Install dependencies:
  npm install
  
3.Start the development server:
  npm start
  
4.The app runs at http://localhost:3000.

**Backend (Azure Functions)**

1.Navigate to the backend folder.

2.Install dependencies:
  npm install
  
3.Configure local.settings.json with your Azure Storage connection string:

  json
  {
    "IsEncrypted": false,
    "Values": {
      "AzureWebJobsStorage": "<your_connection_string>",
      "FUNCTIONS_WORKER_RUNTIME": "node"
    }
  }
  
4.Run the Azure Functions locally:
func start

5.The APIs will be available at http://localhost:7071.

**📂 Project Structure**

<img width="248" height="259" alt="image" src="https://github.com/user-attachments/assets/2ad9917e-a5a7-4f88-9f7c-d15368de03d1" />

  
**🏗 Architecture Diagram**

Below is the high‑level architecture of the system:

<img width="684" height="192" alt="image" src="https://github.com/user-attachments/assets/6c468a12-0527-4597-8e04-32193bd2ac2b" />

