import './Loader.css';

interface LoaderProps {
  message?: string;
}

const Loader = ({ message = 'טוען...' }: LoaderProps) => {
  return (
    <div className="loader-container">
      <div className="loader-spinner"></div>
      <p className="loader-message">{message}</p>
    </div>
  );
};

export default Loader;
