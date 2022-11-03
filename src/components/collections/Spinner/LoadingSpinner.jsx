import Spinner from 'react-bootstrap/Spinner';

const LoadingSpinner = ({ show = false }) => {
  return (
    <>
      {show && (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{
            position: 'fixed',
            height: '100vh',
            width: '100vw',
            zIndex: 2000,
            backgroundColor: '#00000088'
          }}
        >
          <Spinner animation="grow" variant="light" />
        </div>
      )}
    </>
  );
};

export default LoadingSpinner;
