import { useState } from 'react'
import { AlertTriangle, Download } from 'lucide-react'
import Badge from '../../components/Badge'
import Button from '../../components/Button'
import Card from '../../components/Card'
import Header from '../../components/Header'
import TrackingCode from '../../components/TrackingCode'
import { C, SC } from '../../styles/theme'
import { getParcelStatusStyle } from '../../domain/statusStyles'

export default function MerchantBookingHistory({ parcels, merchantId }) {
  const [fs, setFs] = useState('all')

  const mine = parcels.filter((parcel) => parcel.mId === merchantId)
  const filt = fs === 'all' ? mine : mine.filter((parcel) => parcel.status === fs)

  return (
    <div>
      <Header
        title="My Bookings"
        sub={`${mine.length} total shipments`}
        action={
          <Button v="out">
            <Download size={12} />
            Export CSV
          </Button>
        }
      />

      <div style={{ display: 'flex', gap: 7, marginBottom: 14, flexWrap: 'wrap' }}>
        {['all', ...Object.keys(SC)].map((status) => (
          <button
            key={status}
            onClick={() => setFs(status)}
            style={{
              padding: '4px 11px',
              borderRadius: 20,
              border: `1px solid ${fs === status ? SC[status]?.c || C.accent : C.border}`,
              background: fs === status ? `${SC[status]?.c || C.accent}18` : 'transparent',
              color: fs === status ? SC[status]?.c || C.accent : C.muted,
              fontSize: 12,
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            {status === 'all' ? 'All' : SC[status]?.l}
          </button>
        ))}
      </div>

      <Card style={{ overflow: 'hidden' }}>
        {filt.length === 0 && (
          <div style={{ padding: 32, textAlign: 'center', color: C.muted }}>
            No bookings found for this filter.
          </div>
        )}

        {filt.map((parcel, index) => {
          const statusStyle = getParcelStatusStyle(parcel.status)
          const isProblemParcel = ['exception', 'failed'].includes(parcel.status)

          return (
            <div
              key={parcel.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                padding: '13px 16px',
                borderBottom:
                  index < filt.length - 1
                    ? C.border
                      ? `1px solid ${C.border}`
                      : 'none'
                    : 'none',
                ...statusStyle.container,
              }}
            >
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    marginBottom: 4,
                    flexWrap: 'wrap',
                  }}
                >
                  <TrackingCode id={parcel.trk} />

                  {isProblemParcel && (
                    <AlertTriangle
                      size={15}
                      color={parcel.status === 'failed' ? '#ef4444' : '#fb923c'}
                    />
                  )}

                  <Badge status={parcel.status} />

                  {statusStyle.attentionText && (
                    <span
                      style={{
                        color: parcel.status === 'failed' ? '#fecaca' : '#fed7aa',
                        fontSize: 11,
                        fontWeight: 700,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {statusStyle.attentionText}
                    </span>
                  )}
                </div>

                <div style={{ color: C.text, fontSize: 13, fontWeight: 500 }}>
                  {parcel.recipient}
                </div>

                <div style={{ color: C.muted, fontSize: 11 }}>{parcel.addr}</div>

                {isProblemParcel && parcel.notes && (
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      marginTop: 8,
                      padding: '5px 9px',
                      borderRadius: 6,
                      background:
                        parcel.status === 'failed'
                          ? 'rgba(239, 68, 68, 0.1)'
                          : 'rgba(251, 146, 60, 0.1)',
                      border: `1px solid ${
                        parcel.status === 'failed'
                          ? 'rgba(239, 68, 68, 0.35)'
                          : 'rgba(251, 146, 60, 0.35)'
                      }`,
                      color: parcel.status === 'failed' ? '#fecaca' : '#fed7aa',
                      fontSize: 11,
                      fontWeight: 600,
                    }}
                  >
                    <AlertTriangle size={12} />
                    {parcel.notes}
                  </div>
                )}
              </div>

              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <div style={{ color: C.text, fontWeight: 700, fontSize: 15 }}>
                  ₱{parcel.amt}.00
                </div>

                <div style={{ color: C.muted, fontSize: 11 }}>
                  {parcel.wt} kg · {parcel.ts}
                </div>
              </div>
            </div>
          )
        })}
      </Card>
    </div>
  )
}