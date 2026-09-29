export type CourierProvider = 'Steadfast' | 'Pathao Courier' | 'RedX' | 'Paperfly';
const delay = (ms:number) => new Promise(resolve => setTimeout(resolve, ms));
export async function fetchCustomerCourierHistory(phone:string, provider?:CourierProvider){ await delay(700); return { phone, provider: provider || 'Steadfast', total:7, delivered:5, returned:1, cancelled:1, demo:true }; }
export async function fetchCourierCustomerId(phone:string, provider:CourierProvider){ await delay(600); return { phone, provider, id: provider==='Steadfast'?'STF-CUS-10482':provider==='Pathao Courier'?'PTH-CUS-7821':'RDX-CUS-4421', demo:true }; }
export async function createShipment(orderId:string, provider:CourierProvider){ await delay(900); return { orderId, provider, trackingId: provider==='Steadfast'?'STF-982341':provider==='Pathao Courier'?'PTH-782341':'RDX-551234', status:'Shipment Created', demo:true }; }
export async function testCourierConnection(provider:CourierProvider){ await delay(500); return { provider, connected:true, demo:true }; }
