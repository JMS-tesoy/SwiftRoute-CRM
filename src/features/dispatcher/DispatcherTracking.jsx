import { useState } from 'react'
import { AlertTriangle, MapPin } from 'lucide-react'
import Badge from '../../components/Badge'
import Card from '../../components/Card'
import Header from '../../components/Header'
import TrackingCode from '../../components/TrackingCode'
import { C, SC } from '../../styles/theme'
import { getParcelStatusStyle } from '../../domain/statusStyles'

export default function DispatcherTracking({ parcels }) {
  const [sel, setSel] = useState(parcels[2])

  const TL = {
    pending: ['Booking Created'],
    assigned: ['Booking Created', 'Driver Assigned'],
    picked_up: ['Booking Created', 'Driver Assigned', 'Parcel Picked Up'],
    in_transit: ['Booking Created', 'Driver Assigned', 'Parcel Picked Up', 'In Transit'],
    delivered: ['Booking Created', 'Driver Assigned', 'Parcel Picked Up', 'In Transit', 'Delivered ✓'],
    exception: ['Booking Created', 'Driver Assigned', 'Pickup Attempted', 'Delivery Exception ⚠'],
    failed: ['Booking Created', 'Driver Assigned', 'Pickup Attempted', 'Delivery Failed ⚠'],
    cancelled: ['Booking Created', 'Cancelled'],
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 14 }}>
      <div>
        <Header title="Live Tracking" sub={`${parcels.length} parcels`} />

        <Card style={{ overflow: 'auto', maxHeight: 'calc(100vh - 160px)' }}>
          {parcels.map((p) => {
            const statusStyle = getParcelStatusStyle(p.status)
            const isProblemParcel = ['exception', 'failed'].includes(p.status)

            return (
              <div
                key={p.id}
                onClick={() => setSel(p)}
                style={{
                  padding: '11px 14px',
                  borderBottom: C.border ? `1px solid ${C.border}` : 'none',
                  cursor: 'pointer',
                  background: sel?.id === p.id ? C.accentDim : 'transparent',
                  borderLeft:
                    sel?.id === p.id
                      ? `3px solid ${C.accent}`
                      : isProblemParcel
                        ? `3px solid ${p.status === 'failed' ? '#ef4444' : '#fb923c'}`
                        : '3px solid transparent',
                  ...statusStyle.container,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: 6,
                    marginBottom: 4,
                  }}
                >
                  <TrackingCode id={p.trk} />

                  <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                    {isProblemParcel && (
                      <AlertTriangle
                        size={14}
                        color={p.status === 'failed' ? '#ef4444' : '#fb923c'}
                      />
                    )}
                    <Badge status={p.status} />
                  </div>
                </div>

                {statusStyle.attentionText && (
                  <div
                    style={{
                      color: p.status === 'failed' ? '#fecaca' : '#fed7aa',
                      fontSize: 11,
                      fontWeight: 700,
                      marginBottom: 5,
                    }}
                  >
                    {statusStyle.attentionText}
                  </div>
                )}

                <div style={{ color: C.text, fontSize: 12, fontWeight: 500 }}>
                  {p.recipient}
                </div>

                <div style={{ color: C.muted, fontSize: 11 }}>{p.addr}</div>
              </div>
            )
          })}
        </Card>
      </div>

      {sel && (
        <div>
          <Header title="Parcel Detail" />

          <Card style={{ padding: 22, ...getParcelStatusStyle(sel.status).container }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
              <TrackingCode id={sel.trk} />

              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {['exception', 'failed'].includes(sel.status) && (
                  <AlertTriangle
                    size={16}
                    color={sel.status === 'failed' ? '#ef4444' : '#fb923c'}
                  />
                )}
                <Badge status={sel.status} />
              </div>
            </div>

            <h3
              style={{
                color: C.text,
                fontSize: 20,
                fontWeight: 700,
                margin: '8px 0 2px',
              }}
            >
              {sel.recipient}
            </h3>

            <p
              style={{
                color: C.muted,
                fontSize: 13,
                margin: '0 0 12px',
                display: 'flex',
                alignItems: 'center',
                gap: 5,
              }}
            >
              <MapPin size={12} />
              {sel.addr}
            </p>

            {getParcelStatusStyle(sel.status).attentionText && (
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  background:
                    sel.status === 'failed'
                      ? 'rgba(239, 68, 68, 0.1)'
                      : 'rgba(251, 146, 60, 0.1)',
                  border: `1px solid ${
                    sel.status === 'failed'
                      ? 'rgba(239, 68, 68, 0.35)'
                      : 'rgba(251, 146, 60, 0.35)'
                  }`,
                  borderRadius: 7,
                  padding: '6px 10px',
                  fontSize: 12,
                  color: sel.status === 'failed' ? '#fecaca' : '#fed7aa',
                  fontWeight: 700,
                  marginBottom: 18,
                }}
              >
                <AlertTriangle size={13} />
                {getParcelStatusStyle(sel.status).attentionText}
              </div>
            )}

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gap: 10,
                marginBottom: 20,
              }}
            >
              {[
                ['Merchant', sel.merchant],
                ['Driver', sel.driver || 'Unassigned'],
                ['Weight', `${sel.wt} kg`],
                ['Amount', `₱${sel.amt}.00`],
                ['Phone', sel.phone],
                ['Notes', sel.notes || '—'],
              ].map(([l, v]) => (
                <div key={l} style={{ background: C.navy, borderRadius: 8, padding: '9px 11px' }}>
                  <div
                    style={{
                      color: C.muted,
                      fontSize: 10,
                      textTransform: 'uppercase',
                      letterSpacing: '0.07em',
                      fontWeight: 700,
                    }}
                  >
                    {l}
                  </div>

                  <div
                    style={{
                      color: l === 'Driver' && !sel.driver ? C.dimText : C.text,
                      fontSize: 12.5,
                      fontWeight: 500,
                      marginTop: 2,
                    }}
                  >
                    {v}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ borderTop: C.border ? `1px solid ${C.border}` : 'none', paddingTop: 16 }}>
              <div
                style={{
                  color: C.muted,
                  fontSize: 10,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  marginBottom: 14,
                }}
              >
                Status Timeline
              </div>

              {(TL[sel.status] || TL.pending).map((step, i, arr) => {
                const last = i === arr.length - 1
                const sc = SC[sel.status]?.c || C.muted

                return (
                  <div key={step} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <div
                        style={{
                          width: 11,
                          height: 11,
                          borderRadius: '50%',
                          background: last ? sc : C.success,
                          border: `2px solid ${last ? sc : C.success}`,
                          boxShadow: last ? `0 0 8px ${sc}50` : '',
                        }}
                      />
                      {i < arr.length - 1 && (
                        <div style={{ width: 1, height: 22, background: C.border }} />
                      )}
                    </div>

                    <div style={{ paddingBottom: i < arr.length - 1 ? 4 : 0 }}>
                      <div
                        style={{
                          color: last ? sc : C.text,
                          fontSize: 12.5,
                          fontWeight: last ? 600 : 400,
                        }}
                      >
                        {step}
                      </div>

                      <div style={{ color: C.dimText, fontSize: 10 }}>Today · {sel.ts}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}