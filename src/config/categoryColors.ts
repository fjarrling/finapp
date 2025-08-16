export const CATEGORY_COLORS = [
  'bg-red-500',
  'bg-blue-500',
  'bg-green-500',
  'bg-yellow-500',
  'bg-purple-500',
  'bg-pink-500',
  'bg-indigo-500',
  'bg-orange-500',
  'bg-teal-500',
  'bg-cyan-500',
  'bg-emerald-500',
  'bg-lime-500',
  'bg-amber-500',
  'bg-rose-500',
  'bg-violet-500',
  'bg-sky-500',
] as const

export const COLOR_LABELS: Record<CategoryColor, string> = {
  'bg-red-500': 'Red',
  'bg-blue-500': 'Blue',
  'bg-green-500': 'Green',
  'bg-yellow-500': 'Yellow',
  'bg-purple-500': 'Purple',
  'bg-pink-500': 'Pink',
  'bg-indigo-500': 'Indigo',
  'bg-orange-500': 'Orange',
  'bg-teal-500': 'Teal',
  'bg-cyan-500': 'Cyan',
  'bg-emerald-500': 'Emerald',
  'bg-lime-500': 'Lime',
  'bg-amber-500': 'Amber',
  'bg-rose-500': 'Rose',
  'bg-violet-500': 'Violet',
  'bg-sky-500': 'Sky',
}

export const getColorLabel = (color: CategoryColor): string => {
  return COLOR_LABELS[color] || color
}

export type CategoryColor = typeof CATEGORY_COLORS[number]