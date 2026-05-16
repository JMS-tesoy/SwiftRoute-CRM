import { useState } from 'react'
import { Plus, Search, Truck } from 'lucide-react'
import AssignDriverModal from './AssignDriverModal'
import Badge from '../../components/Badge'
import Button from '../../components/Button'
import Card from '../../components/Card'
import Header from '../../components/Header'
import TrackingCode from '../../components/TrackingCode'
import { C, SC } from '../../styles/theme'

export default function DispatcherBookings({parcels,drivers,onAssign}) {
  const [q,setQ]=useState(""); const [fs,setFs]=useState("all"); const [tgt,setTgt]=useState(null);
  const filt=parcels.filter(p=>{
    const ms=!q||p.trk.includes(q.toUpperCase())||p.recipient.toLowerCase().includes(q.toLowerCase())||p.merchant.toLowerCase().includes(q.toLowerCase());
    return ms&&(fs==="all"||p.status===fs);
  });
  return (
    <div>
      <Header title="All Bookings" sub={`${filt.length} parcels`} action={<Button><Plus size={12}/>New Booking</Button>}/>
      <div style={{display:"flex",gap:10,marginBottom:14,flexWrap:"wrap"}}>
        <div style={{flex:1,minWidth:180,display:"flex",alignItems:"center",gap:8,background:C.card,border: C.border? `1px solid ${C.border}` : 'none',borderRadius:8,padding:"8px 12px"}}>
          <Search size={13} color={C.muted}/>
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search tracking, recipient, merchant…" style={{background:"none",border:"none",outline:"none",color:C.text,fontSize:12.5,fontFamily:"inherit",flex:1}}/>
        </div>
        <select value={fs} onChange={e=>setFs(e.target.value)} style={{background:C.card,border: C.border? `1px solid ${C.border}` : 'none',borderRadius:8,padding:"8px 12px",color:C.text,fontSize:12.5,fontFamily:"inherit",outline:"none"}}>
          <option value="all">All Status</option>
          {Object.entries(SC).map(([k,v])=><option key={k} value={k}>{v.l}</option>)}
        </select>
      </div>
      <Card style={{overflow:"hidden"}}>
        <div style={{display:"grid",gridTemplateColumns:"120px 110px 1fr 90px 120px 90px",padding:"9px 16px",borderBottom: C.border? `1px solid ${C.border}` : 'none',color:C.muted,fontSize:10,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase"}}>
          <span>Tracking</span><span>Merchant</span><span>Recipient / Address</span><span>Status</span><span>Driver</span><span>Action</span>
        </div>
        {filt.length===0&&<div style={{padding:32,textAlign:"center",color:C.muted,fontSize:13}}>No parcels match your filter.</div>}
        {filt.map((p,i)=>(
          <div key={p.id} style={{display:"grid",gridTemplateColumns:"120px 110px 1fr 90px 120px 90px",padding:"11px 16px",borderBottom:i<filt.length-1? (C.border? `1px solid ${C.border}` : 'none') : "none",alignItems:"center"}}>
            <TrackingCode id={p.trk}/>
            <span style={{color:C.muted,fontSize:11}}>{p.merchant.split(" ")[0]}</span>
            <div><div style={{color:C.text,fontSize:12.5,fontWeight:500}}>{p.recipient}</div><div style={{color:C.muted,fontSize:11}}>{p.addr}</div></div>
            <Badge status={p.status}/>
            <span style={{color:p.driver?C.text:C.dimText,fontSize:12}}>{p.driver||"—"}</span>
            <div>{["pending","assigned"].includes(p.status)&&<Button onClick={()=>setTgt(p)}><Truck size={10}/>{p.driver?"Reassign":"Assign"}</Button>}</div>
          </div>
        ))}
      </Card>
      {tgt&&<AssignDriverModal parcel={tgt} drivers={drivers} onAssign={(pid,did)=>{onAssign(pid,did);setTgt(null);}} onClose={()=>setTgt(null)}/>}
    </div>
  );
}
