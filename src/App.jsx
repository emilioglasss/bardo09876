import { useState, useEffect, useRef } from "react";
import {
  ShoppingCart,
  X,
  Plus,
import { useState, useEffect, useRef } from "react";
import { ShoppingCart, X, Plus, Minus, Instagram, MapPin, Clock, MessageCircle, ChevronDown, Flame, Star, Zap } from "lucide-react";
 
const Y = "#f5b400";
const BK = "#080808";
 
const BURGERS = [
  { id:1, name:"CHEESE", desc:"Medallón de carne, cheddar y mayo casera.", emoji:"🧀" },
  { id:2, name:"CLÁSICA", desc:"Medallón de carne, cheddar, lechuga, tomate y pepinillos. Con salsita de la casa aprobada por Chayanne.", emoji:"🥗", badge:"POPULAR" },
  { id:3, name:"LA DE SIEMPRE", desc:"Medallón de carne, cheddar, panceta y mayo casera.", emoji:"🥓" },
  { id:4, name:"ONION BACON", desc:"Medallón de carne, cheddar, cebollita caramelizada, panceta, pepinillos y mayo.", emoji:"🧅" },
  { id:5, name:"OKLAHOMA", desc:"Medallón de carne, cebolla smasheada, cheddar y mayo casera.", emoji:"🔥" },
  { id:6, name:"OKLAFORT", desc:"Medallón de carne, cebolla smasheada. Roquefort con un toque distinto. ¡Mamaaaa! 😈", emoji:"💥", badge:"WOW" },
  { id:7, name:"CRISPY", desc:"Medallón de carne, cheddar, panceta, cebolla crispy y barbacoa.", emoji:"🍖" },
  { id:8, name:"CHINGONA", desc:"Medallón de carne, cheddar, guacamole con panceta, tomate y mayo picante.", emoji:"🥑", badge:"🌶️ PICANTE" },
];
 
const POSHITO = { id:9, name:"POSHITO", desc:"200gr de pollo crispy con salsa picante, lechuga con mayo, cheddar y pepino.", emoji:"🐔", price:15000 };
 
const SIZES = [
  { id:"simple", label:"SIMPLE", price:12000 },
  { id:"doble", label:"DOBLE", price:16000 },
  { id:"triple", label:"TRIPLE", price:20000 },
];
 
const DRINKS = [
  { id:101, name:"GASEOSA / AGUAS", desc:"Línea Coca Cola", emoji:"🥤",
    variants:[{id:"botella",label:"Botella",price:3500},{id:"lata",label:"Lata",price:2500}] },
  { id:102, name:"BIRRA", desc:"Quinto Elemento · Scottish · APA · IPA · Porter · OCBA · Sativa Pale Ale · Corona · Stella", emoji:"🍺",
    variants:[{id:"artesanal",label:"Artesanal",price:6000},{id:"industrial",label:"Industrial",price:5000}] },
  { id:103, name:"FERNET / GIN", desc:"Hielo + Fernet o Gin + Latita. La combo del BARDO.", emoji:"🥃",
    variants:[{id:"pinta",label:"Pinta",price:6000}] },
];
 
const WA_NUMBER = "5492945400000";
const fmt = (n) => `$${Number(n).toLocaleString("es-AR")}`;
 
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Barlow+Condensed:wght@600;700;800;900&display=swap');
 
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{background:${BK};color:#fff;font-family:'Barlow',sans-serif;overflow-x:hidden}
::-webkit-scrollbar{width:3px}
::-webkit-scrollbar-track{background:${BK}}
::-webkit-scrollbar-thumb{background:${Y};border-radius:2px}
 
.bb-display{font-family:'Bebas Neue',sans-serif;letter-spacing:0.04em}
.bb-cond{font-family:'Barlow Condensed',sans-serif;font-weight:800;letter-spacing:0.02em}
 
@keyframes fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
@keyframes floatBurger{0%,100%{transform:translateY(0) rotate(-1deg)}50%{transform:translateY(-14px) rotate(2deg)}}
@keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
@keyframes pulseGlow{0%,100%{box-shadow:0 0 0 0 ${Y}44}50%{box-shadow:0 0 24px 0 ${Y}33}}
@keyframes slideIn{from{transform:translateX(110%)}to{transform:translateX(0)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes scaleIn{from{transform:scale(0.96);opacity:0}to{transform:scale(1);opacity:1}}
 
.fu{animation:fadeUp 0.55s ease both}
.fu1{animation-delay:0.1s}.fu2{animation-delay:0.2s}.fu3{animation-delay:0.3s}.fu4{animation-delay:0.4s}
.float-anim{animation:floatBurger 3.5s ease-in-out infinite}
.marquee-track{animation:marquee 22s linear infinite}
 
.nav-blur{background:rgba(8,8,8,0.92);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px)}
 
.hero-glow{background:radial-gradient(ellipse 65% 55% at 50% 50%,${Y}0d 0%,transparent 68%)}
 
.cta-btn{
  background:${Y};color:${BK};
  font-family:'Bebas Neue',sans-serif;font-size:20px;letter-spacing:2px;
  padding:15px 36px;border:none;border-radius:10px;cursor:pointer;
  transition:transform 0.15s,background 0.15s,box-shadow 0.2s;
  animation:pulseGlow 2.5s infinite;
  display:inline-flex;align-items:center;gap:8px
}
.cta-btn:hover{background:#ffc82e;transform:scale(1.04);box-shadow:0 0 32px ${Y}44}
.cta-btn:active{transform:scale(0.97)}
 
.ghost-btn{
  background:transparent;color:#fff;
  font-family:'Bebas Neue',sans-serif;font-size:20px;letter-spacing:2px;
  padding:13px 36px;border:2px solid rgba(255,255,255,0.3);border-radius:10px;cursor:pointer;
  transition:all 0.15s;display:inline-flex;align-items:center;gap:8px
}
.ghost-btn:hover{background:rgba(255,255,255,0.08);border-color:rgba(255,255,255,0.6)}
 
.tab-btn{
  font-family:'Bebas Neue',sans-serif;font-size:17px;letter-spacing:1.5px;
  padding:9px 22px;border:1.5px solid transparent;border-radius:8px;
  cursor:pointer;background:transparent;color:#555;transition:all 0.15s
}
.tab-btn.active{border-color:${Y};color:${Y};background:${Y}14}
.tab-btn:hover:not(.active){color:#aaa}
 
.card{
  background:#111;border:1px solid #1d1d1d;border-radius:14px;
  overflow:hidden;transition:border-color 0.2s,transform 0.2s,box-shadow 0.2s
}
.card:hover{border-color:${Y}66;transform:translateY(-4px);box-shadow:0 12px 40px ${Y}18}
 
.size-btn{
  border:1.5px solid #2a2a2a;border-radius:7px;padding:6px 13px;
  cursor:pointer;font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:12px;
  letter-spacing:0.5px;background:transparent;color:#666;transition:all 0.12s
}
.size-btn.sel{border-color:${Y};color:${Y};background:${Y}14}
.size-btn:hover:not(.sel){border-color:#444;color:#bbb}
 
.add-btn{
  background:${Y};color:${BK};border:none;border-radius:9px;
  font-family:'Bebas Neue',sans-serif;font-size:17px;letter-spacing:1.5px;
  cursor:pointer;transition:all 0.15s;padding:11px 0;width:100%;
  display:flex;align-items:center;justify-content:center;gap:6px
}
.add-btn:hover{background:#ffc82e;transform:scale(1.02)}
.add-btn:active{transform:scale(0.97)}
 
.qty-btn{
  width:30px;height:30px;border-radius:50%;
  border:1.5px solid #333;background:transparent;color:#fff;
  cursor:pointer;font-size:15px;display:flex;align-items:center;
  justify-content:center;transition:all 0.12s;flex-shrink:0
}
.qty-btn:hover{border-color:${Y};color:${Y}}
 
.diff-tile{
  background:#0e0e0e;border:1px solid #1a1a1a;border-radius:14px;
  padding:28px 20px;text-align:center;transition:border-color 0.2s,transform 0.2s
}
.diff-tile:hover{border-color:${Y}33;transform:translateY(-3px)}
 
.cart-panel{
  position:fixed;top:0;right:0;bottom:0;
  width:min(430px,100vw);
  background:#0c0c0c;border-left:1px solid #1d1d1d;
  z-index:60;display:flex;flex-direction:column;
  transform:translateX(110%);transition:transform 0.32s cubic-bezier(0.22,1,0.36,1);
  overflow:hidden
}
.cart-panel.open{transform:translateX(0);animation:slideIn 0.32s cubic-bezier(0.22,1,0.36,1)}
 
.overlay{
  position:fixed;inset:0;background:rgba(0,0,0,0.72);
  backdrop-filter:blur(5px);z-index:55;animation:fadeIn 0.2s ease
}
 
.field{
  background:#161616;border:1.5px solid #242424;border-radius:9px;
  color:#fff;font-family:'Barlow',sans-serif;font-size:14px;
  padding:12px 15px;width:100%;transition:border-color 0.15s;outline:none
}
.field:focus{border-color:${Y}}
.field::placeholder{color:#3d3d3d}
textarea.field{resize:vertical;min-height:72px}
 
.badge{
  display:inline-block;font-family:'Barlow Condensed',sans-serif;
  font-weight:800;font-size:10px;letter-spacing:1px;
  padding:3px 9px;border-radius:5px;background:${Y};color:${BK};
  text-transform:uppercase
}
 
.ig-box{
  aspect-ratio:1;border-radius:10px;overflow:hidden;
  display:flex;align-items:center;justify-content:center;font-size:44px;
  cursor:pointer;position:relative;transition:transform 0.2s
}
.ig-box:hover{transform:scale(1.04)}
.ig-box .ig-hover{
  position:absolute;inset:0;background:${Y}cc;
  display:flex;align-items:center;justify-content:center;
  opacity:0;transition:opacity 0.18s;font-size:24px
}
.ig-box:hover .ig-hover{opacity:1}
 
.wa-fixed{
  position:fixed;bottom:24px;right:24px;z-index:35;
  background:#25D366;color:#fff;border:none;border-radius:50%;
  width:58px;height:58px;cursor:pointer;
  display:flex;align-items:center;justify-content:center;
  box-shadow:0 4px 24px rgba(37,211,102,0.4);
  transition:transform 0.15s,box-shadow 0.15s;font-size:26px
}
.wa-fixed:hover{transform:scale(1.1);box-shadow:0 6px 32px rgba(37,211,102,0.6)}
 
.poshito-card{border:2px solid ${Y}44 !important}
.poshito-card:hover{border-color:${Y} !important}
 
.ticker-wrap{overflow:hidden;padding:11px 0;background:${Y}}
.ticker-inner{display:flex;gap:0;white-space:nowrap}
.ticker-seg{font-family:'Bebas Neue',sans-serif;font-size:18px;letter-spacing:3px;color:${BK}}
 
.section-label{
  font-family:'Barlow Condensed',sans-serif;font-weight:700;
  font-size:12px;letter-spacing:3px;color:${Y};text-transform:uppercase;margin-bottom:10px
}
 
@media(max-width:600px){
  .hero-title{font-size:clamp(52px,18vw,88px) !important}
  .menu-grid{grid-template-columns:1fr !important}
  .diff-grid{grid-template-columns:1fr 1fr !important}
  .footer-grid{grid-template-columns:1fr !important}
  .ghost-btn,.cta-btn{font-size:17px;padding:13px 26px}
  .cart-panel{width:100vw}
}
`;
 
const TICKER_ITEMS = [
  "🍔 SMASH BURGERS REALES",
  "🍟 PAPAS INCLUIDAS OBVIO",
  "🧀 SIMPLE · DOBLE · TRIPLE",
  "🔥 SMASH EN PLANCHA",
  "😈 TODO TERMINA EN BARDO",
  "⚡ PEDÍ SIN INSTAGRAM",
];
 
export default function BardoBurger() {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("burgers");
  const [selSizes, setSelSizes] = useState({});
  const [selVariants, setSelVariants] = useState({});
  const [form, setForm] = useState({ name:"", address:"", phone:"", notes:"" });
  const [added, setAdded] = useState(null);
  const menuRef = useRef(null);
 
  const cartCount = cart.reduce((s,i)=>s+i.qty,0);
  const cartTotal = cart.reduce((s,i)=>s+i.price*i.qty,0);
 
  const flashAdded = (name) => { setAdded(name); setTimeout(()=>setAdded(null),1600); };
 
  const addBurger = (burger, fixedPrice=null) => {
    const sizeId = fixedPrice ? "single" : (selSizes[burger.id]||"simple");
    const size = fixedPrice ? null : SIZES.find(s=>s.id===sizeId);
    const price = fixedPrice||size.price;
    const sizeLabel = fixedPrice ? null : size.label;
    const cartId = `${burger.id}-${sizeId}`;
    setCart(prev=>{
      const ex=prev.find(i=>i.cartId===cartId);
      if(ex) return prev.map(i=>i.cartId===cartId?{...i,qty:i.qty+1}:i);
      return [...prev,{cartId,name:burger.name,size:sizeLabel,price,qty:1,emoji:burger.emoji}];
    });
    flashAdded(burger.name);
    setCartOpen(true);
  };
 
  const addDrink = (drink, vid) => {
    const v=drink.variants.find(x=>x.id===vid);
    if(!v) return;
    const cartId=`${drink.id}-${vid}`;
    setCart(prev=>{
      const ex=prev.find(i=>i.cartId===cartId);
      if(ex) return prev.map(i=>i.cartId===cartId?{...i,qty:i.qty+1}:i);
      return [...prev,{cartId,name:`${drink.name} (${v.label})`,price:v.price,qty:1,emoji:drink.emoji}];
    });
    flashAdded(drink.name);
    setCartOpen(true);
  };
 
  const updateQty = (cartId, d) => {
    setCart(prev=>prev.map(i=>i.cartId===cartId?{...i,qty:Math.max(0,i.qty+d)}:i).filter(i=>i.qty>0));
  };
 
  const sendWA = () => {
    if(!form.name||!form.address||!form.phone){
      alert("Completá nombre, dirección y teléfono para enviar tu pedido 📍");
      return;
    }
    const lines=cart.map(i=>`  • ${i.qty}x ${i.emoji} ${i.name}${i.size?` (${i.size})`:''} - ${fmt(i.price*i.qty)}`);
    const msg=[
      `🍔 *NUEVO PEDIDO - BARDO BURGER* 🍔`,``,
      ...lines,``,
      `💰 *TOTAL: ${fmt(cartTotal)}*`,``,
      `👤 *Cliente:* ${form.name}`,
      `📍 *Dirección:* ${form.address}`,
      `📱 *Tel:* ${form.phone}`,
      form.notes?`📝 *Notas:* ${form.notes}`:null,
      ``,`_Pedido desde la web de BARDO Esquel 😈_`,
    ].filter(Boolean).join('\n');
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`,'_blank');
  };
 
  const scrollToMenu = () => menuRef.current?.scrollIntoView({behavior:'smooth'});
 
  const tickerText = TICKER_ITEMS.map(t=>`   •   ${t}`).join('');
 
  return (
    <div style={{minHeight:'100vh',background:BK,overflowX:'hidden'}}>
      <style>{CSS}</style>
 
      {/* ── NAV ── */}
      <nav className="nav-blur" style={{
        position:'fixed',top:0,left:0,right:0,zIndex:50,
        borderBottom:'1px solid #181818',
        display:'flex',alignItems:'center',justifyContent:'space-between',
        padding:'0 20px',height:62
      }}>
        <div className="bb-display" style={{fontSize:26,color:Y,letterSpacing:3}}>
          BARDO <span style={{color:'#fff'}}>BURGER</span>
        </div>
        <div style={{display:'flex',gap:10,alignItems:'center'}}>
          <a href="https://www.instagram.com/bardoburgeer/" target="_blank"
             style={{color:'#555',textDecoration:'none',display:'flex',alignItems:'center',gap:4,fontSize:13,fontWeight:600,transition:'color 0.15s'}}
             onMouseEnter={e=>e.currentTarget.style.color='#fff'}
             onMouseLeave={e=>e.currentTarget.style.color='#555'}>
            <Instagram size={15}/> <span style={{display:'none'}}>@bardoburgeer</span>
          </a>
          <button onClick={()=>setCartOpen(true)} style={{
            background:cartCount>0?Y:'#181818',
            color:cartCount>0?BK:'#888',
            border:`1px solid ${cartCount>0?Y:'#2a2a2a'}`,
            borderRadius:9,padding:'8px 14px',
            fontFamily:'Barlow Condensed',fontWeight:700,fontSize:14,letterSpacing:0.5,
            cursor:'pointer',transition:'all 0.15s',
            display:'flex',alignItems:'center',gap:7
          }}>
            <ShoppingCart size={15}/>
            {cartCount>0?`${cartCount} items`:'Carrito'}
          </button>
        </div>
      </nav>
 
      {/* ── HERO ── */}
      <section style={{
        minHeight:'100vh',paddingTop:62,
        display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',
        textAlign:'center',padding:'100px 20px 80px',position:'relative',overflow:'hidden'
      }}>
        <div className="hero-glow" style={{position:'absolute',inset:0,pointerEvents:'none'}}/>
 
        {/* Decorative lines */}
        {[...Array(3)].map((_,i)=>(
          <div key={i} style={{
            position:'absolute',top:'50%',left:'50%',
            width:`${400+i*200}px`,height:`${400+i*200}px`,
            border:`1px solid ${Y}0${8-i*2}`,borderRadius:'50%',
            transform:'translate(-50%,-50%)',pointerEvents:'none'
          }}/>
        ))}
 
        <div className="float-anim" style={{fontSize:'clamp(72px,16vw,120px)',lineHeight:1,marginBottom:20,position:'relative',zIndex:1}}>
          🍔
        </div>
 
        <h1 className="bb-display fu fu1 hero-title" style={{
          fontSize:'clamp(58px,14vw,108px)',
          lineHeight:0.88,color:'#fff',marginBottom:18,
          position:'relative',zIndex:1,
          textShadow:`0 0 80px ${Y}18`
        }}>
          LAS BURGAS MÁS<br/>
          <span style={{color:Y}}>BARDO</span><br/>
          DE ESQUEL
        </h1>
 
        <p className="fu fu2" style={{
          fontSize:'clamp(15px,3.5vw,18px)',color:'#888',
          fontWeight:500,marginBottom:8,maxWidth:460,
          position:'relative',zIndex:1
        }}>
          Pedí en segundos. Sin vueltas.<br/>Sin esperar respuesta en Instagram.
        </p>
 
        <div className="fu fu3" style={{
          display:'flex',alignItems:'center',gap:6,
          color:'#444',fontSize:13,marginBottom:40,
          position:'relative',zIndex:1
        }}>
          <MapPin size={13} style={{color:Y}}/> 9 de Julio 768 · Esquel
          <span style={{color:'#2a2a2a'}}>·</span>
          <Clock size={13} style={{color:Y}}/> De lunes a lunes 🎉
        </div>
 
        <div className="fu fu3" style={{display:'flex',gap:12,flexWrap:'wrap',justifyContent:'center',position:'relative',zIndex:1}}>
          <button className="cta-btn" onClick={()=>setCartOpen(true)}>
            <ShoppingCart size={18}/> PEDIR AHORA
          </button>
          <button className="ghost-btn" onClick={scrollToMenu}>
            VER MENÚ <ChevronDown size={18}/>
          </button>
        </div>
 
        <div className="fu fu4" style={{marginTop:48,position:'relative',zIndex:1}}>
          <p className="bb-cond" style={{
            fontSize:20,color:Y,
            borderTop:`1px solid ${Y}33`,borderBottom:`1px solid ${Y}33`,
            padding:'10px 36px',display:'inline-block',letterSpacing:3
          }}>
            TODO TERMINA EN #BARDO 😈🤤
          </p>
        </div>
      </section>
 
      {/* ── TICKER ── */}
      <div className="ticker-wrap">
        <div className="ticker-inner marquee-track">
          {[0,1].map(k=>(
            <span key={k} className="ticker-seg">{tickerText}&nbsp;&nbsp;&nbsp;</span>
          ))}
        </div>
      </div>
 
      {/* ── DIFFERENTIALS ── */}
      <section style={{padding:'80px 20px',maxWidth:1080,margin:'0 auto'}}>
        <p className="section-label" style={{textAlign:'center'}}>POR QUÉ ELEGIRNOS</p>
        <h2 className="bb-display" style={{
          fontSize:'clamp(36px,7vw,52px)',textAlign:'center',
          marginBottom:44,color:'#fff'
        }}>
          POR QUÉ <span style={{color:Y}}>BARDO</span>
        </h2>
        <div className="diff-grid" style={{
          display:'grid',
          gridTemplateColumns:'repeat(auto-fit,minmax(210px,1fr))',
          gap:14
        }}>
          {[
            {emoji:'🔥',title:'SMASH BURGERS\nREALES',sub:'Aplastadas en plancha caliente. Crujiente por fuera, jugosas por dentro.'},
            {emoji:'🍟',title:'PAPAS INCLUIDAS\nOBVIO',sub:'Todas las burgas vienen con papas. Siempre. Sin excusas.'},
            {emoji:'😈',title:'TODO TERMINA\nEN BARDO',sub:'Una noche en Esquel sin pasar por Bardo simplemente no cuenta.'},
            {emoji:'🤤',title:'HECHO PARA\nBAJONEAR FUERTE',sub:'El antídoto perfecto para cualquier bajón nocturno.'},
          ].map((d,i)=>(
            <div key={i} className="diff-tile">
              <div style={{fontSize:44,marginBottom:14}}>{d.emoji}</div>
              <div className="bb-display" style={{
                fontSize:24,lineHeight:1.1,marginBottom:9,
                color:'#fff',whiteSpace:'pre-line',letterSpacing:1
              }}>{d.title}</div>
              <p style={{color:'#555',fontSize:13,lineHeight:1.6}}>{d.sub}</p>
            </div>
          ))}
        </div>
      </section>
 
      {/* ── MENU ── */}
      <section ref={menuRef} id="menu" style={{padding:'80px 20px',maxWidth:1080,margin:'0 auto'}}>
        <p className="section-label" style={{textAlign:'center'}}>HACÉ TU PEDIDO</p>
        <h2 className="bb-display" style={{
          fontSize:'clamp(44px,10vw,72px)',textAlign:'center',
          color:'#fff',marginBottom:8,letterSpacing:2
        }}>
          EL <span style={{color:Y}}>MENÚ</span>
        </h2>
        <p style={{textAlign:'center',color:'#444',marginBottom:6,fontSize:14}}>
          Nuestras burgas vienen con papas, obvio.
        </p>
        <div style={{textAlign:'center',marginBottom:36}}>
          <span style={{
            background:`${Y}18`,color:Y,borderRadius:20,
            padding:'6px 18px',fontSize:13,fontFamily:'Barlow Condensed',
            fontWeight:700,letterSpacing:1,display:'inline-block'
          }}>
            SIMPLE {fmt(12000)}  ·  DOBLE {fmt(16000)}  ·  TRIPLE {fmt(20000)}
          </span>
        </div>
 
        {/* Tabs */}
        <div style={{display:'flex',justifyContent:'center',gap:8,marginBottom:36,flexWrap:'wrap'}}>
          {[['burgers','🍔 BURGAS'],['poshito','🐔 POSHITO'],['bebidas','🍺 BEBIDAS']].map(([id,lbl])=>(
            <button key={id} className={`tab-btn ${activeTab===id?'active':''}`} onClick={()=>setActiveTab(id)}>
              {lbl}
            </button>
          ))}
        </div>
 
        {/* BURGER GRID */}
        {activeTab==='burgers' && (
          <div className="menu-grid" style={{
            display:'grid',
            gridTemplateColumns:'repeat(auto-fill,minmax(290px,1fr))',
            gap:14
          }}>
            {BURGERS.map(burger=>{
              const sizeId=selSizes[burger.id]||'simple';
              const price=SIZES.find(s=>s.id===sizeId)?.price||12000;
              return (
                <div key={burger.id} className="card">
                  <div style={{
                    background:'#0e0e0e',
                    display:'flex',alignItems:'center',justifyContent:'center',
                    height:108,fontSize:64,
                    borderBottom:'1px solid #1a1a1a',position:'relative'
                  }}>
                    {burger.emoji}
                    {burger.badge&&<span className="badge" style={{position:'absolute',top:10,right:10}}>{burger.badge}</span>}
                  </div>
                  <div style={{padding:'16px 18px'}}>
                    <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:6,gap:8}}>
                      <h3 className="bb-display" style={{fontSize:24,color:'#fff',lineHeight:1.05,letterSpacing:1}}>
                        {burger.name}
                      </h3>
                      <span className="bb-cond" style={{color:Y,fontSize:20,flexShrink:0}}>
                        {fmt(price)}
                      </span>
                    </div>
                    <p style={{color:'#555',fontSize:13,lineHeight:1.55,marginBottom:16,minHeight:44}}>
                      {burger.desc}
                    </p>
                    <div style={{display:'flex',gap:6,marginBottom:14,flexWrap:'wrap'}}>
                      {SIZES.map(s=>(
                        <button key={s.id}
                          className={`size-btn ${sizeId===s.id?'sel':''}`}
                          onClick={()=>setSelSizes(p=>({...p,[burger.id]:s.id}))}>
                          {s.label}
                        </button>
                      ))}
                    </div>
                    <button className="add-btn" onClick={()=>addBurger(burger)}>
                      <Plus size={16}/> AGREGAR AL PEDIDO
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
 
        {/* POSHITO */}
        {activeTab==='poshito' && (
          <div style={{maxWidth:460,margin:'0 auto'}}>
            <div className="card poshito-card">
              <div style={{
                background:`linear-gradient(135deg,${Y}1a 0%,#0e0e0e 100%)`,
                display:'flex',alignItems:'center',justifyContent:'center',
                height:130,fontSize:80,borderBottom:`1px solid ${Y}28`,position:'relative'
              }}>
                {POSHITO.emoji}
                <span className="badge" style={{position:'absolute',top:12,right:12}}>
                  POLLO CRISPY
                </span>
              </div>
              <div style={{padding:'22px 22px 20px'}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10}}>
                  <span className="bb-display" style={{fontSize:38,color:Y,letterSpacing:2}}>POSHITO</span>
                  <span className="bb-cond" style={{color:Y,fontSize:26}}>{fmt(POSHITO.price)}</span>
                </div>
                <p style={{color:'#666',fontSize:14,lineHeight:1.65,marginBottom:20}}>{POSHITO.desc}</p>
                <button className="add-btn" style={{fontSize:19}} onClick={()=>addBurger(POSHITO,POSHITO.price)}>
                  🐔 AGREGAR POSHITO
                </button>
              </div>
            </div>
            <p style={{textAlign:'center',color:'#333',fontSize:13,marginTop:18,fontStyle:'italic'}}>
              ¿Querés opción veggie? Avisanos en las observaciones 🌱
            </p>
          </div>
        )}
 
        {/* BEBIDAS */}
        {activeTab==='bebidas' && (
          <div className="menu-grid" style={{
            display:'grid',
            gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))',
            gap:14
          }}>
            {DRINKS.map(drink=>{
              const vid=selVariants[drink.id]||drink.variants[0]?.id;
              const variant=drink.variants.find(v=>v.id===vid);
              return (
                <div key={drink.id} className="card">
                  <div style={{
                    background:'#0e0e0e',display:'flex',alignItems:'center',
                    justifyContent:'center',height:90,fontSize:54,
                    borderBottom:'1px solid #1a1a1a'
                  }}>
                    {drink.emoji}
                  </div>
                  <div style={{padding:'16px 18px'}}>
                    <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:6,gap:8}}>
                      <h3 className="bb-display" style={{fontSize:21,color:'#fff',letterSpacing:1,lineHeight:1.1}}>
                        {drink.name}
                      </h3>
                      {variant&&<span className="bb-cond" style={{color:Y,fontSize:18,flexShrink:0}}>{fmt(variant.price)}</span>}
                    </div>
                    <p style={{color:'#444',fontSize:12,lineHeight:1.5,marginBottom:14}}>{drink.desc}</p>
                    <div style={{display:'flex',gap:6,marginBottom:14,flexWrap:'wrap'}}>
                      {drink.variants.map(v=>(
                        <button key={v.id}
                          className={`size-btn ${vid===v.id?'sel':''}`}
                          onClick={()=>setSelVariants(p=>({...p,[drink.id]:v.id}))}>
                          {v.label} · {fmt(v.price)}
                        </button>
                      ))}
                    </div>
                    <button className="add-btn" onClick={()=>addDrink(drink,vid)}>
                      <Plus size={15}/> AGREGAR
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
 
      {/* ── INSTAGRAM ── */}
      <section style={{padding:'80px 20px',background:'#090909',textAlign:'center'}}>
        <div style={{maxWidth:860,margin:'0 auto'}}>
          <p className="section-label">SEGUINOS</p>
          <h2 className="bb-display" style={{fontSize:'clamp(36px,8vw,56px)',marginBottom:8,letterSpacing:2}}>
            @BARDOBURGEER
          </h2>
          <p style={{color:'#444',marginBottom:36,fontSize:14}}>
            Sumate al #BARDO y mostrale a Esquel cómo se babea. 🤤
          </p>
          <div style={{
            display:'grid',
            gridTemplateColumns:'repeat(3,1fr)',
            gap:8,marginBottom:32,maxWidth:500,margin:'0 auto 32px'
          }}>
            {[
              {bg:'linear-gradient(135deg,#f5b40022,#161616)',emoji:'🧀',label:'Cheese'},
              {bg:'linear-gradient(135deg,#22c55e18,#161616)',emoji:'🥗',label:'Clásica'},
              {bg:'linear-gradient(135deg,#ef444418,#161616)',emoji:'🔥',label:'Oklahoma'},
              {bg:'linear-gradient(135deg,#8b5cf618,#161616)',emoji:'🥑',label:'Chingona'},
              {bg:'linear-gradient(135deg,#f5b40030,#161616)',emoji:'🧅',label:'Onion Bacon'},
              {bg:'linear-gradient(135deg,#fb923c20,#161616)',emoji:'🐔',label:'Poshito'},
            ].map((p,i)=>(
              <a key={i} href="https://www.instagram.com/bardoburgeer/" target="_blank"
                 className="ig-box" style={{background:p.bg}}>
                {p.emoji}
                <div className="ig-hover"><Instagram size={22}/></div>
              </a>
            ))}
          </div>
          <a href="https://www.instagram.com/bardoburgeer/" target="_blank"
             style={{
               display:'inline-flex',alignItems:'center',gap:9,textDecoration:'none',
               background:Y,color:BK,fontFamily:'Bebas Neue',
               fontSize:19,letterSpacing:2,borderRadius:10,padding:'13px 32px'
             }}>
            <Instagram size={18}/> VER INSTAGRAM
          </a>
        </div>
      </section>
 
      {/* ── FOOTER ── */}
      <footer style={{background:'#040404',borderTop:'1px solid #141414',padding:'60px 20px 40px'}}>
        <div style={{maxWidth:1080,margin:'0 auto'}}>
          <div className="footer-grid" style={{
            display:'grid',
            gridTemplateColumns:'repeat(auto-fit,minmax(210px,1fr))',
            gap:40,marginBottom:48
          }}>
            <div>
              <div className="bb-display" style={{fontSize:40,color:Y,letterSpacing:3,marginBottom:8}}>
                BARDO <span style={{color:'#fff'}}>BURGER</span>
              </div>
              <p style={{color:'#3a3a3a',fontSize:13,lineHeight:1.8}}>
                Smash burgers reales en el corazón de Esquel, Chubut.<br/>
                Todo termina en #BARDO. 😈
              </p>
            </div>
 
            <div>
              <p style={{fontFamily:'Barlow Condensed',fontWeight:700,fontSize:12,
                letterSpacing:3,color:'#2e2e2e',marginBottom:14,textTransform:'uppercase'}}>
                ENCONTRANOS
              </p>
              <div style={{display:'flex',flexDirection:'column',gap:10}}>
                {[
                  {icon:<MapPin size={14}/>, text:'9 de Julio 768, Esquel, Chubut'},
                  {icon:<Clock size={14}/>, text:'De lunes a lunes 🎉'},
                  {icon:<MessageCircle size={14}/>, text:'WhatsApp', href:`https://wa.me/${WA_NUMBER}`, color:'#25D366'},
                  {icon:<Instagram size={14}/>, text:'@bardoburgeer', href:'https://www.instagram.com/bardoburgeer/', color:Y},
                ].map((item,i)=>(
                  <div key={i} style={{display:'flex',alignItems:'center',gap:8}}>
                    <span style={{color:Y,flexShrink:0}}>{item.icon}</span>
                    {item.href?(
                      <a href={item.href} target="_blank"
                         style={{color:item.color||'#555',textDecoration:'none',fontSize:13,fontWeight:600}}>
                        {item.text}
                      </a>
                    ):(
                      <span style={{color:'#444',fontSize:13}}>{item.text}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
 
            <div>
              <p style={{fontFamily:'Barlow Condensed',fontWeight:700,fontSize:12,
                letterSpacing:3,color:'#2e2e2e',marginBottom:14,textTransform:'uppercase'}}>
                HACÉ TU PEDIDO
              </p>
              <button className="cta-btn" onClick={()=>setCartOpen(true)}
                style={{fontSize:17,padding:'12px 22px',marginBottom:12,animation:'none',width:'100%',justifyContent:'center'}}>
                <ShoppingCart size={16}/> PEDIR AHORA
              </button>
              <a href={`https://wa.me/${WA_NUMBER}`} target="_blank"
                 style={{
                   display:'flex',alignItems:'center',justifyContent:'center',gap:6,
                   textDecoration:'none',color:'#25D366',fontSize:13,fontWeight:600,
                   padding:'10px',border:'1px solid #25D36622',borderRadius:9
                 }}>
                💬 Hablar directo por WhatsApp
              </a>
            </div>
          </div>
 
          {/* Map */}
          <div style={{borderRadius:12,overflow:'hidden',marginBottom:32,border:'1px solid #181818'}}>
            <iframe
              title="Mapa BARDO Burger Esquel"
              src="https://maps.google.com/maps?q=9+de+Julio+768+Esquel+Chubut+Argentina&output=embed"
              width="100%" height="210"
              style={{border:0,display:'block',filter:'grayscale(100%) brightness(0.6) contrast(1.1)'}}
              loading="lazy" allowFullScreen
            />
          </div>
 
          <div style={{
            borderTop:'1px solid #141414',paddingTop:20,
            display:'flex',flexWrap:'wrap',justifyContent:'space-between',
            alignItems:'center',gap:10
          }}>
            <p style={{color:'#222',fontSize:11}}>© 2025 BARDO Burger House · Esquel, Chubut, Argentina</p>
            <p style={{color:'#1e1e1e',fontSize:11}}>
              hamburguesas Esquel · smash burgers Esquel · burger Esquel · comida Esquel
            </p>
          </div>
        </div>
      </footer>
 
      {/* ── CART OVERLAY ── */}
      {cartOpen && <div className="overlay" onClick={()=>setCartOpen(false)}/>}
 
      {/* ── CART PANEL ── */}
      <div className={`cart-panel ${cartOpen?'open':''}`}>
        {/* Header */}
        <div style={{
          padding:'18px 20px',borderBottom:'1px solid #1a1a1a',
          display:'flex',alignItems:'center',justifyContent:'space-between',flexShrink:0
        }}>
          <div>
            <h2 className="bb-display" style={{fontSize:28,color:Y,letterSpacing:2,lineHeight:1}}>
              TU PEDIDO
            </h2>
            {cartCount>0&&<p style={{color:'#444',fontSize:12,marginTop:3}}>
              {cartCount} item{cartCount!==1?'s':''} · {fmt(cartTotal)}
            </p>}
          </div>
          <button onClick={()=>setCartOpen(false)} style={{
            background:'#181818',border:'1px solid #2a2a2a',borderRadius:8,
            color:'#888',width:36,height:36,cursor:'pointer',
            display:'flex',alignItems:'center',justifyContent:'center',
            transition:'all 0.15s',flexShrink:0
          }}
          onMouseEnter={e=>{e.currentTarget.style.background='#222';e.currentTarget.style.color='#fff'}}
          onMouseLeave={e=>{e.currentTarget.style.background='#181818';e.currentTarget.style.color='#888'}}>
            <X size={16}/>
          </button>
        </div>
 
        {/* Items */}
        <div style={{flex:1,overflowY:'auto',padding:'16px 20px'}}>
          {cart.length===0 ? (
            <div style={{textAlign:'center',padding:'60px 20px',color:'#252525'}}>
              <div style={{fontSize:64,marginBottom:14,opacity:0.5}}>🍔</div>
              <p className="bb-display" style={{fontSize:24,letterSpacing:2,marginBottom:6}}>CARRITO VACÍO</p>
              <p style={{fontSize:13}}>Agregá tu burga favorita del menú</p>
              <button className="ghost-btn" style={{marginTop:20,fontSize:15,padding:'10px 24px'}}
                onClick={()=>{setCartOpen(false);scrollToMenu()}}>
                VER MENÚ
              </button>
            </div>
          ) : (
            <>
              <div style={{display:'flex',flexDirection:'column',gap:0}}>
                {cart.map(item=>(
                  <div key={item.cartId} style={{
                    display:'flex',alignItems:'center',gap:12,
                    padding:'13px 0',borderBottom:'1px solid #141414'
                  }}>
                    <span style={{fontSize:30,flexShrink:0}}>{item.emoji}</span>
                    <div style={{flex:1,minWidth:0}}>
                      <p style={{fontWeight:600,fontSize:13,marginBottom:2,lineHeight:1.3}}>
                        {item.name}
                        {item.size&&<span style={{color:'#3a3a3a',fontSize:11,marginLeft:6}}>({item.size})</span>}
                      </p>
                      <p style={{color:Y,fontFamily:'Barlow Condensed',fontWeight:700,fontSize:15}}>
                        {fmt(item.price*item.qty)}
                      </p>
                    </div>
                    <div style={{display:'flex',alignItems:'center',gap:9,flexShrink:0}}>
                      <button className="qty-btn" onClick={()=>updateQty(item.cartId,-1)}><Minus size={12}/></button>
                      <span style={{minWidth:18,textAlign:'center',fontWeight:700,fontSize:14}}>{item.qty}</span>
                      <button className="qty-btn" onClick={()=>updateQty(item.cartId,+1)}><Plus size={12}/></button>
                    </div>
                  </div>
                ))}
              </div>
 
              <div style={{
                display:'flex',justifyContent:'space-between',alignItems:'center',
                padding:'16px 0',marginTop:4,borderBottom:'1px solid #1a1a1a'
              }}>
                <span style={{fontFamily:'Barlow Condensed',fontWeight:700,fontSize:16,letterSpacing:1}}>TOTAL</span>
                <span className="bb-display" style={{fontSize:28,color:Y,letterSpacing:1}}>{fmt(cartTotal)}</span>
              </div>
 
              {/* Form */}
              <div style={{paddingTop:20,display:'flex',flexDirection:'column',gap:10}}>
                <p style={{fontFamily:'Barlow Condensed',fontWeight:700,letterSpacing:2,
                  fontSize:12,color:'#333',textTransform:'uppercase',marginBottom:2}}>
                  DATOS DE ENTREGA
                </p>
                <input className="field" placeholder="Tu nombre *" value={form.name}
                  onChange={e=>setForm(p=>({...p,name:e.target.value}))}/>
                <input className="field" placeholder="Dirección de entrega *" value={form.address}
                  onChange={e=>setForm(p=>({...p,address:e.target.value}))}/>
                <input className="field" type="tel" placeholder="Tu teléfono *" value={form.phone}
                  onChange={e=>setForm(p=>({...p,phone:e.target.value}))}/>
                <textarea className="field" placeholder="Observaciones (alergias, cocción, sin cebollas...)" value={form.notes}
                  onChange={e=>setForm(p=>({...p,notes:e.target.value}))}/>
              </div>
            </>
          )}
        </div>
 
        {/* Send Button */}
        {cart.length>0&&(
          <div style={{padding:'16px 20px',borderTop:'1px solid #1a1a1a',flexShrink:0}}>
            <button className="cta-btn" style={{
              width:'100%',fontSize:19,justifyContent:'center',
              padding:'16px 0',animation:'none'
            }} onClick={sendWA}>
              💬 ENVIAR PEDIDO POR WHATSAPP
            </button>
            <p style={{textAlign:'center',color:'#2e2e2e',fontSize:11,marginTop:9}}>
              Te abrimos WhatsApp con el pedido listo para enviar 🚀
            </p>
          </div>
        )}
      </div>
 
      {/* ── TOAST NOTIFICATION ── */}
      {added&&(
        <div style={{
          position:'fixed',bottom:32,left:'50%',transform:'translateX(-50%)',
          background:Y,color:BK,
          fontFamily:'Barlow Condensed',fontWeight:800,fontSize:15,letterSpacing:1,
          padding:'12px 24px',borderRadius:10,zIndex:100,
          animation:'scaleIn 0.2s ease',whiteSpace:'nowrap',
          boxShadow:`0 4px 24px ${Y}44`
        }}>
          ✅ {added} agregado al pedido
        </div>
      )}
 
      {/* ── WA FLOATING BTN ── */}
      <button className="wa-fixed" onClick={()=>window.open(`https://wa.me/${WA_NUMBER}`,'_blank')}>
        💬
      </button>
    </div>
  );
}
export default function BardoBurger() {