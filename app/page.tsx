import Avatar from "./avatar";
import ProjectCarousel from "./project-carousel";
import { Icon, Quote } from "./icons";
import { Brand, Tech } from "./tech-icons";
import { listProjects } from "./lib/db";
import { samples } from "./projects";
import { SITE, heroTech, skills, testimonial, phoneLabel } from "./site";

export const dynamic = "force-dynamic";

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

export default async function Home() {
  const db = await listProjects();
  const items = db.length ? db : samples;
  const cards = items.slice(0, 6).map(({ id, title, description, tags, image_url, live_url }) => ({ id, title, description, tags, image_url, live_url }));

  const stats = [
    { icon: "cap", value: "ADS", label: "Graduação concluída" },
    { icon: "book", value: "Pós", label: "Engenharia de Software" },
    { icon: "code", value: "IFES", label: "Curso Full Stack" },
    { icon: "folder", value: String(items.length), label: "Projetos no portfólio" },
  ] as const;

  return (
    <>
      <section className="hero" id="inicio">
        <div className="wrap">
          <div className="hero-text">
            <span className="eyebrow pill">{SITE.role}</span>
            <h1>
              Olá, eu sou <span className="accent">{SITE.firstName}</span>
              <span className="h1-sub">Crio sites e sistemas para a web.</span>
            </h1>
            <p className="lead">
              Desenvolvedor full stack formado em ADS e pós-graduando em Engenharia de Software. Faço sites rápidos,
              que funcionam bem no celular e são fáceis de manter.
            </p>
            <div className="btns">
              <a className="btn primary" href="#projetos">Ver projetos <Icon name="arrow" /></a>
              {SITE.cv && <a className="btn" href={SITE.cv} download>Baixar currículo <Icon name="download" /></a>}
            </div>
            <p className="tech-label">Tecnologias que eu uso</p>
            <ul className="tech-row">
              {heroTech.map((t) => (<li key={t}><Tech name={t} size={32} label /></li>))}
            </ul>
          </div>

          <div className="hero-art">
            <div className="orb" aria-hidden="true" />
            <div className="dots" aria-hidden="true" />
            <svg className="swirl" viewBox="0 0 70 110" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M48 6C18 18 8 58 36 70c20 8 22-20 4-16-20 4-18 40 14 50" />
              <path d="M38 4l10 2-4 9" />
            </svg>
            {SITE.avatar ? <img className="avatar" src={SITE.avatar} alt={`Foto de ${SITE.name}`} /> : <Avatar />}
            <div className="code-card" aria-hidden="true">
              <header><span>&lt;/&gt; perfil.ts</span><i /></header>
              <pre>
<span className="k">const</span> dev = {"{"}{"\n"}
{"  "}nome: <span className="s">&quot;{SITE.firstName}&quot;</span>,{"\n"}
{"  "}stack: [<span className="s">&quot;Next.js&quot;</span>, <span className="s">&quot;React&quot;</span>,{"\n"}
{"    "}<span className="s">&quot;TypeScript&quot;</span>, <span className="s">&quot;Node.js&quot;</span>],{"\n"}
{"  "}foco: <span className="s">&quot;sites que geram{"\n"}{"    "}clientes&quot;</span>,{"\n"}
{"  "}disponivel: <span className="k">true</span>{"\n"}
{"}"};
              </pre>
            </div>
          </div>
        </div>
      </section>

      <section className="about alt" id="sobre">
        <div className="wrap">
          <div>
            <span className="eyebrow pill">Sobre mim</span>
            <h2>Sou apaixonado por criar soluções digitais</h2>
            <p>
              Sou formado em Análise e Desenvolvimento de Sistemas, faço pós-graduação em Engenharia de Software e
              concluí o curso Full Stack do IFES. Crio sites institucionais, landing pages e sistemas com painel
              administrativo, sempre com metodologias ágeis e boas práticas de segurança.
            </p>
            <a className="btn" href={SITE.linkedin} {...ext}>Ver meu LinkedIn <Icon name="user" /></a>
          </div>
          <ul className="stats">
            {stats.map((s) => (
              <li className="stat" key={s.label}>
                <span className="ic"><Icon name={s.icon} size={22} /></span>
                <div><b>{s.value}</b><span>{s.label}</span></div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="skills alt" id="skills">
        <div className="wrap">
          <div className="head-c">
            <span className="eyebrow">Minhas skills</span>
            <h2>Tecnologias que domino</h2>
          </div>
          <ul className="skills-grid">
            {skills.map((s) => (
              <li className="skill" key={s.name}>
                <Tech name={s.name} size={22} />
                <b>{s.name}</b>
                <small>{s.level}%</small>
                <div className="bar" aria-hidden="true"><i style={{ "--v": `${s.level}%` } as React.CSSProperties} /></div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="projects" id="projetos">
        <div className="wrap">
          <div className="head-c">
            <span className="eyebrow">Projetos em destaque</span>
            <h2>Alguns dos meus trabalhos</h2>
          </div>
          <ProjectCarousel items={cards} />
          {db.length > 0 && <p className="more"><a href="/projetos">Ver todos os projetos →</a></p>}
        </div>
      </section>

      <section className={testimonial ? "cta" : "cta no-quote"}>
        <div className="wrap">
          <div id="contato">
            <span className="eyebrow">Vamos trabalhar juntos</span>
            <h2>Tem um projeto em mente?</h2>
            <p>Estou sempre aberto a novos projetos e oportunidades. Vamos criar algo incrível juntos!</p>
            <a className="btn primary sm" href="#contato">Fale comigo <Icon name="arrow" /></a>
          </div>

          {testimonial && (
            <figure className="quote">
              <Quote />
              <blockquote>{testimonial.quote}</blockquote>
              <figcaption>
                {testimonial.photo && <img src={testimonial.photo} alt="" />}
                <div><b>{testimonial.name}</b><small>{testimonial.role}</small></div>
              </figcaption>
            </figure>
          )}

          <div>
            <span className="eyebrow">Me siga</span>
            <ul className="social">
              <li><a href={SITE.github} aria-label="GitHub" {...ext}><Brand name="github" /></a></li>
              <li><a href={SITE.linkedin} aria-label="LinkedIn" {...ext}><Brand name="linkedin" /></a></li>
              <li><a href={SITE.instagram} aria-label="Instagram" {...ext}><Brand name="instagram" /></a></li>
            </ul>
            <a className="contact-line" href={`mailto:${SITE.email}`}><Icon name="mail" />{SITE.email}</a>
            <a className="contact-line" href={`https://wa.me/${SITE.whatsapp}`} {...ext}><Icon name="phone" />{phoneLabel(SITE.whatsapp)}</a>
          </div>
        </div>
      </section>

      <a className="wa" href={`https://wa.me/${SITE.whatsapp}`} {...ext}>WhatsApp</a>
    </>
  );
}
