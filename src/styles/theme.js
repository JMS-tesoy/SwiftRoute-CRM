export const C = {
  navy:"#07111E", panel:"#0D1B2E", card:"#112236",
  cardHov:"#162B42", border:"",
  accent:"#F97316", accentDim:"rgba(249,115,22,0.13)",
  success:"#22D3A5", successDim:"rgba(34,211,165,0.12)",
  warn:"#FBBF24", warnDim:"rgba(251,191,36,0.12)",
  danger:"#F87171", dangerDim:"rgba(248,113,113,0.12)",
  blue:"#60A5FA", blueDim:"rgba(96,165,250,0.12)",
  purple:"#A78BFA", purpleDim:"rgba(167,139,250,0.12)",
  text:"#EDF2FF", muted:"#5E7A96", dimText:"#3D5A72",
}

export const SC = {
  pending:    {l:"Pending",    c:C.warn,    bg:C.warnDim   },
  assigned:   {l:"Assigned",   c:C.blue,    bg:C.blueDim   },
  picked_up:  {l:"Picked Up",  c:C.purple,  bg:C.purpleDim },
  in_transit: {l:"In Transit", c:C.accent,  bg:C.accentDim },
  delivered:  {l:"Delivered",  c:C.success, bg:C.successDim},
  exception:  {l:"Exception",  c:C.danger,  bg:C.dangerDim },
}

export const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap');`;
