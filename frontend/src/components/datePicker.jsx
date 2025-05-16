import React, { useState, useRef, useEffect,forwardRef } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';

const DatePicker = forwardRef(({handleDate},ref) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(true);
  const [showYearSelector, setShowYearSelector] = useState(false);
  
  const yearSelectorRef = useRef(null);
//   const dropdownButtonRef = useRef(null);
  
  // Get current year and generate range of years (±10 years from current)
  const currentYear = currentDate.getFullYear();
  const years = Array.from({ length: 21 }, (_, i) => currentYear - 10 + i);
  
  // Generate days of the week
  const weekdays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  
  // Calculate days in month and first day of month
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  
  // Generate calendar days
  const days = [];
  // Add empty cells for days before the first of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null);
  }
  // Add days of the month
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }
  
  // Navigation functions
  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };
  
  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };
  
  // Year selection function
  const selectYear = (year) => {
    setCurrentDate(new Date(year, currentDate.getMonth(), 1));
    setShowYearSelector(false);
  };
  
  // Toggle year selector
  const toggleYearSelector = (e) => {
    setShowYearSelector(!showYearSelector);
    // console.log('clicked')

  };
  
  // Date selection function
  const handleDateSelect = (day) => {
    if (day) {
      setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day));
    }
  };
  
  // Check if a day is selected
  const isSelected = (day) => {
    if (!day) return false;
    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === currentDate.getMonth() &&
      selectedDate.getFullYear() === currentDate.getFullYear()
    );
  };
  
  const confirmSelection = () => {
    setShowCalendar(false);
    console.log(selectedDate)
    console.log(selectedDate.toString());
    handleDate(selectedDate);
    // Here you could also call a function passed as prop to return the selected date
  };
  
//   Close year selector when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (yearSelectorRef.current && !yearSelectorRef.current.contains(event.target)) {
          event.stopImmediatePropagation()
        // console.log('clicked outside')
        // event.preventDefault();
        setShowYearSelector(false);
        // event.stopPropagation();
      }

    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Custom CSS for the component
  const customStyle = `
    .custom-scrollbar::-webkit-scrollbar {
      width: 4px;
    }
    
    .custom-scrollbar::-webkit-scrollbar-track {
      background: #333;
      border-radius: 10px;
    }
    
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background: #666;
      border-radius: 10px;
    }
    
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
      background: #888;
    }
  `;

  return (
    <div ref={ref} className="fixed top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] z-12 shadow-[0px_10px_30px_rgba(0,0,0,0.9)]" >
    
    <div className="flex flex-col w-full max-w-xs bg-black text-white rounded-lg">
      <style>{customStyle}</style>
      
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="text-lg font-semibold relative">
            {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()} 
            <button 
              onClick={(e)=>toggleYearSelector(e)}
              className="ml-1 inline-flex items-center focus:outline-none"
              aria-label="Change year"
            >
              <ChevronDown size={16} className='cursor-pointer' />
            </button>
            
            {/* Year selector dropdown */}
            {showYearSelector ===true?  (
                <>
                <div className="fixed w-[100vw] h-[100vw] z-9 top-0 left-0 transparent"></div>
              <div 
                ref={yearSelectorRef}
                className="absolute top-full left-0 mt-1 bg-gray-800 rounded-md shadow-lg max-h-48 z-10 custom-scrollbar overflow-y-auto"
                style={{ scrollbarColor: '#666 #333' }} // Firefox
              >
                {years.map((year) => (
                  <button
                    key={year}
                    onClick={() => selectYear(year)}
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-700 ${
                      year === currentDate.getFullYear() ? 'bg-gray-700' : ''
                    }`}
                  >
                    {year}
                  </button>
                ))}
              </div>
              </>
            ):<></>}
          </div>
          <div className="flex">
            <button 
              onClick={prevMonth} 
              className="p-1 mr-2 cursor-pointer"
              aria-label="Previous month"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={nextMonth} 
              className="p-1 cursor-pointer"
              aria-label="Next month"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
        
        {/* Weekday headers */}
        <div className="grid grid-cols-7 mb-2">
          {weekdays.map((day, index) => (
            <div key={index} className="text-center text-xs font-medium text-gray-400">
              {day}
            </div>
          ))}
        </div>
        
        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-2">
          {days.map((day, index) => (
            <div
              key={index}
              className={`
                h-8 w-8 flex items-center justify-center rounded-full text-sm
                ${day === null ? 'invisible' : 'cursor-pointer'}
                ${isSelected(day) ? 'bg-gray-500' : 'hover:bg-gray-700'}
                ${(new Date()).getMonth===currentDate.getMonth && (new Date()).getFullYear()===currentDate.getFullYear() && (new Date).getDate() === day ? 'text-blue-500' : ''}
              `}
              onClick={() => handleDateSelect(day)}
              role={day !== null ? "button" : ""}
              aria-label={day !== null ? `Select ${day} ${currentDate.toLocaleString('default', { month: 'long' })} ${currentDate.getFullYear()}` : ""}
              tabIndex={day !== null ? 0 : -1}
            >
              {day}
            </div>
          ))}
        </div>
      </div>
      
      {/* Confirm button */}
      <div className="mt-4 p-4 border-t border-gray-800">
        <button 
          onClick={confirmSelection}
          className="w-full py-3 bg-white text-black font-semibold rounded-md cursor-pointer"
        >
          Confirm
        </button>
      </div>
      </div>
    </div>
  );
});

export default DatePicker;