"use client"

import Image from "next/image";
import { useState } from "react";

// Define the type for a member
interface Member {
  name: string;
  role: string;
  image: string;
  color: string;
}

export default function Home() {
  // Use the Member type for the members state
  const [members, setMembers] = useState<Member[]>([]);

  const fetchMembers = async () => {
    const response = await fetch('/static/data/members.json');
    const data: Member[] = await response.json();
    setMembers(data);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Pensa
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
          <button
            className="flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            onClick={fetchMembers}
          >
            By{" "}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className="dark:invert"
              width={100}
              height={24}
              priority
            />
          </button>
        </div>
      </div>

      <div className="relative z-[-1] flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]">
        <h1>Pensa</h1>
      </div>

      <div className="mt-10">
        {members.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {members.map((member, index) => (
              <div key={index} className={`p-4 border rounded-lg bg-${member.color}-200`}>
                <img src={member.image} alt={member.name} className="w-full h-48 object-cover rounded-lg" />
                <h2 className="text-xl font-bold">{member.name}</h2>
                <p className="text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
