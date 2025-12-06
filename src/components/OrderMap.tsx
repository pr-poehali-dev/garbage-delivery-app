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

interface OrderMapProps {
  orders: MapOrder[];
  courierLocation?: { lat: number; lng: number };
}

const OrderMap = ({ orders, courierLocation }: OrderMapProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedOrder, setSelectedOrder] = useState<MapOrder | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    const latitudes = orders.map(o => o.lat);
    const longitudes = orders.map(o => o.lng);
    
    if (courierLocation) {
      latitudes.push(courierLocation.lat);
      longitudes.push(courierLocation.lng);
    }

    const minLat = Math.min(...latitudes) - 0.01;
    const maxLat = Math.max(...latitudes) + 0.01;
    const minLng = Math.min(...longitudes) - 0.01;
    const maxLng = Math.max(...longitudes) + 0.01;

    const latToY = (lat: number) => {
      return height - ((lat - minLat) / (maxLat - minLat)) * height;
    };

    const lngToX = (lng: number) => {
      return ((lng - minLng) / (maxLng - minLng)) * width;
    };

    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 2;
    for (let i = 0; i < 5; i++) {
      const y = (height / 5) * i;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();

      const x = (width / 5) * i;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    if (courierLocation) {
      const courierX = lngToX(courierLocation.lng);
      const courierY = latToY(courierLocation.lat);

      orders.forEach((order) => {
        if (order.status === 'active') {
          const orderX = lngToX(order.lng);
          const orderY = latToY(order.lat);

          ctx.strokeStyle = '#10b981';
          ctx.lineWidth = 3;
          ctx.setLineDash([10, 5]);
          ctx.beginPath();
          ctx.moveTo(courierX, courierY);
          ctx.lineTo(orderX, orderY);
          ctx.stroke();
          ctx.setLineDash([]);

          const angle = Math.atan2(orderY - courierY, orderX - courierX);
          const arrowSize = 12;
          ctx.fillStyle = '#10b981';
          ctx.beginPath();
          ctx.moveTo(orderX, orderY);
          ctx.lineTo(
            orderX - arrowSize * Math.cos(angle - Math.PI / 6),
            orderY - arrowSize * Math.sin(angle - Math.PI / 6)
          );
          ctx.lineTo(
            orderX - arrowSize * Math.cos(angle + Math.PI / 6),
            orderY - arrowSize * Math.sin(angle + Math.PI / 6)
          );
          ctx.closePath();
          ctx.fill();
        }
      });

      ctx.beginPath();
      ctx.arc(courierX, courierY, 12, 0, 2 * Math.PI);
      ctx.fillStyle = '#10b981';
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(courierX, courierY, 24, 0, 2 * Math.PI);
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    orders.forEach((order) => {
      const x = lngToX(order.lng);
      const y = latToY(order.lat);

      let color = '#10b981';
      if (order.status === 'pending') color = '#eab308';
      if (order.status === 'completed') color = '#22c55e';

      ctx.beginPath();
      ctx.arc(x, y, 10, 0, 2 * Math.PI);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x, y + 16);
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.font = 'bold 12px Inter';
      ctx.fillStyle = '#1f2937';
      ctx.textAlign = 'center';
      ctx.fillText(`#${order.id}`, x, y - 15);
    });
  }, [orders, courierLocation]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const width = canvas.width;
    const height = canvas.height;

    const latitudes = orders.map(o => o.lat);
    const longitudes = orders.map(o => o.lng);
    
    if (courierLocation) {
      latitudes.push(courierLocation.lat);
      longitudes.push(courierLocation.lng);
    }

    const minLat = Math.min(...latitudes) - 0.01;
    const maxLat = Math.max(...latitudes) + 0.01;
    const minLng = Math.min(...longitudes) - 0.01;
    const maxLng = Math.max(...longitudes) + 0.01;

    const latToY = (lat: number) => {
      return height - ((lat - minLat) / (maxLat - minLat)) * height;
    };

    const lngToX = (lng: number) => {
      return ((lng - minLng) / (maxLng - minLng)) * width;
    };

    let clicked = false;
    orders.forEach((order) => {
      const orderX = lngToX(order.lng);
      const orderY = latToY(order.lat);
      const distance = Math.sqrt((x - orderX) ** 2 + (y - orderY) ** 2);

      if (distance < 20) {
        setSelectedOrder(order);
        clicked = true;
      }
    });

    if (!clicked) {
      setSelectedOrder(null);
    }
  };

  return (
    <div className="relative">
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <canvas
            ref={canvasRef}
            width={800}
            height={400}
            className="w-full h-[400px] cursor-pointer"
            onClick={handleCanvasClick}
          />
        </CardContent>
      </Card>

      {selectedOrder && (
        <Card className="absolute bottom-4 left-4 right-4 shadow-lg animate-fade-in">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
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

export default OrderMap;
