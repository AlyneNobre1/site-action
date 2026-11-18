import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { ArrowDown, ArrowUpRight, MapPin, Menu, X, Instagram, Check, Copy } from "lucide-react";
import "./styles.css";

// Configure aqui o telefone comercial com DDI + DDD + número, somente dígitos.
// Exemplo: "5521999999999". Vazio = abre o WhatsApp para escolher o contato.
const WHATSAPP_NUMBER = "";
const INSTAGRAM_URL = "https://www.instagram.com/actionn.film/";

const equipment = [
  { id: 1, category: "Iluminação COB", name: "Nanlite FC-500B", description: "LED bicolor", image: "https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=1100&q=85" },
  { id: 2, category: "Painéis e LEDs", name: "amaran F22c", description: "Painel LED flexível RGB", image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1100&q=85" },
  { id: 3, category: "Iluminação COB", name: "Godox MS60R", description: "LED RGB compacto", image: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1100&q=85" },
  { id: 4, category: "Iluminação COB", name: "Nanlite FS-300C", description: "LED RGB", image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1100&q=85" },
  { id: 5, category: "Grip", name: "Century e Grip", description: "Tripés, girafas e acessórios", image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=1100&q=85" },
  { id: 6, category: "Painéis e LEDs", name: "Aputure MC", description: "Mini painel LED RGB", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1100&q=85" }
];
const categories = ["Todos", "Iluminação COB", "Painéis e LEDs", "Grip"];

function whatsappLink(message) {
  const base = WHATSAPP_NUMBER ? `https://wa.me/${WHATSAPP_NUMBER}` : "https://wa.me/";
  return `${base}?text=${encodeURIComponent(message)}`;
}
function Brand({ light = false }) {
  return <a className={`brand ${light ? "brand-light" : ""}`} href="#top" aria-label="ACTION Film Equipment início">
    <span className="brand-word">ACTI<span>O</span>N</span><small>FILM EQUIPMENT</small>
  </a>;
}
function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return <header className="header">
    <div className="header-inner"><Brand />
      <nav className={open ? "nav nav-open" : "nav"}>
        <a href="#equipamentos" onClick={close}>Equipamentos</a><a href="#servicos" onClick={close}>Serviços</a><a href="#portfolio" onClick={close}>Portfólio</a>
        <a className="mobile-quote" href="#orcamento" onClick={close}>Pedir orçamento <ArrowUpRight size={15}/></a>
      </nav>
      <a className="header-quote" href="#orcamento">Pedir orçamento <ArrowUpRight size={16}/></a>
      <button className="menu-toggle" aria-label={open ? "Fechar menu" : "Abrir menu"} onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button>
    </div>
  </header>;
}
function EquipmentCard({ item }) {
  return <article className="equipment-card">
    <a className="equipment-image" href="#orcamento" aria-label={`Consultar ${item.name}`}><img src={item.image} alt={item.name} loading="lazy"/><span className="image-arrow"><ArrowUpRight size={18}/></span></a>
    <div className="equipment-info"><div><p className="eyebrow">{item.category}</p><h3>{item.name}</h3><p className="equipment-desc">{item.description}</p></div><a className="round-link" href={`#orcamento`} aria-label={`Pedir orçamento de ${item.name}`}><ArrowUpRight size={18}/></a></div>
  </article>;
}
function App() {
  const [filter, setFilter] = useState("Todos");
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [project, setProject] = useState("");
  const [copied, setCopied] = useState(false);
  const visible = useMemo(() => filter === "Todos" ? equipment : equipment.filter(x => x.category === filter), [filter]);
  const message = `Olá, ACTION! Gostaria de solicitar um orçamento.\\n\\nNome ou produtora: ${name || "Não informado"}\\nData ou período: ${date || "A definir"}\\n\\nSobre o projeto: ${project || "Gostaria de conversar sobre uma produção."}`;
  const submit = (e) => { e.preventDefault(); window.open(whatsappLink(message), "_blank", "noopener,noreferrer"); };
  const copyMessage = async () => { try { await navigator.clipboard.writeText(message); setCopied(true); setTimeout(() => setCopied(false), 2200); } catch { window.prompt("Copie sua mensagem:", message); } };
  return <div id="top">
    <Header/>
    <main>
      <section className="hero page-wrap">
        <div className="hero-copy">
          <p className="eyebrow eyebrow-dot">Locação e operação audiovisual</p>
          <h1>Equipamentos<br/>para <span>rodar.</span></h1>
          <p className="hero-text">Iluminação, grip e elétrica para cinema,<br className="desktop-break"/> publicidade e conteúdo. Com gaffer e<br className="desktop-break"/> direção de fotografia para o seu set.</p>
          <div className="hero-actions"><a className="button button-primary" href="#equipamentos">Ver equipamentos <ArrowDown size={17}/></a><a className="text-link" href="#orcamento">Fale com a ACTION <ArrowUpRight size={16}/></a></div>
        </div>
        <div className="hero-side"><div className="hero-photo"><img src="https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1500&q=90" alt="Equipamento de filmagem em set"/></div><div className="hero-stamp">LIGHT<br/>CAMERA<br/>ACTION<span>®</span></div></div>
        <div className="location"><MapPin size={15}/><span>Rio de Janeiro, Brasil</span></div>
      </section>

      <section className="section page-wrap" id="equipamentos">
        <div className="section-heading"><div><p className="eyebrow eyebrow-dot">Catálogo</p><h2>Equipamentos</h2><p className="section-intro">Escolha os itens que você precisa e consulte<br className="desktop-break"/> a disponibilidade para as datas do seu projeto.</p></div><span className="section-index">01 / 03</span></div>
        <div className="filters" role="group" aria-label="Filtrar equipamentos">{categories.map(c => <button key={c} className={filter === c ? "filter active" : "filter"} onClick={() => setFilter(c)}>{c}</button>)}</div>
        <div className="equipment-grid">{visible.map(item => <EquipmentCard key={item.id} item={item}/>)}</div>
        <p className="fine-print">Imagens ilustrativas. Consulte disponibilidade e acessórios de cada equipamento.</p>
      </section>

      <section className="services-section" id="servicos"><div className="page-wrap services-inner">
        <div className="services-lead"><p className="eyebrow eyebrow-dot">Serviços</p><h2>Do mapa de<br/>luz ao <span>set.</span></h2><a className="button button-dark" href="#orcamento">Monte seu pacote <ArrowUpRight size={17}/></a></div>
        <div className="service-list">
          <article><span>01</span><div><h3>Locação</h3><p>Iluminação, grip e elétrica montados em um pacote de acordo com o seu plano de filmagem.</p></div><ArrowUpRight/></article>
          <article><span>02</span><div><h3>Gaffer e equipe de luz</h3><p>Planejamento com a direção de fotografia, montagem e operação da iluminação durante a diária.</p></div><ArrowUpRight/></article>
          <article><span>03</span><div><h3>Direção de fotografia</h3><p>Concepção visual, escolhas de câmera e iluminação, do briefing à captação.</p></div><ArrowUpRight/></article>
        </div>
      </div></section>

      <section className="section page-wrap portfolio" id="portfolio">
        <div className="section-heading"><div><p className="eyebrow eyebrow-dot">Portfólio</p><h2>Projetos<span className="red-dot">.</span></h2></div><a className="text-link" href={INSTAGRAM_URL} target="_blank" rel="noreferrer">Ver no Instagram <ArrowUpRight size={16}/></a></div>
        <div className="portfolio-grid">
          <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="portfolio-tile tile-adidas"><span>adidas</span><small>Rio Fashion Week</small></a>
          <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="portfolio-tile tile-netflix"><span>NETFLIX</span><small>Brasil 70</small></a>
          <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="portfolio-tile tile-prime"><span>prime video</span><small>Corrida dos Bichos</small></a>
          <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="portfolio-tile tile-amazon"><span>amazon</span><small>creators lab</small><small>Amazon Creators Lab</small></a>
        </div>
      </section>

      <section className="quote-section" id="orcamento"><div className="page-wrap quote-inner">
        <div className="quote-copy"><p className="eyebrow eyebrow-dot">Orçamento</p><h2>O que vamos<br/><span>rodar?</span></h2><p>Conte um pouco do projeto, onde vai ser e<br className="desktop-break"/> quais datas você tem em mente.</p><a className="instagram-link" href={INSTAGRAM_URL} target="_blank" rel="noreferrer">@actionn.film <ArrowUpRight size={16}/></a></div>
        <form className="quote-form" onSubmit={submit}>
          <div className="form-row"><label>Seu nome<input value={name} onChange={e=>setName(e.target.value)} placeholder="Nome ou produtora" required/></label><label>Data ou período<input value={date} onChange={e=>setDate(e.target.value)} placeholder="Ex. 12 e 13 de dezembro"/></label></div>
          <label>Sobre o projeto<textarea value={project} onChange={e=>setProject(e.target.value)} placeholder="Tipo de produção, local e o que você precisa" rows="4" required/></label>
          <div className="form-actions"><button className="button button-primary" type="submit">Preparar mensagem <ArrowUpRight size={17}/></button><button className="copy-button" type="button" onClick={copyMessage}>{copied ? <Check size={16}/> : <Copy size={16}/>} {copied ? "Copiado!" : "Copiar mensagem"}</button></div>
          <p className="form-note">A mensagem será aberta no WhatsApp para você enviar.</p>
        </form>
      </div></section>
    </main>
    <footer className="footer page-wrap"><Brand/><span>Rio de Janeiro, RJ</span><a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">Instagram <ArrowUpRight size={15}/></a><small>© {new Date().getFullYear()} ACTION Film Equipment</small></footer>
  </div>;
}
createRoot(document.getElementById("root")).render(<App/>);
