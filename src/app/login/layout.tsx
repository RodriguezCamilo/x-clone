export default function LoginLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className="h-screen flex flex-col">
                {children}
            </body>
        </html>
    )

}