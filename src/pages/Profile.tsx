import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import Icon from '@/components/ui/icon';
import { useState } from 'react';

const Profile = () => {
  const [notifications, setNotifications] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const user = {
    name: 'Иван Петров',
    phone: '+7 (999) 123-45-67',
    email: 'ivan.petrov@example.com',
    avatar: '',
    rating: 4.8,
    completedOrders: 156,
    joinDate: 'Сентябрь 2024',
  };

  const stats = [
    { label: 'Завершено заказов', value: user.completedOrders, icon: 'CheckCircle' },
    { label: 'Средний рейтинг', value: user.rating, icon: 'Star' },
    { label: 'На платформе с', value: user.joinDate, icon: 'Calendar' },
  ];

  const menuItems = [
    { icon: 'Wallet', label: 'Баланс и выплаты', action: () => {} },
    { icon: 'FileText', label: 'Документы', action: () => {} },
    { icon: 'HelpCircle', label: 'Помощь и поддержка', action: () => {} },
    { icon: 'Settings', label: 'Настройки', action: () => {} },
  ];

  return (
    <Layout>
      <div className="max-w-lg mx-auto p-4 space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Профиль</h1>
          <p className="text-muted-foreground">Ваша информация и настройки</p>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <Avatar className="h-20 w-20">
                <AvatarImage src={user.avatar} />
                <AvatarFallback className="text-2xl bg-primary text-white">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-2xl font-bold">{user.name}</h2>
                <p className="text-muted-foreground">{user.phone}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <Icon name={stat.icon} size={20} className="mx-auto mb-2 text-primary" />
                  <p className="text-lg font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Bell" size={20} />
              Уведомления
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <p className="font-medium">Push-уведомления</p>
                <p className="text-sm text-muted-foreground">О новых заказах и статусах</p>
              </div>
              <Switch checked={notifications} onCheckedChange={setNotifications} />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <p className="font-medium">Звуковые уведомления</p>
                <p className="text-sm text-muted-foreground">Звук при новом заказе</p>
              </div>
              <Switch checked={soundEnabled} onCheckedChange={setSoundEnabled} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Menu" size={20} />
              Меню
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {menuItems.map((item, index) => (
              <Button
                key={index}
                variant="ghost"
                className="w-full justify-start gap-3 h-auto py-3"
                onClick={item.action}
              >
                <Icon name={item.icon} size={20} className="text-primary" />
                <span className="flex-1 text-left">{item.label}</span>
                <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
              </Button>
            ))}
          </CardContent>
        </Card>

        <Button variant="destructive" className="w-full" size="lg">
          <Icon name="LogOut" size={20} className="mr-2" />
          Выйти из аккаунта
        </Button>
      </div>
    </Layout>
  );
};

export default Profile;
