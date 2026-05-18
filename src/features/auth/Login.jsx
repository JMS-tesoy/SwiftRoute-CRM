import { useEffect, useState } from 'react'
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Lock,
  Mail,
  Map,
  PackageCheck,
  ShieldCheck,
  Truck,
  Zap,
} from 'lucide-react'
import {
  validateEmail,
  validateMerchantName,
  validateName,
  validatePassword,
  validatePasswordConfirmation,
} from '../../domain/authValidation'
import {
  createPasswordResetCode,
  loginWithEmailPassword,
  registerMerchantAccount,
  resetPassword,
} from '../../services/supabaseAuthService'
import { C, FONTS } from '../../styles/theme'

function Field({
  label,
  icon,
  type = 'text',
  value,
  onChange,
  placeholder,
  autoComplete,
}) {
  const Icon = icon

  return (
    <div style={{ marginBottom: 14 }}>
      <label
        style={{
          display: 'block',
          color: C.muted,
          fontSize: 11,
          fontWeight: 800,
          marginBottom: 7,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
        }}
      >
        {label}
      </label>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 9,
          background: C.navy,
          border: C.border ? `1px solid ${C.border}` : 'none',
          borderRadius: 10,
          padding: '11px 12px',
        }}
      >
        {Icon && <Icon size={15} color={C.muted} />}

        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: C.text,
            fontSize: 13,
            fontFamily: 'inherit',
            minWidth: 0,
          }}
        />
      </div>
    </div>
  )
}

function MessageBox({ type = 'info', children }) {
  const isError = type === 'error'
  const isSuccess = type === 'success'

  const color = isError ? '#fecaca' : isSuccess ? '#bbf7d0' : C.muted
  const border = isError
    ? 'rgba(239, 68, 68, 0.35)'
    : isSuccess
      ? 'rgba(34, 197, 94, 0.35)'
      : C.border
  const background = isError
    ? 'rgba(239, 68, 68, 0.1)'
    : isSuccess
      ? 'rgba(34, 197, 94, 0.1)'
      : C.navy

  return (
    <div
      style={{
        background,
        border: border ? `1px solid ${border}` : 'none',
        color,
        borderRadius: 10,
        padding: '10px 12px',
        fontSize: 12,
        fontWeight: 700,
        lineHeight: 1.5,
        marginBottom: 14,
      }}
    >
      {children}
    </div>
  )
}

