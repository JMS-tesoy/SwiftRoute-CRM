import { useEffect, useState } from 'react'
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
import { getCurrentUser, logoutUser } from './services/supabaseAuthService'
import { C, FONTS } from './styles/theme'
import {
  PARCEL_STATUS,
  canTransitionParcelStatus,
} from './domain/parcelStatus'

const VIEWS = {
  overview:DispatcherOverview, bookings:DispatcherBookings, tracking:DispatcherTracking, drivers:DispatcherDrivers,
  jobs:DriverJobs, dhistory:DriverJobs,
  new:MerchantNewBooking, mhistory:MerchantBookingHistory, billing:MerchantBilling,
};
const DEFAULT_VIEW = {dispatcher:"overview",driver:"jobs",merchant:"new"};

const getUser = (auth,drivers) => {
  if(auth.id==="dispatcher") return {name:auth.displayName||"Dispatch Center",i:"DC"};
  if(auth.id==="driver"){const d=drivers.find(x=>x.id===auth.driverId)||drivers[0];return {name:auth.displayName||d.name,i:d.i};}
  const m=MERCHANTS_DB[auth.merchantId||"M001"];
  const name=auth.displayName||m?.name||"Merchant";
  return {name,i:name.split(" ").map(w=>w[0]).join("").toUpperCase().slice(0,2)};
};

export default function App() {
  const [auth,setAuth]=useState(null);
  const [isAuthLoading,setIsAuthLoading]=useState(true);
  const [view,setView]=useState("");
  const [parcels,setParcels]=useState(SEED_PARCELS);
  const [drivers]=useState(DRIVERS);

  useEffect(() => {
    let isMounted = true
    const url = new URL(window.location.href)
    const isPasswordRecovery =
      url.hash.includes('type=recovery') || url.searchParams.get('type') === 'recovery'

    if (isPasswordRecovery) {
      setIsAuthLoading(false)
      return () => {
        isMounted = false
      }
    }

    getCurrentUser().then((result) => {
      if (!isMounted) return

      if (result.ok && result.user) {
        setAuth(result.user)
        setView(DEFAULT_VIEW[result.user.id] || "overview")
      }

      setIsAuthLoading(false)
    })

    return () => {
      isMounted = false
    }
  }, [])

  const login=r=>{setAuth(r);setView(DEFAULT_VIEW[r.id]||"overview");};
  const logout=async()=>{await logoutUser();setAuth(null);setView("");};

 
  const assign = (pid, did) => {
  const driver = drivers.find((item) => item.id === did)

  setParcels((currentParcels) =>
    currentParcels.map((parcel) => {
      if (parcel.id !== pid) return parcel

      if (!canTransitionParcelStatus(parcel.status, PARCEL_STATUS.ASSIGNED)) {
        return parcel
      }

      return {
        ...parcel,
        status: PARCEL_STATUS.ASSIGNED,
        dId: did,
        driver: driver?.name || '',
      }
    }),
  )
}

const statusUp = (pid, nextStatus) => {
  setParcels((currentParcels) =>
    currentParcels.map((parcel) => {
      if (parcel.id !== pid) return parcel

      if (!canTransitionParcelStatus(parcel.status, nextStatus)) {
        return parcel
      }

      return {
        ...parcel,
        status: nextStatus,
      }
    }),
  )
}

  
  const addParcel=b=>{setParcels(p=>[{id:`P${Date.now()}`,trk:b.trk,merchant:b.merchantName,mId:b.merchantId,recipient:b.recipient,phone:b.phone,addr:b.address,status: PARCEL_STATUS.PENDING,driver:null,dId:null,wt:parseFloat(b.weight)||1,amt:Math.max(150,Math.round((parseFloat(b.weight)||1)*60+110)),ts:new Date().toTimeString().slice(0,5),notes:b.notes},...p]);};

  if(isAuthLoading) {
    return (
      <div style={{display:"grid",placeItems:"center",height:"100vh",background:C.navy,color:C.muted,fontFamily:"'Sora','Segoe UI',sans-serif"}}>
        <style>{FONTS}</style>
        Checking session...
      </div>
    );
  }

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
