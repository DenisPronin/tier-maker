import { Box, Flex, Paper } from '@mantine/core'
import { CandidateCard } from '../CandidateCard'
import { useTierMaker } from '../../contexts/TierMakerContext'
import { type Category } from '../../types'

interface CategoryBlockProps {
  category: Category
}

export function CategoryBlock({ category }: CategoryBlockProps) {
  const { getCandidatesInCategory } = useTierMaker()
  const candidatesInCategory = getCandidatesInCategory(category.id)

  return (
    <Paper shadow="sm" radius="md" withBorder style={{ overflow: 'hidden' }}>
      <Flex>
        <Box
          style={{
            width: '120px',
            backgroundColor: category.color,
            padding: '12px 16px',
            fontWeight: 'bold',
            color: 'white',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {category.name}
        </Box>
        <Box
          style={{
            flex: 1,
            minHeight: '100px',
            padding: '16px',
            backgroundColor: 'var(--mantine-color-dark-7)',
            border: candidatesInCategory.length === 0 ? '2px dashed var(--mantine-color-dark-4)' : 'none',
          }}
        >
          <Flex wrap="wrap" gap="8px">
            {candidatesInCategory.map((candidate) => (
              <CandidateCard
                key={candidate.id}
                candidate={candidate}
              />
            ))}
          </Flex>
        </Box>
      </Flex>
    </Paper>
  )
}