import {
  AlertTriangle,
  CheckCircle,
  MapPin,
  Navigation,
  Package,
  Phone,
  Truck,
} from 'lucide-react'
import Badge from '../../components/Badge'
import Button from '../../components/Button'
import Card from '../../components/Card'
import Header from '../../components/Header'
import TrackingCode from '../../components/TrackingCode'
import { C, SC } from '../../styles/theme'
import { getParcelStatusStyle } from '../../domain/statusStyles'

const SA = {
  assigned: [{ n: 'picked_up', l: 'Mark Picked Up', v: 'pri', ic: Package }],
  picked_up: [{ n: 'in_transit', l: 'Set In Transit', v: 'pri', ic: Truck }],
  in_transit: [
    { n: 'delivered', l: 'Mark Delivered', v: 'suc', ic: CheckCircle },
    { n: 'exception', l: 'Report Issue', v: 'dan', ic: AlertTriangle },
  ],
}

function DriverJobCard({ parcel, onUpdate }) {
  const acts = SA[parcel.status] || []
  const statusStyle = getParcelStatusStyle(parcel.status)
  const isProblemParcel = ['exception', 'failed'].includes(parcel.status)
  const statusColor = SC[parcel.status]?.c || C.border

  return (
    <div
      style={{
        background: C.card,
        border: `1.5px solid ${statusColor}33`,
        borderRadius: 12,
        padding: 18,
        borderTop: `3px solid ${statusColor}`,
        ...statusStyle.container,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
        <TrackingCode id={parcel.trk} />

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {isProblemParcel && (
            <AlertTriangle
              size={15}
              color={parcel.status === 'failed' ? '#ef4444' : '#fb923c'}
            />
          )}
          <Badge status={parcel.status} />
        </div>
      </div>

      <div style={{ color: C.text, fontSize: 16, fontWeight: 700, marginBottom: 3 }}>
        {parcel.recipient}
      </div>

      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 5, marginBottom: 3 }}>
        <MapPin size={11} color={C.muted} style={{ flexShrink: 0, marginTop: 2 }} />
        <span style={{ color: C.muted, fontSize: 12 }}>{parcel.addr}</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 12 }}>
        <Phone size={11} color={C.muted} />
        <span style={{ color: C.muted, fontSize: 12 }}>{parcel.phone}</span>
      </div>

      {statusStyle.attentionText && (
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            background: parcel.status === 'failed' ? 'rgba(239, 68, 68, 0.1)' : C.warnDim,
            border: `1px solid ${
              parcel.status === 'failed' ? 'rgba(239, 68, 68, 0.35)' : `${C.warn}40`
            }`,
            borderRadius: 6,
            padding: '5px 9px',
            fontSize: 11,
            color: parcel.status === 'failed' ? '#fecaca' : C.warn,
            fontWeight: 700,
            marginBottom: 12,
          }}
        >
          <AlertTriangle size={12} />
          {statusStyle.attentionText}
        </div>
      )}

      {parcel.notes && (
        <div
          style={{
            background: C.warnDim,
            border: `1px solid ${C.warn}30`,
            borderRadius: 6,
            padding: '5px 9px',
            fontSize: 11,
            color: C.warn,
            marginBottom: 12,
          }}
        >
          📝 {parcel.notes}
        </div>
      )}

      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        <a
          href={`https://maps.google.com/?q=${encodeURIComponent(parcel.addr)}`}
          target="_blank"
          rel="noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 5,
            padding: '5px 12px',
            borderRadius: 8,
            textDecoration: 'none',
            background: C.blueDim,
            border: `1px solid ${C.blue}40`,
            color: C.blue,
            fontSize: 12,
            fontWeight: 600,
          }}
        >
          <Navigation size={11} />
          Navigate
        </a>

        {acts.map((action) => {
          const Icon = action.ic

          return (
            <Button key={action.n} v={action.v} onClick={() => onUpdate(parcel.id, action.n)}>
              <Icon size={11} />
              {action.l}
            </Button>
          )
        })}
      </div>
    </div>
  )
}

function CompactJobCard({ parcel }) {
  const statusStyle = getParcelStatusStyle(parcel.status)
  const isProblemParcel = ['exception', 'failed'].includes(parcel.status)

  return (
    <div
      style={{
        background: C.navy,
        border: C.border ? `1px solid ${C.border}` : 'none',
        borderRadius: 10,
        padding: 14,
        opacity: 0.85,
        ...statusStyle.container,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <TrackingCode id={parcel.trk} />

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {isProblemParcel && (
            <AlertTriangle
              size={14}
              color={parcel.status === 'failed' ? '#ef4444' : '#fb923c'}
            />
          )}
          <Badge status={parcel.status} />
        </div>
      </div>

      {statusStyle.attentionText && (
        <div
          style={{
            color: parcel.status === 'failed' ? '#fecaca' : '#fed7aa',
            fontSize: 11,
            fontWeight: 700,
            marginTop: 7,
          }}
        >
          {statusStyle.attentionText}
        </div>
      )}

      <div style={{ color: C.text, fontSize: 13, fontWeight: 500, marginTop: 5 }}>
        {parcel.recipient}
      </div>

      <div style={{ color: C.muted, fontSize: 11, marginTop: 2 }}>{parcel.addr}</div>
    </div>
  )
}

export default function DriverJobs({ parcels, driverId, onUpdate }) {
  const myJobs = parcels.filter((parcel) => parcel.dId === driverId)

  const activeJobs = myJobs.filter((parcel) =>
    ['assigned', 'picked_up', 'in_transit'].includes(parcel.status),
  )

  const attentionJobs = myJobs.filter((parcel) =>
    ['exception', 'failed'].includes(parcel.status),
  )

  const completedJobs = myJobs.filter((parcel) => parcel.status === 'delivered')

  return (
    <div>
      <Header
        title="My Jobs Today"
        sub={`${activeJobs.length} active · ${attentionJobs.length} attention · ${completedJobs.length} completed`}
      />

      {activeJobs.length === 0 && attentionJobs.length === 0 && (
        <Card style={{ padding: 40, textAlign: 'center' }}>
          <CheckCircle
            size={36}
            color={C.success}
            style={{ margin: '0 auto 10px', display: 'block' }}
          />
          <div style={{ color: C.text, fontWeight: 600 }}>All done for today!</div>
          <div style={{ color: C.muted, fontSize: 13, marginTop: 4 }}>
            No active assignments.
          </div>
        </Card>
      )}

      {activeJobs.length > 0 && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill,minmax(295px,1fr))',
            gap: 12,
            marginBottom: 24,
          }}
        >
          {activeJobs.map((parcel) => (
            <DriverJobCard key={parcel.id} parcel={parcel} onUpdate={onUpdate} />
          ))}
        </div>
      )}

      {attentionJobs.length > 0 && (
        <>
          <div
            style={{
              color: C.warn,
              fontSize: 11,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: 10,
            }}
          >
            Needs Attention
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill,minmax(295px,1fr))',
              gap: 10,
              marginBottom: 24,
            }}
          >
            {attentionJobs.map((parcel) => (
              <CompactJobCard key={parcel.id} parcel={parcel} />
            ))}
          </div>
        </>
      )}

      {completedJobs.length > 0 && (
        <>
          <div
            style={{
              color: C.muted,
              fontSize: 11,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: 10,
            }}
          >
            Completed Today
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill,minmax(295px,1fr))',
              gap: 10,
            }}
          >
            {completedJobs.map((parcel) => (
              <CompactJobCard key={parcel.id} parcel={parcel} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}