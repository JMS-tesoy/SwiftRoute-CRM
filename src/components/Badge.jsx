import { C, SC } from '../styles/theme'

export default function Badge({status}) {
  const s = SC[status] || {l:status, c:C.muted, bg:"rgba(94,122,150,0.12)"};
  return <span style={{display:"inline-flex",alignItems:"center",padding:"3px 9px",borderRadius:20,fontSize:11,fontWeight:700,letterSpacing:"0.03em",color:s.c,background:s.bg,border:`1px solid ${s.c}30`}}>{s.l}</span>;
}
