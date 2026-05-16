import { C } from '../styles/theme'

export default function Avatar({i, size=32, color=C.accent}) {
  return (
    <div style={{width:size,height:size,borderRadius:"50%",background:`${color}22`,border:`1.5px solid ${color}44`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:size*.34,fontWeight:700,color,flexShrink:0,fontFamily:"'JetBrains Mono',monospace"}}>{i}</div>
  );
}
