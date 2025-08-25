
import { SignedIn, SignedOut } from '@clerk/clerk-react'
import { SignInButton, UserButton } from '@clerk/clerk-react'
import { Routes, Route } from 'react-router'
import HomePage from './pages/HomePage'
import AuthPage from './pages/AuthPage'
import { Navigate } from 'react-router'
const App = () => {
  return (
    <>
      <SignedIn>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/auth" element={<Navigate to={"/"} replace />} />
        </Routes>
       </SignedIn>

       <SignedOut>
        <Routes>
            <Route path="/auth" element={<AuthPage />} />
            <Route path="*" element={<Navigate to={"/auth"} replace />} />
        </Routes>
       </SignedOut>
    </>

  )
}

export default App