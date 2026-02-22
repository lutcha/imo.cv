// app/(agency)/[subdomain]/layout.tsx
export default function AgencyLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-white dark:bg-gray-900">
            <nav className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50 dark:bg-gray-900/80">
                <div className="mx-auto max-w-7xl px-4 h-16 flex items-center justify-between">
                    <span className="text-xl font-bold text-imo-primary">imo.cv</span>
                    <div className="flex gap-4">
                        <button className="text-sm font-medium">Sobre Nós</button>
                        <button className="text-sm font-medium">Contacto</button>
                    </div>
                </div>
            </nav>
            <main id="main" tabIndex={-1}>{children}</main>
            <footer className="mt-20 border-t py-12 bg-gray-50 dark:bg-gray-800">
                <div className="mx-auto max-w-7xl px-4 text-center text-sm text-gray-500">
                    &copy; 2026 Powered by imo.cv
                </div>
            </footer>
        </div>
    );
}
