import { Inter } from "next/font/google";
import "../../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Home",
  description: "homepage",
};

export default function HomeLayout ({ children }) {
    return (
        <main className={`${inter.className} h-screen w-screen bg-[#fff6e5]` }>
          <div className=" h-screen w-screen">
          {children}
          </div>
        </main>
    );
  }
  