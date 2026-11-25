import Image from "next/image";
import selfPortrait from "@/public/self.webp";

export default function Home() {
  return (
    <div className="flex flex-row">
      <div className="flex flex-col">
        <h1>About Me</h1>
        <div></div>
      </div>
      <Image src={selfPortrait} alt="Self Portrait of Chandler" />
    </div>
  );
}
