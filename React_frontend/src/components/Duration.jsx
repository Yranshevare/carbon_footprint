import React, { use, useEffect, useState } from 'react';
// import './RowRadioButtonsGroup.css';
// 
const RowRadioButtonsGroup = ({setDur}) => {
  const [selectedValue, setSelectedValue] = useState('Daily');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  useEffect(() => {
    setDur(selectedValue);
  },[selectedValue])

  return (
    <div className="radio-group-container">
      <label className="radio-label" htmlFor="daily">
        <input
          type="radio"
          id="daily"
          name="radio-group"
          value="Daily"
          checked={selectedValue === 'Daily'}
          onChange={()=>setSelectedValue('Daily')}
        />
        Daily
      </label>

      <label className="radio-label" htmlFor="weekly">
        <input
          type="radio"
          id="weekly"
          name="radio-group"
          value="Week"
          checked={selectedValue === 'Week'}
          onChange={()=>setSelectedValue('Week')}
        />
        Weekly
      </label>

      <label className="radio-label" htmlFor="monthly">
        <input
          type="radio"
          id="monthly"
          name="radio-group"
          value="Monthly"
          checked={selectedValue === 'Month'}
          onChange={()=>setSelectedValue('Month')}
        />
        Monthly
      </label>

      <label className="radio-label" htmlFor="yearly">
        <input
          type="radio"
          id="yearly"
          name="radio-group"
          value="Yearly"
          checked={selectedValue === 'Year'}
          onChange={()=>setSelectedValue('Year')}
        />
        Yearly
      </label>
    </div>
  );
};

export default RowRadioButtonsGroup;


