import { useState, useEffect } from "react";
import "./Profile.css";

export default function Profile({ email, setEmail }) {
  //state variables
  const [user, setUser] = useState({}); // user data
  const [loading, setLoading] = useState(true); // loading state
  const [error, setError] = useState(null); // error state
  const [form, setForm] = useState({ newEmail: "", newRole: "" }); // form state for updating email and role
  const [msg, setMsg] = useState(""); // message state
  const [rewards, setRewards] = useState([]); // rewards data

  //fresh transaction state
  const [newTransaction, setNewTransaction] = useState({
    //generate a unique transaction ID
    transaction_id: generateHashedID(),
    transaction_type: "",
    transaction_date: "",
    transaction_cost: 0,
    productName: "",
    points_change: 0,
    description: "",
  });

  //fresh activity log state
  const [newActivityLog, setNewActivityLog] = useState({
    activity_type: "",
    activity_field: "",
    activity_date: "",
  });

  // email regex for a rough email validation
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // creates a unique transaction ID
  function generateHashedID() {
    // Generate a random decimal number and convert it to a string
    // Gets the current timestamp and convert it to a string
    // Concatenate the two strings
    return Math.random().toString(36).substring(2, 15) + Date.now().toString(36).substring(2, 15);
  }

  // fetch rewards data for user
  const fetchRewards = async () => {
    //turns on the loading state
    setLoading(true);
    //fetches the rewards
    try {
      const response = await fetch(`http://192.18.153.58:3000/api/analytics/rewards/${email}`);
      if (!response.ok) {
        throw new Error("Failed to fetch rewards");
      }
      const data = await response.json();
      setRewards(data.data);
    } catch (err) {
      setTimeout(() => {
        setError(null);
      }, 1000);
    }
    setLoading(false);
  };

  // reruns code when email or role changes
  useEffect(() => {
    // fetch user data
    const fetchUser = async () => {
      const response = await fetch(
        `https://client-account-hub.onrender.com/get_user_by_email/${email}`,
        {
          method: "GET",
        }
      );

      // checks if the request was successful
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      // gets the data from the response
      const data = await response.json();
      // sets the user data
      setUser(data.user);
      // sets the loading state to false
      setLoading(false);
    };

    fetchUser(email);
    fetchRewards();
  }, [email, user.role]);

  // updates role and email of the user in state
  const handleInput = (e) => {
    // updates the state
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // updates email of the user to database
  const updateEmail = async (e) => {
    // prevents the form from submitting
    e.preventDefault();

    // checks if the email is valid
    if (!regex.test(form.newEmail)) {
      setError("Please provide a valid email address.");
      // clears the error after 1 second
      setTimeout(() => {
        setError(null);
      }, 1000);
      return;
    }

    // turns on the loading state
    setLoading(true);

    // sends a put request to the API for updating the email
    try {
      const response = await fetch("https://client-account-hub.onrender.com/change_email", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          new_email: form.newEmail,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update email");
      }

      const data = await response.json();
      setMsg("Email updated successfully");
      // updates the user's email
      setEmail(form.newEmail);
    } catch (err) {
      setError("Failed to update email");
    }
    setLoading(false);
    // clears the form and message
    setForm({ newEmail: "", newRole: "" });
    setMsg("");
  };

  // updates role of the user to database
  const updateRole = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("https://client-account-hub.onrender.com/change_role", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          role: form.newRole,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update role");
      }

      const data = await response.json();
      setMsg("Role updated successfully");
      setUser((prevUser) => ({ ...prevUser, role: form.newRole }));
    } catch (err) {
      setError("Failed to update role");
      setTimeout(() => {
        setError(null);
      }, 1000);
    }
    setLoading(false);
    setForm({ newEmail: "", newRole: "" });
    setMsg("");
  };

  // updates transaction
  const handleTransactionInput = (e) => {
    // updates the state
    setNewTransaction({
      ...newTransaction,
      [e.target.name]: e.target.value,
    });
  };

  // updates activity log
  const handleActivityInput = (e) => {
    setNewActivityLog({
      ...newActivityLog,
      [e.target.name]: e.target.value,
    });
  };

  // updates transaction of the user to database
  const updateTransaction = async () => {
    setLoading(true);

    try {
      const response = await fetch("https://client-account-hub.onrender.com/update_transactions", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          ...newTransaction,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update transaction");
      }

      const data = await response.json();
      setMsg("Transaction updated successfully");
      setNewTransaction({
        ...newTransaction,
        transaction_id: generateHashedID(),
      });
      setLoading(false);
    } catch (err) {
      setError("Failed to update transaction");
      setTimeout(() => {
        setError(null);
      }, 1000);
    }
    setLoading(false);
  };

  // updates activity log of the user to database
  const updateActivity = async () => {
    setLoading(true);

    try {
      const response = await fetch("https://client-account-hub.onrender.com/update_activity_log", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          ...newActivityLog,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update activity log");
      }

      const data = await response.json();
      setMsg("Activity updated successfully");
      setLoading(false);
    } catch (err) {
      setError("Failed to update activity log");
      setTimeout(() => {
        setError(null);
      }, 1000);
    }
    setLoading(false);
  };

  // loading screen
  if (loading) {
    return <p>Loading...</p>;
  }

  // error message
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <div className="profile">
        <h1>Profile</h1>
        <div className="container">
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>
        </div>
        <div className="form-container">
          <h2>Update Information</h2>
          <div className="form-group">
            <label htmlFor="newEmail">New Email:</label>
            <input
              type="email"
              id="newEmail"
              name="newEmail"
              placeholder="Enter new email"
              value={form.newEmail}
              onChange={handleInput}
            />
            <button onClick={updateEmail}>Update Email</button>
          </div>
          <div className="form-group">
            <label htmlFor="newRole">New Role:</label>
            <select
              id="newRole"
              name="newRole"
              value={form.newRole}
              onChange={handleInput}
              className="select-role"
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="customer">Customer</option>
              <option value="primary_user">Primary User</option>
              <option value="secondary_user">Secondary User</option>
            </select>
            <button onClick={updateRole}>Update Role</button>
          </div>
        </div>
        {msg && <p className="message">{msg}</p>}
        <div className="card activity rewards">
          <h2>Your Rewards</h2>
          <ul className="activityList rewardsList">
            {rewards && rewards.length > 0 ? (
              rewards.map((reward, index) => (
                <li key={index} className="activityItem rewards">
                  <p>{reward.description}</p>
                  <p>{reward.points}</p>
                  <p>{new Date(reward.date).toISOString().split("T")[0]}</p>
                </li>
              ))
            ) : (
              <li>No Popular Rewards found</li>
            )}
          </ul>
        </div>
        {user.role === "admin" ? (
          <>
            <div className="form-group">
              <h2>Add Transaction</h2>
              <div className="transaction-grid">
                <div className="transactionHeader">Transaction ID</div>
                <div>{newTransaction.transaction_id}</div>

                <div className="transactionHeader">Type</div>
                <input
                  type="text"
                  name="transaction_type"
                  value={newTransaction.transaction_type}
                  onChange={handleTransactionInput}
                  className="input-field"
                  placeholder="Enter the transaction type"
                />

                <div className="transactionHeader">Date</div>
                <input
                  type="date"
                  name="transaction_date"
                  value={newTransaction.transaction_date}
                  onChange={handleTransactionInput}
                  className="input-field"
                  placeholder="Enter the date"
                />

                <div className="transactionHeader">Cost</div>
                <input
                  type="number"
                  name="transaction_cost"
                  value={newTransaction.transaction_cost}
                  onChange={handleTransactionInput}
                  className="input-field"
                />

                <div className="transactionHeader">Product Name</div>
                <input
                  type="text"
                  name="productName"
                  value={newTransaction.productName}
                  onChange={handleTransactionInput}
                  className="input-field"
                  placeholder="Enter the product name"
                />

                <div className="transactionHeader">Points Change</div>
                <input
                  type="number"
                  name="points_change"
                  value={newTransaction.points_change}
                  onChange={handleTransactionInput}
                  className="input-field"
                />

                <div className="transactionHeader">Description</div>
                <textarea
                  name="description"
                  value={newTransaction.description}
                  onChange={handleTransactionInput}
                  className="input-field input-description"
                  rows="4"
                  cols="50"
                  placeholder="Enter the description"
                ></textarea>

                <div className="button-group">
                  <button onClick={updateTransaction} className="confirm-button">
                    Confirm
                  </button>
                </div>
              </div>
            </div>
            <div className="form-group">
              <h2>Add Activity Log</h2>
              <div className="transaction-grid">
                <div className="transactionHeader">Type</div>
                <input
                  type="text"
                  name="activity_type"
                  value={newActivityLog.activity_type}
                  onChange={handleActivityInput}
                  className="input-field"
                  placeholder="Enter the activity type"
                />

                <div className="transactionHeader">Field</div>
                <input
                  type="text"
                  name="activity_field"
                  value={newActivityLog.activity_field}
                  onChange={handleActivityInput}
                  className="input-field"
                  placeholder="Enter the activity field"
                />

                <div className="transactionHeader">Date</div>
                <input
                  type="date"
                  name="activity_date"
                  value={newActivityLog.activity_date}
                  onChange={handleActivityInput}
                  className="input-field"
                  placeholder="Enter the date"
                />

                <div className="button-group">
                  <button onClick={updateActivity} className="confirm-button">
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
}
