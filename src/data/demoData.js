export const DRIVERS = [
  {id:"D001",name:"Marco Santos",   phone:"0917-234-5678",vehicle:"Motorcycle",plate:"ABC-1234",status:"active",load:4, max:8,  i:"MS"},
  {id:"D002",name:"Ana Reyes",      phone:"0918-345-6789",vehicle:"Van",       plate:"DEF-5678",status:"active",load:6, max:20, i:"AR"},
  {id:"D003",name:"Juan Cruz",      phone:"0919-456-7890",vehicle:"Motorcycle",plate:"GHI-9012",status:"idle",  load:0, max:8,  i:"JC"},
  {id:"D004",name:"Liza Torres",    phone:"0920-567-8901",vehicle:"Sedan",     plate:"JKL-3456",status:"break", load:2, max:10, i:"LT"},
  {id:"D005",name:"Ryan Dela Cruz", phone:"0921-678-9012",vehicle:"Van",       plate:"MNO-7890",status:"active",load:8, max:20, i:"RD"},
]

export const MERCHANTS_DB = {
  M001:{name:"TechGadgets PH",  balance:12500, spent:34200, shipments:284},
  M002:{name:"FreshFarm Co.",   balance:4800,  spent:15600, shipments:97 },
  M003:{name:"StyleHub Manila", balance:31000, spent:87400, shipments:512},
}

export const SEED_PARCELS = [
  {id:"P001",trk:"KSN-0516-001",merchant:"TechGadgets PH",mId:"M001",recipient:"Jose Bautista",  phone:"0912-111-2222",addr:"123 Rizal St., Makati City",              status:"pending",    driver:null,           dId:null,  wt:1.5,amt:180,ts:"08:00",notes:"Fragile – handle with care"},
  {id:"P002",trk:"KSN-0516-002",merchant:"FreshFarm Co.", mId:"M002",recipient:"Maria Santos",   phone:"0913-222-3333",addr:"456 Mabini Ave., Pasig City",             status:"assigned",   driver:"Marco Santos", dId:"D001",wt:3.0,amt:220,ts:"08:30",notes:""},
  {id:"P003",trk:"KSN-0516-003",merchant:"StyleHub Manila",mId:"M003",recipient:"Carlo Reyes",   phone:"0914-333-4444",addr:"789 Bonifacio High St., BGC Taguig",      status:"picked_up",  driver:"Ana Reyes",    dId:"D002",wt:0.8,amt:150,ts:"07:00",notes:""},
  {id:"P004",trk:"KSN-0516-004",merchant:"TechGadgets PH",mId:"M001",recipient:"Nina Cruz",      phone:"0915-444-5555",addr:"321 Quezon Blvd., Quezon City",           status:"in_transit", driver:"Marco Santos", dId:"D001",wt:2.2,amt:200,ts:"06:30",notes:"Leave at guard if not available"},
  {id:"P005",trk:"KSN-0516-005",merchant:"StyleHub Manila",mId:"M003",recipient:"Pedro Garcia",  phone:"0916-555-6666",addr:"654 Aurora Blvd., Cubao, QC",             status:"delivered",  driver:"Juan Cruz",    dId:"D003",wt:1.0,amt:160,ts:"14:00",notes:""},
{id:"P006",trk:"KSN-0516-006",merchant:"FreshFarm Co.", mId:"M002",recipient:"Rosa Mendoza",   phone:"0917-666-7777",addr:"987 Shaw Blvd., Mandaluyong City",        status:"exception",  driver:"Marco Santos", dId:"D001",wt:4.5,amt:280,ts:"07:30",notes:"Customer unavailable – will retry tomorrow"},
  {id:"P007",trk:"KSN-0516-007",merchant:"TechGadgets PH",mId:"M001",recipient:"Luis Flores",    phone:"0918-777-8888",addr:"147 EDSA, Balintawak, Quezon City",       status:"in_transit", driver:"Ryan Dela Cruz",dId:"D005",wt:5.0,amt:320,ts:"06:00",notes:""},
  {id:"P008",trk:"KSN-0516-008",merchant:"StyleHub Manila",mId:"M003",recipient:"Elena Diaz",    phone:"0919-888-9999",addr:"258 Commonwealth Ave., Quezon City",      status:"pending",    driver:null,           dId:null,  wt:2.5,amt:210,ts:"09:00",notes:""},
  {id:"P009",trk:"KSN-0516-009",merchant:"TechGadgets PH",mId:"M001",recipient:"Ramon Villaluz", phone:"0920-999-0001",addr:"369 España Blvd., Sampaloc, Manila",      status:"assigned",   driver:"Ana Reyes",    dId:"D002",wt:1.8,amt:190,ts:"09:30",notes:""},
  {id:"P010",trk:"KSN-0516-010",merchant:"FreshFarm Co.", mId:"M002",recipient:"Cora Aguilar",   phone:"0921-001-1112",addr:"741 Taft Ave., Pasay City",               status:"delivered",  driver:"Marco Santos", dId:"D001",wt:2.0,amt:195,ts:"06:00",notes:""},
]
