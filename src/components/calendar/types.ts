export interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  time: string;
  category: 'purple' | 'orange' | 'blue' | 'pink' | 'green';
  reminder: boolean;
}

export const categoryColors = {
  purple: 'bg-event-purple',
  orange: 'bg-event-orange',
  blue: 'bg-event-blue',
  pink: 'bg-event-pink',
  green: 'bg-event-green'
};

export const categoryLabels = {
  purple: 'Работа',
  orange: 'Важное',
  blue: 'Личное',
  pink: 'Встречи',
  green: 'Спорт'
};
