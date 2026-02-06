import { useParams, useNavigate } from 'react-router-dom';
import { useSingleCityTime } from '../../hooks/useSingleCityTime';
import { getCityNameByTimezone } from '../../data/cities';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import './CityDetails.css';

const CityDetails = () => {
  const { tz } = useParams<{ tz: string }>();
  const navigate = useNavigate();

  // Decode the timezone from URL
  const timezone = tz ? decodeURIComponent(tz) : '';
  const cityName = getCityNameByTimezone(timezone);

  const { data, isLoading, error, refetch } = useSingleCityTime(timezone);

  const handleBack = () => {
    navigate('/');
  };

  if (!timezone) {
    return (
      <div className="city-details-page">
        <ErrorMessage message="אזור זמן לא תקין" onRetry={handleBack} />
      </div>
    );
  }

  return (
    <div className="city-details-page">
      <div className="details-card">
        <div className="details-header">
          <button className="back-btn" onClick={handleBack}>
            → חזרה
          </button>
          <button className="refresh-btn" onClick={refetch} disabled={isLoading}>
            🔄 רענון
          </button>
        </div>

        {isLoading && !data ? (
          <Loader message={`טוען שעה עבור ${cityName}...`} />
        ) : error ? (
          <ErrorMessage message={error} onRetry={refetch} />
        ) : data ? (
          <div className="details-content">
            <div className="city-header">
              <span className="day-night-icon">
                {data.isDaytime ? '🌞' : '🌙'}
              </span>
              <h1 className="city-title">{cityName}</h1>
            </div>

            <div className="time-display">
              <span className="current-time">{data.localTime}</span>
              <span className="current-date">{data.date}</span>
            </div>

            <div className="details-info">
              <div className="info-item">
                <span className="info-label">אזור זמן</span>
                <span className="info-value">{data.timezone}</span>
              </div>
              <div className="info-item">
                <span className="info-label">קיצור</span>
                <span className="info-value">{data.abbreviation}</span>
              </div>
              <div className="info-item">
                <span className="info-label">הפרש מ-UTC</span>
                <span className="info-value">{data.utcOffset}</span>
              </div>
              <div className="info-item">
                <span className="info-label">יום/לילה</span>
                <span className="info-value">
                  {data.isDaytime ? 'יום (06:00-17:59)' : 'לילה (18:00-05:59)'}
                </span>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default CityDetails;
