import { Layout } from './components/Layout'
import { CategoriesList } from './components/CategoriesList'
import { CandidatesList } from './components/CandidatesList'
import { TierMakerProvider } from './contexts/TierMakerContext'

function App() {
  return (
    <TierMakerProvider>
      <Layout>
        <CategoriesList />
        <CandidatesList />
      </Layout>
    </TierMakerProvider>
  )
}

export default App
