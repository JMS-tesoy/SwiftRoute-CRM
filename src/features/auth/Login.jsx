import { useMemo, useState } from 'react'
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
import { DEMO_ACCOUNTS } from '../../data/demoAccounts'
import { C, FONTS } from '../../styles/theme'

function safeAccountForSession(account) {
  const { password, icon, desc, color, label, ...sessionAccount } = account

  return {
    ...sessionAccount,
    displayName: account.name,
  }
}

function getAccountKey(account) {
  return `${account.role}-${account.userId}`
}

export default function Login({ onLogin }) {
  const defaultAccount = DEMO_ACCOUNTS[0]

  const [selectedAccountKey, setSelectedAccountKey] = useState(getAccountKey(defaultAccount))
  const [email, setEmail] = useState(defaultAccount.email)
  const [password, setPassword] = useState(defaultAccount.password)
  const [error, setError] = useState('')

  const selectedAccount = useMemo(() => {
    return (
      DEMO_ACCOUNTS.find((account) => getAccountKey(account) === selectedAccountKey) ||
      defaultAccount
    )
  }, [selectedAccountKey, defaultAccount])

  const SelectedAccountIcon = selectedAccount.icon

  const groupedAccounts = useMemo(() => {
    return DEMO_ACCOUNTS.reduce((groups, account) => {
      if (!groups[account.role]) groups[account.role] = []
      groups[account.role].push(account)
      return groups
    }, {})
  }, [])

  const selectAccount = (account) => {
    setSelectedAccountKey(getAccountKey(account))
    setEmail(account.email)
    setPassword(account.password)
    setError('')
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const normalizedEmail = email.trim().toLowerCase()

    const matchedAccount = DEMO_ACCOUNTS.find(
      (account) =>
        account.email.toLowerCase() === normalizedEmail &&
        account.password === password,
    )

    if (!matchedAccount) {
      setError('Invalid demo email or password.')
      return
    }

    setError('')
    onLogin(safeAccountForSession(matchedAccount))
  }

  const handleQuickEnter = () => {
    onLogin(safeAccountForSession(selectedAccount))
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
            Demo environment
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
                Manage bookings, drivers, tracking, and billing in one operations portal.
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
                SwiftRoute CRM gives dispatchers, drivers, and merchants a shared workflow
                from parcel booking to assignment, pickup, in-transit tracking, delivery,
                exceptions, and billing review.
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
                    text: 'Assign drivers, monitor status, and handle exceptions.',
                    color: '#60A5FA',
                  },
                  {
                    icon: Truck,
                    title: 'Driver',
                    text: 'View assigned jobs and update every delivery checkpoint.',
                    color: C.accent,
                  },
                  {
                    icon: PackageCheck,
                    title: 'Merchant',
                    text: 'Create bookings, track shipments, and review billing.',
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
                    Parcel Lifecycle
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {['Booked', 'Assigned', 'Picked Up', 'In Transit', 'Delivered'].map(
                      (step) => (
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
                      ),
                    )}
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
                    Demo Coverage
                  </div>

                  {[
                    'Role-specific portals',
                    'Driver assignment',
                    'Merchant exception visibility',
                  ].map((item) => (
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
                  ))}
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
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: 22 }}>
                <div style={{ color: C.text, fontSize: 24, fontWeight: 900 }}>
                  Sign in
                </div>
                <div style={{ color: C.muted, fontSize: 13, marginTop: 6, lineHeight: 1.6 }}>
                  Select a demo account or enter credentials manually.
                </div>
              </div>

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
                Demo account
              </label>

              <select
                value={selectedAccountKey}
                onChange={(event) => {
                  const account = DEMO_ACCOUNTS.find(
                    (item) => getAccountKey(item) === event.target.value,
                  )

                  if (account) selectAccount(account)
                }}
                style={{
                  width: '100%',
                  background: C.navy,
                  border: C.border ? `1px solid ${C.border}` : 'none',
                  borderRadius: 10,
                  padding: '11px 12px',
                  color: C.text,
                  fontSize: 13,
                  fontFamily: 'inherit',
                  outline: 'none',
                  marginBottom: 14,
                }}
              >
                {Object.entries(groupedAccounts).map(([role, accounts]) => (
                  <optgroup key={role} label={role.toUpperCase()}>
                    {accounts.map((account) => (
                      <option key={getAccountKey(account)} value={getAccountKey(account)}>
                        {account.label}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>

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
                Email
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
                  marginBottom: 14,
                }}
              >
                <Mail size={15} color={C.muted} />
                <input
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  autoComplete="username"
                  style={{
                    flex: 1,
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    color: C.text,
                    fontSize: 13,
                    fontFamily: 'inherit',
                  }}
                />
              </div>

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
                Password
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
                  marginBottom: 14,
                }}
              >
                <Lock size={15} color={C.muted} />
                <input
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  type="password"
                  autoComplete="current-password"
                  style={{
                    flex: 1,
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    color: C.text,
                    fontSize: 13,
                    fontFamily: 'inherit',
                  }}
                />
              </div>

              {error && (
                <div
                  style={{
                    background: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid rgba(239, 68, 68, 0.35)',
                    color: '#fecaca',
                    borderRadius: 10,
                    padding: '10px 12px',
                    fontSize: 12,
                    fontWeight: 700,
                    marginBottom: 14,
                  }}
                >
                  {error}
                </div>
              )}

              <button
                type="submit"
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
                Sign In
                <ArrowRight size={15} />
              </button>

              <button
                type="button"
                onClick={handleQuickEnter}
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
                Enter as {selectedAccount.label}
              </button>
            </form>

            <div
              style={{
                background: C.navy,
                border: C.border ? `1px solid ${C.border}` : 'none',
                borderRadius: 16,
                padding: 16,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  marginBottom: 12,
                }}
              >
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 12,
                    background: `${selectedAccount.color}18`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <SelectedAccountIcon size={18} color={selectedAccount.color} />
                </div>

                <div>
                  <div style={{ color: C.text, fontSize: 13, fontWeight: 900 }}>
                    {selectedAccount.label}
                  </div>
                  <div style={{ color: C.muted, fontSize: 11 }}>
                    {selectedAccount.email}
                  </div>
                </div>
              </div>

              <div style={{ color: C.muted, fontSize: 12, lineHeight: 1.6 }}>
                {selectedAccount.desc}
              </div>

              {selectedAccount.email === 'ops@freshfarm.ph' && (
                <div
                  style={{
                    marginTop: 12,
                    background: 'rgba(251, 146, 60, 0.1)',
                    border: '1px solid rgba(251, 146, 60, 0.35)',
                    color: '#fed7aa',
                    borderRadius: 10,
                    padding: '9px 11px',
                    fontSize: 11,
                    fontWeight: 700,
                    lineHeight: 1.5,
                  }}
                >
                  Use this merchant to verify exception visibility in My Bookings.
                </div>
              )}

              {selectedAccount.email === 'liza@swiftroute.ph' && (
                <div
                  style={{
                    marginTop: 12,
                    background: 'rgba(251, 146, 60, 0.1)',
                    border: '1px solid rgba(251, 146, 60, 0.35)',
                    color: '#fed7aa',
                    borderRadius: 10,
                    padding: '9px 11px',
                    fontSize: 11,
                    fontWeight: 700,
                    lineHeight: 1.5,
                  }}
                >
                  Use this driver to verify exception jobs in the Driver Portal.
                </div>
              )}
            </div>
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
          <span>Demo environment · Simulated data · SwiftRoute CRM v2.4</span>
          <span>Dispatcher · Driver · Merchant</span>
        </footer>
      </div>
    </div>
  )
}