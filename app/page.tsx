import Image from "next/image";
import selfPortrait from "@/public/self.webp";

export default function Home() {
  return (
    <div className="flex flex-col gap-12 px-6 py-10 md:flex-row md:py-16">
      <div className="flex flex-col gap-3">
        <h1 className="text-2xl font-semibold tracking-tight">About Me</h1>
        <p className="text-sm leading-relaxed">
          Coming soon. I&apos;ll share my background, experience, and what
          I&apos;m currently building.
        </p>
      </div>

      <div className="flex-1 md:flex md:justify-end md:items-start md:pt-1">
        <div className="w-full max-w-[480px]">
          <Image
            src={selfPortrait}
            alt="Chandler Van"
            width={500}
            height={500}
            priority
            className="size-full object-contain rounded-sm"
          />
        </div>
      </div>
    </div>
  );
}
