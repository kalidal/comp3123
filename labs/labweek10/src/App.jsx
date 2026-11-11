import { useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    address: "",
    address2: "",
    city: "",
    province: "",
    postalCode: "",
    agree: false,
  });

  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedData({ ...formData });
  };

  return (
    <div className="container">
      <h1>Data Entry Form</h1>

      <form onSubmit={handleSubmit}>
        {/* Row 1: Email & Name */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="fullName">Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Address */}
        <div className="form-group full-width">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            placeholder="1234 Main St"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        {/* Address 2 */}
        <div className="form-group full-width">
          <label htmlFor="address2">Address 2</label>
          <input
            type="text"
            id="address2"
            name="address2"
            placeholder="Apartment, studio, or floor"
            value={formData.address2}
            onChange={handleChange}
          />
        </div>

        {/* Row 2: City, Province, Postal Code */}
        <div className="form-row three-col">
          <div className="form-group">
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="province">Province</label>
            <select
              id="province"
              name="province"
              value={formData.province}
              onChange={handleChange}
              required
            >
              <option value="">Choose...</option>
              <option value="Alberta">Alberta</option>
              <option value="British Columbia">British Columbia</option>
              <option value="Manitoba">Manitoba</option>
              <option value="New Brunswick">New Brunswick</option>
              <option value="Newfoundland and Labrador">
                Newfoundland and Labrador
              </option>
              <option value="Nova Scotia">Nova Scotia</option>
              <option value="Ontario">Ontario</option>
              <option value="Prince Edward Island">Prince Edward Island</option>
              <option value="Quebec">Quebec</option>
              <option value="Saskatchewan">Saskatchewan</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="postalCode">Postal Code</label>
            <input
              type="text"
              id="postalCode"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Checkbox */}
        <div className="checkbox-group">
          <input
            type="checkbox"
            id="agree"
            name="agree"
            checked={formData.agree}
            onChange={handleChange}
            required
          />
          <label htmlFor="agree">Agree Terms & Condition?</label>
        </div>

        {/* Submit Button */}
        <div className="btn-container">
          <button type="submit">Submit</button>
        </div>
      </form>

      {/* Submitted Details Output */}
      {submittedData && (
        <div className="submitted-details">
          <p>
            <strong>Email:</strong> {submittedData.email}
          </p>
          <p>
            <strong>Full Name:</strong> {submittedData.fullName}
          </p>
          <p>
            <strong>Address:</strong> {submittedData.address}
            {submittedData.address2 ? `, ${submittedData.address2}` : ""}
          </p>
          <p>
            <strong>City:</strong> {submittedData.city}
          </p>
          <p>
            <strong>Province:</strong> {submittedData.province}
          </p>
          <p>
            <strong>Postal Code:</strong> {submittedData.postalCode}
          </p>
          <h2>Submission Details</h2>
        </div>
      )}
    </div>
  );
}

export default App;