import { Roboto } from "next/font/google";
import StyledComponentsRegistry from "../lib/registry";
import ThemeProvider from "../styles/ThemeProvider";
import "./globals.css";

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: "Dark Mysteries - Location Puzzle Adventure",
  description: "A dark-themed location-based mystery puzzle game",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <StyledComponentsRegistry>
          <ThemeProvider>{children}</ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
