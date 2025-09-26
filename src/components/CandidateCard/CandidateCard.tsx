import { Box, Image, Paper, Text } from '@mantine/core'
import { useMemo } from 'react'
import { type Candidate } from '../../types'

interface CandidateCardProps {
  candidate: Candidate
}

export function CandidateCard({ candidate }: CandidateCardProps) {
  const formattedComment = useMemo(
    () => candidate.comment.replace(/Opening/gi, 'OP'),
    [candidate.comment]
  )

  return (
    <Paper
      shadow="sm"
      radius="md"
      withBorder
      style={{
        width: '120px',
        cursor: 'pointer',
        transition: 'transform 0.2s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.05)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)'
      }}
    >
      <Image
        src={candidate.previewUrl}
        alt={candidate.name}
        width={120}
        height={160}
        fit="cover"
        radius="md"
        fallbackSrc="https://via.placeholder.com/120x160?text=No+Image"
      />
      <Box p="xs">
        <Text size="xs" truncate title={candidate.name}>
          {candidate.name}
        </Text>
        <Text size="xs" c="dimmed">
          {candidate.id}, {formattedComment}, {candidate.year}
        </Text>
      </Box>
    </Paper>
  )
}
