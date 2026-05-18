export const PERMISSIONS = {
  VIEW_ALL_BOOKINGS: 'view_all_bookings',
  ASSIGN_DRIVER: 'assign_driver',
  VIEW_DRIVER_JOBS: 'view_driver_jobs',
  UPDATE_PARCEL_STATUS: 'update_parcel_status',
  CREATE_BOOKING: 'create_booking',
  VIEW_MERCHANT_BOOKINGS: 'view_merchant_bookings',
  VIEW_BILLING: 'view_billing',
}

export const ROLE_PERMISSIONS = {
  dispatcher: [
    PERMISSIONS.VIEW_ALL_BOOKINGS,
    PERMISSIONS.ASSIGN_DRIVER,
  ],
  driver: [
    PERMISSIONS.VIEW_DRIVER_JOBS,
    PERMISSIONS.UPDATE_PARCEL_STATUS,
  ],
  merchant: [
    PERMISSIONS.CREATE_BOOKING,
    PERMISSIONS.VIEW_MERCHANT_BOOKINGS,
    PERMISSIONS.VIEW_BILLING,
  ],
}

export function can(role, permission) {
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false
}