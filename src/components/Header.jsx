import { C } from '../styles/theme'

export default function Header({title,sub,action}) {
  return (
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:20}}>
      <div>
        <h2 style={{color:C.text,fontSize:18,fontWeight:700,margin:0}}>{title}</h2>
        {sub && <p style={{color:C.muted,fontSize:12,margin:"3px 0 0"}}>{sub}</p>}
      </div>
      {action}
    </div>
  );
}
