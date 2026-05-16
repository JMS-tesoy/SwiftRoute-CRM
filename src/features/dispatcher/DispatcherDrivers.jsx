import { Navigation, Phone } from 'lucide-react'
import Avatar from '../../components/Avatar'
import Badge from '../../components/Badge'
import Button from '../../components/Button'
import Card from '../../components/Card'
import Header from '../../components/Header'
import TrackingCode from '../../components/TrackingCode'
import { C } from '../../styles/theme'

export default function DispatcherDrivers({drivers,parcels}) {
  return (
    <div>
      <Header title="Driver Management" sub={`${drivers.filter(d=>d.status==="active").length} active of ${drivers.length} drivers`}/>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(270px,1fr))",gap:14}}>
        {drivers.map(d=>{
          const mine=parcels.filter(p=>p.dId===d.id&&["assigned","picked_up","in_transit"].includes(p.status));
          const pct=Math.round(d.load/d.max*100);
          const sc=d.status==="active"?C.success:d.status==="break"?C.warn:C.muted;
          return (
            <Card key={d.id} style={{padding:18}}>
              <div style={{display:"flex",alignItems:"center",gap:11,marginBottom:14}}>
                <Avatar i={d.i} size={44} color={sc}/>
                <div style={{flex:1}}>
                  <div style={{color:C.text,fontWeight:700,fontSize:14}}>{d.name}</div>
                  <div style={{color:C.muted,fontSize:11}}>{d.vehicle} · {d.plate}</div>
                </div>
                <span style={{padding:"2px 8px",borderRadius:20,fontSize:10,fontWeight:700,background:`${sc}18`,color:sc,textTransform:"capitalize"}}>{d.status}</span>
              </div>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
                <span style={{color:C.muted,fontSize:11}}>Load capacity</span>
                <span style={{color:C.text,fontSize:11,fontFamily:"'JetBrains Mono',monospace"}}>{d.load}/{d.max}</span>
              </div>
              <div style={{background:C.navy,borderRadius:3,height:5,overflow:"hidden",marginBottom:12}}>
                <div style={{width:`${pct}%`,height:"100%",background:pct>80?C.danger:pct>50?C.warn:C.success,transition:"width 0.3s"}}/>
              </div>
              <div style={{color:C.muted,fontSize:11,marginBottom:6}}>Active jobs ({mine.length})</div>
              {mine.slice(0,2).map(p=>(
                <div key={p.id} style={{display:"flex",alignItems:"center",gap:6,background:C.navy,borderRadius:6,padding:"5px 8px",marginBottom:4}}>
                  <TrackingCode id={p.trk}/><span style={{color:C.muted,fontSize:11,flex:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{p.recipient}</span><Badge status={p.status}/>
                </div>
              ))}
              <div style={{display:"flex",gap:6,marginTop:10}}>
                <Button v="out"><Phone size={11}/>Call</Button>
                <Button v="out"><Navigation size={11}/>Track</Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
