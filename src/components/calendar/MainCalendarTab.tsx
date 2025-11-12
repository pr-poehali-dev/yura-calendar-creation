import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';
import { Event, categoryColors, categoryLabels } from './types';

interface MainCalendarTabProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  selectedDateEvents: Event[];
  events: Event[];
}

export const MainCalendarTab = ({ date, setDate, selectedDateEvents, events }: MainCalendarTabProps) => {
  return (
    <div className="space-y-6 animate-fade-in">
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
    </div>
  );
};
