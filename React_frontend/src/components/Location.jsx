import React, { use, useEffect, useState } from "react";

function Location({setSelCont}) {
  const [selectedCountry, setSelectedCountry] = useState("");

  const handleChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  useEffect(() => {
    setSelCont(selectedCountry);
  }, [selectedCountry]);

  return (
    <div className="form-control">
      <label htmlFor="country-select" className="required-label">
        Location *
      </label>
      <select
        id="country-select"
        value={selectedCountry}
        onChange={handleChange}
        required
        className="custom-select"
      >
        <option value="">Select a country</option>
        {[
          "Norway",
          "Iceland",
          "France",
          "Sweden",
          "Canada", 
          // ...rest of countries
        ].map((country, index) => (
          <option key={index} value={country}>
            {country}
          </option>
        ))}
      </select>

      {/* CSS को अलग file में या inline style के तौर पर लगाएं */}
      <style>{`
        .form-control {
          margin: 8px;
          min-width: 180px;
        }
        
        .required-label {
          display: block;
          margin-bottom: 4px;
          font-size: 0.875rem;
          color: rgba(0, 0, 0, 0.6);
        }
        
        .custom-select {
          width: 100%;
          padding: 10px 14px;
          border: 2px solid #10552e;
          border-radius: 6px;
          background-color: white;
          color: #333;
          font-size: 1rem;
          transition: all 0.3s ease;
        }
        
        .custom-select:focus {
          outline: none;
          box-shadow: 0 0 0 3px rgba(16,85,46,0.2);
        }
        
        .custom-select option {
          background: #10552e;
          color: white;
          padding: 10px;
        }
        
        .custom-select option:hover {
          background: #0c3d23 !important;
        }
      `}</style>
    </div>
  );
}

export default Location;