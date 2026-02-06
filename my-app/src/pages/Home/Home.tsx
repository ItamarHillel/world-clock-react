import { CITIES } from '../../data/cities';
import { useTimeData } from '../../hooks/useTimeData';
import CityCard from '../../components/CityCard/CityCard';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import './Home.css';

const Home = () => {
  const { citiesData, isLoading, error, refetch } = useTimeData(CITIES);

  return (
    <div className="home-page">
      <header className="home-header">
        <h1>שעון עולמי</h1>
        <p>צפייה בשעות מקומיות בערים מרכזיות ברחבי העולם</p>
        <button className="refresh-btn" onClick={refetch} disabled={isLoading}>
          🔄 רענון
        </button>
      </header>

      {isLoading && citiesData.length === 0 ? (
        <Loader message="טוען שעות..." />
      ) : error && citiesData.length === 0 ? (
        <ErrorMessage message={error} onRetry={refetch} />
      ) : (
        <div className="cities-grid">
          {citiesData.map((city) => (
            <CityCard key={city.timezone} city={city} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
