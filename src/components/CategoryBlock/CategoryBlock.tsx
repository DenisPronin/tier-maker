import { Box, Flex, Paper } from '@mantine/core'
import { type Category } from '../../types'

interface CategoryBlockProps {
  category: Category
}

export function CategoryBlock({ category }: CategoryBlockProps) {
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
            border: '2px dashed var(--mantine-color-dark-4)',
          }}
        >
          {/* Empty container for items */}
        </Box>
      </Flex>
    </Paper>
  )
}