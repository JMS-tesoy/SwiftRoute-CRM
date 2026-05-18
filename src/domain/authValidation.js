export function normalizeEmail(email) {
  return String(email || '').trim().toLowerCase()
}

export function validateEmail(email) {
  const normalizedEmail = normalizeEmail(email)

  if (!normalizedEmail) {
    return 'Email is required.'
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

  if (!emailPattern.test(normalizedEmail)) {
    return 'Enter a valid email address.'
  }

  if (normalizedEmail.length > 120) {
    return 'Email must be 120 characters or less.'
  }

  return ''
}

export function validatePassword(password, email = '') {
  const value = String(password || '')
  const normalizedEmail = normalizeEmail(email)
  const emailUser = normalizedEmail.split('@')[0]

  if (!value) {
    return 'Password is required.'
  }

  if (value.length < 10) {
    return 'Password must be at least 10 characters.'
  }

  if (value.length > 72) {
    return 'Password must be 72 characters or less.'
  }

  if (/\s/.test(value)) {
    return 'Password cannot contain spaces.'
  }

  if (!/[A-Z]/.test(value)) {
    return 'Password must include at least one uppercase letter.'
  }

  if (!/[a-z]/.test(value)) {
    return 'Password must include at least one lowercase letter.'
  }

  if (!/[0-9]/.test(value)) {
    return 'Password must include at least one number.'
  }

  if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(value)) {
    return 'Password must include at least one special character.'
  }

  if (emailUser && emailUser.length >= 3 && value.toLowerCase().includes(emailUser)) {
    return 'Password cannot contain your email username.'
  }

  return ''
}

export function validateName(name) {
  const value = String(name || '').trim()

  if (!value) {
    return 'Name is required.'
  }

  if (value.length < 2) {
    return 'Name must be at least 2 characters.'
  }

  if (value.length > 80) {
    return 'Name must be 80 characters or less.'
  }

  return ''
}

export function validateMerchantName(name) {
  const value = String(name || '').trim()

  if (!value) {
    return 'Merchant or company name is required.'
  }

  if (value.length < 2) {
    return 'Merchant name must be at least 2 characters.'
  }

  if (value.length > 100) {
    return 'Merchant name must be 100 characters or less.'
  }

  return ''
}

export function validatePasswordConfirmation(password, confirmPassword) {
  if (password !== confirmPassword) {
    return 'Passwords do not match.'
  }

  return ''
}