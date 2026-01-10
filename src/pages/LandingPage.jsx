import React from "react";
import "./LandingPage.css";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
    const navigate = useNavigate();
    const handleExploreClick = () => {
        const section = document.getElementById("about");
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className="bg-particles">
            <div className="landing-container">
                {/* Header */}
                <header className="landing-header">
                    <div className="logo">
                        <div className="logo-circle">14</div>
                        <span className="logo-text">Hostel - 14</span>
                    </div>
                    <nav className="landing-nav">
                        <a href="#about">About Hostel 14</a>
                        <a href="#facilities">Facilities</a>
                        <a href="#portal">Student Portal</a>
                        <a href="#events">Events & Activities</a>
                        <button
                            className="login-btn"
                            onClick={() => navigate("/login")}
                        >
                            Login
                        </button>
                    </nav>
                </header>

                {/* Landing Main */}
                <main className="landing-main">
                    <h1 className="landing-title">
                        Welcome to <br />
                        <span>Hostel - 14</span>
                    </h1>
                    <p className="landing-subtitle">Fly Above ALL</p>
                    <button className="explore-btn" onClick={handleExploreClick}>
                        Explore Now
                    </button>
                    <div className="landing-logo-bg"></div>
                </main>

                {/* About Section */}
                <section id="about" className="about-section">
                    <h2 className="about-title">About Hostel 14</h2>
                    <div className="about-underline"></div>

                    <div className="about-content">
                        {/* LEFT IMAGE */}
                        <div className="about-image">
                            <img src="/Hostel14.jpeg" alt="Hostel 14 Building" />
                            <div className="image-overlay"></div>
                        </div>

                        {/* RIGHT TEXT */}
                        <div className="about-text">
                            <p>
                                Hostel 14 stands as a beacon of excellence in student accommodation.
                                Established with a vision to provide more than just a place to stay,
                                we offer a complete living experience that nurtures academic success
                                and personal growth.
                            </p>

                            <p>
                                Our hostel houses over 100 students from diverse backgrounds, creating
                                a vibrant community united by shared goals and mutual respect. The eagle,
                                our proud mascot, symbolizes our commitment to flying above all in our endeavors.
                            </p>

                            {/* STATS */}
                            <div className="about-stats">
                                <div className="stat-card">
                                    <h3>100+</h3>
                                    <span>Residents</span>
                                </div>

                                <div className="stat-card">
                                    <h3>100+</h3>
                                    <span>Years Legacy</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Facilities Section */}
                <section id="facilities" className="facilities-section">
                    <h2 className="facilities-title">Our Facilities</h2>
                    <div className="facilities-underline"></div>
                    <p className="facilities-subtitle">
                        State-of-the-art amenities designed for your comfort and convenience
                    </p>

                    <div className="facilities-grid">
                        <div className="facility-card">
                            <div className="facility-icon">🏢</div>
                            <h3>Modern Rooms</h3>
                            <p>Well-furnished single and double occupancy rooms</p>
                        </div>

                        <div className="facility-card">
                            <div className="facility-icon">📶</div>
                            <h3>High-Speed WiFi</h3>
                            <p>24/7 internet connectivity across the hostel</p>
                        </div>

                        <div className="facility-card">
                            <div className="facility-icon">🍽️</div>
                            <h3>Dining Hall</h3>
                            <p>Nutritious meals served thrice daily</p>
                        </div>

                        <div className="facility-card">
                            <div className="facility-icon">📚</div>
                            <h3>Reading Room</h3>
                            <p>Quiet study spaces with proper lighting</p>
                        </div>

                        <div className="facility-card">
                            <div className="facility-icon">🛡️</div>
                            <h3>24/7 Security</h3>
                            <p>Round-the-clock security and CCTV surveillance</p>
                        </div>
                    </div>
                </section>

                {/* Student Portal Section */}
                <section id="portal" className="portal-section">
                    <h2 className="portal-title">Student Portal</h2>
                    <div className="portal-underline"></div>

                    <p className="portal-subtitle">
                        Your one-stop destination for all hostel-related services and information
                    </p>

                    <div className="portal-grid">
                        <div className="portal-card">
                            <div className="portal-icon">🎓</div>
                            <div>
                                <h3>Academic Records</h3>
                                <p>View grades, attendance, and academic progress</p>
                            </div>
                        </div>

                        <div className="portal-card">
                            <div className="portal-icon">📋</div>
                            <div>
                                <h3>Room Allocation</h3>
                                <p>Check room details and request changes</p>
                            </div>
                        </div>

                        <div className="portal-card">
                            <div className="portal-icon">💬</div>
                            <div>
                                <h3>Complaints & Feedback</h3>
                                <p>Submit issues and track resolution status</p>
                            </div>
                        </div>

                        <div className="portal-card">
                            <div className="portal-icon">📅</div>
                            <div>
                                <h3>Leave Management</h3>
                                <p>Apply for leave and view approval status</p>
                            </div>
                        </div>
                    </div>

                    <button
                        className="portal-login-btn"
                        onClick={() => navigate("/login")}
                    >
                        Login to Portal
                    </button>
                </section>


                {/* Events & Activities Section */}
                <section id="events" className="events-section">
                    <h2 className="events-title">Events & Activities</h2>
                    <div className="events-underline"></div>
                    <p className="events-subtitle">
                        Stay engaged with exciting events and activities throughout the year
                    </p>

                    <div className="events-container">
                        <div className="event-card">
                            <span className="event-badge">Coming Soon</span>

                            <div className="event-icon">🏆</div>

                            <h3 className="event-title">Freshers Cricket League</h3>
                            <p className="event-desc">
                                Freshers Cricket Tournament — Where The Best Thrives
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default LandingPage;
