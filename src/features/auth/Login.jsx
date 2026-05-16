import { useState } from 'react'
import { BarChart2, ChevronRight, Package, Truck, Zap } from 'lucide-react'
import { C, FONTS } from '../../styles/theme'

const ROLES = [
  {id:"dispatcher",label:"Dispatcher",icon:BarChart2,desc:"Manage all incoming bookings, assign drivers, and track every parcel in real time.",color:"#60A5FA",demoUser:"dispatch@swiftroute.ph"},
  {id:"driver",     label:"Driver",    icon:Truck,     desc:"View today's assigned pickups and drops. Update status at each checkpoint.",        color:C.accent,  demoUser:"marco@swiftroute.ph", driverId:"D001"},
  {id:"merchant",   label:"Merchant",  icon:Package,   desc:"Create new bookings, review shipment history, and access billing details.",          color:C.success, demoUser:"ops@techgadgets.ph", merchantId:"M001"},
];

export default function Login({onLogin}) {
  const [hov,setHov] = useState(null);
  return (
    <div style={{minHeight:"100vh",background:C.navy,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:24,backgroundImage:`radial-gradient(ellipse at 15% 50%, ${C.accentDim} 0%, transparent 55%), radial-gradient(ellipse at 85% 15%, rgba(96,165,250,0.06) 0%, transparent 55%)`}}>
      <style>{FONTS}</style>
      <div style={{textAlign:"center",marginBottom:20}}>
        <div style={{display:"inline-flex",alignItems:"center",gap:8,background:C.accentDim,border:`1px solid ${C.accent}40`,borderRadius:40,padding:"8px 18px",marginBottom:18}}>
          <Zap size={16} color={C.accent} />
          <span style={{color:C.accent,fontWeight:800,fontSize:12,letterSpacing:"0.12em"}}>SWIFTROUTE CRM · DEMO</span>
        </div>
        <h1 style={{color:C.text,fontSize:40,fontWeight:800,margin:0,letterSpacing:"-0.025em",lineHeight:1.1}}>Parcel Operations<br/>Portal</h1>
        <p style={{color:C.muted,margin:"12px 0 0",fontSize:14}}>Select a role to enter the demo environment</p>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:14,maxWidth:880,width:"100%"}}>
        {ROLES.map(r => {
          const Icon=r.icon; const h=hov===r.id;
          return (
            <div key={r.id} onMouseEnter={()=>setHov(r.id)} onMouseLeave={()=>setHov(null)}
              onClick={()=>onLogin(r)}
              style={{background:h?C.cardHov:C.panel,border: 'none',borderRadius:16,padding:26,cursor:"pointer",transition:"all 0.18s",transform:h?"translateY(-4px)":"none"}}>
              <div style={{width:50,height:50,borderRadius:13,background:`${r.color}18`,border:'none',display:"flex",alignItems:"center",justifyContent:"center",marginBottom:16}}>
                <Icon size={23} color={r.color} />
              </div>
              <div style={{color:C.text,fontSize:18,fontWeight:700,marginBottom:6}}>{r.label}</div>
              <div style={{color:C.muted,fontSize:12.5,lineHeight:1.65,marginBottom:18}}>{r.desc}</div>
              <div style={{background:C.navy,borderRadius:8,padding:"9px 12px",fontFamily:"'JetBrains Mono',monospace",fontSize:11}}>
                <div style={{color:C.dimText}}>user: <span style={{color:r.color}}>{r.demoUser}</span></div>
                <div style={{color:C.dimText,marginTop:2}}>pass: <span style={{color:r.color}}>demo2024</span></div>
              </div>
              <div style={{marginTop:14,display:"flex",alignItems:"center",gap:5,color:h?r.color:C.dimText,fontSize:12,fontWeight:600,transition:"color 0.18s"}}>Enter Portal <ChevronRight size={13}/></div>
            </div>
          );
        })}
      </div>
      <p style={{color:C.dimText,fontSize:11,marginTop:28}}>Demo environment · All data is simulated · SwiftRoute v2.4</p>
    </div>
  );
}
