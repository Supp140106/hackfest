// src/pages/Signup.js
import React, { useState, useEffect } from 'react';
import '../pages/style.css';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../components/AuthContext'; // Assuming you have this context
import b2 from '../assets/b2.png';
import b3 from '../assets/b3.png';
import bg1 from '../assets/bg1.png';

const Signup = () => {
    const [logoPreview, setLogoPreview] = useState(b3);
    const [formData, setFormData] = useState({
        companyName: '',
        firstName: '',
        lastName: '',
        email: '',
        phoneCode: '+91',
        phoneNumber: '',
        employeeID: '',
        position: '', // Added position to formData
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const previewLogo = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setLogoPreview(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Update position based on employeeID
    useEffect(() => {
        if (formData.employeeID) {
            let newPosition = formData.position;
            if (formData.employeeID.includes('HR')) {
                newPosition = 'HR';
            } else if (formData.employeeID.includes('TL')) {
                newPosition = 'teamlead';
            } else if (formData.employeeID.includes('MN')) {
                newPosition = 'manager';
            } else if (formData.employeeID.includes('EM')) {
                newPosition = 'employee';
            }
            if (newPosition !== formData.position) {
                setFormData(prev => ({ ...prev, position: newPosition }));
            }
        }
    }, [formData.employeeID, formData.position]);

    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const { companyName, firstName, lastName, email, phoneNumber, employeeID, position } = formData; // Include position in destructuring
        const ph_num = `${formData.phoneCode}${phoneNumber}`;

        try {
            const response = await fetch('http://localhost:3000/auth/signup', { // Adjust URL if your backend is different
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Company_Name: companyName,
                    first_name: firstName,
                    last_name: lastName,
                    Email_ID: email,
                    ph_num: ph_num,
                    position: position, // Include position in the request body
                    EmployeeID: employeeID, // Include employeeID
                }),
            });

            const data = await response.json();

            if (response.ok) {
                const fullName = `${firstName} ${lastName}`;
                const userData = { name: fullName, email: email };
                login(userData);
                localStorage.setItem('user', JSON.stringify(userData));
                navigate('/');
            } else {
                setError(data.error || 'Signup failed');
            }
        } catch (err) {
            console.error('Signup error:', err);
            setError('Failed to connect to the server.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            {/* Left Panel */}
            <div className="left-panel">
                <img src={b2} alt="Full Panel" className="panel-image" />

                {/* Signup Container */}
                <form className="login-container" onSubmit={handleSignup}>
                    {/* Circular Image */}
                    <div className="circular-image">
                        <img src={logoPreview} alt="Company Logo" id="logo-preview" />
                        <input type="file" id="logo-upload" accept="image/*" onChange={previewLogo} />
                    </div>
                    <div className="logo-label">
                        <span>Company Logo</span>
                        <span className="edit-icon" onClick={() => document.getElementById('logo-upload').click()}>
                            ✎
                        </span>
                    </div>

                    {/* Form Section */}
                    <div className="form-section">
                        <div className="form-group">
                            <label className="form-label">Company Name</label>
                            <input
                                name="companyName"
                                type="text"
                                className="form-input"
                                placeholder="Enter company name"
                                value={formData.companyName}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Name</label>
                            <div className="name-inputs">
                                <input
                                    name="firstName"
                                    type="text"
                                    className="form-input half-width"
                                    placeholder="First Name"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                />
                                <input
                                    name="lastName"
                                    type="text"
                                    className="form-input half-width"
                                    placeholder="Last Name"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required
                                />
                        </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Email</label>
                            <input
                                name="email"
                                type="email"
                                className="form-input"
                                placeholder="Enter email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Phone Number</label>
                            <div className="phone-input">
                                <select
                                    name="phoneCode"
                                    className="country-code"
                                    value={formData.phoneCode}
                                    onChange={handleChange}
                                >
                                    <option value="+91">+91 (India)</option>
                                    <option value="+1">+1 (USA)</option>
                                    <option value="+44">+44 (UK)</option>
                                </select>
                                <input
                                    name="phoneNumber"
                                    type="tel"
                                    className="form-input phone-number"
                                    placeholder="Enter phone number"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        {/* Added Position field */}
                        <div className="form-group">
                            <label className="form-label">Employee ID</label>
                            <input
                                name="employeeID"
                                type="text"
                                className="form-input"
                                placeholder="Enter your employee ID"
                                value={formData.employeeID}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Added Position field */}
                        <div className="form-group">
                            <label className="form-label">Position</label>
                            <input
                                name="position"
                                type="text"
                                className="form-input"
                                placeholder="Position will be auto-filled"
                                value={formData.position}
                                readOnly // Make it read-only as it's auto-filled
                            />
                        </div>

                        {error && <p className="error-message">{error}</p>}

                        {/* Already have account */}
                        <div className="login-signup">
                            <p>
                                Already have an account? <Link to="/login" className="login-link">Log in</Link>
                            </p>
                            <button type="submit" className="signup-button" disabled={loading}>
                                {loading ? 'Signing Up...' : 'Sign Up'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            {/* Right Panel */}
            <div className="right-panel">
                <img src={bg1} alt="Background" />
            </div>
        </div>
    );
};

export default Signup;