import { useState } from 'react';
import { Clock } from 'lucide-react';

export default function TimePicker() {
  const [isOpen, setIsOpen] = useState(false);
  const [time, setTime] = useState({ hours: '12', minutes: '00', period: 'AM' });

  // Arrays for hours, minutes and period options
  const hours = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));
  const minutes = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'));
  const periods = ['AM', 'PM'];

  // Handle time change
  const handleTimeChange = (type, value) => {
    setTime({ ...time, [type]: value });
  };

  // Toggle dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Simple input field */}
      <div 
        className="flex items-center justify-between p-3 border border-gray-300 rounded-md bg-white cursor-pointer"
        onClick={toggleDropdown}
      >
        <div className="flex-1 text-center text-lg font-medium text-gray-700 rtl">
          {time.hours}:{time.minutes} {time.period}
        </div>
        <Clock className="text-gray-500" size={20} />
      </div>
      
      {/* Dropdown panel */}
      {isOpen && (
        <div className="absolute mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg z-10">
          <div className="flex p-4 gap-2">
            {/* Hours selection */}
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-500 mb-2 text-center">الساعة</p>
              <div className="grid grid-cols-4 gap-1 max-h-40 overflow-y-auto">
                {hours.map((hour) => (
                  <button
                    key={hour}
                    className={`p-2 rounded-md text-center ${
                      time.hours === hour 
                        ? 'bg-blue-500 text-white' 
                        : 'hover:bg-gray-100'
                    }`}
                    onClick={() => handleTimeChange('hours', hour)}
                  >
                    {hour}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Minutes selection */}
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-500 mb-2 text-center">الدقائق</p>
              <div className="grid grid-cols-4 gap-1 max-h-40 overflow-y-auto">
                {minutes.map((minute) => (
                  <button
                    key={minute}
                    className={`p-2 rounded-md text-center ${
                      time.minutes === minute 
                        ? 'bg-blue-500 text-white' 
                        : 'hover:bg-gray-100'
                    }`}
                    onClick={() => handleTimeChange('minutes', minute)}
                  >
                    {minute}
                  </button>
                ))}
              </div>
            </div>
            
            {/* AM/PM selection */}
            <div className="flex-none">
              <p className="text-sm font-medium text-gray-500 mb-2 text-center">ص/م</p>
              <div className="flex flex-col gap-1">
                {periods.map((period) => (
                  <button
                    key={period}
                    className={`p-2 rounded-md ${
                      time.period === period 
                        ? 'bg-blue-500 text-white' 
                        : 'hover:bg-gray-100'
                    }`}
                    onClick={() => handleTimeChange('period', period)}
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex border-t border-gray-100 p-2">
            <button 
              className="flex-1 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              onClick={() => setIsOpen(false)}
            >
              تم
            </button>
          </div>
        </div>
      )}
    </div>
  );
}