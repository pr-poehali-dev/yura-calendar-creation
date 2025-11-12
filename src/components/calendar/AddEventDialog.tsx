import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { Event, categoryColors, categoryLabels } from './types';

interface AddEventDialogProps {
  newEvent: Partial<Event>;
  setNewEvent: (event: Partial<Event>) => void;
  handleAddEvent: () => void;
}

export const AddEventDialog = ({ newEvent, setNewEvent, handleAddEvent }: AddEventDialogProps) => {
  return (
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
  );
};
