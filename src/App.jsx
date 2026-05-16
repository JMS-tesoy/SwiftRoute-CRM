import React, { useState } from 'react'
import {
  Package, Truck, Users, LogOut, Search, MapPin, Clock,
  CheckCircle, AlertTriangle, Phone, Plus, X, Navigation,
  FileText, CreditCard, BarChart2, ChevronRight, Download,
  TrendingUp, Zap, Eye, Activity, RefreshCw
} from 'lucide-react'

const C = {
  navy:"#07111E", panel:"#0D1B2E", card:"#112236",
  cardHov:"#162B42", border:"",
  accent:"#F97316", accentDim:"rgba(249,115,22,0.13)",
  success:"#22D3A5", successDim:"rgba(34,211,165,0.12)",
  warn:"#FBBF24", warnDim:"rgba(251,191,36,0.12)",
  danger:"#F87171", dangerDim:"rgba(248,113,113,0.12)",
  blue:"#60A5FA", blueDim:"rgba(96,165,250,0.12)",
  purple:"#A78BFA", purpleDim:"rgba(167,139,250,0.12)",
  text:"#EDF2FF", muted:"#5E7A96", dimText:"#3D5A72",
}

const SC = {
  pending:    {l:"Pending",    c:C.warn,    bg:C.warnDim   },
  assigned:   {l:"Assigned",   c:C.blue,    bg:C.blueDim   },
  picked_up:  {l:"Picked Up",  c:C.purple,  bg:C.purpleDim },
  in_transit: {l:"In Transit", c:C.accent,  bg:C.accentDim },
  delivered:  {l:"Delivered",  c:C.success, bg:C.successDim},
  exception:  {l:"Exception",  c:C.danger,  bg:C.dangerDim },
}

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap');`;

const DRIVERS = [
  {id:"D001",name:"Marco Santos",   phone:"0917-234-5678",vehicle:"Motorcycle",plate:"ABC-1234",status:"active",load:4, max:8,  i:"MS"},
  {id:"D002",name:"Ana Reyes",      phone:"0918-345-6789",vehicle:"Van",       plate:"DEF-5678",status:"active",load:6, max:20, i:"AR"},
  {id:"D003",name:"Juan Cruz",      phone:"0919-456-7890",vehicle:"Motorcycle",plate:"GHI-9012",status:"idle",  load:0, max:8,  i:"JC"},
  {id:"D004",name:"Liza Torres",    phone:"0920-567-8901",vehicle:"Sedan",     plate:"JKL-3456",status:"break", load:2, max:10, i:"LT"},
  {id:"D005",name:"Ryan Dela Cruz", phone:"0921-678-9012",vehicle:"Van",       plate:"MNO-7890",status:"active",load:8, max:20, i:"RD"},
]

const MERCHANTS_DB = {
  M001:{name:"TechGadgets PH",  balance:12500, spent:34200, shipments:284},
  M002:{name:"FreshFarm Co.",   balance:4800,  spent:15600, shipments:97 },
  M003:{name:"StyleHub Manila", balance:31000, spent:87400, shipments:512},
}

