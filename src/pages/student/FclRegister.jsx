import React from "react";
import "./FclRegister.css";
// import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../../api";

const FclRegister = () => {
    const [departments, setDepartments] = useState([]);
    const [formData, setFormData] = useState({
        playerName: "",
        deptID: "",
        playerEmail: "",
        phoneNo: "",
        jerseyNo: "",
        jerseySize: "",
        playRole: ""
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    useEffect(() => {
        API.get(`/api/fcl-departments`)
            .then((res) => {
                setDepartments(res.data.data);
            })
            .catch(err => {
                console.error(err);
            });
    }, []);
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        try {
            const res = await API.post(`/api/players`, formData);
            setMessage(res.data.message || "Registration Successful!");
            setFormData({
                playerName: "",
                deptID: "",
                playerEmail: "",
                phoneNo: "",
                jerseyNo: "",
                jerseySize: "",
                playRole: ""
            });
        }
        catch (err) {
            setMessage(err.response?.data?.message || "Registration Failed");
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="fcl-register-page">
            <div className="fcl-register-card">
                <h2 className="fcl-register-title">
                    Freshers Cricket League
                </h2>
                <p className="fcl-register-subtitle">
                    Register yourself for FCL 2026
                </p>

                {message && <p className="fcl-message">{message}</p>}

                <form className="fcl-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="playerName"
                        placeholder="Player Name"
                        value={formData.playerName}
                        onChange={handleChange}
                        required
                    />

                    <select
                        name="deptID"
                        value={formData.deptID}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Department</option>
                        {departments.map(dept => (
                            <option key={dept.deptID} value={dept.deptID}>
                                {dept.deptName}
                            </option>
                        ))}
                    </select>

                    <input
                        type="email"
                        name="playerEmail"
                        placeholder="Email"
                        value={formData.playerEmail}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="phoneNo"
                        placeholder="Phone Number"
                        value={formData.phoneNo}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="number"
                        name="jerseyNo"
                        placeholder="Jersey Number"
                        value={formData.jerseyNo}
                        onChange={handleChange}
                    />

                    <select
                        name="jerseySize"
                        value={formData.jerseySize}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Jersey Size</option>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                        <option value="XXL">XXL</option>
                    </select>

                    <select
                        name="playRole"
                        value={formData.playRole}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Playing Role</option>
                        <option value="Batsman">Batsman</option>
                        <option value="Bowler">Bowler</option>
                        <option value="WicketKeeper">Wicket Keeper</option>
                        <option value="AllRounder">All Rounder</option>
                    </select>


                    <button
                        className="fcl-submit-btn"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Submitting..." : "Register"}
                    </button>
                </form>
            </div>
        </div>
    );

};

export default FclRegister;

