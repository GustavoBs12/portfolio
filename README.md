# Portfólio - Gustavo Borges

Meu portfólio pessoal: apresenta quem eu sou, meus projetos e um jeito fácil de entrar em contato. Os projetos e os posts do blog são cadastrados por um painel administrativo, sem precisar publicar o site de novo.

**[Ver o site no ar](https://portfolio-seven-flax-99.vercel.app/)**

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

## Funcionalidades

| Recurso | O que faz |
| --- | --- |
| Painel admin | Em `/admin`, protegido por senha, cadastro de projetos e de posts sem novo deploy |
| Blog | Posts em `/blog`, do mais novo para o mais antigo |
| Formulário de contato | Envia a mensagem por e-mail (Resend), com validação no servidor, campo anti-robô e limite de envios por IP |
| Carrossel de projetos | Arrasta no celular e mostra bolinhas de página |
| Skills animadas | As barras crescem ao rolar a página e respeitam a opção "reduzir movimento" do aparelho |
| Segurança | Cookie de login httpOnly e sameSite strict, limite de tentativas de senha e RLS no Supabase |

## Tecnologias

| Camada | Ferramenta |
| --- | --- |
| Front-end | Next.js, React e TypeScript |
| Banco de dados | Supabase |
| E-mail | Resend |
| Hospedagem | Vercel |

## Como rodar localmente

```bash
git clone https://github.com/GustavoBs12/portfolio.git
cd portfolio
npm install
cp .env.example .env.local
npm run dev
```

Depois, abra http://localhost:3000. Antes de usar o painel e o formulário, preencha as variáveis do `.env.local`. O passo a passo completo (Supabase, Resend e publicação na Vercel) está em [SETUP.md](SETUP.md).

## Autor

Feito por **Gustavo Borges**, desenvolvedor Full Stack. Vamos conversar? Me chame no [LinkedIn](https://www.linkedin.com/in/gustavobs12/).
