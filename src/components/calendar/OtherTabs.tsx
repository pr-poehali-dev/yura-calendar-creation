import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Event, categoryColors, categoryLabels } from './types';

interface EventsListTabProps {
  events: Event[];
}

export const EventsListTab = ({ events }: EventsListTabProps) => {
  return (
    <div className="animate-fade-in">
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
    </div>
  );
};

export const PlanningTab = () => {
  return (
    <div className="animate-fade-in">
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
    </div>
  );
};

interface RemindersTabProps {
  events: Event[];
}

export const RemindersTab = ({ events }: RemindersTabProps) => {
  return (
    <div className="animate-fade-in">
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
    </div>
  );
};

export const SettingsTab = () => {
  return (
    <div className="animate-fade-in">
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
    </div>
  );
};
