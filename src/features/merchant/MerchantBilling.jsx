import { CreditCard, Download, Eye, FileText, Package, RefreshCw, TrendingUp } from 'lucide-react'
import Badge from '../../components/Badge'
import Button from '../../components/Button'
import Card from '../../components/Card'
import Header from '../../components/Header'
import StatCard from '../../components/StatCard'
import { MERCHANTS_DB } from '../../data/demoData'
import { C } from '../../styles/theme'

export default function MerchantBilling({merchantId}) {
  const m=MERCHANTS_DB[merchantId]||{};
  const invs=[{id:"INV-2401",date:"May 15, 2024",count:8, total:1420,paid:true},{id:"INV-2400",date:"May 14, 2024",count:12,total:2140,paid:true},{id:"INV-2399",date:"May 13, 2024",count:6, total:1080,paid:false},{id:"INV-2398",date:"May 12, 2024",count:15,total:2780,paid:true}];
  return (
    <div>
      <Header title="Billing & Payments"/>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",gap:12,marginBottom:24}}>
        <StatCard icon={CreditCard}  label="Wallet Balance"   val={`₱${m.balance?.toLocaleString()}`}  color={C.accent}/>
        <StatCard icon={TrendingUp}  label="Total Spent"      val={`₱${m.spent?.toLocaleString()}`}   color={C.success} sub="all time"/>
        <StatCard icon={Package}     label="Total Shipments"  val={m.shipments||0}                      color={C.blue}    sub="all time"/>
        <StatCard icon={RefreshCw}   label="Pending Balance"  val="₱1,080"                              color={C.warn}    sub="awaiting payment"/>
      </div>
      <Card style={{overflow:"hidden"}}>
        <div style={{padding:"13px 18px",borderBottom: C.border? `1px solid ${C.border}` : 'none',display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <span style={{color:C.text,fontWeight:600}}>Invoices</span>
          <Button v="out" sz="sm"><Download size={11}/>Download All</Button>
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
            <Button v="out" sz="sm"><Eye size={11}/>View</Button>
          </div>
        ))}
      </Card>
    </div>
  );
}
