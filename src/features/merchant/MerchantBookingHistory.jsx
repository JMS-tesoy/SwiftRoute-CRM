import { useState } from 'react'
import { Download } from 'lucide-react'
import Badge from '../../components/Badge'
import Button from '../../components/Button'
import Card from '../../components/Card'
import Header from '../../components/Header'
import TrackingCode from '../../components/TrackingCode'
import { C, SC } from '../../styles/theme'

export default function MerchantBookingHistory({parcels,merchantId}) {
  const [fs,setFs]=useState("all");
  const mine=parcels.filter(p=>p.mId===merchantId);
  const filt=fs==="all"?mine:mine.filter(p=>p.status===fs);
  return (
    <div>
      <Header title="My Bookings" sub={`${mine.length} total shipments`} action={<Button v="out"><Download size={12}/>Export CSV</Button>}/>
      <div style={{display:"flex",gap:7,marginBottom:14,flexWrap:"wrap"}}>
        {["all",...Object.keys(SC)].map(s=>(
          <button key={s} onClick={()=>setFs(s)} style={{padding:"4px 11px",borderRadius:20,border:`1px solid ${fs===s?(SC[s]?.c||C.accent):C.border}`,background:fs===s?`${SC[s]?.c||C.accent}18`:"transparent",color:fs===s?(SC[s]?.c||C.accent):C.muted,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>
            {s==="all"?"All":SC[s]?.l}
          </button>
        ))}
      </div>
      <Card style={{overflow:"hidden"}}>
        {filt.length===0&&<div style={{padding:32,textAlign:"center",color:C.muted}}>No bookings found for this filter.</div>}
        {filt.map((p,i)=>(
          <div key={p.id} style={{display:"flex",alignItems:"center",gap:14,padding:"13px 16px",borderBottom:i<filt.length-1? (C.border? `1px solid ${C.border}` : 'none') : "none"}}>
            <div style={{flex:1}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}><TrackingCode id={p.trk}/><Badge status={p.status}/></div>
              <div style={{color:C.text,fontSize:13,fontWeight:500}}>{p.recipient}</div>
              <div style={{color:C.muted,fontSize:11}}>{p.addr}</div>
            </div>
            <div style={{textAlign:"right",flexShrink:0}}>
              <div style={{color:C.text,fontWeight:700,fontSize:15}}>₱{p.amt}.00</div>
              <div style={{color:C.muted,fontSize:11}}>{p.wt} kg · {p.ts}</div>
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
}
