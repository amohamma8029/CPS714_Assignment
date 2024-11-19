# CPS714_Assignment


## API Endpoints

| **Endpoint**      | **Request**                                                                                     | **Response**                                                                                                   |
|--------------------|-----------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------|
| `POST /add_user/:email` | **Body:** `{ "role": "user" }` <br> **Params:** `email` <br> Creates a new user with `email`, `role`, `point_balance: 0`, `transaction_history: {}`, and `activity_log: []`. | **Success (200):** `{ "message": "User created successfully", "user": { "email": "string", "role": "string", "point_balance": 0 } }` <br> **Error (500):** `{ "message": "Error occurred while creating user", "error": "Error message" }` |
| `PUT /change_role` | **Body:** `{ "email": "string", "role": "string" }` <br> Updates the `role` of an existing user identified by `email`. | **Success (200):** `{ "message": "User's role changed successfully", "email": "string" }` <br> **Error (404):** `{ "message": "User not found" }` <br> **Error (500):** `{ "message": "Could not change role", "error": "Error message" }` |
| `PUT /change_email` | **Body:** `{ "current_email": "string", "new_email": "string" }` <br> Updates the `email` of an existing user. | **Success (200):** `{ "message": "User's email changed successfully", "new_email": "string" }` <br> **Error (404):** `{ "message": "User not found" }` <br> **Error (500):** `{ "message": "Could not change email", "error": "Error message" }` |
|`DELETE /delete_data/:email`| **Body:** NA <br> **Params:** `email` <br> Deletes the user's data entry in the database |**Success (200):** `{message: "Item Successfully Removed", user: the_deleted_user_data}`  <br> **Error (404):** `{ "message": "User not found" }` <br> **Error (500):** `{ "message": "Error occurred while updating user's activity log", "error": "some error message" }` |
|`PUT /update_activity_log`| **Body:**`{  "email": some_email, "activity_type": some_activity_type , "activity_field": some_activity_field, "activity_date": some_activity_date}` <br> **Params:** NA| **Status 200**: `{ message: "Activity log successfully updated", user_data: { ...updated user data... } }` <br>**Status 404**: `{ message: "User not found" }` <br> **Status 500**: `{ message: "Error occurred while updating user's activity log", error: "Detailed error message" }`|