const SEED_PARCELS = [
  {id:"P001",trk:"KSN-0516-001",merchant:"TechGadgets PH",mId:"M001",recipient:"Jose Bautista",  phone:"0912-111-2222",addr:"123 Rizal St., Makati City",              status:"pending",    driver:null,           dId:null,  wt:1.5,amt:180,ts:"08:00",notes:"Fragile – handle with care"},
  {id:"P002",trk:"KSN-0516-002",merchant:"FreshFarm Co.", mId:"M002",recipient:"Maria Santos",   phone:"0913-222-3333",addr:"456 Mabini Ave., Pasig City",             status:"assigned",   driver:"Marco Santos", dId:"D001",wt:3.0,amt:220,ts:"08:30",notes:""},
  {id:"P003",trk:"KSN-0516-003",merchant:"StyleHub Manila",mId:"M003",recipient:"Carlo Reyes",   phone:"0914-333-4444",addr:"789 Bonifacio High St., BGC Taguig",      status:"picked_up",  driver:"Ana Reyes",    dId:"D002",wt:0.8,amt:150,ts:"07:00",notes:""},
  {id:"P004",trk:"KSN-0516-004",merchant:"TechGadgets PH",mId:"M001",recipient:"Nina Cruz",      phone:"0915-444-5555",addr:"321 Quezon Blvd., Quezon City",           status:"in_transit", driver:"Marco Santos", dId:"D001",wt:2.2,amt:200,ts:"06:30",notes:"Leave at guard if not available"},
  {id:"P005",trk:"KSN-0516-005",merchant:"StyleHub Manila",mId:"M003",recipient:"Pedro Garcia",  phone:"0916-555-6666",addr:"654 Aurora Blvd., Cubao, QC",             status:"delivered",  driver:"Juan Cruz",    dId:"D003",wt:1.0,amt:160,ts:"14:00",notes:""},
  {id:"P006",trk:"KSN-0516-006",merchant:"FreshFarm Co.", mId:"M002",recipient:"Rosa Mendoza",   phone:"0917-666-7777",addr:"987 Shaw Blvd., Mandaluyong City",        status:"exception",  driver:"Liza Torres",  dId:"D004",wt:4.5,amt:280,ts:"07:30",notes:"Customer unavailable – will retry tomorrow"},
  {id:"P007",trk:"KSN-0516-007",merchant:"TechGadgets PH",mId:"M001",recipient:"Luis Flores",    phone:"0918-777-8888",addr:"147 EDSA, Balintawak, Quezon City",       status:"in_transit", driver:"Ryan Dela Cruz",dId:"D005",wt:5.0,amt:320,ts:"06:00",notes:""},
  {id:"P008",trk:"KSN-0516-008",merchant:"StyleHub Manila",mId:"M003",recipient:"Elena Diaz",    phone:"0919-888-9999",addr:"258 Commonwealth Ave., Quezon City",      status:"pending",    driver:null,           dId:null,  wt:2.5,amt:210,ts:"09:00",notes:""},
  {id:"P009",trk:"KSN-0516-009",merchant:"TechGadgets PH",mId:"M001",recipient:"Ramon Villaluz", phone:"0920-999-0001",addr:"369 España Blvd., Sampaloc, Manila",      status:"assigned",   driver:"Ana Reyes",    dId:"D002",wt:1.8,amt:190,ts:"09:30",notes:""},
  {id:"P010",trk:"KSN-0516-010",merchant:"FreshFarm Co.", mId:"M002",recipient:"Cora Aguilar",   phone:"0921-001-1112",addr:"741 Taft Ave., Pasay City",               status:"delivered",  driver:"Marco Santos", dId:"D001",wt:2.0,amt:195,ts:"06:00",notes:""},
]

// ── Atoms ──────────────────────────────────────────────
const Badge = ({status}) => {
  const s = SC[status] || {l:status, c:C.muted, bg:"rgba(94,122,150,0.12)"};
  return <span style={{display:"inline-flex",alignItems:"center",padding:"3px 9px",borderRadius:20,fontSize:11,fontWeight:700,letterSpacing:"0.03em",color:s.c,background:s.bg,border:`1px solid ${s.c}30`}}>{s.l}</span>;
};

const Av = ({i, size=32, color=C.accent}) => (
  <div style={{width:size,height:size,borderRadius:"50%",background:`${color}22`,border:`1.5px solid ${color}44`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:size*.34,fontWeight:700,color,flexShrink:0,fontFamily:"'JetBrains Mono',monospace"}}>{i}</div>
);

const Trk = ({id}) => (
  <code style={{fontFamily:"'JetBrains Mono',monospace",fontSize:11,color:C.accent,letterSpacing:"0.05em",background:C.accentDim,padding:"2px 7px",borderRadius:5}}>{id}</code>
);

const Btn = ({children,onClick,v="pri",sz="sm",disabled}) => {
  const vs={pri:{bg:C.accent,cl:"#fff",br:C.accent},out:{bg:"transparent",cl:C.text,br:C.border},suc:{bg:C.successDim,cl:C.success,br:`${C.success}44`},dan:{bg:C.dangerDim,cl:C.danger,br:`${C.danger}44`}};
  const s=vs[v]||vs.pri;
  return <button onClick={onClick} disabled={disabled} style={{display:"inline-flex",alignItems:"center",gap:5,padding:sz==="sm"?"5px 13px":"8px 20px",borderRadius:8,border:`1px solid ${s.br}`,background:s.bg,color:s.cl,fontSize:sz==="sm"?12:13,fontWeight:600,cursor:disabled?"not-allowed":"pointer",opacity:disabled?.5:1,fontFamily:"inherit",whiteSpace:"nowrap"}}>{children}</button>;
};

const Card = ({children,style={}}) => (
  <div style={{background:C.card,border: C.border? `1px solid ${C.border}` : 'none',borderRadius:12,...style}}>{children}</div>
);

