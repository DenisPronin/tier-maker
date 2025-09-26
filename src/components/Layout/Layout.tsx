import { AppShell, Flex, Text } from '@mantine/core'
import { type ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <AppShell padding="md" header={{ height: 80 }}>
      <AppShell.Header>
        <Flex justify="center" align="center" h="80px">
          <Text size="xl" className="pokemon-font" style={{ fontSize: '3rem' }}>
            Anime Tier
          </Text>
        </Flex>
      </AppShell.Header>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  )
}
