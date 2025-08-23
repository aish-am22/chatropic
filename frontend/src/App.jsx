
import { SignedIn, SignedOut } from '@clerk/clerk-react'
import { SignInButton, UserButton } from '@clerk/clerk-react'
const App = () => {
  return (
    <header>
      <SignedOut>
        <SignInButton mode="modal"/>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>

  )
}

export default App