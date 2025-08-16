import './globals.css';
import "./fontawesome";

export const metadata = {
  title: 'Movie App',
  description: 'Discover and watch movies',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
