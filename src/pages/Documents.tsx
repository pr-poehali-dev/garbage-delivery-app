import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const Documents = () => {
  const navigate = useNavigate();

  const documents = [
    {
      id: 1,
      name: 'Паспорт',
      status: 'verified',
      date: '15 сентября 2024',
      icon: 'IdCard',
    },
    {
      id: 2,
      name: 'Водительское удостоверение',
      status: 'verified',
      date: '15 сентября 2024',
      icon: 'Car',
    },
    {
      id: 3,
      name: 'ИНН',
      status: 'pending',
      date: '1 декабря 2024',
      icon: 'FileText',
    },
    {
      id: 4,
      name: 'Медицинская справка',
      status: 'rejected',
      date: '20 ноября 2024',
      icon: 'Heart',
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return <Badge className="bg-green-500 text-white">Подтверждено</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500 text-white">На проверке</Badge>;
      case 'rejected':
        return <Badge className="bg-red-500 text-white">Отклонено</Badge>;
      default:
        return <Badge variant="secondary">Не загружено</Badge>;
    }
  };

  return (
    <Layout>
      <div className="max-w-lg mx-auto p-4 space-y-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate('/profile')}>
            <Icon name="ArrowLeft" size={24} />
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold">Документы</h1>
            <p className="text-muted-foreground">Управление документами</p>
          </div>
        </div>

        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <Icon name="Info" size={20} className="text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-blue-900 mb-1">Требования к документам</p>
                <p className="text-sm text-blue-700">
                  Все документы должны быть в формате JPG или PDF, размером не более 5 МБ. 
                  Информация должна быть чёткой и читаемой.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-3">
          {documents.map((doc) => (
            <Card key={doc.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon name={doc.icon} size={24} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold mb-1">{doc.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Загружено: {doc.date}
                      </p>
                    </div>
                  </div>
                  {getStatusBadge(doc.status)}
                </div>
                <div className="flex gap-2">
                  {doc.status === 'rejected' && (
                    <Button variant="outline" size="sm" className="flex-1">
                      <Icon name="Upload" size={16} className="mr-2" />
                      Загрузить заново
                    </Button>
                  )}
                  <Button variant="outline" size="sm" className="flex-1">
                    <Icon name="Eye" size={16} className="mr-2" />
                    Просмотр
                  </Button>
                  {doc.status === 'verified' && (
                    <Button variant="outline" size="sm" className="flex-1">
                      <Icon name="Download" size={16} className="mr-2" />
                      Скачать
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Button className="w-full" size="lg">
          <Icon name="Plus" size={20} className="mr-2" />
          Добавить документ
        </Button>
      </div>
    </Layout>
  );
};

export default Documents;
