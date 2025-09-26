import { AppShell, Box, Flex, Image, Text } from '@mantine/core'
import { type ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  const leftImages = [
    '/dance.gif',
    '/naruto.gif',
    '/death.gif',
    '/kawai.gif',
    '/Girl.gif',
    '/cowboy-smoke.gif',
    '/Bleach.gif',
    '/studio.gif',
  ]
  const rightImages = [
    '/vampire.gif',
    '/ears.gif',
    '/One.gif',
    '/pokemon.gif',
    'jojo.gif',
    'vampire2.gif',
    'naruto2.gif',
    'goodbye.gif',
  ]

  const renderImages = (images: string[]) =>
    images.map((src) => (
      <Image
        key={src}
        src={src}
        width={60}
        height={60}
        fit="contain"
        style={{ width: 'auto' }}
      />
    ))

  return (
    <AppShell>
      <AppShell.Main>
        <Flex
          justify="center"
          align="center"
          gap="sm"
          h="80px"
          style={{ overflow: 'hidden' }}
          mb="md"
        >
          <Flex gap="sm" style={{ overflow: 'hidden', flexShrink: 1 }}>
            {renderImages(leftImages)}
          </Flex>

          <Text
            size="xl"
            className="pokemon-font"
            style={{
              fontSize: '3rem',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
          >
            Anime Tier
          </Text>

          <Flex gap="sm" style={{ overflow: 'hidden', flexShrink: 1 }}>
            {renderImages(rightImages)}
          </Flex>
        </Flex>

        <Box p="md">{children}</Box>
      </AppShell.Main>
    </AppShell>
  )
}
