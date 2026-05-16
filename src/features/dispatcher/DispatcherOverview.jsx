import { Activity, AlertTriangle, CheckCircle, Clock, Package, Truck, Users } from 'lucide-react'
import Badge from '../../components/Badge'
import Card from '../../components/Card'
import Header from '../../components/Header'
import StatCard from '../../components/StatCard'
import TrackingCode from '../../components/TrackingCode'
import { C, SC } from '../../styles/theme'

export default function DispatcherOverview({parcels,drivers}) {
  const a=v=>parcels.filter(p=>p.status===v).length;
  const motion=["assigned","picked_up","in_transit"].reduce((s,v)=>s+a(v),0);
  const recent=[...parcels].reverse().slice(0,6);
  return (
    <div>
      <Header title="Operations Overview" sub={`Today · ${new Date().toLocaleDateString("en-PH",{month:"long",day:"numeric",year:"numeric"})}`}/>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(145px,1fr))",gap:12,marginBottom:24}}>
        <StatCard icon={Package}       label="Total Today"    val={parcels.length}                               color={C.blue}    sub="all bookings"/>
        <StatCard icon={Clock}         label="Pending"        val={a("pending")}                                 color={C.warn}    sub="need driver"/>
        <StatCard icon={Truck}         label="In Motion"      val={motion}                                       color={C.accent}  sub="active runs"/>
        <StatCard icon={CheckCircle}   label="Delivered"      val={a("delivered")}                               color={C.success} sub="completed"/>
        <StatCard icon={AlertTriangle} label="Exceptions"     val={a("exception")}                               color={C.danger}  sub="need attention"/>
        <StatCard icon={Users}         label="Active Drivers" val={`${drivers.filter(d=>d.status==="active").length}/${drivers.length}`} color={C.purple} sub="on shift"/>
      </div>
      <Card style={{overflow:"hidden"}}>
        <div style={{padding:"13px 18px",borderBottom: C.border? `1px solid ${C.border}` : 'none',display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <span style={{color:C.text,fontWeight:600,fontSize:14}}>Live Feed</span>
          <Activity size={13} color={C.muted}/>
        </div>
        {recent.map((p,i)=>(
          <div key={p.id} style={{display:"flex",alignItems:"center",gap:12,padding:"11px 18px",borderBottom:i<recent.length-1? (C.border? `1px solid ${C.border}` : 'none') : "none"}}>
            <div style={{width:7,height:7,borderRadius:"50%",background:SC[p.status]?.c||C.muted,flexShrink:0,boxShadow:p.status==="in_transit"?`0 0 6px ${C.accent}`:"none"}}/>
            <TrackingCode id={p.trk}/>
            <span style={{color:C.text,fontSize:12.5,flex:1,fontWeight:500}}>{p.recipient}</span>
            <span style={{color:C.muted,fontSize:11,flexShrink:0}}>{p.addr.split(",").slice(-2,-1)[0]?.trim()}</span>
            <Badge status={p.status}/>
          </div>
        ))}
      </Card>
    </div>
  );
}
