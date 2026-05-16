export function getParcelStatusStyle(status) {
  const normalizedStatus = String(status || '').toLowerCase()

  if (normalizedStatus === 'exception') {
    return {
      label: 'Exception',
      badge: {
        background: '#451a03',
        color: '#fed7aa',
        border: '1px solid #fb923c',
      },
      container: {
        background: 'rgba(251, 146, 60, 0.08)',
        border: '1px solid rgba(251, 146, 60, 0.35)',
      },
      attentionText: 'Needs attention',
    }
  }

  if (normalizedStatus === 'failed') {
    return {
      label: 'Failed',
      badge: {
        background: '#450a0a',
        color: '#fecaca',
        border: '1px solid #ef4444',
      },
      container: {
        background: 'rgba(239, 68, 68, 0.08)',
        border: '1px solid rgba(239, 68, 68, 0.35)',
      },
      attentionText: 'Action required',
    }
  }

  const labels = {
    pending: 'Pending',
    assigned: 'Assigned',
    picked_up: 'Picked Up',
    in_transit: 'In Transit',
    delivered: 'Delivered',
    cancelled: 'Cancelled',
  }

  return {
    label: labels[normalizedStatus] || status || 'Unknown',
    badge: {
      background: 'rgba(148, 163, 184, 0.14)',
      color: '#cbd5e1',
      border: '1px solid rgba(148, 163, 184, 0.28)',
    },
    container: {},
    attentionText: '',
  }
}