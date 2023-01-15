import {lazy, Suspense, useState} from 'react'

const Header = lazy(() => import('@mf/header/Component'))
const Data = lazy(() => import('@mf/data/Component'))

function App() {
  const [showData, setShowData] = useState(false)

  const handleShowData = () => {
    setShowData(true)
  }

  return (
    <main>
      <Suspense fallback="Loading header…">
        <Header />
      </Suspense>
      <br />
      <button onClick={handleShowData}>Show me data...</button>
      {showData && (
        <Suspense fallback="Loading header…">
          <Data />
        </Suspense>
      )}
    </main>
  )
}

export default App
