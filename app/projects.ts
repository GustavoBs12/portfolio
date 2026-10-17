import type { Card } from "./lib/db";

// Projetos mostrados na página inicial enquanto você não cadastrou nenhum projeto no /admin.
// Com live_url, o cartão abre o site no ar. Imagens de capa ficam em public/projetos/.
export const samples: Card[] = [
  {
    id: "",
    title: "HabitaJN",
    description: "Portal imobiliário de João Neiva (ES): casas, apartamentos e terrenos para comprar ou alugar, com busca por tipo e bairro, cadastro de anunciantes, painel e planos para corretores.",
    tags: ["Next.js", "React", "TypeScript"],
    image_url: "/projetos/habitajn.png",
    live_url: "https://habitajn.vercel.app/",
  },
  { id: "", title: "Site para advogadas", description: "Site institucional criado com metodologia ágil, Git e GitHub.", tags: ["HTML", "CSS", "JavaScript"], image_url: null, live_url: null },
  { id: "", title: "Portal de notícias", description: "Portal com painel administrativo para publicar e gerenciar matérias.", tags: ["Next.js", "TypeScript"], image_url: null, live_url: null },
  { id: "", title: "Landing page mobGran", description: "Página de vendas responsiva, inspirada em um site real do setor de móveis e granitos.", tags: ["Next.js", "React", "CSS"], image_url: null, live_url: null },
];
