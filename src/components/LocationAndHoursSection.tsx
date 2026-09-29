import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Phone, Clock, ExternalLink, Copy, Check, Navigation, MessageCircle } from 'lucide-react';
import L from 'leaflet';
import { RestaurantInfo } from '../types';

interface LocationAndHoursSectionProps {
  restaurant: RestaurantInfo;
  ownerWhatsApp: string;
}

export const LocationAndHoursSection: React.FC<LocationAndHoursSectionProps> = ({ restaurant, ownerWhatsApp }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    try {
      const map = L.map(mapContainerRef.current, {
        center: [restaurant.coordinates.lat, restaurant.coordinates.lng],
        zoom: 16,
        scrollWheelZoom: false
      });

      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://carto.com/">CARTO</a>',
        maxZoom: 19
      }).addTo(map);

      // Custom marker icon
      const customIcon = L.divIcon({
        className: 'custom-cafe-pin',
        html: `
          <div style="background-color: #15803d; color: #ffffff; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 14px rgba(0,0,0,0.3); border: 3px solid #ffffff; font-weight: bold;">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M17 8h1a4 4 0 1 1 0 8h-1"></path>
              <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"></path>
            </svg>
          </div>
        `,
        iconSize: [40, 40],
        iconAnchor: [20, 20]
      });

      const marker = L.marker([restaurant.coordinates.lat, restaurant.coordinates.lng], {
        icon: customIcon
      }).addTo(map);

      marker.bindPopup(`
        <div style="font-family: sans-serif; color: #1c1917; padding: 4px;">
          <strong style="font-size: 14px; color: #15803d;">${restaurant.name}</strong><br/>
          <span style="font-size: 11px; color: #78716c;">Square Towers, Marris Rd, Begpur, Aligarh</span><br/>
          <span style="font-size: 11px; color: #b45309; font-weight: bold;">4.9 ★ (1,280+ Reviews)</span><br/>
          <span style="font-size: 11px; color: #15803d;">Open 11:00 AM – 11:00 PM</span>
        </div>
      `);

      mapInstanceRef.current = map;
    } catch (e) {
      console.error('Leaflet error:', e);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [restaurant]);

  const copyAddress = () => {
    navigator.clipboard.writeText(restaurant.address.full);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="location-hours" className="py-12 sm:py-20 bg-white border-t border-stone-200 text-stone-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Location, Hours, Contact details */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-5">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-800 font-semibold mb-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>Visit Caffeine in Aligarh</span>
              </div>
              <h2 className="text-3xl font-serif font-extrabold text-stone-900">
                Find Us on Marris Road
              </h2>
              <p className="text-sm text-stone-600 mt-2 leading-relaxed">
                Located conveniently at Square Towers, Begpur, Aligarh. Stop by for your favorite Vietnamese cold brew, sourdough wraps, pizzas, and bento cakes.
              </p>
            </div>

            {/* Address Card */}
            <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-stone-900">
                      {restaurant.address.shop}, {restaurant.address.building}
                    </h4>
                    <p className="text-xs text-stone-600 mt-0.5">
                      {restaurant.address.street}, {restaurant.address.area}
                    </p>
                    <p className="text-xs text-stone-600">
                      {restaurant.address.city}, {restaurant.address.state} — {restaurant.address.pincode}
                    </p>
                  </div>
                </div>

                <button
                  onClick={copyAddress}
                  className="p-1.5 rounded-lg bg-white hover:bg-stone-100 border border-stone-200 text-stone-600 transition-colors text-xs flex items-center gap-1 shadow-2xs"
                  title="Copy full address"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap gap-2 pt-2 border-t border-stone-200">
                <a
                  href={restaurant.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-2xs transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3 h-3 ml-0.5 opacity-80" />
                </a>

                <a
                  href={`https://wa.me/${ownerWhatsApp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-stone-50 text-emerald-800 border border-emerald-300 font-bold text-xs shadow-2xs transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>WhatsApp Chat</span>
                </a>

                <a
                  href={`tel:${restaurant.phone}`}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-stone-50 text-stone-700 text-xs font-semibold border border-stone-200 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-stone-500" />
                  <span>Call Restaurant</span>
                </a>
              </div>
            </div>

            {/* Timings Card */}
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-1.5">
              <div className="flex items-center gap-2 text-stone-900 text-xs font-bold">
                <Clock className="w-4 h-4 text-amber-700" />
                <span>Operating Timings</span>
              </div>
              <div className="flex items-center justify-between text-xs text-stone-700 pt-0.5">
                <span>Monday through Sunday</span>
                <span className="font-mono text-emerald-800 font-bold">11:00 AM – 11:00 PM</span>
              </div>
              <div className="text-[11px] text-stone-500">
                Continuous kitchen operation for dine-in, takeaway & Aligarh delivery.
              </div>
            </div>
          </div>

          {/* Right Column: Leaflet Map Viewer */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="relative w-full h-80 sm:h-96 lg:h-full min-h-[340px] rounded-2xl overflow-hidden border border-stone-200 shadow-md">
              <div ref={mapContainerRef} className="w-full h-full z-0" />
              
              {/* Overlay Badge */}
              <div className="absolute top-4 left-4 z-[400] bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-lg border border-stone-200 text-xs text-stone-800 shadow-sm flex items-center gap-2 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
                <span>Caffeine · Marris Rd, Begpur</span>
              </div>

              {/* Direct Directions Floating Button */}
              <a
                href={restaurant.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-4 right-4 z-[400] bg-white hover:bg-emerald-700 hover:text-white text-stone-900 px-3.5 py-2 rounded-xl border border-stone-300 text-xs font-bold shadow-md transition-all flex items-center gap-1.5"
              >
                <span>Navigate via Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
