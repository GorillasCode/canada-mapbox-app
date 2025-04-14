import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import './App.css';
import SpecialtyFilterCard from './components/FiltroEspecialidade';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

const mockData = [
  { nome: 'Toronto', preco_medio: 850000, especialidade: 'Orthodontics', coordinates: [-79.3832, 43.6532] as [number, number] },
  { nome: 'Vancouver', preco_medio: 950000, especialidade: 'Periodontics', coordinates: [-123.1207, 49.2827] as [number, number] },
  { nome: 'Montreal', preco_medio: 600000, especialidade: 'Pediatric Dentistry', coordinates: [-73.5673, 45.5017] as [number, number] },
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
  const [selectedSpeciality, setSelectedSpeciality] = useState<string | null>(null);


  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current!,
      style: 'mapbox://styles/mapbox/light-v10',
      center: [-106.3468, 56.1304], // Canadá
      zoom: 3,
    });

    map.on('load', () => {
      const filteredData = selectedSpeciality
        ? mockData.filter((city) => city.especialidade === selectedSpeciality)
        : mockData;
    
      filteredData.forEach((city, index) => {
        new mapboxgl.Marker({
          color: selectedSpeciality ? '#ff4d4d' : '#3fb1ce',
        })
          .setLngLat(city.coordinates)
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }).setHTML(`
              <h3>${city.nome}</h3>
              <p>Specialty: ${city.especialidade}</p>
              <p>Average price: $${city.preco_medio.toLocaleString()}</p>
            `)
          )
          .addTo(map);
    
        if (index === 0 && selectedSpeciality) {
          map.flyTo({
            center: city.coordinates,
            zoom: 10,
            speed: 1.2,
            curve: 1,
            essential: true,
          });
        }
      });
    })
    return () => map.remove(); 
  }, [selectedSpeciality]);

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
        <h2 className="text-xl font-bold mb-4 mt-6">Filter by specialty </h2>
          <SpecialtyFilterCard onSelect={setSelectedSpeciality}/>
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
