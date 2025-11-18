import { useState, useEffect } from 'react';
import Header from './components/Header';
import DateTimeSelector from './components/DateTimeSelector';
import TimestampOutput from './components/TimestampOutput';
import './App.css';

const detectUserTimezone = (): string => {
  try {
    const detected = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const allTimezones = [
      'Etc/UTC',
      'Europe/London',
      'Europe/Berlin',
      'America/New_York',
      'America/Chicago',
      'America/Los_Angeles',
      'Australia/Sydney',
      'Asia/Tokyo',
      'Pacific/Midway',
      'Pacific/Honolulu',
      'America/Anchorage',
      'America/Denver',
      'America/Caracas',
      'America/Buenos_Aires',
      'Atlantic/South_Georgia',
      'Atlantic/Azores',
      'Europe/Athens',
      'Europe/Moscow',
      'Asia/Dubai',
      'Asia/Karachi',
      'Asia/Dhaka',
      'Asia/Bangkok',
      'Asia/Shanghai',
      'Pacific/Noumea',
      'Pacific/Auckland',
    ];

    if (allTimezones.includes(detected)) {
      return detected;
    }

    return 'Etc/UTC';
  } catch {
    return 'Etc/UTC';
  }
};

function App() {
  const [dateTime, setDateTime] = useState<Date>(new Date());
  const [timezone, setTimezone] = useState<string>('Etc/UTC');

  useEffect(() => {
    setTimezone(detectUserTimezone());
  }, []);

  return (
    <div className="app-container">
      <main className="main-content">
        <div className="top-section">
          <Header />
          <DateTimeSelector
            dateTime={dateTime}
            timezone={timezone}
            onDateTimeChange={setDateTime}
            onTimezoneChange={setTimezone}
          />
        </div>
        <TimestampOutput dateTime={dateTime} />
      </main>
    </div>
  );
}

export default App;
