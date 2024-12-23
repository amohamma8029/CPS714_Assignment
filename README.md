# User Profile & Account Management  

## Project Overview  
This project is a comprehensive User Profile & Account Management system designed to streamline user interactions and provide a seamless experience. It incorporates features for managing user profiles, tracking rewards, and maintaining an up-to-date account dashboard.  

## Features  
### 1. Profile Management  
- Update business and personal information.  
- Track reward points and redemption history.  

### 2. Account Dashboard  
- View point balances, transaction history, and activity logs.  
- Access all relevant account information in one place.  

### 3. Purchase History  
- Maintain a detailed log of all purchases made.  
- Automatically update loyalty points based on purchases.  

## Technologies Used  
- **Frontend:** React.js  
- **Backend:** Node.js/Express.  
- **Database:**  MongoDB.  
- **Version Control:** Git/GitHub.  

## Usage  
- Navigate to the main dashboard to view account details and recent activity.  
- Update profile information and track reward points under the Profile section.  
- Review purchase history to monitor past transactions and rewards earned.  

## API Endpoints

| **Endpoint**      | **Request**                                                                                     | **Response**                                                                                                   |
|--------------------|-----------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------|
| `GET /get_user_by_email/:email` | **Params:** `email` <br> Retrieves the user by their email address. | **Success (200):** `{"message":"Successfully Found User", "user": ...user data... }` <br> **Error (400):** `{ "error": "User not found" }` <br> **Error (500):** `{ "error": "Failed to fetch user" }` |
| `GET /get_all_users` |Retrieves all user data in the database| **Success (200):** `{"message":""Successfully Found all User Data", "user": ...user data... }` <br> **Error (500):** `{ "error": "Failed to fetch users" }` |
| `POST /add_user/:email` | **Body:** `{ "role": "user" }` <br> **Params:** `email` <br> Creates a new user with `email`, `role`, `point_balance: 0`, `transaction_history: {}`, and `activity_log: []`. | **Success (200):** `{ "message": "User created successfully", "user": { "email": "string", "role": "string", "point_balance": 0 } }` <br> **Error (500):** `{ "message": "Error occurred while creating user", "error": "Error message" }` |
| `PUT /change_role` | **Body:** `{ "email": "string", "role": "string" }` <br> Updates the `role` of an existing user identified by `email`. | **Success (200):** `{ "message": "User's role changed successfully", "email": "string" }` <br> **Error (404):** `{ "message": "User not found" }` <br> **Error (500):** `{ "message": "Could not change role", "error": "Error message" }` |
| `PUT /change_email` | **Body:** `{ "email": "string", "new_email": "string" }` <br> Updates the `email` of an existing user. | **Success (200):** `{ "message": "User's email changed successfully", "new_email": "string" }` <br> **Error (404):** `{ "message": "User not found" }` <br> **Error (500):** `{ "message": "Could not change email", "error": "Error message" }` |
|`PUT /update_activity_log`| **Body:**`{  "email": some_email, "activity_type": some_activity_type , "activity_field": some_activity_field, "activity_date": some_activity_date}` <br> | **Status 200**: `{ message: "Activity log successfully updated", user_data: { ...updated user data... } }` <br>**Status 404**: `{ message: "User not found" }` <br> **Status 500**: `{ message: "Error occurred while updating user's activity log", error: "Detailed error message" }`|
| `PUT /update_transactions` | **Body:** `{ "email": "string", "transaction_id": "string", "transaction_type": "string", "transaction_date": "ISODateString", "transaction_cost": number, "productName": "string", "points_change": number, "description": "string" }` <br> Updates or adds a transaction to the user's transaction history. | **Success (200):** `{ "message": "Transaction history updated successfully", "transaction_history": { ...updated transactions... } }` <br> **Error (404):** `{ "message": "User not found" }` <br> **Error (500):** `{ "message": "Error occurred while updating transaction history", "error": "Error message" }` |
|`DELETE /delete_user_by_email/:email`|**Params:** `email` <br> Deletes the user's data entry in the database |**Success (200):** `{message: "Item Successfully Removed", user: the_deleted_user_data}`  <br> **Error (404):** `{ "message": "User not found" }` <br> **Error (500):** `{ "message": "Error occurred while updating user's activity log", "error": "some error message" }` |

## Contributors  

- **[Jaedon Smith]**    Frontend developer 
- **[Zaid Khan]**       Frontend developer 
- **[Ayman Mohammad]**  FullStack developer
- **[Parva Thakkar]**   Backend developer     
- **[Ahmad El-Gohary]** Project Manger/Backend developer     


