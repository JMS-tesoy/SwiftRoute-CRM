import Card from './Card'
import { C } from '../styles/theme'

export default function StatCard({icon:Icon,label,val,sub,color}) {
  return (
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
}
