import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header variant="public" />
      <main id="main" className="flex-1" tabIndex={-1}>{children}</main>
      <Footer />
    </div>
  );
}
