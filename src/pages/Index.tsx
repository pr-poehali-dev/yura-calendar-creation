import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';
import { Event } from '@/components/calendar/types';
import { AddEventDialog } from '@/components/calendar/AddEventDialog';
import { MainCalendarTab } from '@/components/calendar/MainCalendarTab';
import { EventsListTab, PlanningTab, RemindersTab, SettingsTab } from '@/components/calendar/OtherTabs';

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
            <AddEventDialog
              newEvent={newEvent}
              setNewEvent={setNewEvent}
              handleAddEvent={handleAddEvent}
            />
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

          <TabsContent value="month">
            <MainCalendarTab
              date={date}
              setDate={setDate}
              selectedDateEvents={selectedDateEvents}
              events={events}
            />
          </TabsContent>

          <TabsContent value="week">
            <EventsListTab events={events} />
          </TabsContent>

          <TabsContent value="planning">
            <PlanningTab />
          </TabsContent>

          <TabsContent value="reminders">
            <RemindersTab events={events} />
          </TabsContent>

          <TabsContent value="settings">
            <SettingsTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
