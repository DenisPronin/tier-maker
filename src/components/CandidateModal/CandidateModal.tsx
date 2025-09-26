import {
  ActionIcon,
  Box,
  Button,
  type ComboboxItem,
  Flex,
  FocusTrap,
  Group,
  Image,
  Modal,
  Select,
  Stack,
  Text,
} from '@mantine/core'
import { useEffect, useMemo, useState } from 'react'
import { IconPlay } from '../../assets/IconPlay'
import { categories } from '../../data/categories'
import { useTierMaker } from '../../contexts/TierMakerContext'
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
  const { placeCandidate, placements } = useTierMaker()

  // Get current candidate category or null
  const currentCategoryId = placements[candidate.id]
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    currentCategoryId ? currentCategoryId.toString() : null
  )

  // Update selected category when candidate changes
  useEffect(() => {
    const categoryId = placements[candidate.id]
    setSelectedCategory(categoryId ? categoryId.toString() : null)
  }, [candidate.id, placements])

  const formattedComment = useMemo(
    () => formatComment(candidate.comment),
    [candidate.comment]
  )

  const categoryOptions = categories.map((category) => ({
    value: category.id.toString(),
    label: category.name,
    color: category.color,
  }))

  const renderOption = ({ option }: { option: ComboboxItem }) => {
    const category = categories.find(
      (cat) => cat.id.toString() === option.value
    )
    return (
      <Group gap="xs">
        <Box
          style={{
            width: 12,
            height: 12,
            backgroundColor: category?.color,
            borderRadius: 2,
          }}
        />
        <Text>{option.label}</Text>
      </Group>
    )
  }

  const handlePlayClick = () => {
    window.open(candidate.videoUrl, '_blank')
  }

  const handleConfirm = () => {
    if (selectedCategory) {
      placeCandidate(candidate.id, parseInt(selectedCategory))
      onClose()
    }
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
            size="lg"
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
        <Box style={{ flex: 1 }}>
          <Select
            label="Select Category"
            placeholder="Choose a category"
            data={categoryOptions}
            value={selectedCategory}
            onChange={setSelectedCategory}
            renderOption={renderOption}
            styles={{
              label: {
                marginBottom: '8px'
              }
            }}
            leftSection={
              selectedCategory ? (
                <Box
                  style={{
                    width: 12,
                    height: 12,
                    backgroundColor: categories.find(
                      (cat) => cat.id.toString() === selectedCategory
                    )?.color,
                    borderRadius: 2,
                  }}
                />
              ) : null
            }
          />
        </Box>
      </Flex>

      <Group justify="flex-end" mt="md">
        <Button
          variant="filled"
          color="blue"
          disabled={!selectedCategory}
          onClick={handleConfirm}
        >
          Confirm
        </Button>
      </Group>
    </Modal>
  )
}
