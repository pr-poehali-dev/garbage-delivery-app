import { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface MapOrder {
  id: number;
  address: string;
  lat: number;
  lng: number;
  status: 'pending' | 'active' | 'completed';
  price: string;
}

interface YandexMapProps {
  orders: MapOrder[];
  courierLocation?: { lat: number; lng: number };
}

declare global {
  interface Window {
    ymaps3: any;
  }
}

const YandexMap = ({ orders, courierLocation }: YandexMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [selectedOrder, setSelectedOrder] = useState<MapOrder | null>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const initMap = async () => {
      await window.ymaps3.ready;

      const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapMarker } = window.ymaps3;

      const centerLat = courierLocation?.lat || (orders.length > 0 ? orders[0].lat : 55.7558);
      const centerLng = courierLocation?.lng || (orders.length > 0 ? orders[0].lng : 37.6173);

      const map = new YMap(mapRef.current, {
        location: {
          center: [centerLng, centerLat],
          zoom: 13,
        },
      });

      map.addChild(new YMapDefaultSchemeLayer());
      map.addChild(new YMapDefaultFeaturesLayer());

      mapInstanceRef.current = map;

      if (courierLocation) {
        const courierMarkerElement = document.createElement('div');
        courierMarkerElement.className = 'courier-marker';
        courierMarkerElement.innerHTML = `
          <div style="position: relative;">
            <div style="width: 24px; height: 24px; background: #10b981; border: 3px solid white; border-radius: 50%; box-shadow: 0 2px 8px rgba(0,0,0,0.3);"></div>
            <div style="position: absolute; top: -12px; left: -12px; width: 48px; height: 48px; border: 2px dashed #10b981; border-radius: 50%; animation: pulse 2s infinite;"></div>
          </div>
        `;

        const courierMarker = new YMapMarker(
          {
            coordinates: [courierLocation.lng, courierLocation.lat],
          },
          courierMarkerElement
        );

        map.addChild(courierMarker);
      }

      orders.forEach((order) => {
        const markerElement = document.createElement('div');
        markerElement.className = 'order-marker';
        
        let markerColor = '#10b981';
        if (order.status === 'pending') markerColor = '#eab308';
        if (order.status === 'completed') markerColor = '#22c55e';

        markerElement.innerHTML = `
          <div style="display: flex; flex-direction: column; align-items: center; cursor: pointer;">
            <div style="background: ${markerColor}; color: white; padding: 4px 8px; border-radius: 6px; font-size: 12px; font-weight: bold; box-shadow: 0 2px 8px rgba(0,0,0,0.2); margin-bottom: 4px;">
              #${order.id}
            </div>
            <div style="position: relative;">
              <div style="width: 20px; height: 20px; background: ${markerColor}; border: 3px solid white; border-radius: 50%; box-shadow: 0 2px 8px rgba(0,0,0,0.3);"></div>
              <div style="position: absolute; top: 50%; left: 50%; width: 0; height: 16px; border-left: 2px solid ${markerColor};"></div>
            </div>
          </div>
        `;

        markerElement.addEventListener('click', () => {
          setSelectedOrder(order);
        });

        const marker = new YMapMarker(
          {
            coordinates: [order.lng, order.lat],
          },
          markerElement
        );

        map.addChild(marker);
      });
    };

    if (window.ymaps3) {
      initMap();
    } else {
      console.error('Yandex Maps API не загружен');
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current = null;
      }
    };
  }, [orders, courierLocation]);

  return (
    <div className="relative">
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.1); }
        }
      `}</style>
      
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div ref={mapRef} className="w-full h-[400px]" />
        </CardContent>
      </Card>

      {selectedOrder && (
        <Card className="absolute bottom-4 left-4 right-4 shadow-lg animate-fade-in">
          <CardContent className="p-4">
            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
            >
              <Icon name="X" size={20} />
            </button>
            <div className="flex items-start justify-between pr-6">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="MapPin" size={16} className="text-primary" />
                  <p className="font-semibold">{selectedOrder.address}</p>
                </div>
                <p className="text-lg font-bold text-primary">{selectedOrder.price}</p>
              </div>
              <Badge
                className={
                  selectedOrder.status === 'active'
                    ? 'bg-primary text-white'
                    : selectedOrder.status === 'pending'
                    ? 'bg-yellow-500 text-white'
                    : 'bg-green-500 text-white'
                }
              >
                {selectedOrder.status === 'active'
                  ? 'В процессе'
                  : selectedOrder.status === 'pending'
                  ? 'Ожидает'
                  : 'Завершен'}
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="mt-3 flex items-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-primary border-2 border-white shadow-sm"></div>
          <span className="text-muted-foreground">Вы</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-yellow-500 border-2 border-white shadow-sm"></div>
          <span className="text-muted-foreground">Ожидает</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-green-500 border-2 border-white shadow-sm"></div>
          <span className="text-muted-foreground">Завершен</span>
        </div>
      </div>
    </div>
  );
};

export default YandexMap;
