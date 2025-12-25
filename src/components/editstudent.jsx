import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
// import axios from "axios";
import API from "../api";
const EditStudent = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { id } = useParams();
    const [departments, setDepartments] = useState([]);
    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const res = await API.get("/api/departments", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    },
                });
                setDepartments(res.data);
            } catch (err) {
                console.error("Failed to load departments", err);
            }
        };

        fetchDepartments();
    }, []);

    const [formData, setFormData] = useState({
        FirstName: state?.FirstName || "",
        LastName: state?.LastName || "",
        MiddleName: state?.MiddleName || "",
        DOB: state?.DOB ? state.DOB.split("T")[0] : "",
        gender: state?.gender || "",
        enrollmentNo: state?.enrollmentNo || "",
        mobileNo: state?.mobileNo || "",
        medicalCondition: state?.medicalCondition || "",
        isVegeterian: state?.isVegeterian ?? 1,
        guardianContactNo: state?.guardianContactNo || "",
        deptNo: state?.deptNo || "",
        email: state?.email || "",
    });
    useEffect(() => {
        if (!state && id !== "0") {
            API
                .get(`/api/students/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    },
                })
                .then((res) => {
                    const student = res.data.data;

                    setFormData({
                        FirstName: student.FirstName || "",
                        LastName: student.LastName || "",
                        MiddleName: student.MiddleName || "",
                        DOB: student.DOB ? student.DOB.split("T")[0] : "",
                        gender: student.gender || "",
                        enrollmentNo: student.enrollmentNo || "",
                        mobileNo: student.mobileNo || "",
                        medicalCondition: student.medicalCondition || "",
                        isVegeterian: student.isVegeterian ?? 1,
                        guardianContactNo: student.guardianContactNo || "",
                        deptNo: student.deptNo || "",
                        email: student.email || "",
                    });
                })
                .catch(console.error);
        }
    }, [id, state]);


    const handleCheckboxChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.checked ? 1 : 0,
        });
    };
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (id === "0") {
                // ADD student
                await API.post(
                    "/api/students",
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                        },
                    }
                );
            } else {
                // EDIT student
                await API.put(
                    `/api/students/${id}`,
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                        },
                    }
                );

            }

            navigate("/dashboard/students", { replace: true });
        } catch (err) {
            console.error(err);
            alert("Update failed");
        }
    };

    return (
        <div className="bg-particles">
            <div className="page" style={{ padding: "20px" }}>
                <h2 className="title">Personal Information</h2>

                <div className="card">
                    {/* Left side */}
                    <div className="avatar-section">
                        <div className="avatar">+</div>
                    </div>

                    {/* Right side */}
                    <form className="form-grid" onSubmit={handleSubmit}>
                        {/* Enrollment No. */}
                        <div className="input-group">
                            <label>Enrollment No                                                    </label>
                            <input
                                name="enrollmentNo"
                                value={formData.enrollmentNo}
                                onChange={handleChange}
                            />
                        </div>


                        {/* Last Name */}
                        <div className="input-group">
                            <label>Last Name                                                     </label>
                            <input
                                name="LastName"
                                value={formData.LastName}
                                onChange={handleChange}
                            />
                        </div>


                        {/* Middle Name */}
                        <div className="input-group">
                            <label>Middle Name                                                     </label>
                            <input
                                name="MiddleName"
                                value={formData.MiddleName}
                                onChange={handleChange}
                            />
                        </div>

                        {/* First Name */}
                        <div className="input-group">
                            <label>First Name                                                     </label>
                            <input
                                name="FirstName"
                                value={formData.FirstName}
                                onChange={handleChange}
                            />
                        </div>

                        {/* DOB */}
                        <div className="input-group">
                            <label>DOB                                                     </label>
                            <input
                                type="date"
                                name="DOB"
                                value={formData.DOB}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Gender */}
                        <div className="input-group">
                            <label>Gender                                                  </label>
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>

                        {/* MobileNo */}
                        <div className="input-group">
                            <label>Mobile No                                                    </label>
                            <input
                                name="mobileNo"
                                value={formData.mobileNo}
                                onChange={handleChange}
                            />
                        </div>
                        {/* Department */}
                        <div className="input-group">
                            <label>Department</label>
                            <select
                                name="deptNo"
                                value={formData.deptNo}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Department</option>
                                {departments.length === 0 ? (
                                    <option disabled>Loading...</option>
                                ) : (
                                    departments.map((dept) => (
                                        <option key={dept.deptNo} value={dept.deptNo}>
                                            {dept.deptName}
                                        </option>
                                    ))
                                )}
                            </select>
                        </div>
                        {/* Medical Condition */}
                        <div className="input-group">
                            <label>Medical Condition                                                   </label>
                            <input
                                name="medicalCondition"
                                value={formData.medicalCondition}
                                onChange={handleChange}
                            />
                        </div>
                        {/* Guardian Contact Number */}
                        <div className="input-group">
                            <label>Guardian Contact Number                                                   </label>
                            <input
                                name="guardianContactNo"
                                value={formData.guardianContactNo}
                                onChange={handleChange}
                            />
                        </div>
                        {/* Email */}
                        <div className="input-group">
                            <label>Email                                                  </label>
                            <input
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="input-group">
                            <label>Food Preference</label>
                            {/* vegeterian check */}
                            <div style={{ display: "flex", gap: "20px", marginTop: "6px" }}>
                                <label style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                                    <input
                                        type="checkbox"
                                        name="isVegeterian"
                                        checked={formData.isVegeterian === 1}
                                        onChange={handleCheckboxChange}
                                    />
                                    Vegetarian
                                </label>
                                <span style={{ opacity: 0.8 }}>
                                    {formData.isVegeterian === 1 ? "🥬 Veg" : "🍗 Non-Veg"}
                                </span>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="actions">
                            <button type="submit" className="save">Save & Close</button>
                            <button
                                type="button"
                                className="cancel"
                                onClick={() => navigate("/dashboard")}
                            >
                                Cancel
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditStudent;
