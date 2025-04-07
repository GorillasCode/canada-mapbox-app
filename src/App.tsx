import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import './App.css';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

const mockData = [
  { nome: 'Toronto', preco_medio: 850000 },
  { nome: 'Vancouver', preco_medio: 950000 },
  { nome: 'Montreal', preco_medio: 600000 },
];

const historicoPrecos = [
  { mes: 'Jan', preco: 780000 },
  { mes: 'Feb', preco: 800000 },
  { mes: 'Mar', preco: 820000 },
  { mes: 'Apr', preco: 850000 },
];

function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

function Card({ children, className }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('rounded-2xl border border-gray-200 bg-white shadow-sm p-4', className)}>
      {children}
    </div>
  );
}

function CardContent({ children, className }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('mt-2', className)}>{children}</div>;
}

const CanadaRealEstateMap = () => {
  const mapContainer = useRef(null);
  const [selectedCity, setSelectedCity] = useState('Toronto');

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current!,
      style: 'mapbox://styles/mapbox/light-v10',
      center: [-106.3468, 56.1304], // Canadá
      zoom: 3,
    });

    map.on('load', () => {
      mockData.forEach((city) => {
        new mapboxgl.Marker()
          .setLngLat([
            city.nome === 'Toronto' ? -79.3832 : city.nome === 'Vancouver' ? -123.1207 : -73.5673,
            city.nome === 'Toronto' ? 43.6532 : city.nome === 'Vancouver' ? 49.2827 : 45.5017,
          ])
          .setPopup(
            new mapboxgl.Popup({ offset: 25 })
              .setHTML(`<h3>${city.nome}</h3><p>Preço médio: $${city.preco_medio.toLocaleString()}</p>`)
          )
          .addTo(map);
      });
    });

    return () => map.remove();
  }, []);

  return (
    <div className="flex flex-col md:flex-row w-full h-screen">
      <div ref={mapContainer} className="w-full md:w-2/3 h-1/2 md:h-full" />

      <div className="w-full md:w-1/3 p-4 bg-white shadow-xl">
        <h2 className="text-xl font-bold mb-4">Histórico de Preços - {selectedCity}</h2>
        <Card>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={historicoPrecos}>
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="preco" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <CanadaRealEstateMap />
    </div>
  );
}

export default App;
