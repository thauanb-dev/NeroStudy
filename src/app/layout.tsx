import type {ReactNode} from 'react'
import "../styles/global.css"


export const metadata = {
    title:  "Nero Study",
    description: "Painel de estudos, foco e produtividade pessoal",
}

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout( { children }: RootLayoutProps){
    return(
        <html lang="pt-BR">
            <body>
                {children}
            </body>
        </html>
    )
    
}