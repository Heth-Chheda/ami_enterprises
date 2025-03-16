import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CustomDatePicker = ({ selected, onChange, className, ...props }) => {
  return (
    <DatePicker
      selected={selected}
      onChange={onChange}
      dateFormat="dd/MM/yyyy"
      className={`${className} w-full mt-1 px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition`}
      placeholderText="Select your date of birth"
      showYearDropdown
      scrollableYearDropdown
      yearDropdownItemNumber={50}
      maxDate={new Date()}
      {...props}
    />
  );
};

export default CustomDatePicker;
