import { useState } from 'react';
import { format, formatDistanceToNow } from 'date-fns';
import '../shared.css';
import './TimestampOutput.css';

interface TimestampOutputProps {
  dateTime: Date;
}

interface TimestampFormat {
  title: string;
  flag: string;
  formatter: (date: Date) => string;
}

const TIMESTAMP_FORMATS: TimestampFormat[] = [
  {
    title: 'Relative Time',
    flag: 'R',
    formatter: (date) => formatDistanceToNow(date, { addSuffix: true }),
  },
  {
    title: 'Short Time',
    flag: 't',
    formatter: (date) => format(date, 'HH:mm'),
  },
  {
    title: 'Long Time',
    flag: 'T',
    formatter: (date) => format(date, 'HH:mm:ss'),
  },
  {
    title: 'Short Date',
    flag: 'd',
    formatter: (date) => format(date, 'dd/MM/yyyy'),
  },
  {
    title: 'Long Date',
    flag: 'D',
    formatter: (date) => format(date, 'dd MMMM yyyy'),
  },
  {
    title: 'Short Date-Time',
    flag: 'f',
    formatter: (date) => format(date, 'dd MMMM yyyy HH:mm'),
  },
  {
    title: 'Long Date-Time',
    flag: 'F',
    formatter: (date) => format(date, 'EEEE, dd MMMM yyyy HH:mm'),
  },
];

const TimestampOutput = ({ dateTime }: TimestampOutputProps) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const unixTimestamp = Math.floor(dateTime.getTime() / 1000);

  const handleCopy = (code: string, flag: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(flag);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="timestamp-output outer-field">
      {TIMESTAMP_FORMATS.map((format) => {
        const code = `<t:${unixTimestamp}:${format.flag}>`;
        const example = format.formatter(dateTime);
        const isCopied = copiedId === format.flag;

        return (
          <div
            key={format.flag}
            className={`timestamp-card ${isCopied ? 'copied' : ''}`}
            onClick={() => handleCopy(code, format.flag)}
          >
            <div className="card-title">{format.title}</div>
            <div className="card-preview">{example}</div>
            <div className="card-code">{code}</div>
            <div className={`card-action ${isCopied ? 'show-copied' : ''}`}>
              {isCopied ? '✓ Copied!' : 'Click to copy'}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TimestampOutput;
