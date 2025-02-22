import { Geist } from "next/font/google";
import { Thinker } from "@/components/Thinker";

const geist = Geist({
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div className={`${geist.className} min-h-screen flex items-center justify-center bg-black`}>
      <Thinker />
    </div>
  );
}
