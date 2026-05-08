import { AuthProvider } from "./context/AuthContext";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="mn">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
};

export default RootLayout;
