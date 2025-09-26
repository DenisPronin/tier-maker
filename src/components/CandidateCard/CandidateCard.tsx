import { ActionIcon, Box, Group, Image, Paper, Text } from '@mantine/core'
import { useMemo, useState } from 'react'
import { IconList } from '../../assets/IconList.tsx'
import { IconPlay } from '../../assets/IconPlay.tsx'
import { type Candidate } from '../../types'

interface CandidateCardProps {
  candidate: Candidate
}

export function CandidateCard({ candidate }: CandidateCardProps) {
  const [isHovered, setIsHovered] = useState(false)

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
        position: 'relative',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.05)'
        setIsHovered(true)
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)'
        setIsHovered(false)
      }}
    >
      <Box style={{ position: 'relative' }}>
        <Image
          src={candidate.previewUrl}
          alt={candidate.name}
          width={120}
          height={160}
          fit="cover"
          radius="md"
          fallbackSrc="https://via.placeholder.com/120x160?text=No+Image"
        />
        {isHovered && (
          <Group
            gap="xs"
            style={{
              position: 'absolute',
              top: '8px',
              left: '8px',
            }}
          >
            <ActionIcon
              size="md"
              variant="filled"
              color="dark"
              style={{ opacity: 0.8 }}
            >
              <IconPlay />
            </ActionIcon>
            <ActionIcon
              size="md"
              variant="filled"
              color="dark"
              style={{ opacity: 0.8 }}
            >
              <IconList />
            </ActionIcon>
          </Group>
        )}
      </Box>
      <Box p="xs">
        <Text size="xs" truncate title={candidate.name}>
          {candidate.name}
        </Text>
        <Text size="xs" c="dimmed">
          {formattedComment}, {candidate.year}
        </Text>
      </Box>
    </Paper>
  )
}
