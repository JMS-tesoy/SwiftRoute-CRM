import { useState } from 'react'
import { CheckCircle, X } from 'lucide-react'
import Avatar from '../../components/Avatar'
import Button from '../../components/Button'
import TrackingCode from '../../components/TrackingCode'
import { C } from '../../styles/theme'

export default function AssignDriverModal({parcel,drivers,onAssign,onClose}) {
  const [sel,setSel]=useState(null);
  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.75)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:200}} onClick={onClose}>
      <div style={{background:C.panel,border: C.border? `1px solid ${C.border}` : 'none',borderRadius:16,padding:24,width:400,maxHeight:"80vh",overflow:"auto"}} onClick={e=>e.stopPropagation()}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
          <div style={{color:C.text,fontWeight:700,fontSize:15}}>Assign Driver</div>
          <button onClick={onClose} style={{background:"none",border:"none",color:C.muted,cursor:"pointer"}}><X size={17}/></button>
        </div>
        <div style={{color:C.muted,fontSize:12,marginBottom:14}}>Parcel: <TrackingCode id={parcel.trk}/> → <span style={{color:C.text}}>{parcel.recipient}</span></div>
        {drivers.map(d=>{
          const p=Math.round(d.load/d.max*100), sel_=sel===d.id;
          const sc=d.status==="active"?C.success:d.status==="break"?C.warn:C.muted;
          return (
            <div key={d.id} onClick={()=>setSel(d.id)} style={{background:sel_?C.accentDim:C.card,border:`1.5px solid ${sel_?C.accent:C.border}`,borderRadius:10,padding:12,marginBottom:8,cursor:"pointer"}}>
              <div style={{display:"flex",alignItems:"center",gap:9}}>
                <Avatar i={d.i} size={34} color={sc}/>
                <div style={{flex:1}}>
                  <div style={{color:C.text,fontWeight:600,fontSize:13}}>{d.name}</div>
                  <div style={{color:C.muted,fontSize:11}}>{d.vehicle} · {d.plate}</div>
                </div>
                <div style={{textAlign:"right"}}>
                  <div style={{color:sc,fontSize:10,fontWeight:700,textTransform:"capitalize"}}>{d.status}</div>
                  <div style={{color:C.muted,fontSize:10}}>{d.load}/{d.max} parcels</div>
                </div>
              </div>
              <div style={{marginTop:8,background:C.navy,borderRadius:3,height:4,overflow:"hidden"}}>
                <div style={{width:`${p}%`,height:"100%",background:p>80?C.danger:p>50?C.warn:C.success,transition:"width 0.3s"}}/>
              </div>
            </div>
          );
        })}
        <div style={{display:"flex",gap:8,marginTop:14}}>
          <Button v="out" onClick={onClose} sz="md">Cancel</Button>
          <Button onClick={()=>sel&&onAssign(parcel.id,sel)} disabled={!sel} sz="md"><CheckCircle size={13}/>Assign Driver</Button>
        </div>
      </div>
    </div>
  );
}
