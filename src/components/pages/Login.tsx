import React, { useReducer, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AuthData } from "../../auth/AuthWrapper"

// Define the type for your form data
type FormData = {
  userName: string
  password: string
}

const Login: React.FC = () => {
  const navigate = useNavigate()
  const { login } = AuthData() as {
    login: (username: string, password: string) => Promise<string>
  }

  // Define the initial state for your form data
  const initialFormData: FormData = { userName: "", password: "" }

  // Define the reducer function
  const [formData, setFormData] = useReducer(
    (formData: FormData, newItem: Partial<FormData>) => {
      return { ...formData, ...newItem }
    },
    initialFormData
  )

  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const doLogin = async () => {
    try {
      await login(formData.userName, formData.password)
      navigate("/account")
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : String(error))
    }
  }

  return (
    <div className="page">
      <h2>Login page</h2>
      <div className="inputs">
        <div className="input">
          <input
            value={formData.userName}
            onChange={(e) => setFormData({ userName: e.target.value })}
            type="text"
          />
        </div>
        <div className="input">
          <input
            value={formData.password}
            onChange={(e) => setFormData({ password: e.target.value })}
            type="password"
          />
        </div>
        <div className="button">
          <button onClick={doLogin}>Log in</button>
        </div>
        {errorMessage ? <div className="error">{errorMessage}</div> : null}
      </div>
    </div>
  )
}

export default Login
