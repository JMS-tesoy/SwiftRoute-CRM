import { C } from '../styles/theme'

export default function Card({children,style={}}) {
  return <div style={{background:C.card,border: C.border? `1px solid ${C.border}` : 'none',borderRadius:12,...style}}>{children}</div>;
}
