import { BarChart2, Clock, CreditCard, FileText, LogOut, MapPin, Package, Plus, Truck, Zap } from 'lucide-react'
import Avatar from './Avatar'
import { C } from '../styles/theme'

const NAV = {
  dispatcher:[{id:"overview",icon:BarChart2,l:"Overview"},{id:"bookings",icon:Package,l:"Bookings"},{id:"tracking",icon:MapPin,l:"Tracking"},{id:"drivers",icon:Truck,l:"Drivers"}],
  driver:    [{id:"jobs",icon:Package,l:"My Jobs"},{id:"dhistory",icon:Clock,l:"History"}],
  merchant:  [{id:"new",icon:Plus,l:"New Booking"},{id:"mhistory",icon:FileText,l:"My Bookings"},{id:"billing",icon:CreditCard,l:"Billing"}],
}
const RC = {dispatcher:"#60A5FA",driver:C.accent,merchant:C.success}

export default function Sidebar({role,active,onNav,onLogout,user}) {
  const rc=RC[role]||C.accent;
  return (
    <div style={{width:210,background:C.panel,borderRight: C.border? `1px solid ${C.border}` : 'none',display:"flex",flexDirection:"column",flexShrink:0}}>
      <div style={{padding:"18px 14px",borderBottom: C.border? `1px solid ${C.border}` : 'none'}}>
        <div style={{display:"flex",alignItems:"center",gap:7}}><Zap size={16} color={rc}/><span style={{color:C.text,fontWeight:800,fontSize:12,letterSpacing:"0.08em"}}>SWIFTROUTE</span></div>
        <div style={{display:"inline-flex",marginTop:8,background:`${rc}18`,border:`1px solid ${rc}30`,borderRadius:5,padding:"2px 8px",color:rc,fontSize:9.5,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase"}}>{role} portal</div>
      </div>
      <nav style={{flex:1,padding:"10px 8px"}}>
        {(NAV[role]||[]).map(n => {
          const Icon=n.icon; const a=active===n.id;
          return <button key={n.id} onClick={()=>onNav(n.id)} style={{display:"flex",alignItems:"center",gap:9,width:"100%",padding:"8px 11px",borderRadius:8,border:"none",background:a?`${rc}18`:"transparent",color:a?rc:C.muted,fontSize:12.5,fontWeight:a?600:500,cursor:"pointer",marginBottom:2,fontFamily:"inherit",textAlign:"left"}}>
            <Icon size={14}/>{n.l}{a&&<div style={{marginLeft:"auto",width:5,height:5,borderRadius:"50%",background:rc}}/>}
          </button>;
        })}
      </nav>
      <div style={{padding:10,borderTop: C.border? `1px solid ${C.border}` : 'none'}}>
        <div style={{display:"flex",alignItems:"center",gap:8,padding:"8px 9px",borderRadius:8,background:C.card,marginBottom:7}}>
          <Avatar i={user.i||"U"} size={28} color={rc}/>
          <div style={{overflow:"hidden"}}>
            <div style={{color:C.text,fontSize:12,fontWeight:600,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{user.name}</div>
            <div style={{color:C.muted,fontSize:10}}>● Online</div>
          </div>
        </div>
        <button onClick={onLogout} style={{display:"flex",alignItems:"center",gap:7,width:"100%",padding:"6px 9px",borderRadius:8,border:"none",background:"transparent",color:C.muted,fontSize:12,cursor:"pointer",fontFamily:"inherit"}}>
          <LogOut size={12}/>Sign Out
        </button>
      </div>
    </div>
  );
}
