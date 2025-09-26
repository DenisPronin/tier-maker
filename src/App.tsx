import { AppContent } from './components/AppContent'
import { TierMakerProvider } from './contexts/TierMakerContext'

function App() {
  return (
    <TierMakerProvider>
      <AppContent />
    </TierMakerProvider>
  )
}

export default App
