import { ActionIcon, Box, Group, Image, Paper, Text } from '@mantine/core'
import { useDraggable } from '@dnd-kit/core'
import { type MouseEvent, useMemo, useState } from 'react'
import { IconPlay } from '../../assets/IconPlay.tsx'
import { useTierMaker } from '../../contexts/TierMakerContext'
import { type Candidate } from '../../types'
import { formatComment } from '../../utils/formatComment'

interface CandidateCardProps {
  candidate: Candidate
}

export function CandidateCard({ candidate }: CandidateCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const { openModal } = useTierMaker()
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: candidate.id.toString(),
  })

  const formattedComment = useMemo(
    () => formatComment(candidate.comment),
    [candidate.comment]
  )

  const handlePlayClick = (e: MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    window.open(candidate.videoUrl, '_blank')
  }

  const handleCardClick = (e: MouseEvent) => {
    // Only open modal if not dragging and not clicking on buttons
    if (!isDragging && !(e.target as HTMLElement).closest('button')) {
      openModal(candidate)
    }
  }

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined

  return (
    <Paper
      ref={setNodeRef}
      shadow="sm"
      radius="md"
      withBorder
      style={{
        width: '120px',
        cursor: isDragging ? 'grabbing' : 'pointer',
        transition: isDragging ? 'none' : 'transform 0.2s ease',
        position: 'relative',
        opacity: isDragging ? 0 : 1,
        ...style,
      }}
      onMouseEnter={(e) => {
        if (!isDragging) {
          e.currentTarget.style.transform = 'scale(1.05)'
          setIsHovered(true)
        }
      }}
      onMouseLeave={(e) => {
        if (!isDragging) {
          e.currentTarget.style.transform = 'scale(1)'
          setIsHovered(false)
        }
      }}
      onClick={handleCardClick}
    >
      <Box style={{ position: 'relative' }}>
        <Image
          {...listeners}
          {...attributes}
          src={candidate.previewUrl}
          alt={candidate.name}
          width={120}
          height={160}
          fit="cover"
          radius="md"
          fallbackSrc="https://via.placeholder.com/120x160?text=No+Image"
          style={{
            cursor: isDragging ? 'grabbing' : 'grab',
          }}
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
              style={{
                opacity: 0.8,
                pointerEvents: 'auto',
                zIndex: 10,
              }}
              onClick={handlePlayClick}
            >
              <IconPlay />
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
