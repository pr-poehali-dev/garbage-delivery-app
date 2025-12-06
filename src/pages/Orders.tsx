import { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface Order {
  id: number;
  address: string;
  date: string;
  status: 'active' | 'completed' | 'cancelled';
  price: string;
  distance: string;
}

const Orders = () => {
  const [activeOrders] = useState<Order[]>([
    {
      id: 1,
      address: 'ул. Ленина, д. 45',
      date: '6 декабря, 14:30',
      status: 'active',
      price: '350 ₽',
      distance: '2.3 км',
    },
  ]);

  const [completedOrders] = useState<Order[]>([
    {
      id: 2,
      address: 'пр. Победы, д. 23',
      date: '5 декабря, 16:20',
      status: 'completed',
      price: '280 ₽',
      distance: '1.5 км',
    },
    {
      id: 3,
      address: 'ул. Гагарина, д. 89',
      date: '5 декабря, 12:15',
      status: 'completed',
      price: '420 ₽',
      distance: '3.2 км',
    },
    {
      id: 4,
      address: 'ул. Советская, д. 56',
      date: '4 декабря, 18:45',
      status: 'completed',
      price: '310 ₽',
      distance: '2.1 км',
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-primary text-white';
      case 'completed':
        return 'bg-green-500 text-white';
      case 'cancelled':
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'В процессе';
      case 'completed':
        return 'Завершен';
      case 'cancelled':
        return 'Отменен';
      default:
        return status;
    }
  };

  const OrderCard = ({ order }: { order: Order }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="MapPin" size={16} className="text-primary" />
              <p className="font-semibold">{order.address}</p>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Icon name="Calendar" size={14} />
                {order.date}
              </span>
              <span className="flex items-center gap-1">
                <Icon name="Navigation" size={14} />
                {order.distance}
              </span>
            </div>
          </div>
          <Badge className={getStatusColor(order.status)}>
            {getStatusText(order.status)}
          </Badge>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-lg font-bold text-primary">{order.price}</p>
          <span className="text-sm text-muted-foreground">ID: #{order.id}</span>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <Layout>
      <div className="max-w-lg mx-auto p-4 space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Мои заказы</h1>
          <p className="text-muted-foreground">История и активные заказы</p>
        </div>

        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="active" className="flex items-center gap-2">
              <Icon name="Package" size={16} />
              Активные
              {activeOrders.length > 0 && (
                <Badge variant="secondary" className="ml-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center">
                  {activeOrders.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="completed" className="flex items-center gap-2">
              <Icon name="CheckCircle" size={16} />
              Завершенные
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-3 mt-4">
            {activeOrders.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <Icon name="PackageOpen" size={48} className="mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">Нет активных заказов</p>
                </CardContent>
              </Card>
            ) : (
              activeOrders.map((order) => <OrderCard key={order.id} order={order} />)
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-3 mt-4">
            {completedOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Orders;
