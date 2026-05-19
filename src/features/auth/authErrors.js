export function getAuthErrorMessage(error, fallbackMessage) {
  const message = String(error?.message || '').toLowerCase()
  const status = error?.status

  if (
    status === 429 ||
    message.includes('rate limit') ||
    message.includes('too many requests')
  ) {
    return 'We could not send the verification email yet. Please wait a few minutes and try again.'
  }

  if (
    message.includes('already registered') ||
    message.includes('already exists') ||
    message.includes('user already registered')
  ) {
    return 'An account with this email may already exist. Please sign in or reset your password.'
  }

  if (message.includes('invalid email')) {
    return 'Please enter a valid email address.'
  }

  if (message.includes('password')) {
    return 'Please check the password requirements and try again.'
  }

  return fallbackMessage || 'Registration failed. Please check your details and try again.'
}
