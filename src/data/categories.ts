import type { Category } from '../types'

export const categories: Category[] = [
  {
    id: 1,
    name: 'Ебаный шедевр',
    order: 1,
    min: 34,
    max: 40,
    color: '#22c57c',
  },
  { id: 2, name: 'Добро-добро', order: 2, min: 27, max: 33, color: '#a5cc16' },
  { id: 3, name: 'Нормуль', order: 3, min: 20, max: 26, color: '#eac408' },
  {
    id: 4,
    name: 'Сомнительно, но окей',
    order: 4,
    min: 13,
    max: 19,
    color: '#f98816',
  },
  {
    id: 5,
    name: 'Проходная хуйня',
    order: 5,
    min: 0,
    max: 12,
    color: '#ef4444',
  },
]
