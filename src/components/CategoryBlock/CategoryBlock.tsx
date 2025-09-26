import { Box, Flex, Paper } from '@mantine/core'
import { useDroppable } from '@dnd-kit/core'
import { CandidateCard } from '../CandidateCard'
import { useTierMaker } from '../../contexts/TierMakerContext'
import { type Category } from '../../types'

interface CategoryBlockProps {
  category: Category
}

export function CategoryBlock({ category }: CategoryBlockProps) {
  const { getCandidatesInCategory } = useTierMaker()
  const candidatesInCategory = getCandidatesInCategory(category.id)
  const { setNodeRef, isOver } = useDroppable({
    id: category.id.toString(),
  })

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
          ref={setNodeRef}
          style={{
            flex: 1,
            minHeight: '100px',
            padding: '16px',
            backgroundColor: isOver ? 'var(--mantine-color-dark-6)' : 'var(--mantine-color-dark-7)',
            border: candidatesInCategory.length === 0 ? '2px dashed var(--mantine-color-dark-4)' : 'none',
            transition: 'background-color 0.2s ease',
          }}
        >
          <Flex wrap="wrap" gap="8px">
            {candidatesInCategory.map((candidate) => (
              <CandidateCard
                key={candidate.id}
                candidate={candidate}
                size="small"
              />
            ))}
          </Flex>
        </Box>
      </Flex>
    </Paper>
  )
}