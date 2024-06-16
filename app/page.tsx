"use client"

import { useState, useEffect } from "react";
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
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  // Fetch members when the component mounts
  useEffect(() => {
    const fetchMembers = async () => {
      const response = await fetch('/static/data/members.json');
      const data: Member[] = await response.json();
      setMembers(data);
    };
    fetchMembers();
  }, []);

  const handleCardClick = (member: Member) => {
    setSelectedMember(member === selectedMember ? null : member);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <div className="fixed left-0 top-0 flex w-full justify-center items-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          <Image
            src="/pensa.png"
            alt="Pensa logo"
            width={100}
            height={25}
            priority
          />
          <p className="ml-2">
            By samdak &#9829;
          </p>
        </div>
      </div>

      <div className="relative z-[-1] flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]">
        <h1 className="text-5xl text-center text-white font-sans font-bold">Pensa Lads</h1>
      </div>
      
      {selectedMember && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 backdrop-blur-lg z-50">
          <div className="bg-white p-8 border rounded-lg max-w-md w-full sm:w-3/4 lg:w-1/2 text-center relative shadow-xl animate-pulse border-4 border-blue-500">
            <button
              className="absolute top-2 right-2 p-2 rounded-full bg-red-500 text-white hover:bg-red-600 focus:outline-none transition-transform transform hover:rotate-90"
              onClick={() => setSelectedMember(null)}
            >
              &times;
            </button>
            <img
              src={selectedMember.image}
              alt={selectedMember.name}
              className="w-32 h-32 object-cover rounded-full mx-auto mb-4 shadow-md animate-spin-slow"
            />
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {selectedMember.name}
            </h2>
            <p className="text-lg text-gray-700">
              {selectedMember.role}
            </p>
          </div>
        </div>
      )}

      <div className="mt-40 w-full px-4">
        {members.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {members.map((member, index) => (
              <div
                key={index}
                className="relative border p-4 bg-gray-900 text-white rounded-lg shadow-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-2xl cursor-pointer member-card before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-[rgba(255,255,255,0.1)] before:to-transparent before:transition-all before:duration-300 before:transform before:skew-x-12 before:scale-x-0 hover:before:scale-x-100 after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-[rgba(255,255,255,0.1)] after:to-transparent after:transition-all after:duration-300 after:transform after:skew-x-12 after:scale-x-0 hover:after:scale-x-100"
                onClick={() => handleCardClick(member)}
              >
                <h2
                  className="text-2xl font-bold mb-2 relative group"
                  style={{
                    color: member.color,
                    textShadow: `0 0 5px ${member.color}, 0 0 10px ${member.color}, 0 0 15px ${member.color}, 0 0 20px ${member.color}, 0 0 25px rgba(0, 0, 0, 0.5)`,
                  }}
                >
                  {member.name}
                  <span
                    className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none"
                    style={{
                      textShadow: `0 0 5px ${member.color}, 0 0 10px ${member.color}, 0 0 15px ${member.color}, 0 0 20px ${member.color}, 0 0 25px rgba(0, 0, 0, 0.5)`,
                    }}
                  >
                    -&gt;
                  </span>
                </h2>
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 object-cover rounded-full mx-auto mb-4 shadow-md"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
