import { supabase } from '../utils/supabase/client'

function mapProfileToAppUser(user, profile) {
  return {
    id: profile.role,
    role: profile.role,
    userId: user.id,
    email: user.email,
    name: profile.display_name,
    displayName: profile.display_name,
    contactName: profile.contact_name,
    merchantId: profile.merchant_id,
    driverId: profile.driver_id,
    emailVerified: Boolean(user.email_confirmed_at),
  }
}

async function getProfileForUser(user) {
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('role, display_name, contact_name, merchant_id, driver_id')
    .eq('id', user.id)
    .single()

  if (error) {
    return {
      ok: false,
      error: 'Your account exists, but no app profile was found. Please contact support.',
    }
  }

  return {
    ok: true,
    user: mapProfileToAppUser(user, profile),
  }
}

export async function getCurrentUser() {
  const { data, error } = await supabase.auth.getUser()

  if (error || !data.user) {
    return {
      ok: false,
      user: null,
    }
  }

  return getProfileForUser(data.user)
}

export async function loginWithEmailPassword(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return {
      ok: false,
      error: error.message || 'Invalid email or password.',
    }
  }

  if (!data.user) {
    return {
      ok: false,
      error: 'Sign in failed. Please try again.',
    }
  }

  return getProfileForUser(data.user)
}

export async function registerMerchantAccount({
  name,
  merchantName,
  email,
  password,
}) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        contact_name: name.trim(),
        merchant_name: merchantName.trim(),
      },
    },
  })

  if (error) {
    return {
      ok: false,
      error: error.message || 'Unable to create account.',
    }
  }

  if (!data.session) {
    return {
      ok: true,
      needsEmailConfirmation: true,
    }
  }

  return getProfileForUser(data.user)
}

export async function createPasswordResetCode(email) {
  const redirectTo = `${window.location.origin}/`
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo,
  })

  if (error) {
    return {
      ok: false,
      error: error.message || 'Unable to send password reset email.',
    }
  }

  return {
    ok: true,
    message: 'Password reset email sent. Open the link from your inbox to continue.',
  }
}

export async function resetPassword({ newPassword }) {
  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  })

  if (error) {
    return {
      ok: false,
      error: error.message || 'Unable to reset password.',
    }
  }

  return {
    ok: true,
  }
}

export async function logoutUser() {
  await supabase.auth.signOut()
}
