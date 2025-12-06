import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';

const Support = () => {
  const navigate = useNavigate();
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const faqItems = [
    {
      question: 'Как принять заказ?',
      answer: 'Нажмите на карточку заказа на главной странице и затем кнопку "Принять". После этого заказ появится в разделе активных заказов.',
    },
    {
      question: 'Когда приходят выплаты?',
      answer: 'Выплаты обрабатываются ежедневно в 18:00 МСК. Средства поступают на карту в течение 1-3 рабочих дней.',
    },
    {
      question: 'Как отменить заказ?',
      answer: 'Откройте детали заказа и нажмите "Отменить заказ". Обратите внимание, что частые отмены могут повлиять на ваш рейтинг.',
    },
    {
      question: 'Что делать если клиент не отвечает?',
      answer: 'Попробуйте связаться с клиентом по телефону. Если клиент не отвечает в течение 10 минут, свяжитесь с поддержкой через чат.',
    },
    {
      question: 'Как изменить личные данные?',
      answer: 'Перейдите в раздел "Профиль" → "Настройки" и внесите необходимые изменения. Некоторые данные могут требовать повторной верификации.',
    },
  ];

  const contactMethods = [
    {
      icon: 'Phone',
      title: 'Телефон',
      value: '8 (800) 555-35-35',
      description: 'Круглосуточно, бесплатно',
    },
    {
      icon: 'Mail',
      title: 'Email',
      value: 'support@courier.app',
      description: 'Ответим в течение 24 часов',
    },
    {
      icon: 'MessageCircle',
      title: 'Telegram',
      value: '@courier_support',
      description: 'Быстрая поддержка в мессенджере',
    },
  ];

  return (
    <Layout>
      <div className="max-w-lg mx-auto p-4 space-y-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate('/profile')}>
            <Icon name="ArrowLeft" size={24} />
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold">Помощь и поддержка</h1>
            <p className="text-muted-foreground">Мы всегда готовы помочь</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {contactMethods.map((method, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
                  <Icon name={method.icon} size={24} className="text-primary" />
                </div>
                <p className="font-semibold text-sm mb-1">{method.title}</p>
                <p className="text-xs text-primary font-medium">{method.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="HelpCircle" size={20} />
              Часто задаваемые вопросы
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Send" size={20} />
              Написать в поддержку
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="subject">Тема обращения</Label>
              <Input
                id="subject"
                placeholder="Например: Проблема с выплатой"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Сообщение</Label>
              <Textarea
                id="message"
                placeholder="Опишите вашу проблему подробно..."
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <Button className="w-full" size="lg">
              <Icon name="Send" size={20} className="mr-2" />
              Отправить сообщение
            </Button>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Support;
