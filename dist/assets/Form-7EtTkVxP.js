import{j as a}from"./ui-lib-BXWiyqDg.js";import{a as c}from"./vendor-Co30WLpf.js";import{L as h}from"./index-D4vU6pq_.js";import{d as l}from"./data-DuFSemaq.js";import"./toast-CmnIbAiv.js";function N(){const{lang:t}=c.useContext(h),r=l[t].labels,i=l[t].propertyType;l[t].condition;const[e,m]=c.useState({name:"",phone:"",address:"",propertyType:i[0],rooms:"",area:"",price:""}),o=n=>{const{name:s,value:d}=n.target;s==="phone"&&!/^\d*$/.test(d)||m({...e,[s]:d})},p=()=>{if(!e.name||!e.phone||!e.address){alert(r.name);return}const n=t==="en"?`
  🏠 Property Inquiry 🏠

  📞 Phone Number: ${e.phone}
  🏡 Number of Rooms: ${e.rooms}
  📏 Area: ${e.area} sqm
  📌 Property Condition: ${e.condition}
  💰 Budget: $${e.price} (Negotiable)
  👤 Name: ${e.name}
`:`
  🏠 استفسار عن العقار 🏠

  📞 رقم الهاتف: ${e.phone}
  🏡 عدد الغرف: ${e.rooms}
  📏 المساحة: ${e.area} م²
  📌 حالة العقار: ${e.condition}
  💰 الميزانية: $${e.price} (قابل للتفاوض)
  👤 الاسم: ${e.name}
`,u=`https://wa.me/+201061380485?text=${encodeURIComponent(n)}`;window.open(u,"_blank")};return a.jsxs("div",{className:"max-w-md mx-auto bg-white p-6 rounded-xl shadow-lg overflow-hidden","data-aos":"fade-up",children:[a.jsx("h2",{className:"text-xl font-semibold mb-4 text-center","data-aos":"fade-up",children:r.search}),a.jsx("div",{className:"mb-4","data-aos":"fade-right",children:a.jsx("input",{type:"text",name:"name",placeholder:r.name,value:e.name,onChange:o,className:"w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 outline-none"})}),a.jsx("div",{className:"mb-4","data-aos":"fade-left",children:a.jsx("input",{type:"tel",name:"phone",placeholder:r.phone,value:e.phone,onChange:o,className:"w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 outline-none"})}),a.jsx("div",{className:"mb-4","data-aos":"fade-right",children:a.jsx("input",{type:"text",name:"address",placeholder:r.address,value:e.address,onChange:o,className:"w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 outline-none"})}),a.jsx("div",{className:"mb-4","data-aos":"fade-left",children:a.jsx("select",{name:"propertyType",value:e.propertyType,onChange:o,className:"w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 outline-none",children:i.map((n,s)=>a.jsx("option",{value:n,children:n},s))})}),a.jsx("div",{className:"mb-4","data-aos":"fade-right",children:a.jsx("input",{type:"number",name:"rooms",placeholder:r.rooms,value:e.rooms,onChange:o,className:"w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 outline-none"})}),a.jsx("div",{className:"mb-4","data-aos":"fade-left",children:a.jsx("input",{type:"number",name:"area",placeholder:r.area,value:e.area,onChange:o,className:"w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 outline-none"})}),a.jsx("div",{className:"mb-4","data-aos":"fade-right",children:a.jsx("input",{type:"number",name:"price",placeholder:r.price,value:e.price,onChange:o,className:"w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 outline-none"})}),a.jsx("button",{onClick:p,className:"w-full bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition-all","data-aos":"fade-up",children:r.search})]})}export{N as default};
