import { useState } from 'react'
import Sidebar from './components/Sidebar'
import { DRIVERS, MERCHANTS_DB, SEED_PARCELS } from './data/demoData'
import Login from './features/auth/Login'
import DispatcherBookings from './features/dispatcher/DispatcherBookings'
import DispatcherDrivers from './features/dispatcher/DispatcherDrivers'
import DispatcherOverview from './features/dispatcher/DispatcherOverview'
import DispatcherTracking from './features/dispatcher/DispatcherTracking'
import DriverJobs from './features/driver/DriverJobs'
import MerchantBilling from './features/merchant/MerchantBilling'
import MerchantBookingHistory from './features/merchant/MerchantBookingHistory'
import MerchantNewBooking from './features/merchant/MerchantNewBooking'
import { C, FONTS } from './styles/theme'

const VIEWS = {
  overview:DispatcherOverview, bookings:DispatcherBookings, tracking:DispatcherTracking, drivers:DispatcherDrivers,
  jobs:DriverJobs, dhistory:DriverJobs,
  new:MerchantNewBooking, mhistory:MerchantBookingHistory, billing:MerchantBilling,
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
