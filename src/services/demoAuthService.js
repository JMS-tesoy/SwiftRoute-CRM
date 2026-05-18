import { DEMO_ACCOUNTS } from '../data/demoAccounts'
import { normalizeEmail } from '../domain/authValidation'

const USERS_KEY = 'swiftroute_registered_users'
const RESET_KEY = 'swiftroute_reset_codes'

function readJson(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function writeJson(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value))
}

function stripPrivateFields(account) {
  const { password, icon, desc, color, label, ...safeAccount } = account

  return {
    ...safeAccount,
    id: account.role,
    displayName: account.name,
  }
}

export function getAllAuthAccounts() {
  const registeredUsers = readJson(USERS_KEY, [])

  return [...DEMO_ACCOUNTS, ...registeredUsers]
}

export function loginWithEmailPassword(email, password) {
  const normalizedEmail = normalizeEmail(email)

  const account = getAllAuthAccounts().find(
    (item) =>
      normalizeEmail(item.email) === normalizedEmail &&
      item.password === password,
  )

  if (!account) {
    return {
      ok: false,
      error: 'Invalid email or password.',
    }
  }

  return {
    ok: true,
    user: stripPrivateFields(account),
  }
}

export function registerMerchantAccount({ name, merchantName, email, password }) {
  const normalizedEmail = normalizeEmail(email)
  const accounts = getAllAuthAccounts()

  const existingAccount = accounts.find(
    (item) => normalizeEmail(item.email) === normalizedEmail,
  )

  if (existingAccount) {
    return {
      ok: false,
      error: 'An account with this email already exists.',
    }
  }

  const registeredUsers = readJson(USERS_KEY, [])
  const nextNumber = registeredUsers.length + 1
  const userId = `RU${String(nextNumber).padStart(3, '0')}`
  const merchantId = `RM${String(nextNumber).padStart(3, '0')}`

  const newAccount = {
    id: 'merchant',
    role: 'merchant',
    userId,
    merchantId,
    name: merchantName.trim(),
    contactName: name.trim(),
    label: `Merchant · ${merchantName.trim()}`,
    email: normalizedEmail,
    password,
    desc: 'Registered merchant demo account.',
    color: '#22C55E',
    isRegistered: true,
  }

  writeJson(USERS_KEY, [newAccount, ...registeredUsers])

  return {
    ok: true,
    user: stripPrivateFields(newAccount),
  }
}

export function createPasswordResetCode(email) {
  const normalizedEmail = normalizeEmail(email)
  const account = getAllAuthAccounts().find(
    (item) => normalizeEmail(item.email) === normalizedEmail,
  )

  if (!account) {
    return {
      ok: false,
      error: 'No account found with that email.',
    }
  }

  const resetCodes = readJson(RESET_KEY, {})
  const code = String(Math.floor(100000 + Math.random() * 900000))
  const expiresAt = Date.now() + 15 * 60 * 1000

  resetCodes[normalizedEmail] = {
    code,
    expiresAt,
  }

  writeJson(RESET_KEY, resetCodes)

  return {
    ok: true,
    code,
    message: 'Demo reset code generated.',
  }
}

export function resetPassword({ email, code, newPassword }) {
  const normalizedEmail = normalizeEmail(email)
  const resetCodes = readJson(RESET_KEY, {})
  const resetRecord = resetCodes[normalizedEmail]

  if (!resetRecord) {
    return {
      ok: false,
      error: 'No reset request found for this email.',
    }
  }

  if (Date.now() > resetRecord.expiresAt) {
    delete resetCodes[normalizedEmail]
    writeJson(RESET_KEY, resetCodes)

    return {
      ok: false,
      error: 'Reset code has expired.',
    }
  }

  if (String(code).trim() !== resetRecord.code) {
    return {
      ok: false,
      error: 'Invalid reset code.',
    }
  }

  const registeredUsers = readJson(USERS_KEY, [])
  const registeredIndex = registeredUsers.findIndex(
    (item) => normalizeEmail(item.email) === normalizedEmail,
  )

  if (registeredIndex >= 0) {
    registeredUsers[registeredIndex] = {
      ...registeredUsers[registeredIndex],
      password: newPassword,
    }

    writeJson(USERS_KEY, registeredUsers)
  } else {
    return {
      ok: false,
      error: 'Demo seed accounts cannot be permanently changed. Use demo2024.',
    }
  }

  delete resetCodes[normalizedEmail]
  writeJson(RESET_KEY, resetCodes)

  return {
    ok: true,
  }
}