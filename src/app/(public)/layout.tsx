import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

interface PublicLayoutProps {
  children: React.ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-[#090d16] transition-colors duration-200">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
