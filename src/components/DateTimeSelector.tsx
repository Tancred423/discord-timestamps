import { formatInTimeZone } from 'date-fns-tz';
import '../shared.css';
import './DateTimeSelector.css';

interface DateTimeSelectorProps {
  dateTime: Date;
  timezone: string;
  onDateTimeChange: (date: Date) => void;
  onTimezoneChange: (timezone: string) => void;
}

const TIMEZONE_GROUPS = [
  {
    label: 'MOST POPULAR',
    timezones: [
      { value: 'Etc/UTC', label: 'UTC (FFXIV Server Time)' },
      { value: 'Europe/London', label: 'GMT/BST (UK)' },
      { value: 'Europe/Berlin', label: 'CET/CEST (Germany, Spain, France)' },
      { value: 'America/New_York', label: 'EST/EDT (East USA)' },
      { value: 'America/Chicago', label: 'CST/CDT (Central USA)' },
      { value: 'America/Los_Angeles', label: 'PST/PDT (West USA)' },
      { value: 'Australia/Sydney', label: 'AEDT/AEST (Australia)' },
      { value: 'Asia/Tokyo', label: 'JST (Japan)' },
    ],
  },
  {
    label: 'ALL',
    timezones: [
      { value: 'Pacific/Midway', label: 'Midway (UTC-11)' },
      { value: 'Pacific/Honolulu', label: 'Hawaii (UTC-10)' },
      { value: 'America/Anchorage', label: 'Alaska (UTC-9)' },
      { value: 'America/Los_Angeles', label: 'Pacific Time (UTC-8)' },
      { value: 'America/Denver', label: 'Mountain Time (UTC-7)' },
      { value: 'America/Chicago', label: 'Central Time (UTC-6)' },
      { value: 'America/New_York', label: 'Eastern Time (UTC-5)' },
      { value: 'America/Caracas', label: 'Caracas (UTC-4)' },
      { value: 'America/Buenos_Aires', label: 'Buenos Aires (UTC-3)' },
      { value: 'Atlantic/South_Georgia', label: 'South Georgia (UTC-2)' },
      { value: 'Atlantic/Azores', label: 'Azores (UTC-1)' },
      { value: 'Etc/UTC', label: 'UTC (UTC+0)' },
      { value: 'Europe/London', label: 'London (UTC+0/+1)' },
      { value: 'Europe/Berlin', label: 'Central Europe (UTC+1/+2)' },
      { value: 'Europe/Athens', label: 'Athens (UTC+2/+3)' },
      { value: 'Europe/Moscow', label: 'Moscow (UTC+3)' },
      { value: 'Asia/Dubai', label: 'Dubai (UTC+4)' },
      { value: 'Asia/Karachi', label: 'Karachi (UTC+5)' },
      { value: 'Asia/Dhaka', label: 'Dhaka (UTC+6)' },
      { value: 'Asia/Bangkok', label: 'Bangkok (UTC+7)' },
      { value: 'Asia/Shanghai', label: 'China (UTC+8)' },
      { value: 'Asia/Tokyo', label: 'Japan (UTC+9)' },
      { value: 'Australia/Sydney', label: 'Sydney (UTC+10/+11)' },
      { value: 'Pacific/Noumea', label: 'Noumea (UTC+11)' },
      { value: 'Pacific/Auckland', label: 'Auckland (UTC+12/+13)' },
    ],
  },
];

const DateTimeSelector = ({ dateTime, timezone, onDateTimeChange, onTimezoneChange }: DateTimeSelectorProps) => {
  const handleDateTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(e.target.value);
    if (!isNaN(newDate.getTime())) {
      onDateTimeChange(newDate);
    }
  };

  const handleNowClick = () => {
    onDateTimeChange(new Date());
  };

  const formattedDateTime = formatInTimeZone(dateTime, timezone, "yyyy-MM-dd'T'HH:mm");

  return (
    <div className="datetime-selector outer-field">
      <div className="timezone-picker-wrapper">
        <label htmlFor="timezone-select" className="input-label">
          Timezone
        </label>
        <select
          id="timezone-select"
          value={timezone}
          onChange={(e) => onTimezoneChange(e.target.value)}
          className="timezone-select"
        >
          {TIMEZONE_GROUPS.map((group) => (
            <optgroup key={group.label} label={group.label}>
              {group.timezones.map((tz) => (
                <option key={tz.value} value={tz.value}>
                  {tz.label}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>

      <div className="datetime-picker-wrapper">
        <label htmlFor="datetime-input" className="input-label">
          Date & Time
        </label>
        <div className="datetime-input-group">
          <input
            id="datetime-input"
            type="datetime-local"
            value={formattedDateTime}
            onChange={handleDateTimeChange}
            className="datetime-input"
          />
          <button onClick={handleNowClick} className="now-button">
            Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default DateTimeSelector;
