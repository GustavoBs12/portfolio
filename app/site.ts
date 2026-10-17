// Tudo o que é pessoal no site sai daqui. Troque os itens marcados com TODO pelos seus dados reais.
export const SITE = {
  name: "Gustavo Borges",
  firstName: "Gustavo",
  role: "Desenvolvedor Web",
  whatsapp: "5527996309558",
  email: "gustavobsjn2@gmail.com",
  github: "https://github.com/GustavoBs12",
  linkedin: "https://www.linkedin.com/in/gustavobs12",
  instagram: "https://www.instagram.com/gustavo_bs_12",
  cv: "", // Para mostrar o botão "Baixar currículo": coloque o PDF em public/curriculo.pdf e escreva "/curriculo.pdf" aqui.
  avatar: "", // Opcional: "/avatar.png" em public/ (PNG sem fundo). Vazio = ilustração padrão.
};

// Ícones que aparecem embaixo dos botões do topo.
export const heroTech = ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Node.js", "Git"];

// TODO: ajuste as porcentagens para o seu nível real.
export const skills = [
  { name: "HTML", level: 90 },
  { name: "React", level: 75 },
  { name: "Node.js", level: 65 },
  { name: "CSS", level: 85 },
  { name: "Next.js", level: 75 },
  { name: "Supabase", level: 65 },
  { name: "JavaScript", level: 80 },
  { name: "TypeScript", level: 70 },
  { name: "Git", level: 80 },
];

export type Testimonial = { quote: string; name: string; role: string; photo?: string };

// TODO: quando tiver um depoimento real de cliente, preencha aqui e o card aparece no site. Exemplo:
// { quote: "O Gustavo entregou...", name: "Nome do cliente", role: "Cargo, Empresa", photo: "/cliente.jpg" }
export const testimonial: Testimonial | null = null;

export const phoneLabel = (n: string) => n.replace(/^(\d{2})(\d{2})(\d{4,5})(\d{4})$/, "+$1 ($2) $3-$4");