const Stat = ({icon:Icon,label,val,sub,color}) => (
  <Card style={{padding:"16px 18px",borderLeft:`3px solid ${color}`}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
      <div>
        <div style={{color:C.muted,fontSize:10,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase"}}>{label}</div>
        <div style={{color:C.text,fontSize:26,fontWeight:800,margin:"4px 0 2px"}}>{val}</div>
        {sub && <div style={{color:C.dimText,fontSize:11}}>{sub}</div>}
      </div>
      <div style={{width:38,height:38,borderRadius:10,background:`${color}18`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
        <Icon size={17} color={color} />
      </div>
    </div>
  </Card>
);

const Hdr = ({title,sub,action}) => (
  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:20}}>
    <div>
      <h2 style={{color:C.text,fontSize:18,fontWeight:700,margin:0}}>{title}</h2>
      {sub && <p style={{color:C.muted,fontSize:12,margin:"3px 0 0"}}>{sub}</p>}
    </div>
    {action}
  </div>
);

// ── Login ─────────────────────────────────────────────
const ROLES = [
  {id:"dispatcher",label:"Dispatcher",icon:BarChart2,desc:"Manage all incoming bookings, assign drivers, and track every parcel in real time.",color:"#60A5FA",demoUser:"dispatch@swiftroute.ph"},
  {id:"driver",     label:"Driver",    icon:Truck,     desc:"View today's assigned pickups and drops. Update status at each checkpoint.",        color:C.accent,  demoUser:"marco@swiftroute.ph", driverId:"D001"},
  {id:"merchant",   label:"Merchant",  icon:Package,   desc:"Create new bookings, review shipment history, and access billing details.",          color:C.success, demoUser:"ops@techgadgets.ph", merchantId:"M001"},
];

const Login = ({onLogin}) => {
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
};

// ── Sidebar ────────────────────────────────────────────
const NAV = {
  dispatcher:[{id:"overview",icon:BarChart2,l:"Overview"},{id:"bookings",icon:Package,l:"Bookings"},{id:"tracking",icon:MapPin,l:"Tracking"},{id:"drivers",icon:Truck,l:"Drivers"}],
  driver:    [{id:"jobs",icon:Package,l:"My Jobs"},{id:"dhistory",icon:Clock,l:"History"}],
  merchant:  [{id:"new",icon:Plus,l:"New Booking"},{id:"mhistory",icon:FileText,l:"My Bookings"},{id:"billing",icon:CreditCard,l:"Billing"}],
}
const RC = {dispatcher:"#60A5FA",driver:C.accent,merchant:C.success}

const Sidebar = ({role,active,onNav,onLogout,user}) => {
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
          <Av i={user.i||"U"} size={28} color={rc}/>
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
};

// ── Dispatcher Views ───────────────────────────────────
const DOverview = ({parcels,drivers}) => {
  const a=v=>parcels.filter(p=>p.status===v).length;
  const motion=["assigned","picked_up","in_transit"].reduce((s,v)=>s+a(v),0);
  const recent=[...parcels].reverse().slice(0,6);
  return (
    <div>
      <Hdr title="Operations Overview" sub={`Today · ${new Date().toLocaleDateString("en-PH",{month:"long",day:"numeric",year:"numeric"})}`}/>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(145px,1fr))",gap:12,marginBottom:24}}>
        <Stat icon={Package}       label="Total Today"    val={parcels.length}                               color={C.blue}    sub="all bookings"/>
        <Stat icon={Clock}         label="Pending"        val={a("pending")}                                 color={C.warn}    sub="need driver"/>
        <Stat icon={Truck}         label="In Motion"      val={motion}                                       color={C.accent}  sub="active runs"/>
        <Stat icon={CheckCircle}   label="Delivered"      val={a("delivered")}                               color={C.success} sub="completed"/>
        <Stat icon={AlertTriangle} label="Exceptions"     val={a("exception")}                               color={C.danger}  sub="need attention"/>
        <Stat icon={Users}         label="Active Drivers" val={`${drivers.filter(d=>d.status==="active").length}/${drivers.length}`} color={C.purple} sub="on shift"/>
      </div>
      <Card style={{overflow:"hidden"}}>
        <div style={{padding:"13px 18px",borderBottom: C.border? `1px solid ${C.border}` : 'none',display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <span style={{color:C.text,fontWeight:600,fontSize:14}}>Live Feed</span>
          <Activity size={13} color={C.muted}/>
        </div>
        {recent.map((p,i)=>(
          <div key={p.id} style={{display:"flex",alignItems:"center",gap:12,padding:"11px 18px",borderBottom:i<recent.length-1? (C.border? `1px solid ${C.border}` : 'none') : "none"}}>
            <div style={{width:7,height:7,borderRadius:"50%",background:SC[p.status]?.c||C.muted,flexShrink:0,boxShadow:p.status==="in_transit"?`0 0 6px ${C.accent}`:"none"}}/>
            <Trk id={p.trk}/>
            <span style={{color:C.text,fontSize:12.5,flex:1,fontWeight:500}}>{p.recipient}</span>
            <span style={{color:C.muted,fontSize:11,flexShrink:0}}>{p.addr.split(",").slice(-2,-1)[0]?.trim()}</span>
            <Badge status={p.status}/>
          </div>
        ))}
      </Card>
    </div>
  );
};

const AssignModal = ({parcel,drivers,onAssign,onClose}) => {
  const [sel,setSel]=useState(null);
  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.75)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:200}} onClick={onClose}>
      <div style={{background:C.panel,border: C.border? `1px solid ${C.border}` : 'none',borderRadius:16,padding:24,width:400,maxHeight:"80vh",overflow:"auto"}} onClick={e=>e.stopPropagation()}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
          <div style={{color:C.text,fontWeight:700,fontSize:15}}>Assign Driver</div>
          <button onClick={onClose} style={{background:"none",border:"none",color:C.muted,cursor:"pointer"}}><X size={17}/></button>
        </div>
        <div style={{color:C.muted,fontSize:12,marginBottom:14}}>Parcel: <Trk id={parcel.trk}/> → <span style={{color:C.text}}>{parcel.recipient}</span></div>
        {drivers.map(d=>{
          const p=Math.round(d.load/d.max*100), sel_=sel===d.id;
          const sc=d.status==="active"?C.success:d.status==="break"?C.warn:C.muted;
          return (
            <div key={d.id} onClick={()=>setSel(d.id)} style={{background:sel_?C.accentDim:C.card,border:`1.5px solid ${sel_?C.accent:C.border}`,borderRadius:10,padding:12,marginBottom:8,cursor:"pointer"}}>
              <div style={{display:"flex",alignItems:"center",gap:9}}>
                <Av i={d.i} size={34} color={sc}/>
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
          <Btn v="out" onClick={onClose} sz="md">Cancel</Btn>
          <Btn onClick={()=>sel&&onAssign(parcel.id,sel)} disabled={!sel} sz="md"><CheckCircle size={13}/>Assign Driver</Btn>
        </div>
      </div>
    </div>
  );
};

const DBookings = ({parcels,drivers,onAssign}) => {
  const [q,setQ]=useState(""); const [fs,setFs]=useState("all"); const [tgt,setTgt]=useState(null);
  const filt=parcels.filter(p=>{
    const ms=!q||p.trk.includes(q.toUpperCase())||p.recipient.toLowerCase().includes(q.toLowerCase())||p.merchant.toLowerCase().includes(q.toLowerCase());
    return ms&&(fs==="all"||p.status===fs);
  });
  return (
    <div>
      <Hdr title="All Bookings" sub={`${filt.length} parcels`} action={<Btn><Plus size={12}/>New Booking</Btn>}/>
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
            <Trk id={p.trk}/>
            <span style={{color:C.muted,fontSize:11}}>{p.merchant.split(" ")[0]}</span>
            <div><div style={{color:C.text,fontSize:12.5,fontWeight:500}}>{p.recipient}</div><div style={{color:C.muted,fontSize:11}}>{p.addr}</div></div>
            <Badge status={p.status}/>
            <span style={{color:p.driver?C.text:C.dimText,fontSize:12}}>{p.driver||"—"}</span>
            <div>{["pending","assigned"].includes(p.status)&&<Btn onClick={()=>setTgt(p)}><Truck size={10}/>{p.driver?"Reassign":"Assign"}</Btn>}</div>
          </div>
        ))}
      </Card>
      {tgt&&<AssignModal parcel={tgt} drivers={drivers} onAssign={(pid,did)=>{onAssign(pid,did);setTgt(null);}} onClose={()=>setTgt(null)}/>}
    </div>
  );
};

const DTracking = ({parcels}) => {
  const [sel,setSel]=useState(parcels[2]);
  const TL={pending:["Booking Created"],assigned:["Booking Created","Driver Assigned"],picked_up:["Booking Created","Driver Assigned","Parcel Picked Up"],in_transit:["Booking Created","Driver Assigned","Parcel Picked Up","In Transit"],delivered:["Booking Created","Driver Assigned","Parcel Picked Up","In Transit","Delivered ✓"],exception:["Booking Created","Driver Assigned","Pickup Attempted","Delivery Exception ⚠"]};
  return (
    <div style={{display:"grid",gridTemplateColumns:"280px 1fr",gap:14}}>
      <div>
        <Hdr title="Live Tracking" sub={`${parcels.length} parcels`}/>
        <Card style={{overflow:"auto",maxHeight:"calc(100vh - 160px)"}}>
          {parcels.map(p=>(
            <div key={p.id} onClick={()=>setSel(p)} style={{padding:"11px 14px",borderBottom: C.border? `1px solid ${C.border}` : 'none',cursor:"pointer",background:sel?.id===p.id?C.accentDim:"transparent",borderLeft:sel?.id===p.id?`3px solid ${C.accent}`:"3px solid transparent"}}>
              <div style={{display:"flex",justifyContent:"space-between",gap:6,marginBottom:4}}><Trk id={p.trk}/><Badge status={p.status}/></div>
              <div style={{color:C.text,fontSize:12,fontWeight:500}}>{p.recipient}</div>
              <div style={{color:C.muted,fontSize:11}}>{p.addr}</div>
            </div>
          ))}
        </Card>
      </div>
      {sel&&(
        <div>
          <Hdr title="Parcel Detail"/>
          <Card style={{padding:22}}>
            <Trk id={sel.trk}/>
            <h3 style={{color:C.text,fontSize:20,fontWeight:700,margin:"8px 0 2px"}}>{sel.recipient}</h3>
            <p style={{color:C.muted,fontSize:13,margin:"0 0 18px",display:"flex",alignItems:"center",gap:5}}><MapPin size={12}/>{sel.addr}</p>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:20}}>
              {[["Merchant",sel.merchant],["Driver",sel.driver||"Unassigned"],["Weight",`${sel.wt} kg`],["Amount",`₱${sel.amt}.00`],["Phone",sel.phone],["Notes",sel.notes||"—"]].map(([l,v])=>(
                <div key={l} style={{background:C.navy,borderRadius:8,padding:"9px 11px"}}>
                  <div style={{color:C.muted,fontSize:10,textTransform:"uppercase",letterSpacing:"0.07em",fontWeight:700}}>{l}</div>
                  <div style={{color:l==="Driver"&&!sel.driver?C.dimText:C.text,fontSize:12.5,fontWeight:500,marginTop:2}}>{v}</div>
                </div>
              ))}
            </div>
            <div style={{borderTop: C.border? `1px solid ${C.border}` : 'none',paddingTop:16}}>
              <div style={{color:C.muted,fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:14}}>Status Timeline</div>
              {(TL[sel.status]||TL.pending).map((step,i,arr)=>{
                const last=i===arr.length-1, sc=SC[sel.status]?.c||C.muted;
                return (
                  <div key={i} style={{display:"flex",gap:12,alignItems:"flex-start"}}>
                    <div style={{display:"flex",flexDirection:"column",alignItems:"center",flexShrink:0}}>
                      <div style={{width:11,height:11,borderRadius:"50%",background:last?sc:C.success,border:`2px solid ${last?sc:C.success}`,boxShadow:last?`0 0 8px ${sc}50`:""}}/>
                      {i<arr.length-1&&<div style={{width:1,height:22,background:C.border}}/>}
                    </div>
                    <div style={{paddingBottom:i<arr.length-1?4:0}}>
                      <div style={{color:last?sc:C.text,fontSize:12.5,fontWeight:last?600:400}}>{step}</div>
                      <div style={{color:C.dimText,fontSize:10}}>Today · {sel.ts}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

const DDrivers = ({drivers,parcels}) => (
  <div>
    <Hdr title="Driver Management" sub={`${drivers.filter(d=>d.status==="active").length} active of ${drivers.length} drivers`}/>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(270px,1fr))",gap:14}}>
      {drivers.map(d=>{
        const mine=parcels.filter(p=>p.dId===d.id&&["assigned","picked_up","in_transit"].includes(p.status));
        const pct=Math.round(d.load/d.max*100);
        const sc=d.status==="active"?C.success:d.status==="break"?C.warn:C.muted;
        return (
          <Card key={d.id} style={{padding:18}}>
            <div style={{display:"flex",alignItems:"center",gap:11,marginBottom:14}}>
              <Av i={d.i} size={44} color={sc}/>
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
                <Trk id={p.trk}/><span style={{color:C.muted,fontSize:11,flex:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{p.recipient}</span><Badge status={p.status}/>
              </div>
            ))}
            <div style={{display:"flex",gap:6,marginTop:10}}>
              <Btn v="out"><Phone size={11}/>Call</Btn>
              <Btn v="out"><Navigation size={11}/>Track</Btn>
            </div>
          </Card>
        );
      })}
    </div>
  </div>
);

// ── Driver Views ───────────────────────────────────────
const SA = {
  assigned:   [{n:"picked_up", l:"Mark Picked Up",   v:"pri", ic:Package}],
  picked_up:  [{n:"in_transit",l:"Set In Transit",   v:"pri", ic:Truck}],
  in_transit: [{n:"delivered", l:"Mark Delivered",   v:"suc", ic:CheckCircle},{n:"exception",l:"Report Issue",v:"dan",ic:AlertTriangle}],
};

const DriverJobs = ({parcels,driverId,onUpdate}) => {
  const mine=parcels.filter(p=>p.dId===driverId&&!["delivered","exception"].includes(p.status));
  const done=parcels.filter(p=>p.dId===driverId&&["delivered","exception"].includes(p.status));
  return (
    <div>
      <Hdr title="My Jobs Today" sub={`${mine.length} active · ${done.length} completed`}/>
      {mine.length===0&&<Card style={{padding:40,textAlign:"center"}}><CheckCircle size={36} color={C.success} style={{margin:"0 auto 10px",display:"block"}}/><div style={{color:C.text,fontWeight:600}}>All done for today!</div><div style={{color:C.muted,fontSize:13,marginTop:4}}>No active assignments.</div></Card>}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(295px,1fr))",gap:12,marginBottom:24}}>
        {mine.map(p=>{
          const acts=SA[p.status]||[];
          return (
            <div key={p.id} style={{background:C.card,border:`1.5px solid ${SC[p.status]?.c}33`,borderRadius:12,padding:18,borderTop:`3px solid ${SC[p.status]?.c}`}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}><Trk id={p.trk}/><Badge status={p.status}/></div>
              <div style={{color:C.text,fontSize:16,fontWeight:700,marginBottom:3}}>{p.recipient}</div>
              <div style={{display:"flex",alignItems:"flex-start",gap:5,marginBottom:3}}><MapPin size={11} color={C.muted} style={{flexShrink:0,marginTop:2}}/><span style={{color:C.muted,fontSize:12}}>{p.addr}</span></div>
              <div style={{display:"flex",alignItems:"center",gap:5,marginBottom:12}}><Phone size={11} color={C.muted}/><span style={{color:C.muted,fontSize:12}}>{p.phone}</span></div>
              {p.notes&&<div style={{background:C.warnDim,border:`1px solid ${C.warn}30`,borderRadius:6,padding:"5px 9px",fontSize:11,color:C.warn,marginBottom:12}}>📝 {p.notes}</div>}
              <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                <a href={`https://maps.google.com/?q=${encodeURIComponent(p.addr)}`} target="_blank" rel="noreferrer" style={{display:"inline-flex",alignItems:"center",gap:5,padding:"5px 12px",borderRadius:8,textDecoration:"none",background:C.blueDim,border:`1px solid ${C.blue}40`,color:C.blue,fontSize:12,fontWeight:600}}>
                  <Navigation size={11}/>Navigate
                </a>
                {acts.map(a=>{const Ic=a.ic;return <Btn key={a.n} v={a.v} onClick={()=>onUpdate(p.id,a.n)}><Ic size={11}/>{a.l}</Btn>;})}
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
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><Trk id={p.trk}/><Badge status={p.status}/></div>
              <div style={{color:C.text,fontSize:13,fontWeight:500,marginTop:5}}>{p.recipient}</div>
              <div style={{color:C.muted,fontSize:11,marginTop:2}}>{p.addr}</div>
            </div>
          ))}
        </div>
      </>}
    </div>
  );
};

// ── Merchant Views ─────────────────────────────────----
const MNew = ({merchantId,merchantName,onSubmit}) => {
  const [f,setF]=useState({recipient:"",phone:"",address:"",weight:"",notes:""});
  const [done,setDone]=useState(false); const [newTrk,setNewTrk]=useState("");
  const set=k=>e=>setF(p=>({...p,[k]:e.target.value}));
  const inp={background:C.navy,border: C.border? `1px solid ${C.border}` : 'none',borderRadius:8,padding:"10px 13px",color:C.text,fontSize:13,fontFamily:"inherit",outline:"none",width:"100%",boxSizing:"border-box"};
  const rate=Math.max(150,Math.round((parseFloat(f.weight)||1)*60+110));
  const sub=()=>{if(!f.recipient||!f.address)return;const t=`KSN-${Date.now().toString().slice(-6)}`;setNewTrk(t);onSubmit({...f,trk:t,merchantId,merchantName});setDone(true);};
  if(done) return (
    <Card style={{padding:40,textAlign:"center",maxWidth:440,margin:"0 auto"}}>
      <CheckCircle size={44} color={C.success} style={{margin:"0 auto 14px",display:"block"}}/>
      <h3 style={{color:C.text,fontSize:18,fontWeight:700,margin:"0 0 6px"}}>Booking Submitted!</h3>
      <div style={{marginBottom:12}}><Trk id={newTrk}/></div>
      <p style={{color:C.muted,fontSize:13,margin:"0 0 22px"}}>Your parcel is queued for driver assignment. You'll see it in My Bookings.</p>
      <Btn sz="md" onClick={()=>{setDone(false);setF({recipient:"",phone:"",address:"",weight:"",notes:""});}}>
        <Plus size={13}/>Create Another
      </Btn>
    </Card>
  );
  return (
    <div style={{maxWidth:540}}>
      <Hdr title="New Booking" sub="Enter recipient and parcel details"/>
      <Card style={{padding:22}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:13}}>
          {[{l:"Recipient Name *",k:"recipient",ph:"Full name",sp:2},{l:"Phone Number",k:"phone",ph:"09XX-XXX-XXXX"},{l:"Weight (kg)",k:"weight",ph:"e.g. 1.5"},{l:"Delivery Address *",k:"address",ph:"Street, Barangay, City",sp:2},{l:"Special Instructions",k:"notes",ph:"Fragile, leave at door…",ta:true,sp:2}].map(({l,k,ph,sp,ta})=>(
            <div key={k} style={{gridColumn:sp?`span ${sp}`:undefined}}>
              <label style={{color:C.muted,fontSize:10,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",display:"block",marginBottom:6}}>{l}</label>
              {ta?<textarea value={f[k]} onChange={set(k)} placeholder={ph} rows={3} style={{...inp,resize:"vertical"}}/>:<input value={f[k]} onChange={set(k)} placeholder={ph} style={inp}/>}
            </div>
          ))}
        </div>
        <div style={{marginTop:18,padding:"12px 14px",background:C.navy,borderRadius:8,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div><div style={{color:C.muted,fontSize:10,textTransform:"uppercase",letterSpacing:"0.07em",fontWeight:700}}>Estimated Fee</div><div style={{color:C.accent,fontSize:20,fontWeight:800}}>₱{rate}.00</div></div>
          <Btn sz="md" onClick={sub}><Package size={13}/>Submit Booking</Btn>
        </div>
      </Card>
    </div>
  );
};

const MHistory = ({parcels,merchantId}) => {
  const [fs,setFs]=useState("all");
  const mine=parcels.filter(p=>p.mId===merchantId);
  const filt=fs==="all"?mine:mine.filter(p=>p.status===fs);
  return (
    <div>
      <Hdr title="My Bookings" sub={`${mine.length} total shipments`} action={<Btn v="out"><Download size={12}/>Export CSV</Btn>}/>
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
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}><Trk id={p.trk}/><Badge status={p.status}/></div>
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
};

const MBilling = ({merchantId}) => {
  const m=MERCHANTS_DB[merchantId]||{};
  const invs=[{id:"INV-2401",date:"May 15, 2024",count:8, total:1420,paid:true},{id:"INV-2400",date:"May 14, 2024",count:12,total:2140,paid:true},{id:"INV-2399",date:"May 13, 2024",count:6, total:1080,paid:false},{id:"INV-2398",date:"May 12, 2024",count:15,total:2780,paid:true}];
  return (
    <div>
      <Hdr title="Billing & Payments"/>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",gap:12,marginBottom:24}}>
        <Stat icon={CreditCard}  label="Wallet Balance"   val={`₱${m.balance?.toLocaleString()}`}  color={C.accent}/>
        <Stat icon={TrendingUp}  label="Total Spent"      val={`₱${m.spent?.toLocaleString()}`}   color={C.success} sub="all time"/>
        <Stat icon={Package}     label="Total Shipments"  val={m.shipments||0}                      color={C.blue}    sub="all time"/>
        <Stat icon={RefreshCw}   label="Pending Balance"  val="₱1,080"                              color={C.warn}    sub="awaiting payment"/>
      </div>
      <Card style={{overflow:"hidden"}}>
        <div style={{padding:"13px 18px",borderBottom: C.border? `1px solid ${C.border}` : 'none',display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <span style={{color:C.text,fontWeight:600}}>Invoices</span>
          <Btn v="out" sz="sm"><Download size={11}/>Download All</Btn>
        </div>
        {invs.map((inv,i)=>(
          <div key={inv.id} style={{display:"flex",alignItems:"center",gap:13,padding:"13px 18px",borderBottom:i<invs.length-1? (C.border? `1px solid ${C.border}` : 'none') : "none"}}>
            <div style={{width:36,height:36,borderRadius:8,background:C.navy,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
              <FileText size={15} color={C.muted}/>
            </div>
            <div style={{flex:1}}>
              <div style={{color:C.text,fontSize:13,fontWeight:600}}>{inv.id}</div>
              <div style={{color:C.muted,fontSize:11}}>{inv.date} · {inv.count} shipments</div>
            </div>
            <div style={{textAlign:"right",flexShrink:0}}>
              <div style={{color:C.text,fontWeight:700}}>₱{inv.total.toLocaleString()}.00</div>
              <Badge status={inv.paid?"delivered":"pending"}/>
            </div>
            <Btn v="out" sz="sm"><Eye size={11}/>View</Btn>
          </div>
        ))}
      </Card>
    </div>
  );
};

// ── App Root ───────────────────────────────────────────
const VIEWS = {
  overview:DOverview, bookings:DBookings, tracking:DTracking, drivers:DDrivers,
  jobs:DriverJobs, dhistory:DriverJobs,
  new:MNew, mhistory:MHistory, billing:MBilling,
};
const DEFAULT_VIEW = {dispatcher:"overview",driver:"jobs",merchant:"new"};

const getUser = (auth,drivers) => {
  if(auth.id==="dispatcher") return {name:"Dispatch Center",i:"DC"};
  if(auth.id==="driver"){const d=drivers.find(x=>x.id===auth.driverId)||drivers[0];return {name:d.name,i:d.i};}
  const m=MERCHANTS_DB[auth.merchantId||"M001"];return {name:m?.name||"Merchant",i:(m?.name||"M").split(" ").map(w=>w[0]).join("").toUpperCase().slice(0,2)};
};

export default function App() {
  const [auth,setAuth]=useState(null);
  const [view,setView]=useState("");
  const [parcels,setParcels]=useState(SEED_PARCELS);
  const [drivers]=useState(DRIVERS);

  const login=r=>{setAuth(r);setView(DEFAULT_VIEW[r.id]||"overview");};
  const logout=()=>{setAuth(null);setView("");};

  const assign=(pid,did)=>{const d=drivers.find(x=>x.id===did);setParcels(p=>p.map(x=>x.id===pid?{...x,status:"assigned",dId:did,driver:d?.name||""}:x));};
  const statusUp=(pid,ns)=>setParcels(p=>p.map(x=>x.id===pid?{...x,status:ns}:x));
  const addParcel=b=>{setParcels(p=>[{id:`P${Date.now()}`,trk:b.trk,merchant:b.merchantName,mId:b.merchantId,recipient:b.recipient,phone:b.phone,addr:b.address,status:"pending",driver:null,dId:null,wt:parseFloat(b.weight)||1,amt:Math.max(150,Math.round((parseFloat(b.weight)||1)*60+110)),ts:new Date().toTimeString().slice(0,5),notes:b.notes},...p]);};

  if(!auth) return <Login onLogin={login}/>;

  const user=getUser(auth,drivers);
  const View=VIEWS[view];
  const props={parcels,drivers,driverId:auth.driverId||"D001",merchantId:auth.merchantId||"M001",merchantName:user.name,onAssign:assign,onUpdate:statusUp,onSubmit:addParcel};

  return (
    <div style={{display:"flex",height:"100vh",background:C.navy,overflow:"hidden",fontFamily:"'Sora','Segoe UI',sans-serif"}}>
      <style>{FONTS}</style>
      <Sidebar role={auth.id} active={view} onNav={setView} onLogout={logout} user={user}/>
      <main style={{flex:1,overflow:"auto",padding:"22px 24px",background:C.navy}}>
        <div style={{maxWidth:1180}}>
          {View?<View {...props}/>:<div style={{color:C.muted,padding:40,textAlign:"center"}}>Select a section from the sidebar.</div>}
        </div>
      </main>
    </div>
  );
}
