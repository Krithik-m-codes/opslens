"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Event } from "../types/event";
import { renderToStaticMarkup } from "react-dom/server";
import { ShieldAlert, Cpu, Car, BadgeCent, Clock } from "lucide-react";

// Setup custom SVG icons mapped to event type
function getIconSvg(type: string) {
  let Color = "#94a3b8"; // slate-400
  let Icon = <Clock color={Color} size={24} />;
  
  if (type === "fence") { Color = "#f59e0b"; Icon = <ShieldAlert color={Color} size={24} />; }
  else if (type === "drone") { Color = "#60a5fa"; Icon = <Cpu color={Color} size={24} />; }
  else if (type === "vehicle") { Color = "#10b981"; Icon = <Car color={Color} size={24} />; }
  else if (type === "badge") { Color = "#c084fc"; Icon = <BadgeCent color={Color} size={24} />; }

  const htmlString = renderToStaticMarkup(
    <div style={{
      backgroundColor: "#1e293b",
      border: `2px solid ${Color}`,
      borderRadius: "50%",
      width: "36px",
      height: "36px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: `0 0 10px ${Color}80`
    }}>
      {Icon}
    </div>
  );

  return L.divIcon({
    html: htmlString,
    className: "custom-leaflet-icon",
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    popupAnchor: [0, -18],
  });
}

function MapController({ 
  selectedEventId, 
  events 
}: { 
  selectedEventId: string | null; 
  events: Event[]; 
}) {
  const map = useMap();
  useEffect(() => {
    if (selectedEventId) {
      const evt = events.find(e => e.id === selectedEventId);
      if (evt) {
        map.flyTo(evt.coordinates as L.LatLngExpression, 17, {
          duration: 1.5,
          easeLinearity: 0.25
        });
      }
    }
  }, [selectedEventId, events, map]);
  return null;
}

interface MapViewProps {
  events: Event[];
  selectedEventId?: string | null;
  onEventClick?: (id: string) => void;
}

export default function MapViewData({ events, selectedEventId, onEventClick }: MapViewProps) {
  // Center roughly over Ridgeway Site base coordinates (Bangalore Peenya Industrial Area)
  const center: [number, number] = [13.0285, 77.5197];

  return (
    <div className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden border-0 shadow-xl z-0 bg-black/50 pointer-events-auto">
      <MapContainer
        center={center}
        zoom={13}
        className="h-full w-full"
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> contributors'
        />
        <MapController selectedEventId={selectedEventId || null} events={events} />
        {events.map((evt) => (
          <Marker 
            key={evt.id} 
            position={evt.coordinates} 
            icon={getIconSvg(evt.type)}
            eventHandlers={{ click: () => onEventClick?.(evt.id) }}
          >
            <Popup className="bg-slate-800 text-slate-100 rounded-lg">
              <div className="p-1">
                <span className="font-bold text-amber-500">
                  {evt.type.toUpperCase()}
                </span>
                <p className="text-sm mt-1">{evt.location}</p>
                <p className="text-xs text-slate-400 mt-2">
                  {new Date(evt.timestamp).toLocaleTimeString()}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
        {/* Draw a subtle radar pulse or circle around drone patrol areas manually if we had logic */}
      </MapContainer>
    </div>
  );
}
