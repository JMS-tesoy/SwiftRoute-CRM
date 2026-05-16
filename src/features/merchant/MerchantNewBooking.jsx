import { useState } from 'react'
import { CheckCircle, Package, Plus } from 'lucide-react'
import Button from '../../components/Button'
import Card from '../../components/Card'
import Header from '../../components/Header'
import TrackingCode from '../../components/TrackingCode'
import { C } from '../../styles/theme'

export default function MerchantNewBooking({merchantId,merchantName,onSubmit}) {
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
      <div style={{marginBottom:12}}><TrackingCode id={newTrk}/></div>
      <p style={{color:C.muted,fontSize:13,margin:"0 0 22px"}}>Your parcel is queued for driver assignment. You'll see it in My Bookings.</p>
      <Button sz="md" onClick={()=>{setDone(false);setF({recipient:"",phone:"",address:"",weight:"",notes:""});}}>
        <Plus size={13}/>Create Another
      </Button>
    </Card>
  );
  return (
    <div style={{maxWidth:540}}>
      <Header title="New Booking" sub="Enter recipient and parcel details"/>
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
          <Button sz="md" onClick={sub}><Package size={13}/>Submit Booking</Button>
        </div>
      </Card>
    </div>
  );
}