export default function Login({ onLogin }) {
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [registerName, setRegisterName] = useState('')
  const [registerMerchantName, setRegisterMerchantName] = useState('')
  const [registerEmail, setRegisterEmail] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('')

  const [forgotEmail, setForgotEmail] = useState('')
  const [resetEmail, setResetEmail] = useState('')
  const [resetPasswordValue, setResetPasswordValue] = useState('')
  const [resetConfirmPassword, setResetConfirmPassword] = useState('')

  useEffect(() => {
    const url = new URL(window.location.href)
    const isRecovery =
      url.hash.includes('type=recovery') || url.searchParams.get('type') === 'recovery'

    if (isRecovery) {
      setMode('reset')
      setSuccess('Create a new password to finish your account recovery.')
    }
  }, [])

  const clearMessages = () => {
    setError('')
    setSuccess('')
  }

  const switchMode = (nextMode) => {
    setMode(nextMode)
    clearMessages()
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    clearMessages()
    setIsSubmitting(true)

    const emailError = validateEmail(email)
    if (emailError) {
      setError(emailError)
      setIsSubmitting(false)
      return
    }

    if (!password) {
      setError('Password is required.')
      setIsSubmitting(false)
      return
    }

    const result = await loginWithEmailPassword(email, password)
    setIsSubmitting(false)

    if (!result.ok) {
      setError(result.error)
      return
    }

    onLogin(result.user)
  }

  const handleRegister = async (event) => {
    event.preventDefault()
    clearMessages()
    setIsSubmitting(true)

    const nameError = validateName(registerName)
    const merchantNameError = validateMerchantName(registerMerchantName)
    const emailError = validateEmail(registerEmail)
    const passwordError = validatePassword(registerPassword, registerEmail)
    const confirmError = validatePasswordConfirmation(
      registerPassword,
      registerConfirmPassword,
    )

    const firstError =
      nameError || merchantNameError || emailError || passwordError || confirmError

    if (firstError) {
      setError(firstError)
      setIsSubmitting(false)
      return
    }

    const result = await registerMerchantAccount({
      name: registerName,
      merchantName: registerMerchantName,
      email: registerEmail,
      password: registerPassword,
    })
    setIsSubmitting(false)

    if (!result.ok) {
      setError(result.error)
      return
    }

    if (result.needsEmailConfirmation) {
      setSuccess('Account created. Check your email to verify your account before signing in.')
      setMode('login')
      setEmail(registerEmail)
      setPassword('')
      return
    }

    onLogin(result.user)
  }

  const handleForgotPassword = async (event) => {
    event.preventDefault()
    clearMessages()
    setIsSubmitting(true)

    const emailError = validateEmail(forgotEmail)

    if (emailError) {
      setError(emailError)
      setIsSubmitting(false)
      return
    }

    const result = await createPasswordResetCode(forgotEmail)
    setIsSubmitting(false)

    if (!result.ok) {
      setError(result.error)
      return
    }

    setResetEmail(forgotEmail)
    setSuccess(result.message)
  }

  const handleResetPassword = async (event) => {
    event.preventDefault()
    clearMessages()
    setIsSubmitting(true)

    const passwordError = validatePassword(resetPasswordValue, resetEmail)
    const confirmError = validatePasswordConfirmation(
      resetPasswordValue,
      resetConfirmPassword,
    )

    const firstError = passwordError || confirmError

    if (firstError) {
      setError(firstError)
      setIsSubmitting(false)
      return
    }

    const result = await resetPassword({
      email: resetEmail,
      newPassword: resetPasswordValue,
    })
    setIsSubmitting(false)

    if (!result.ok) {
      setError(result.error)
      return
    }

    window.history.replaceState({}, document.title, window.location.pathname)
    setEmail(resetEmail)
    setPassword('')
    setMode('login')
    setSuccess('Password reset successful. Sign in with your new password.')
  }

  const renderLoginForm = () => (
    <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: 22 }}>
        <div style={{ color: C.text, fontSize: 24, fontWeight: 900 }}>
          Sign in
        </div>
        <div style={{ color: C.muted, fontSize: 13, marginTop: 6, lineHeight: 1.6 }}>
          Enter your registered SwiftRoute account credentials.
        </div>
      </div>

      <Field
        label="Email"
        icon={Mail}
        value={email}
        onChange={setEmail}
        autoComplete="username"
      />

      <Field
        label="Password"
        icon={Lock}
        value={password}
        onChange={setPassword}
        type="password"
        autoComplete="current-password"
      />

      {success && <MessageBox type="success">{success}</MessageBox>}
      {error && <MessageBox type="error">{error}</MessageBox>}

      <button
        type="submit"
        disabled={isSubmitting}
        style={{
          width: '100%',
          border: 'none',
          borderRadius: 12,
          padding: '12px 14px',
          background: C.accent,
          color: '#04111f',
          fontSize: 13,
          fontWeight: 900,
          cursor: 'pointer',
          fontFamily: 'inherit',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
        }}
      >
        {isSubmitting ? 'Signing In...' : 'Sign In'}
        <ArrowRight size={15} />
      </button>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: 10,
          marginTop: 14,
          flexWrap: 'wrap',
        }}
      >
        <button
          type="button"
          onClick={() => switchMode('forgot')}
          style={{
            border: 'none',
            background: 'transparent',
            color: C.accent,
            cursor: 'pointer',
            fontSize: 12,
            fontWeight: 700,
            fontFamily: 'inherit',
            padding: 0,
          }}
        >
          Forgot password?
        </button>

        <button
          type="button"
          onClick={() => switchMode('register')}
          style={{
            border: 'none',
            background: 'transparent',
            color: C.accent,
            cursor: 'pointer',
            fontSize: 12,
            fontWeight: 700,
            fontFamily: 'inherit',
            padding: 0,
          }}
        >
          Register merchant account
        </button>
      </div>
    </form>
  )

  const renderRegisterForm = () => (
    <form onSubmit={handleRegister}>
      <div style={{ marginBottom: 22 }}>
        <div style={{ color: C.text, fontSize: 24, fontWeight: 900 }}>
          Register merchant
        </div>
        <div style={{ color: C.muted, fontSize: 13, marginTop: 6, lineHeight: 1.6 }}>
          Merchant self-registration is allowed. Dispatcher and driver accounts must be
          created by the operations team.
        </div>
      </div>

      <Field
        label="Contact name"
        value={registerName}
        onChange={setRegisterName}
        placeholder="Juan Dela Cruz"
        autoComplete="name"
      />

      <Field
        label="Merchant / Company name"
        value={registerMerchantName}
        onChange={setRegisterMerchantName}
        placeholder="Example Trading Co."
        autoComplete="organization"
      />

      <Field
        label="Email"
        icon={Mail}
        value={registerEmail}
        onChange={setRegisterEmail}
        placeholder="ops@example.com"
        autoComplete="email"
      />

      <Field
        label="Password"
        icon={Lock}
        type="password"
        value={registerPassword}
        onChange={setRegisterPassword}
        autoComplete="new-password"
      />

      <Field
        label="Confirm password"
        icon={Lock}
        type="password"
        value={registerConfirmPassword}
        onChange={setRegisterConfirmPassword}
        autoComplete="new-password"
      />

      <MessageBox>
        Password rule: 10-72 characters, uppercase, lowercase, number, special
        character, no spaces, and must not contain your email username.
      </MessageBox>

      {error && <MessageBox type="error">{error}</MessageBox>}
      {success && <MessageBox type="success">{success}</MessageBox>}

      <button
        type="submit"
        disabled={isSubmitting}
        style={{
          width: '100%',
          border: 'none',
          borderRadius: 12,
          padding: '12px 14px',
          background: C.success,
          color: '#04111f',
          fontSize: 13,
          fontWeight: 900,
          cursor: 'pointer',
          fontFamily: 'inherit',
        }}
      >
        {isSubmitting ? 'Creating Account...' : 'Create Merchant Account'}
      </button>

      <button
        type="button"
        onClick={() => switchMode('login')}
        style={{
          width: '100%',
          border: C.border ? `1px solid ${C.border}` : 'none',
          borderRadius: 12,
          padding: '11px 14px',
          background: C.navy,
          color: C.text,
          fontSize: 13,
          fontWeight: 800,
          cursor: 'pointer',
          fontFamily: 'inherit',
          marginTop: 10,
        }}
      >
        Back to sign in
      </button>
    </form>
  )

  const renderForgotForm = () => (
    <form onSubmit={handleForgotPassword}>
      <div style={{ marginBottom: 22 }}>
        <div style={{ color: C.text, fontSize: 24, fontWeight: 900 }}>
          Forgot password
        </div>
        <div style={{ color: C.muted, fontSize: 13, marginTop: 6, lineHeight: 1.6 }}>
          Enter your registered email. Supabase will send a password reset link to
          your inbox.
        </div>
      </div>

      <Field
        label="Account email"
        icon={Mail}
        value={forgotEmail}
        onChange={setForgotEmail}
        placeholder="ops@example.com"
        autoComplete="email"
      />

      {error && <MessageBox type="error">{error}</MessageBox>}
      {success && <MessageBox type="success">{success}</MessageBox>}

      <button
        type="submit"
        disabled={isSubmitting}
        style={{
          width: '100%',
          border: 'none',
          borderRadius: 12,
          padding: '12px 14px',
          background: C.accent,
          color: '#04111f',
          fontSize: 13,
          fontWeight: 900,
          cursor: 'pointer',
          fontFamily: 'inherit',
        }}
      >
        {isSubmitting ? 'Sending Email...' : 'Send Reset Email'}
      </button>

      <button
        type="button"
        onClick={() => switchMode('login')}
        style={{
          width: '100%',
          border: C.border ? `1px solid ${C.border}` : 'none',
          borderRadius: 12,
          padding: '11px 14px',
          background: C.navy,
          color: C.text,
          fontSize: 13,
          fontWeight: 800,
          cursor: 'pointer',
          fontFamily: 'inherit',
          marginTop: 10,
        }}
      >
        Back to sign in
      </button>
    </form>
  )

  const renderResetForm = () => (
    <form onSubmit={handleResetPassword}>
      <div style={{ marginBottom: 22 }}>
        <div style={{ color: C.text, fontSize: 24, fontWeight: 900 }}>
          Reset password
        </div>
        <div style={{ color: C.muted, fontSize: 13, marginTop: 6, lineHeight: 1.6 }}>
          Open the password reset link from your email, then create a new strict
          password.
        </div>
      </div>

      {success && <MessageBox type="success">{success}</MessageBox>}

      <Field
        label="New password"
        icon={Lock}
        type="password"
        value={resetPasswordValue}
        onChange={setResetPasswordValue}
        autoComplete="new-password"
      />

      <Field
        label="Confirm new password"
        icon={Lock}
        type="password"
        value={resetConfirmPassword}
        onChange={setResetConfirmPassword}
        autoComplete="new-password"
      />

      {error && <MessageBox type="error">{error}</MessageBox>}

      <button
        type="submit"
        disabled={isSubmitting}
        style={{
          width: '100%',
          border: 'none',
          borderRadius: 12,
          padding: '12px 14px',
          background: C.accent,
          color: '#04111f',
          fontSize: 13,
          fontWeight: 900,
          cursor: 'pointer',
          fontFamily: 'inherit',
        }}
      >
        {isSubmitting ? 'Resetting Password...' : 'Reset Password'}
      </button>

      <button
        type="button"
        onClick={() => switchMode('login')}
        style={{
          width: '100%',
          border: C.border ? `1px solid ${C.border}` : 'none',
          borderRadius: 12,
          padding: '11px 14px',
          background: C.navy,
          color: C.text,
          fontSize: 13,
          fontWeight: 800,
          cursor: 'pointer',
          fontFamily: 'inherit',
          marginTop: 10,
        }}
      >
        Back to sign in
      </button>
    </form>
  )

  const renderCurrentForm = () => {
    if (mode === 'register') return renderRegisterForm()
    if (mode === 'forgot') return renderForgotForm()
    if (mode === 'reset') return renderResetForm()
    return renderLoginForm()
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: C.navy,
        color: C.text,
        padding: 24,
        backgroundImage: `radial-gradient(ellipse at 10% 20%, ${C.accentDim} 0%, transparent 42%), radial-gradient(ellipse at 90% 80%, rgba(96,165,250,0.07) 0%, transparent 44%)`,
      }}
    >
      <style>{FONTS}</style>

      <div
        style={{
          maxWidth: 1220,
          minHeight: 'calc(100vh - 48px)',
          margin: '0 auto',
          display: 'grid',
          gridTemplateRows: 'auto 1fr auto',
          gap: 18,
        }}
      >
        <header
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 12,
                background: C.accentDim,
                border: `1px solid ${C.accent}35`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Zap size={18} color={C.accent} />
            </div>

            <div>
              <div style={{ fontSize: 16, fontWeight: 900, letterSpacing: '-0.02em' }}>
                SwiftRoute CRM
              </div>
              <div style={{ color: C.muted, fontSize: 11 }}>
                Parcel operations management
              </div>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              background: C.panel,
              borderRadius: 999,
              padding: '7px 12px',
              color: C.muted,
              fontSize: 11,
              fontWeight: 700,
            }}
          >
            <ShieldCheck size={13} color={C.success} />
            Supabase authentication
          </div>
        </header>

        <main
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(460px, 1.15fr) minmax(360px, 440px)',
            gap: 18,
            alignItems: 'stretch',
          }}
        >
          <section
            style={{
              background: `linear-gradient(135deg, ${C.panel}, ${C.card})`,
              borderRadius: 24,
              padding: 34,
              overflow: 'hidden',
              position: 'relative',
              border: C.border ? `1px solid ${C.border}` : 'none',
            }}
          >
            <div
              style={{
                position: 'absolute',
                right: -90,
                top: -110,
                width: 260,
                height: 260,
                borderRadius: '50%',
                background: C.accentDim,
                filter: 'blur(2px)',
              }}
            />

            <div style={{ position: 'relative', zIndex: 1 }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  background: C.accentDim,
                  border: `1px solid ${C.accent}40`,
                  borderRadius: 999,
                  padding: '8px 14px',
                  marginBottom: 22,
                }}
              >
                <PackageCheck size={15} color={C.accent} />
                <span
                  style={{
                    color: C.accent,
                    fontSize: 11,
                    fontWeight: 900,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                  }}
                >
                  Logistics SaaS Dashboard
                </span>
              </div>

              <h1
                style={{
                  color: C.text,
                  fontSize: 52,
                  lineHeight: 1.02,
                  margin: 0,
                  letterSpacing: '-0.055em',
                  maxWidth: 680,
                }}
              >
                Secure role-based access for parcel operations.
              </h1>

              <p
                style={{
                  color: C.muted,
                  fontSize: 15,
                  lineHeight: 1.75,
                  margin: '20px 0 0',
                  maxWidth: 660,
                }}
              >
                Dispatchers, drivers, and merchants need separate access rules. This
                app now supports sign in, merchant registration, forgot password,
                reset password, and strict credential validation.
              </p>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                  gap: 12,
                  marginTop: 28,
                }}
              >
                {[
                  {
                    icon: BarChart3,
                    title: 'Dispatcher',
                    text: 'System-created access for operations and exception control.',
                    color: '#60A5FA',
                  },
                  {
                    icon: Truck,
                    title: 'Driver',
                    text: 'System-created access tied to assigned driver jobs.',
                    color: C.accent,
                  },
                  {
                    icon: PackageCheck,
                    title: 'Merchant',
                    text: 'Self-registration for booking, tracking, and billing review.',
                    color: C.success,
                  },
                ].map((item) => {
                  const Icon = item.icon

                  return (
                    <div
                      key={item.title}
                      style={{
                        background: C.navy,
                        border: C.border ? `1px solid ${C.border}` : 'none',
                        borderRadius: 16,
                        padding: 18,
                      }}
                    >
                      <div
                        style={{
                          width: 38,
                          height: 38,
                          borderRadius: 12,
                          background: `${item.color}18`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginBottom: 14,
                        }}
                      >
                        <Icon size={18} color={item.color} />
                      </div>

                      <div style={{ color: C.text, fontSize: 14, fontWeight: 900 }}>
                        {item.title}
                      </div>

                      <div
                        style={{
                          color: C.muted,
                          fontSize: 12,
                          lineHeight: 1.55,
                          marginTop: 6,
                        }}
                      >
                        {item.text}
                      </div>
                    </div>
                  )
                })}
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 12,
                  marginTop: 18,
                }}
              >
                <div
                  style={{
                    background: C.navy,
                    border: C.border ? `1px solid ${C.border}` : 'none',
                    borderRadius: 16,
                    padding: 18,
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      color: C.muted,
                      fontSize: 11,
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      marginBottom: 12,
                    }}
                  >
                    <Map size={14} color={C.accent} />
                    Auth Coverage
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {['Login', 'Register', 'Forgot', 'Reset', 'Validation'].map((step) => (
                      <span
                        key={step}
                        style={{
                          background: C.card,
                          borderRadius: 999,
                          padding: '6px 10px',
                          color: C.text,
                          fontSize: 11,
                          fontWeight: 700,
                        }}
                      >
                        {step}
                      </span>
                    ))}
                  </div>
                </div>

                <div
                  style={{
                    background: C.navy,
                    border: C.border ? `1px solid ${C.border}` : 'none',
                    borderRadius: 16,
                    padding: 18,
                  }}
                >
                  <div
                    style={{
                      color: C.muted,
                      fontSize: 11,
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      marginBottom: 12,
                    }}
                  >
                    Strict Password Rules
                  </div>

                  {['10+ chars', 'Upper + lower', 'Number + special', 'No email username'].map(
                    (item) => (
                      <div
                        key={item}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 8,
                          color: C.text,
                          fontSize: 12,
                          marginBottom: 8,
                        }}
                      >
                        <CheckCircle2 size={14} color={C.success} />
                        {item}
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
          </section>

          <aside
            style={{
              background: C.panel,
              borderRadius: 24,
              padding: 26,
              border: C.border ? `1px solid ${C.border}` : 'none',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: 18,
            }}
          >
            {renderCurrentForm()}

          </aside>
        </main>

        <footer
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: C.dimText,
            fontSize: 11,
            gap: 12,
          }}
        >
          <span>Production auth · Supabase session · SwiftRoute CRM v2.5</span>
          <span>Dispatcher · Driver · Merchant</span>
        </footer>
      </div>
    </div>
  )
}
