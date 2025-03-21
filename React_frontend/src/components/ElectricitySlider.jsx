import React, {  useEffect, useState } from "react";

function ElectricitySlider  ({ unit ,inputValue,setInputValue })  {
  const [value, setValue] = useState(0);

  const handleSliderChange = (e) => {
    setValue(Number(e.target.value));
  };

  useEffect(() => {
    setValue(inputValue);
  }, [inputValue]);

  useEffect(() => {
    setInputValue(value);
  }, [value ]);

  const handleInputChange = (e) => {
    const newValue = e.target.value === "" ? 0 : Number(e.target.value);
    setValue(newValue);
  };

  const calculateColor = (val) => {
    if (val <= 40) return "#4CAF50"; // Green
    const red = Math.min(255, Math.round(((val - 40) / 60) * 255));
    const green = Math.max(0, Math.round(255 - ((val - 40) / 60) * 255));
    return `rgb(${red}, ${green}, 0)`;
  };

  return (
    <div className="slider-container">
      <div className="slider-wrapper">
        <input
          type="range"
          min="0"
          max="100"
          value={value}
          onChange={handleSliderChange}
          style={{
            background: `linear-gradient(to right, #4CAF50 0%,rgb(255, 102, 102) 100%, ${calculateColor(
              value
            )} 40%, ${calculateColor(value)} 100%)`,
          }}
          className="custom-slider"
        />
        <div className="input-wrapper">
          <input
            type="number"
            value={value}
            min="0"
            max="100"
            onChange={handleInputChange}
            className="value-input"
          />
          <span className="unit">{unit}</span>
        </div>
      </div>
    </div>
  );
};

export default ElectricitySlider;

// CSS Styles
const styles = `
.slider-container {
  padding: 16px;
  max-width: 400px;
  margin: 0 auto;
}

.slider-wrapper {
  display: flex;
  gap: 16px;
  align-items: center;
}

.custom-slider {
  flex-grow: 1;
  -webkit-appearance: none;
  height: 6px;
  border-radius: 3px;
  outline: none;
  transition: background 0.3s ease;
}

.custom-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: white;
  border: 2px solid #666;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.custom-slider::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: white;
  border: 2px solid #666;
  cursor: pointer;
}

.input-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
}

.value-input {
  width: 60px;
  padding: 6px 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.value-input:focus {
  outline: 2px solid #90caf9;
  border-color: transparent;
}

.unit {
  font-size: 14px;
  color: #666;
}
`;

// Inject styles
document.head.insertAdjacentHTML("beforeend", `<style>${styles}</style>`);