import { useNavigate } from 'react-router-dom';
import type { CityTimeData } from '../../types';
import './CityCard.css';

interface CityCardProps {
  city: CityTimeData;
}

const CityCard = ({ city }: CityCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    // Encode timezone for URL since it contains "/"
    const encodedTimezone = encodeURIComponent(city.timezone);
    navigate(`/city/${encodedTimezone}`);
  };

  return (
    <div
      className={`city-card ${city.isDaytime ? 'daytime' : 'nighttime'}`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
    >
      <div className="city-card-header">
        <span className="day-night-indicator">
          {city.isDaytime ? '🌞' : '🌙'}
        </span>
        <h3 className="city-name">{city.name}</h3>
      </div>

      {city.error ? (
        <p className="city-card-error">שגיאה בטעינה</p>
      ) : (
        <>
          <div className="city-time">{city.localTime}</div>
          <div className="city-info">
            <span className="timezone-abbr">{city.abbreviation}</span>
            <span className="utc-offset">{city.utcOffset}</span>
          </div>
        </>
      )}
    </div>
  );
};

export default CityCard;
