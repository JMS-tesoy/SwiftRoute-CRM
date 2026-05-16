import { C } from '../styles/theme'

export default function TrackingCode({id}) {
  return <code style={{fontFamily:"'JetBrains Mono',monospace",fontSize:11,color:C.accent,letterSpacing:"0.05em",background:C.accentDim,padding:"2px 7px",borderRadius:5}}>{id}</code>;
}
