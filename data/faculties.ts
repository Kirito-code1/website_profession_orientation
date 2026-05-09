import { Code2, Palette, FlaskConical, ChartColumn } from 'lucide-react';

export const faculties = [
  {
    slug: 'it',
    title: 'Факультет Информационных Технологий',
    description:
      'Подготовка специалистов в области программной инженерии, искусственного интеллекта и кибербезопасности.',
    category: 'IT',
    programs: 12,
    universities: 15,
    students: '24k+',
    salary: '$1800+',
    icon: Code2,
  },
  {
    slug: 'management',
    title: 'Высшая Школа Менеджмента',
    description:
      'Формирование управленческих навыков и стратегического мышления.',
    category: 'Management',
    programs: 8,
    universities: 24,
    students: '12k+',
    salary: '$1400+',
    icon: ChartColumn,
  },
  {
    slug: 'design',
    title: 'Факультет Дизайна и Медиа',
    description:
      'UI/UX, графика, motion design и визуальные коммуникации.',
    category: 'Design',
    programs: 5,
    universities: 9,
    students: '8k+',
    salary: '$1200+',
    icon: Palette,
  },
  {
    slug: 'biotech',
    title: 'Биотехнологии и Биоинженерия',
    description:
      'Исследования в области генетики и молекулярной биологии.',
    category: 'Science',
    programs: 4,
    universities: 6,
    students: '5k+',
    salary: '$1600+',
    icon: FlaskConical,
  },
];