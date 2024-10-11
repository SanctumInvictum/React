import { useEffect } from 'react';

interface PinterestPinProps {
  pinUrl: string; // Пропс для URL пина
}

const PinterestPin: React.FC<PinterestPinProps> = ({ pinUrl }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.defer = true;
    script.src = '//assets.pinterest.com/js/pinit.js';
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div style={{ width: '300px', height: '400px', overflow: 'hidden', position: 'relative' }}>
      <a
        data-pin-do="embedPin"
        href={pinUrl}
        style={{ display: 'block', width: '100%', height: '100%' }}
      ></a>
      <style jsx>{`
        a {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover; /* Обеспечивает, что изображение сохраняет свои пропорции */
        }
      `}</style>
    </div>
  );
};

export default PinterestPin;

