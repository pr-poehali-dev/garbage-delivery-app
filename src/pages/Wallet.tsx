import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

const Wallet = () => {
  const navigate = useNavigate();
  const [withdrawAmount, setWithdrawAmount] = useState('');

  const balance = {
    available: 5850,
    pending: 1200,
    total: 7050,
  };

  const transactions = [
    { id: 1, date: '5 декабря', amount: 850, type: 'income', description: 'Оплата за 3 заказа' },
    { id: 2, date: '4 декабря', amount: 1200, type: 'income', description: 'Оплата за 4 заказа' },
    { id: 3, date: '3 декабря', amount: 3000, type: 'withdrawal', description: 'Вывод на карту' },
    { id: 4, date: '2 декабря', amount: 1450, type: 'income', description: 'Оплата за 5 заказов' },
  ];

  return (
    <Layout>
      <div className="max-w-lg mx-auto p-4 space-y-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate('/profile')}>
            <Icon name="ArrowLeft" size={24} />
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold">Баланс и выплаты</h1>
            <p className="text-muted-foreground">Управление финансами</p>
          </div>
        </div>

        <Card className="bg-gradient-to-br from-primary to-primary/80 text-white">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div>
                <p className="text-white/80 text-sm mb-1">Доступно к выводу</p>
                <p className="text-4xl font-bold">{balance.available.toLocaleString()} ₽</p>
              </div>
              <div className="flex gap-4 pt-2">
                <div className="flex-1">
                  <p className="text-white/80 text-xs">В обработке</p>
                  <p className="text-lg font-semibold">{balance.pending.toLocaleString()} ₽</p>
                </div>
                <div className="flex-1">
                  <p className="text-white/80 text-xs">Всего заработано</p>
                  <p className="text-lg font-semibold">{balance.total.toLocaleString()} ₽</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="CreditCard" size={20} />
              Вывод средств
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Сумма вывода</Label>
              <Input
                id="amount"
                type="number"
                placeholder="Введите сумму"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
              />
              <p className="text-sm text-muted-foreground">
                Минимальная сумма вывода: 500 ₽
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setWithdrawAmount('1000')}
              >
                1000 ₽
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setWithdrawAmount('3000')}
              >
                3000 ₽
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setWithdrawAmount(balance.available.toString())}
              >
                Все
              </Button>
            </div>
            <Button className="w-full" size="lg">
              <Icon name="Send" size={20} className="mr-2" />
              Вывести средства
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="History" size={20} />
              История операций
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      transaction.type === 'income'
                        ? 'bg-green-100 text-green-600'
                        : 'bg-orange-100 text-orange-600'
                    }`}
                  >
                    <Icon
                      name={transaction.type === 'income' ? 'ArrowDownLeft' : 'ArrowUpRight'}
                      size={20}
                    />
                  </div>
                  <div>
                    <p className="font-medium">{transaction.description}</p>
                    <p className="text-sm text-muted-foreground">{transaction.date}</p>
                  </div>
                </div>
                <p
                  className={`font-bold ${
                    transaction.type === 'income' ? 'text-green-600' : 'text-orange-600'
                  }`}
                >
                  {transaction.type === 'income' ? '+' : '-'}
                  {transaction.amount.toLocaleString()} ₽
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Wallet;
