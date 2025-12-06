import { useState } from 'react';
import Layout from '@/components/Layout';
import OrderMap from '@/components/OrderMap';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface Order {
  id: number;
  address: string;
  distance: string;
  status: 'pending' | 'active' | 'completed';
  time: string;
  price: string;
  lat: number;
  lng: number;
}

const Home = () => {
  const [activeOrders] = useState<Order[]>([
    {
      id: 1,
      address: 'ул. Ленина, д. 45',
      distance: '2.3 км',
      status: 'active',
      time: '14:30',
      price: '350 ₽',
      lat: 55.7558,
      lng: 37.6173,
    },
    {
      id: 2,
      address: 'пр. Мира, д. 12',
      distance: '1.8 км',
      status: 'pending',
      time: '15:00',
      price: '280 ₽',
      lat: 55.7645,
      lng: 37.6385,
    },
    {
      id: 3,
      address: 'ул. Садовая, д. 78',
      distance: '3.1 км',
      status: 'pending',
      time: '15:30',
      price: '420 ₽',
      lat: 55.7412,
      lng: 37.6289,
    },
  ]);

  const courierLocation = {
    lat: 55.7522,
    lng: 37.6256,
  };

  const stats = {
    today: 5,
    earnings: '1,850 ₽',
    rating: 4.8,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-primary text-white';
      case 'pending':
        return 'bg-yellow-500 text-white';
      case 'completed':
        return 'bg-green-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'В процессе';
      case 'pending':
        return 'Ожидает';
      case 'completed':
        return 'Завершен';
      default:
        return status;
    }
  };

  return (
    <Layout>
      <div className="max-w-lg mx-auto p-4 space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Главная</h1>
          <p className="text-muted-foreground">Добро пожаловать!</p>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4 text-center">
              <div className="flex justify-center mb-2">
                <Icon name="Package" size={24} className="text-primary" />
              </div>
              <p className="text-2xl font-bold">{stats.today}</p>
              <p className="text-xs text-muted-foreground">Заказов сегодня</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4 text-center">
              <div className="flex justify-center mb-2">
                <Icon name="DollarSign" size={24} className="text-primary" />
              </div>
              <p className="text-2xl font-bold">{stats.earnings}</p>
              <p className="text-xs text-muted-foreground">Заработано</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4 text-center">
              <div className="flex justify-center mb-2">
                <Icon name="Star" size={24} className="text-primary" />
              </div>
              <p className="text-2xl font-bold">{stats.rating}</p>
              <p className="text-xs text-muted-foreground">Рейтинг</p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Icon name="Map" size={20} className="text-primary" />
            <h2 className="text-xl font-bold">Карта маршрутов</h2>
          </div>
          <OrderMap 
            orders={activeOrders.map(order => ({
              id: order.id,
              address: order.address,
              lat: order.lat,
              lng: order.lng,
              status: order.status,
              price: order.price,
            }))}
            courierLocation={courierLocation}
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="MapPin" size={20} />
              Доступные заказы
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {activeOrders.map((order) => (
              <Card key={order.id} className="border-2 hover:border-primary transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Icon name="MapPin" size={16} className="text-primary" />
                        <p className="font-semibold">{order.address}</p>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Icon name="Navigation" size={14} />
                          {order.distance}
                        </span>
                        <span className="flex items-center gap-1">
                          <Icon name="Clock" size={14} />
                          {order.time}
                        </span>
                      </div>
                    </div>
                    <Badge className={getStatusColor(order.status)}>
                      {getStatusText(order.status)}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-bold text-primary">{order.price}</p>
                    {order.status === 'pending' && (
                      <Button size="sm">
                        Принять
                      </Button>
                    )}
                    {order.status === 'active' && (
                      <Button size="sm" variant="outline">
                        Детали
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Home;