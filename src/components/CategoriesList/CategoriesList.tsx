import { Stack } from '@mantine/core'
import { CategoryBlock } from '../CategoryBlock'
import { categories } from '../../data/categories'

export function CategoriesList() {
  return (
    <Stack gap="md">
      {categories.map((category) => (
        <CategoryBlock key={category.id} category={category} />
      ))}
    </Stack>
  )
}