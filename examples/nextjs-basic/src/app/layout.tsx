export const metadata = {
  title: 'LearnKit AI · Next.js example',
  description: 'Minimal example of using @learnkit-ai/react in a Next.js App Router app.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          padding: '48px 24px',
          fontFamily:
            'system-ui, -apple-system, "Segoe UI", sans-serif',
          background: '#FAF7F0',
          color: '#1A2547',
        }}
      >
        {children}
      </body>
    </html>
  );
}
