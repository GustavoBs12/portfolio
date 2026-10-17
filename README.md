# Portfólio — Gustavo Borges (Next.js + TypeScript)

## 1. Instalar as dependências
    npm install
Por quê: o `package.json` lista as bibliotecas (Next, React). Este comando baixa tudo para a pasta `node_modules`.

## 2. Rodar localmente
    npm run dev
Abra http://localhost:3000. Por quê: o modo `dev` recarrega a página sozinho a cada alteração que você salvar.

## 3. Personalizar (arquivo `app/site.ts`)
- `SITE`: WhatsApp (55 + DDD + número), e-mail, GitHub, LinkedIn e Instagram. Os itens com `TODO` ainda estão com valores de exemplo. Por quê: o menu, o rodapé, os botões e o card de contato leem tudo daqui.
- Currículo: coloque o PDF em `public/curriculo.pdf` (crie a pasta `public`) e preencha `cv: "/curriculo.pdf"`. Enquanto `cv` estiver vazio, o botão "Baixar currículo" fica escondido.
- Avatar: o topo usa uma ilustração em SVG (`app/avatar.tsx`). Para usar sua foto ou avatar, salve um PNG sem fundo em `public/avatar.png` e preencha `avatar: "/avatar.png"`.
- `skills`: nome e porcentagem de cada tecnologia (as barras). `heroTech`: ícones embaixo dos botões do topo.
- `testimonial`: depoimento de cliente. Enquanto for `null`, o card não aparece. Use só depoimentos reais.
- Textos do topo e do "Sobre mim" ficam em `app/page.tsx`. Os projetos e posts são cadastrados pelo painel `/admin`.
- Cores: ficam no topo de `app/globals.css` (`:root`). Por quê: mudar uma variável muda o site inteiro.
- Qualquer link para `#contato` (botão "Contratar", "Fale comigo", item Contato do menu) abre o formulário numa janela (`app/contact-dialog.tsx`).

## Blog
1. No Supabase, em SQL Editor, rode a parte "Blog" do `supabase.sql` (cria a tabela `posts`). Se é a primeira vez, rode o arquivo inteiro.
2. Em `/admin`, use o formulário "Posts do blog": título, resumo, texto e capa (opcional). No texto, deixe uma linha em branco entre parágrafos e comece uma linha com `## ` para fazer um subtítulo.
3. Os posts aparecem em `/blog`, do mais novo para o mais antigo, sem precisar de novo deploy.

## 4. Testar a versão de produção
    npm run build
Por quê: é a versão otimizada que vai ao ar; o build também aponta erros de TypeScript.

## 5. Publicar de graça
1. `git init`, `git add .`, `git commit -m "portfólio"` e envie ao GitHub. Por quê: a hospedagem puxa o código do repositório.
2. Entre na Vercel (vercel.com) com o GitHub, escolha o repositório e clique em Deploy. Por quê: a Vercel é feita para Next.js e o plano gratuito atende um portfólio.

## Formulário que envia para o seu e-mail
1. Crie uma conta grátis em resend.com e gere uma chave em API Keys. Por quê: o Resend é o serviço que entrega o e-mail; o site só entrega a mensagem para ele.
2. Copie `.env.example` para `.env.local` e preencha `RESEND_API_KEY` (a chave) e `CONTACT_TO_EMAIL` (o e-mail da conta do Resend). Por quê: chaves secretas ficam em variáveis de ambiente, nunca no código nem no GitHub (o `.env.local` já é ignorado pelo Git). Sem domínio próprio verificado, o Resend só entrega para o e-mail da sua própria conta, o que serve para um portfólio.
3. Rode `npm run dev` e envie uma mensagem de teste. Por quê: confirma tudo antes de publicar.
4. Na Vercel, em Settings > Environment Variables, cadastre as mesmas duas variáveis e faça um novo deploy. Por quê: o `.env.local` não vai para o GitHub, então a Vercel precisa ter os valores por conta própria.

Proteções já incluídas (`app/api/contact/route.ts`): validação de nome, e-mail e tamanho da mensagem no servidor (o navegador pode ser burlado), campo escondido que pega robôs, limite de 3 envios por IP a cada 10 minutos e escape do HTML para ninguém injetar código no seu e-mail.

## Animações
- Projetos em carrossel (`app/project-carousel.tsx`): arrasta no celular e tem bolinhas de página quando há mais de 3 projetos.
- As barras de skills crescem ao rolar a página (em navegadores com suporte; nos outros já aparecem cheias).
- Quem ativou "reduzir movimento" no aparelho vê tudo parado. Por quê: acessibilidade.

## Publicar o site e ir subindo seus projetos
**Primeira vez (publicar):**
1. Crie um repositório vazio no GitHub (ex.: `portfolio`). Por quê: a Vercel lê o código de lá.
2. Na pasta do projeto: `git init`, `git add .`, `git commit -m "primeira versão"`. Por quê: registra o estado atual do código.
3. `git branch -M main`, `git remote add origin URL-DO-SEU-REPOSITORIO`, `git push -u origin main`. Por quê: envia o código ao GitHub.
4. Em vercel.com, entre com o GitHub, clique em Add New > Project, escolha o repositório e em Environment Variables cadastre as 6 variáveis do `.env.example`. Depois clique em Deploy. Por quê: o `.env.local` não vai ao GitHub, então a Vercel precisa dos valores por conta própria.

**Toda vez que fizer um projeto novo:** abra `seusite.com/admin`, entre com a senha, preencha o formulário e clique em Adicionar. Por quê: os projetos ficam no banco de dados, então o site atualiza na hora, sem git push nem novo deploy. Só use git/push quando mudar o código do site.

## Painel admin e banco de dados (Supabase)
1. Crie uma conta grátis em supabase.com e um projeto novo. Por quê: é o banco onde os projetos ficam guardados para sempre (a Vercel não guarda dados).
2. Em SQL Editor, cole o conteúdo de `supabase.sql` e clique em Run. Por quê: cria a tabela `projects`. O arquivo também liga o RLS, que impede qualquer acesso direto pelo navegador.
3. Em Project Settings > API, copie a Project URL para `SUPABASE_URL` e a chave **service_role** para `SUPABASE_SERVICE_ROLE_KEY` no `.env.local`. Por quê: só o servidor do seu site usa essa chave. Ela dá acesso total ao banco, então nunca a coloque em código nem no GitHub.
4. Invente uma senha forte para `ADMIN_PASSWORD` e um texto longo e aleatório (40+ caracteres) para `ADMIN_SESSION_SECRET`. Por quê: a senha libera o painel; o segredo assina o cookie de login para ninguém conseguir forjá-lo.
5. Rode `npm run dev`, abra http://localhost:3000/admin e cadastre um projeto. Depois repita as 6 variáveis na Vercel.

Segurança já incluída: cookie de login `httpOnly` e `sameSite=strict` (bloqueia roubo por script e ataques CSRF), limite de 5 tentativas de senha por IP a cada 10 minutos, validação no servidor, links aceitos só com http(s) (barra `javascript:`) e página `/admin` fora do Google (`noindex`).
