export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-layout">
      <style>{`
        header { display: none !important; }
        footer { display: none !important; }
        main { padding-top: 0 !important; }
      `}</style>
      {children}
    </div>
  );
}