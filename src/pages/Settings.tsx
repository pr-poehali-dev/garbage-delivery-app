import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';

const Settings = () => {
  const navigate = useNavigate();
  
  const [name, setName] = useState('Иван Петров');
  const [phone, setPhone] = useState('+7 (999) 123-45-67');
  const [email, setEmail] = useState('ivan.petrov@example.com');
  
  const [autoAccept, setAutoAccept] = useState(false);
  const [workMode, setWorkMode] = useState(true);
  const [gpsTracking, setGpsTracking] = useState(true);
  
  const [searchRadius, setSearchRadius] = useState([5]);
  const [minOrderPrice, setMinOrderPrice] = useState([200]);

  return (
    <Layout>
      <div className="max-w-lg mx-auto p-4 space-y-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate('/profile')}>
            <Icon name="ArrowLeft" size={24} />
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold">Настройки</h1>
            <p className="text-muted-foreground">Управление приложением</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="User" size={20} />
              Личная информация
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">ФИО</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Телефон</Label>
              <Input
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <Button className="w-full">
              <Icon name="Save" size={20} className="mr-2" />
              Сохранить изменения
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Briefcase" size={20} />
              Рабочий режим
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <p className="font-medium">Активен для заказов</p>
                <p className="text-sm text-muted-foreground">
                  Получать новые заказы
                </p>
              </div>
              <Switch checked={workMode} onCheckedChange={setWorkMode} />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <p className="font-medium">Автопринятие заказов</p>
                <p className="text-sm text-muted-foreground">
                  Принимать подходящие заказы автоматически
                </p>
              </div>
              <Switch checked={autoAccept} onCheckedChange={setAutoAccept} />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <p className="font-medium">GPS-отслеживание</p>
                <p className="text-sm text-muted-foreground">
                  Показывать ваше местоположение на карте
                </p>
              </div>
              <Switch checked={gpsTracking} onCheckedChange={setGpsTracking} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Filter" size={20} />
              Фильтры заказов
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Радиус поиска</Label>
                <span className="text-sm font-medium text-primary">
                  {searchRadius[0]} км
                </span>
              </div>
              <Slider
                value={searchRadius}
                onValueChange={setSearchRadius}
                min={1}
                max={20}
                step={1}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">
                Показывать заказы в радиусе {searchRadius[0]} км от вас
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Минимальная стоимость заказа</Label>
                <span className="text-sm font-medium text-primary">
                  {minOrderPrice[0]} ₽
                </span>
              </div>
              <Slider
                value={minOrderPrice}
                onValueChange={setMinOrderPrice}
                min={100}
                max={1000}
                step={50}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">
                Скрыть заказы дешевле {minOrderPrice[0]} ₽
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Shield" size={20} />
              Безопасность
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full justify-start gap-3">
              <Icon name="Lock" size={20} className="text-primary" />
              <span className="flex-1 text-left">Изменить пароль</span>
              <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
            </Button>
            <Button variant="outline" className="w-full justify-start gap-3">
              <Icon name="Smartphone" size={20} className="text-primary" />
              <span className="flex-1 text-left">Двухфакторная аутентификация</span>
              <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
            </Button>
            <Button variant="outline" className="w-full justify-start gap-3">
              <Icon name="UserX" size={20} className="text-primary" />
              <span className="flex-1 text-left">Заблокированные пользователи</span>
              <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Info" size={20} />
              О приложении
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between items-center py-2">
              <span className="text-muted-foreground">Версия</span>
              <span className="font-medium">1.2.5</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-muted-foreground">Последнее обновление</span>
              <span className="font-medium">5 декабря 2024</span>
            </div>
            <Button variant="outline" className="w-full mt-2">
              Проверить обновления
            </Button>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Settings;
