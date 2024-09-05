export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute w-screen h-screen flex flex-col bg-black items-center justify-center">
      {children}
    </div>
  );
}