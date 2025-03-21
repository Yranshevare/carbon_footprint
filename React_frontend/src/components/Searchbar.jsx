// SearchBar.jsx
import React, { useEffect, useState } from "react";
import "/src/CSS/Searchbar.css";
import { X } from "lucide-react";
import Slider from "/src/components/Slider.jsx";

const SearchBar = ({ items = {} ,unit, setSelVeh,userinfo }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [amounts, setAmounts] = useState({});
  
  const [info,setInfo] = useState(userinfo)


  const foodCategories = items;

  const handleChange = (e) => {
    setQuery(e.target.value);
    if (e.target.value) {
      setSuggestions(
        Object.keys(items).filter((category) =>
          category.toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (item) => {
    if (!selectedItems.includes(item)) {
      setSelectedItems([...selectedItems, item]);
    }
    setQuery("");
    setSuggestions([]);
    handleSubmit()
  };

  useEffect(() => {
    setSelVeh(info)
    // console.log(setSelVeh,"ll")
  }, [info]);

  const handleSubmit = () => {
    const selectedCategories = selectedItems;
    let allSubCategories = [];
    selectedCategories.forEach((category) => {
      if (foodCategories[category]) {
        allSubCategories = [...allSubCategories, ...foodCategories[category]];
      }
    });
    setSubCategories(allSubCategories);
    setAmounts({});
  };


  useEffect(()=>{
    // console.log(selectedItems)
    handleSubmit()  
    // console.log(newInfo)
  },[selectedItems])
  const removeItem = (item) => {
    const updatedItems = selectedItems.filter((i) => i !== item);
    setSelectedItems(updatedItems);
    if (updatedItems.length === 0) {
      setSubCategories([]);
      setAmounts({});
    } else {
      handleSubmit();
    }
  };

  const handleSliderChange = (subItem, value) => {
    setAmounts({ ...amounts, [subItem]: value });
  };

  return (
    <div className="search-container">
      {suggestions.length > 0 && (
        <ul className="suggestions suggestions-up">
          {suggestions.map((item) => (
            <li key={item} onClick={() => handleSelect(item)}>
              {item}
            </li>
          ))}
        </ul>
      )}
      <div className="search-box">
        {selectedItems.map((item) => (
          <div key={item} className="selected-item">
            {item}
            <X
              size={16}
              onClick={() => removeItem(item)}
              className="remove-icon"
            />
          </div>
        ))}
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search food category..."
        />
        
      </div>
      {subCategories.length > 0 && (
        <div className="sub-category-container">
          {subCategories.map((subItem) => (
            <div key={subItem} className="sub-category-item">
              <span>{subItem}</span>
              <Slider unit={unit} info={info} subItem={subItem} setInfo={setInfo}/>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
