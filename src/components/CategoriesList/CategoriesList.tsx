import { Stack } from '@mantine/core'
import { CategoryBlock } from '../CategoryBlock'
import { useTierMaker } from '../../contexts/TierMakerContext'

export function CategoriesList() {
  const { categories } = useTierMaker()

  return (
    <Stack gap="md">
      {categories.map((category) => (
        <CategoryBlock key={category.id} category={category} />
      ))}
    </Stack>
  )
}