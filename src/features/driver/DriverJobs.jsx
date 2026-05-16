import { AlertTriangle, CheckCircle, MapPin, Navigation, Package, Phone, Truck } from 'lucide-react'
import Badge from '../../components/Badge'
import Button from '../../components/Button'
import Card from '../../components/Card'
import Header from '../../components/Header'
import TrackingCode from '../../components/TrackingCode'
import { C, SC } from '../../styles/theme'

const SA = {
  assigned:   [{n:"picked_up", l:"Mark Picked Up",   v:"pri", ic:Package}],
  picked_up:  [{n:"in_transit",l:"Set In Transit",   v:"pri", ic:Truck}],
  in_transit: [{n:"delivered", l:"Mark Delivered",   v:"suc", ic:CheckCircle},{n:"exception",l:"Report Issue",v:"dan",ic:AlertTriangle}],
};

export default function DriverJobs({parcels,driverId,onUpdate}) {
  const mine=parcels.filter(p=>p.dId===driverId&&!["delivered","exception"].includes(p.status));
  const done=parcels.filter(p=>p.dId===driverId&&["delivered","exception"].includes(p.status));
  return (
    <div>
      <Header title="My Jobs Today" sub={`${mine.length} active · ${done.length} completed`}/>
      {mine.length===0&&<Card style={{padding:40,textAlign:"center"}}><CheckCircle size={36} color={C.success} style={{margin:"0 auto 10px",display:"block"}}/><div style={{color:C.text,fontWeight:600}}>All done for today!</div><div style={{color:C.muted,fontSize:13,marginTop:4}}>No active assignments.</div></Card>}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(295px,1fr))",gap:12,marginBottom:24}}>
        {mine.map(p=>{
          const acts=SA[p.status]||[];
          return (
            <div key={p.id} style={{background:C.card,border:`1.5px solid ${SC[p.status]?.c}33`,borderRadius:12,padding:18,borderTop:`3px solid ${SC[p.status]?.c}`}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}><TrackingCode id={p.trk}/><Badge status={p.status}/></div>
              <div style={{color:C.text,fontSize:16,fontWeight:700,marginBottom:3}}>{p.recipient}</div>
              <div style={{display:"flex",alignItems:"flex-start",gap:5,marginBottom:3}}><MapPin size={11} color={C.muted} style={{flexShrink:0,marginTop:2}}/><span style={{color:C.muted,fontSize:12}}>{p.addr}</span></div>
              <div style={{display:"flex",alignItems:"center",gap:5,marginBottom:12}}><Phone size={11} color={C.muted}/><span style={{color:C.muted,fontSize:12}}>{p.phone}</span></div>
              {p.notes&&<div style={{background:C.warnDim,border:`1px solid ${C.warn}30`,borderRadius:6,padding:"5px 9px",fontSize:11,color:C.warn,marginBottom:12}}>📝 {p.notes}</div>}
              <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                <a href={`https://maps.google.com/?q=${encodeURIComponent(p.addr)}`} target="_blank" rel="noreferrer" style={{display:"inline-flex",alignItems:"center",gap:5,padding:"5px 12px",borderRadius:8,textDecoration:"none",background:C.blueDim,border:`1px solid ${C.blue}40`,color:C.blue,fontSize:12,fontWeight:600}}>
                  <Navigation size={11}/>Navigate
                </a>
                {acts.map(a=>{const Ic=a.ic;return <Button key={a.n} v={a.v} onClick={()=>onUpdate(p.id,a.n)}><Ic size={11}/>{a.l}</Button>;})}
              </div>
            </div>
          );
        })}
      </div>
      {done.length>0&&<>
        <div style={{color:C.muted,fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:10}}>Completed Today</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(295px,1fr))",gap:10}}>
          {done.map(p=>(
            <div key={p.id} style={{background:C.navy,border: C.border? `1px solid ${C.border}` : 'none',borderRadius:10,padding:14,opacity:.7}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><TrackingCode id={p.trk}/><Badge status={p.status}/></div>
              <div style={{color:C.text,fontSize:13,fontWeight:500,marginTop:5}}>{p.recipient}</div>
              <div style={{color:C.muted,fontSize:11,marginTop:2}}>{p.addr}</div>
            </div>
          ))}
        </div>
      </>}
    </div>
  );
}
