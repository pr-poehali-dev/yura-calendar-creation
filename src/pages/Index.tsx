import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  time: string;
  category: 'purple' | 'orange' | 'blue' | 'pink' | 'green';
  reminder: boolean;
}

const Index = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      title: 'Встреча с командой',
      description: 'Обсуждение нового проекта',
      date: new Date(),
      time: '10:00',
      category: 'purple',
      reminder: true
    },
    {
      id: '2',
      title: 'Презентация',
      description: 'Демонстрация результатов работы',
      date: new Date(),
      time: '14:00',
      category: 'orange',
      reminder: true
    }
  ]);
  const [selectedView, setSelectedView] = useState<'month' | 'week'>('month');
  const [newEvent, setNewEvent] = useState<Partial<Event>>({
    title: '',
    description: '',
    date: new Date(),
    time: '',
    category: 'purple',
    reminder: false
  });

  const categoryColors = {
    purple: 'bg-event-purple',
    orange: 'bg-event-orange',
    blue: 'bg-event-blue',
    pink: 'bg-event-pink',
    green: 'bg-event-green'
  };

  const categoryLabels = {
    purple: 'Работа',
    orange: 'Важное',
    blue: 'Личное',
    pink: 'Встречи',
    green: 'Спорт'
  };

  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.time) {
      toast.error('Заполните название и время события');
      return;
    }

    const event: Event = {
      id: Date.now().toString(),
      title: newEvent.title || '',
      description: newEvent.description || '',
      date: newEvent.date || new Date(),
      time: newEvent.time || '',
      category: newEvent.category || 'purple',
      reminder: newEvent.reminder || false
    };

    setEvents([...events, event]);
    setNewEvent({
      title: '',
      description: '',
      date: new Date(),
      time: '',
      category: 'purple',
      reminder: false
    });
    toast.success('Событие добавлено!');
  };

  const selectedDateEvents = events.filter(
    event => event.date.toDateString() === date?.toDateString()
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Календарь
            </h1>
            <p className="text-muted-foreground mt-2">
              Управляйте своим временем эффективно
            </p>
          </div>
          <div className="flex gap-3">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="gap-2 hover:scale-105 transition-transform" size="lg">
                  <Icon name="Plus" size={20} />
                  Добавить событие
                </Button>
              </DialogTrigger>
              <DialogContent className="animate-scale-in">
                <DialogHeader>
                  <DialogTitle>Новое событие</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div>
                    <Label>Название</Label>
                    <Input
                      value={newEvent.title}
                      onChange={e => setNewEvent({ ...newEvent, title: e.target.value })}
                      placeholder="Встреча с командой"
                    />
                  </div>
                  <div>
                    <Label>Описание</Label>
                    <Textarea
                      value={newEvent.description}
                      onChange={e => setNewEvent({ ...newEvent, description: e.target.value })}
                      placeholder="Детали события"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Время</Label>
                      <Input
                        type="time"
                        value={newEvent.time}
                        onChange={e => setNewEvent({ ...newEvent, time: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>Категория</Label>
                      <Select
                        value={newEvent.category}
                        onValueChange={(value: any) => setNewEvent({ ...newEvent, category: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(categoryLabels).map(([key, label]) => (
                            <SelectItem key={key} value={key}>
                              <div className="flex items-center gap-2">
                                <div className={`w-3 h-3 rounded-full ${categoryColors[key as keyof typeof categoryColors]}`} />
                                {label}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={newEvent.reminder}
                      onChange={e => setNewEvent({ ...newEvent, reminder: e.target.checked })}
                      className="w-4 h-4"
                    />
                    <Label>Включить напоминание</Label>
                  </div>
                  <Button onClick={handleAddEvent} className="w-full">
                    Создать событие
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Tabs value={selectedView} onValueChange={(v: any) => setSelectedView(v)} className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-5">
            <TabsTrigger value="month" className="gap-2">
              <Icon name="Calendar" size={16} />
              Главная
            </TabsTrigger>
            <TabsTrigger value="week" className="gap-2">
              <Icon name="CalendarDays" size={16} />
              События
            </TabsTrigger>
            <TabsTrigger value="planning" className="gap-2">
              <Icon name="ListChecks" size={16} />
              План
            </TabsTrigger>
            <TabsTrigger value="reminders" className="gap-2">
              <Icon name="Bell" size={16} />
              Уведомления
            </TabsTrigger>
            <TabsTrigger value="settings" className="gap-2">
              <Icon name="Settings" size={16} />
              Настройки
            </TabsTrigger>
          </TabsList>

          <TabsContent value="month" className="space-y-6 animate-fade-in">
            <div className="grid lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2 shadow-xl border-2 hover:shadow-2xl transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Calendar" size={24} className="text-primary" />
                    Календарь
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-lg border-2"
                  />
                </CardContent>
              </Card>

              <Card className="shadow-xl border-2 hover:shadow-2xl transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="CalendarCheck" size={24} className="text-secondary" />
                    События на {date?.toLocaleDateString('ru-RU')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[400px]">
                    {selectedDateEvents.length === 0 ? (
                      <div className="text-center text-muted-foreground py-8">
                        <Icon name="Calendar" size={48} className="mx-auto mb-2 opacity-50" />
                        <p>Нет событий на эту дату</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {selectedDateEvents.map(event => (
                          <Card key={event.id} className="border-l-4 hover:scale-105 transition-transform cursor-pointer" style={{ borderLeftColor: `hsl(var(--event-${event.category}))` }}>
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between gap-2">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <Badge className={categoryColors[event.category]}>
                                      {categoryLabels[event.category]}
                                    </Badge>
                                    {event.reminder && (
                                      <Icon name="Bell" size={14} className="text-accent" />
                                    )}
                                  </div>
                                  <h4 className="font-semibold">{event.title}</h4>
                                  <p className="text-sm text-muted-foreground">{event.description}</p>
                                  <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                                    <Icon name="Clock" size={14} />
                                    {event.time}
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>

            <Card className="shadow-xl border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Tags" size={24} className="text-accent" />
                  Категории
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {Object.entries(categoryLabels).map(([key, label]) => {
                    const count = events.filter(e => e.category === key).length;
                    return (
                      <Card key={key} className="hover:scale-105 transition-transform cursor-pointer">
                        <CardContent className="p-4 text-center">
                          <div className={`w-12 h-12 rounded-full ${categoryColors[key as keyof typeof categoryColors]} mx-auto mb-2`} />
                          <p className="font-semibold">{label}</p>
                          <p className="text-sm text-muted-foreground">{count} событий</p>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="week" className="animate-fade-in">
            <Card className="shadow-xl border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="List" size={24} className="text-primary" />
                  Все события
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px]">
                  <div className="space-y-3">
                    {events.map(event => (
                      <Card key={event.id} className="border-l-4 hover:scale-105 transition-transform cursor-pointer" style={{ borderLeftColor: `hsl(var(--event-${event.category}))` }}>
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <Badge className={categoryColors[event.category]}>
                                  {categoryLabels[event.category]}
                                </Badge>
                                {event.reminder && (
                                  <Icon name="Bell" size={14} className="text-accent" />
                                )}
                              </div>
                              <h4 className="font-semibold text-lg">{event.title}</h4>
                              <p className="text-sm text-muted-foreground">{event.description}</p>
                              <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Icon name="Calendar" size={14} />
                                  {event.date.toLocaleDateString('ru-RU')}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Icon name="Clock" size={14} />
                                  {event.time}
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="planning" className="animate-fade-in">
            <Card className="shadow-xl border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="ListChecks" size={24} className="text-secondary" />
                  Планирование
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-6 bg-muted rounded-lg text-center">
                    <Icon name="CalendarPlus" size={48} className="mx-auto mb-3 text-primary" />
                    <h3 className="font-semibold text-lg mb-2">Планируйте свои дела</h3>
                    <p className="text-muted-foreground">
                      Создавайте события, задачи и напоминания для эффективной организации времени
                    </p>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <Card className="hover:scale-105 transition-transform">
                      <CardContent className="p-6 text-center">
                        <Icon name="Target" size={32} className="mx-auto mb-2 text-primary" />
                        <h4 className="font-semibold mb-1">Цели</h4>
                        <p className="text-sm text-muted-foreground">Ставьте и достигайте целей</p>
                      </CardContent>
                    </Card>
                    <Card className="hover:scale-105 transition-transform">
                      <CardContent className="p-6 text-center">
                        <Icon name="CheckSquare" size={32} className="mx-auto mb-2 text-secondary" />
                        <h4 className="font-semibold mb-1">Задачи</h4>
                        <p className="text-sm text-muted-foreground">Управляйте списком дел</p>
                      </CardContent>
                    </Card>
                    <Card className="hover:scale-105 transition-transform">
                      <CardContent className="p-6 text-center">
                        <Icon name="TrendingUp" size={32} className="mx-auto mb-2 text-accent" />
                        <h4 className="font-semibold mb-1">Прогресс</h4>
                        <p className="text-sm text-muted-foreground">Отслеживайте достижения</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reminders" className="animate-fade-in">
            <Card className="shadow-xl border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Bell" size={24} className="text-accent" />
                  Напоминания
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px]">
                  <div className="space-y-3">
                    {events.filter(e => e.reminder).map(event => (
                      <Card key={event.id} className="border-l-4 border-l-accent hover:scale-105 transition-transform">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <div className="p-2 bg-accent/10 rounded-lg">
                              <Icon name="Bell" size={20} className="text-accent" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold">{event.title}</h4>
                              <p className="text-sm text-muted-foreground">{event.description}</p>
                              <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Icon name="Calendar" size={14} />
                                  {event.date.toLocaleDateString('ru-RU')}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Icon name="Clock" size={14} />
                                  {event.time}
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="animate-fade-in">
            <Card className="shadow-xl border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Settings" size={24} className="text-primary" />
                  Настройки
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <Icon name="Cloud" size={20} className="text-accent" />
                      Синхронизация
                    </h3>
                    <Card className="border-2 border-dashed hover:border-solid transition-all cursor-pointer hover:scale-105">
                      <CardContent className="p-6 text-center">
                        <Icon name="RefreshCw" size={48} className="mx-auto mb-3 text-primary" />
                        <h4 className="font-semibold text-lg mb-2">Google Calendar</h4>
                        <p className="text-sm text-muted-foreground mb-4">
                          Синхронизируйте события с Google Calendar и другими сервисами
                        </p>
                        <Button className="gap-2">
                          <Icon name="Link" size={16} />
                          Подключить синхронизацию
                        </Button>
                      </CardContent>
                    </Card>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <Icon name="Palette" size={20} className="text-secondary" />
                      Внешний вид
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <Card className="hover:scale-105 transition-transform cursor-pointer">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3">
                            <Icon name="Sun" size={24} className="text-secondary" />
                            <div>
                              <p className="font-semibold">Светлая тема</p>
                              <p className="text-sm text-muted-foreground">Активна</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      <Card className="hover:scale-105 transition-transform cursor-pointer opacity-50">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3">
                            <Icon name="Moon" size={24} />
                            <div>
                              <p className="font-semibold">Тёмная тема</p>
                              <p className="text-sm text-muted-foreground">Скоро</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <Icon name="Bell" size={20} className="text-accent" />
                      Уведомления
                    </h3>
                    <div className="space-y-3">
                      <Card>
                        <CardContent className="p-4 flex items-center justify-between">
                          <div>
                            <p className="font-semibold">Напоминания по email</p>
                            <p className="text-sm text-muted-foreground">Получать уведомления на почту</p>
                          </div>
                          <input type="checkbox" defaultChecked className="w-5 h-5" />
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4 flex items-center justify-between">
                          <div>
                            <p className="font-semibold">Push-уведомления</p>
                            <p className="text-sm text-muted-foreground">Уведомления в браузере</p>
                          </div>
                          <input type="checkbox" defaultChecked className="w-5 h-5" />
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
