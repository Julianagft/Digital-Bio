import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Quem somos",
  description: "Quem somos",
};

export default function HomeLayout ({ children }) {
    return (
        <main className={`${inter.className} h-screen w-screen` }>
          <div className="bg-yellow-500 h-screen w-screen">
          {children}
          </div>
        </main>
    );
  }
  