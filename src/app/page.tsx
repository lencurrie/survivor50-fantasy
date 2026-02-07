import Link from "next/link";
import { SignedIn, SignedOut, SignUpButton } from "@clerk/nextjs";
import { Trophy, Users, Target, Flame, ChevronRight } from "lucide-react";

export default function Home() {
  return (
    <div className="space-y-20">
      {/* Hero Section - Survivor Style */}
      <section className="relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-stone-800/50 via-stone-950 to-stone-950 -z-10" />
        
        <div className="text-center py-16 md:py-24">
          {/* Season Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-600/20 to-orange-600/20 border border-yellow-600/30 rounded-full px-4 py-2 mb-8">
            <Flame className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-bold tracking-wider text-orange-400">SEASON 50 • LEGENDS</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tight">
            <span className="bg-gradient-to-b from-yellow-400 via-orange-500 to-red-600 bg-clip-text text-transparent">
              SURVIVOR
            </span>
            <br />
            <span className="text-stone-300 text-4xl md:text-6xl">FANTASY LEAGUE</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-stone-400 max-w-3xl mx-auto mb-12 leading-relaxed">
            The tribe has spoken. Now it's your turn to 
            <span className="text-orange-400 font-bold"> Outwit</span>, 
            <span className="text-orange-400 font-bold"> Outplay</span>, and 
            <span className="text-orange-400 font-bold"> Outlast</span>.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <SignedOut>
              <SignUpButton mode="modal">
                <button className="group bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white px-10 py-5 rounded-xl font-black text-lg tracking-wide transition-all transform hover:scale-105 shadow-2xl shadow-orange-900/50 flex items-center justify-center gap-3">
                  <Flame className="w-6 h-6 group-hover:animate-pulse" />
                  ENTER THE GAME
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition" />
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <Link
                href="/dashboard"
                className="group bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white px-10 py-5 rounded-xl font-black text-lg tracking-wide transition-all transform hover:scale-105 shadow-2xl shadow-orange-900/50 flex items-center justify-center gap-3"
              >
                <Trophy className="w-6 h-6" />
                GO TO DASHBOARD
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition" />
              </Link>
            </SignedIn>
            <Link
              href="#how-it-works"
              className="bg-stone-800 hover:bg-stone-700 border-2 border-stone-700 text-stone-300 px-10 py-5 rounded-xl font-bold text-lg transition flex items-center justify-center"
            >
              HOW IT WORKS
            </Link>
          </div>
        </div>
      </section>

      {/* Features - Tribal Card Style */}
      <section>
        <div className="grid md:grid-cols-3 gap-6">
          {/* Draft Card */}
          <div className="group relative bg-gradient-to-b from-stone-800 to-stone-900 rounded-2xl p-8 border border-stone-700 hover:border-orange-600/50 transition-all hover:shadow-2xl hover:shadow-orange-900/20">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-0 group-hover:opacity-100 transition" />
            <div className="w-16 h-16 bg-gradient-to-br from-orange-600 to-red-700 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-orange-900/30">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-black text-stone-100 mb-3 tracking-wide">DRAFT YOUR TRIBE</h3>
            <p className="text-stone-400 leading-relaxed">
              Enter the snake draft and hand-pick your squad of castaways. 
              Choose wisely—your fate is tied to theirs.
            </p>
          </div>

          {/* Predictions Card */}
          <div className="group relative bg-gradient-to-b from-stone-800 to-stone-900 rounded-2xl p-8 border border-stone-700 hover:border-orange-600/50 transition-all hover:shadow-2xl hover:shadow-orange-900/20">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-0 group-hover:opacity-100 transition" />
            <div className="w-16 h-16 bg-gradient-to-br from-orange-600 to-red-700 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-orange-900/30">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-black text-stone-100 mb-3 tracking-wide">MAKE PREDICTIONS</h3>
            <p className="text-stone-400 leading-relaxed">
              Each tribal council, predict who gets their torch snuffed. 
              Bet up to 10 points. Get it right, reap the rewards.
            </p>
          </div>

          {/* Win Card */}
          <div className="group relative bg-gradient-to-b from-stone-800 to-stone-900 rounded-2xl p-8 border border-stone-700 hover:border-orange-600/50 transition-all hover:shadow-2xl hover:shadow-orange-900/20">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-0 group-hover:opacity-100 transition" />
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-orange-900/30">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-black text-stone-100 mb-3 tracking-wide">CLAIM VICTORY</h3>
            <p className="text-stone-400 leading-relaxed">
              Rack up points for immunities, idols, and correct votes. 
              Climb the leaderboard and earn the title of Sole Survivor.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works - Tribal Steps */}
      <section id="how-it-works" className="relative">
        <div className="absolute inset-0 bg-stone-900/50 rounded-3xl -z-10" />
        <div className="p-8 md:p-12">
          <h2 className="text-4xl font-black text-center mb-16 tracking-tight">
            <span className="text-orange-500">THE GAME</span> PLAN
          </h2>
          
          <div className="grid md:grid-cols-4 gap-8 relative">
            {/* Connection Line */}
            <div className="hidden md:block absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-stone-800 via-orange-600/30 to-stone-800" />
            
            {[
              { num: "01", title: "CREATE OR JOIN", desc: "Start your own tribe or join an existing one with a code." },
              { num: "02", title: "DRAFT CASTAWAYS", desc: "Pick 3-5 survivors in the live snake draft." },
              { num: "03", title: "PREDICT VOTES", desc: "Guess who goes home each episode." },
              { num: "04", title: "SCORE POINTS", desc: "Earn points and climb the leaderboard." },
            ].map((step, i) => (
              <div key={i} className="text-center relative">
                <div className="w-16 h-16 bg-gradient-to-br from-stone-800 to-stone-900 border-2 border-orange-600/50 rounded-full flex items-center justify-center text-2xl font-black text-orange-500 mx-auto mb-6 relative z-10 shadow-xl shadow-orange-900/20">
                  {step.num}
                </div>
                <h4 className="font-black text-lg text-stone-200 mb-2 tracking-wide">{step.title}</h4>
                <p className="text-stone-500 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scoring Section */}
      <section>
        <h2 className="text-4xl font-black text-center mb-12 tracking-tight">
          <span className="text-orange-500">SCORING</span> SYSTEM
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Achievements */}
          <div className="bg-gradient-to-b from-stone-800/80 to-stone-900/80 rounded-2xl p-8 border border-stone-700">
            <h3 className="text-xl font-black text-orange-400 mb-6 tracking-wide flex items-center gap-2">
              <Flame className="w-5 h-5" />
              CASTAWAY ACHIEVEMENTS
            </h3>
            <ul className="space-y-4">
              {[
                { action: "Wins Individual Immunity", pts: "+2" },
                { action: "Wins Reward Challenge", pts: "+1" },
                { action: "Finds Hidden Idol", pts: "+1" },
                { action: "Plays Idol Successfully", pts: "+5" },
                { action: "Finds Advantage", pts: "+1" },
                { action: "Wins Fire-Making", pts: "+2" },
              ].map((item, i) => (
                <li key={i} className="flex justify-between items-center py-2 border-b border-stone-800 last:border-0">
                  <span className="text-stone-300">{item.action}</span>
                  <span className="font-black text-orange-500 text-lg">{item.pts}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Predictions */}
          <div className="bg-gradient-to-b from-stone-800/80 to-stone-900/80 rounded-2xl p-8 border border-stone-700">
            <h3 className="text-xl font-black text-orange-400 mb-6 tracking-wide flex items-center gap-2">
              <Target className="w-5 h-5" />
              PREDICTIONS & BONUSES
            </h3>
            <ul className="space-y-4">
              {[
                { action: "Correct Elimination Guess", pts: "Up to +10" },
                { action: "Pick Winner (Episode 1)", pts: "+13" },
                { action: "Keep Same Winner Pick", pts: "+1/episode" },
                { action: "Survivor Makes Merge", pts: "+1" },
              ].map((item, i) => (
                <li key={i} className="flex justify-between items-center py-2 border-b border-stone-800 last:border-0">
                  <span className="text-stone-300">{item.action}</span>
                  <span className="font-black text-orange-500 text-lg">{item.pts}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="text-center py-16">
        <div className="bg-gradient-to-r from-orange-900/30 via-stone-900/50 to-orange-900/30 rounded-3xl p-12 border border-orange-600/20">
          <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
            READY TO PLAY?
          </h2>
          <p className="text-stone-400 text-xl mb-8 max-w-2xl mx-auto">
            20 castaways. 39 days. 1 Sole Survivor. 
            <br />Will it be you?
          </p>
          <SignedOut>
            <SignUpButton mode="modal">
              <button className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white px-12 py-5 rounded-xl font-black text-xl tracking-wide transition-all transform hover:scale-105 shadow-2xl shadow-orange-900/50">
                START YOUR JOURNEY
              </button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <Link
              href="/dashboard"
              className="inline-block bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white px-12 py-5 rounded-xl font-black text-xl tracking-wide transition-all transform hover:scale-105 shadow-2xl shadow-orange-900/50"
            >
              GO TO DASHBOARD
            </Link>
          </SignedIn>
        </div>
      </section>
    </div>
  );
}
