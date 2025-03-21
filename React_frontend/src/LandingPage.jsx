import { useNavigate } from "react-router-dom"
import "./App.css"

function LandingPage() {

  const navigate = useNavigate()
  return (
    <div className="landing-page">
      <div className="container">
        <div className="logo">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="leaf-icon"
          >
            <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path>
            <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path>
          </svg>
          <h1 className="logo-text">CarbonTrack</h1>
        </div>

        <h2 className="headline">Measure and Reduce Your Carbon Footprint</h2>

        <p className="subheadline">
          Take control of your environmental impact with our simple, powerful carbon tracking platform.
        </p>

        <div className="cta-container">
          <button 
          onClick={() => navigate("/form")}
          className="get-started-button">Get Started</button>
        </div>

        <div className="hero-image-container">
          <img
            src="/landingpg2.jpg"
            alt="Carbon footprint visualization"
            className="hero-image"
          />
          <div className="image-overlay"></div>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon-container">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feature-icon"
              >
                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path>
                <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path>
              </svg>
            </div>
            <h3 className="feature-title">Track Your Impact</h3>
            <p className="feature-description">
              Monitor your daily activities and see their environmental impact in real-time.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-container">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feature-icon"
              >
                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path>
                <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path>
              </svg>
            </div>
            <h3 className="feature-title">Get Insights</h3>
            <p className="feature-description">Receive personalized recommendations to reduce your carbon footprint.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-container">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feature-icon"
              >
                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path>
                <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path>
              </svg>
            </div>
            <h3 className="feature-title">Make a Difference</h3>
            <p className="feature-description">
              Join a community of environmentally conscious individuals making real change.
            </p>
          </div>
        </div>
      </div>

      <footer className="footer">
        <p>© {new Date().getFullYear()} CarbonTrack. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default LandingPage

