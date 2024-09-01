import { emailLogin, signup } from './actions'
import { GitHubButton } from './github-signin'

export default function LoginPage() {
  return (
    <div>


      <form>
        <label htmlFor="email">Email:</label>
        <input id="email" name="email" type="email" required />
        <label htmlFor="password">Password:</label>
        <input id="password" name="password" type="password" required />
        <button formAction={emailLogin}>Log in</button>
        <button formAction={signup}>Sign up</button>
      </form>
      <GitHubButton/>
    </div>
  )
}