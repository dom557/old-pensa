"use client"

import { useState } from "react";
import Image from "next/image";

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

  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  const handleCardClick = (member: Member) => {
    setSelectedMember(member === selectedMember ? null : member);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
  <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
        By{" "}|samdak
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
          <button
            className="flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            onClick={fetchMembers}
          >
           {""}
            <Image
              src="/pensa.png"
              alt="Pensa logo"
              width={200}
              height={100}
              priority
            />
          </button>
        </div>
      </div>

      <div className="relative z-[-1] flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]">
        <h1 className="text-5xl text-center text-white font-serif font-bold">Pensa Lads</h1>
    </div>

    {selectedMember && (
        <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50 backdrop-filter backdrop-blur-lg z-50">
          <div className={`p-8 ${selectedMember.color} border rounded-lg max-w-md w-full sm:w-3/4 lg:w-1/2 text-center relative`}>
            <button
              className="absolute top-2 right-2 p-2 rounded-full bg-white text-gray-600 hover:bg-gray-200"
              onClick={() => setSelectedMember(null)}
            >
              X
            </button>
            <img src={selectedMember.image} alt={selectedMember.name} className="w-full h-48  object-cover rounded-lg mb-4" />
            <h2 className="text-xl font-bold">{selectedMember.name}</h2>
            <p className="text-sm">{selectedMember.role}</p>
          </div>
        </div>
      )}

      <div className="mt-10">
        {members.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {members.map((member, index) => (
              <div key={index} className={`relative border  p-4 ${member.color} shadow-lg rounded-lg overflow-hidden transform transition-transform hover:scale-105 member-card cursor-pointer`} onClick={() => handleCardClick(member)}>
                <img src={member.image} alt={member.name} className="w-full h-48 object-cover rounded-lg transition-all duration-300 filter hover:blur-none" />
                <div className={`absolute top-0 left-0 w-full h-full ${member.color} bg-opacity-90 backdrop-filter backdrop-blur-lg flex flex-col justify-center items-center opacity-0 transition-opacity duration-300 ${selectedMember === member ? 'opacity-100' : ''}`}>
                  <h2 className="text-xl font-bold">{member.name}</h2>
                  <p className="text-sm">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
