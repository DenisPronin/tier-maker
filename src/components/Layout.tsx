import { AppShell, Text } from '@mantine/core'
import { type ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <AppShell padding="md" header={{ height: 60 }}>
      <AppShell.Header>
        <Text size="lg">Tier Maker</Text>
      </AppShell.Header>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  )
}
