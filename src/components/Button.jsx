import { C } from '../styles/theme'

export default function Button({children,onClick,v="pri",sz="sm",disabled}) {
  const vs={pri:{bg:C.accent,cl:"#fff",br:C.accent},out:{bg:"transparent",cl:C.text,br:C.border},suc:{bg:C.successDim,cl:C.success,br:`${C.success}44`},dan:{bg:C.dangerDim,cl:C.danger,br:`${C.danger}44`}};
  const s=vs[v]||vs.pri;
  return <button onClick={onClick} disabled={disabled} style={{display:"inline-flex",alignItems:"center",gap:5,padding:sz==="sm"?"5px 13px":"8px 20px",borderRadius:8,border:`1px solid ${s.br}`,background:s.bg,color:s.cl,fontSize:sz==="sm"?12:13,fontWeight:600,cursor:disabled?"not-allowed":"pointer",opacity:disabled?.5:1,fontFamily:"inherit",whiteSpace:"nowrap"}}>{children}</button>;
}
