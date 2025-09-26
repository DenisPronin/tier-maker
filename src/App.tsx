import { Layout } from './components/Layout'
import { CategoriesList } from './components/CategoriesList'
import { CandidatesList } from './components/CandidatesList'

function App() {
  return (
    <Layout>
      <CategoriesList />
      <CandidatesList />
    </Layout>
  )
}

export default App
