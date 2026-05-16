export const PARCEL_STATUS = {
  PENDING: 'pending',
  ASSIGNED: 'assigned',
  PICKED_UP: 'picked_up',
  IN_TRANSIT: 'in_transit',
  DELIVERED: 'delivered',
  FAILED: 'failed',
  EXCEPTION: 'exception',
  CANCELLED: 'cancelled',
}

export const PARCEL_STATUS_LABELS = {
  [PARCEL_STATUS.PENDING]: 'Pending',
  [PARCEL_STATUS.ASSIGNED]: 'Assigned',
  [PARCEL_STATUS.PICKED_UP]: 'Picked Up',
  [PARCEL_STATUS.IN_TRANSIT]: 'In Transit',
  [PARCEL_STATUS.DELIVERED]: 'Delivered',
  [PARCEL_STATUS.FAILED]: 'Failed',
  [PARCEL_STATUS.EXCEPTION]: 'Exception',
  [PARCEL_STATUS.CANCELLED]: 'Cancelled',
}

export const ALLOWED_STATUS_TRANSITIONS = {
  [PARCEL_STATUS.PENDING]: [
    PARCEL_STATUS.ASSIGNED,
    PARCEL_STATUS.CANCELLED,
  ],
  [PARCEL_STATUS.ASSIGNED]: [
    PARCEL_STATUS.PICKED_UP,
    PARCEL_STATUS.FAILED,
    PARCEL_STATUS.EXCEPTION,
    PARCEL_STATUS.CANCELLED,
  ],
  [PARCEL_STATUS.PICKED_UP]: [
    PARCEL_STATUS.IN_TRANSIT,
    PARCEL_STATUS.FAILED,
    PARCEL_STATUS.EXCEPTION,
  ],
  [PARCEL_STATUS.IN_TRANSIT]: [
    PARCEL_STATUS.DELIVERED,
    PARCEL_STATUS.FAILED,
    PARCEL_STATUS.EXCEPTION,
  ],
  [PARCEL_STATUS.DELIVERED]: [],
  [PARCEL_STATUS.FAILED]: [
    PARCEL_STATUS.ASSIGNED,
    PARCEL_STATUS.EXCEPTION,
    PARCEL_STATUS.CANCELLED,
  ],
  [PARCEL_STATUS.EXCEPTION]: [
    PARCEL_STATUS.ASSIGNED,
    PARCEL_STATUS.FAILED,
    PARCEL_STATUS.CANCELLED,
  ],
  [PARCEL_STATUS.CANCELLED]: [],
}

export function canTransitionParcelStatus(currentStatus, nextStatus) {
  return ALLOWED_STATUS_TRANSITIONS[currentStatus]?.includes(nextStatus) ?? false
}

export function getAllowedNextParcelStatuses(currentStatus) {
  return ALLOWED_STATUS_TRANSITIONS[currentStatus] ?? []
}

export function isFinalParcelStatus(status) {
  return [
    PARCEL_STATUS.DELIVERED,
    PARCEL_STATUS.CANCELLED,
  ].includes(status)
}