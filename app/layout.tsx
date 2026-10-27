import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import SiteNav from "./site-nav";
import ContactDialog from "./contact-dialog";
import { Heart } from "./icons";
import { SITE } from "./site";

const font = Plus_Jakarta_Sans({ subsets: ["latin"], display: "swap" });

const SITE_URL = "https://portfolio-seven-flax-99.vercel.app";
const TITLE = `${SITE.name} | Desenvolvedor Full Stack`;
const DESCRIPTION =
  "Desenvolvedor formado em ADS, pós-graduando em Engenharia de Software. Crio sites e sistemas web sob medida.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE, template: `%s | ${SITE.name}` },
  description: DESCRIPTION,
  openGraph: { type: "website", locale: "pt_BR", siteName: SITE.name, url: "/", title: TITLE, description: DESCRIPTION },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={font.className}>
        <SiteNav />
        <main>{children}</main>
        <footer className="foot">
          <div className="wrap">
            <span>© {new Date().getFullYear()} {SITE.name}. Todos os direitos reservados.</span>
            <span>Feito com <Heart /> por {SITE.firstName}</span>
          </div>
        </footer>
        <ContactDialog />
      </body>
    </html>
  );
}
