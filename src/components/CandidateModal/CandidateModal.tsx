import { ActionIcon, Box, Flex, FocusTrap, Image, Modal, Stack, Text } from '@mantine/core'
import { useMemo } from 'react'
import { IconPlay } from '../../assets/IconPlay'
import { type Candidate } from '../../types'
import { formatComment } from '../../utils/formatComment'

interface CandidateModalProps {
  candidate: Candidate
  opened: boolean
  onClose: () => void
}

export function CandidateModal({
  candidate,
  opened,
  onClose,
}: CandidateModalProps) {
  const formattedComment = useMemo(
    () => formatComment(candidate.comment),
    [candidate.comment]
  )

  const handlePlayClick = () => {
    window.open(candidate.videoUrl, '_blank')
  }

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        <Stack gap={0}>
          <Text>{candidate.name}</Text>
          <Text size="xs" c="dimmed">
            {formattedComment}, {candidate.year}
          </Text>
        </Stack>
      }
      centered
      size="700px"
    >
      <FocusTrap.InitialFocus />
      <Flex gap="md">
        <Box style={{ flexShrink: 0, position: 'relative' }}>
          <Image
            src={candidate.previewUrl}
            alt={candidate.name}
            width={120}
            fit="cover"
            radius="md"
            fallbackSrc="https://via.placeholder.com/120x160?text=No+Image"
          />
          <ActionIcon
            size="md"
            variant="filled"
            color="dark"
            style={{
              position: 'absolute',
              top: '8px',
              left: '8px',
              opacity: 0.8,
            }}
            onClick={handlePlayClick}
          >
            <IconPlay />
          </ActionIcon>
        </Box>
        <Box>test</Box>
      </Flex>
    </Modal>
  )
}
