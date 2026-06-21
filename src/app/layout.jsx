import "../styles/global.css"

export const metadata = {
    title:  "Nero Study",
    description: "Painel de estudos, foco e produtividade pessoal",
}

export default function RootLayout( { children }){
    return(
        <html lang="pt-BR">
            <body>
                {children}
            </body>
        </html>
    )
    
}