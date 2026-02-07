import Link from "next/link";
import { SignedIn, SignedOut } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-20">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          <span className="text-orange-500">Survivor 50</span>
          <br />
          Fantasy League
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
          Draft your survivors. Make predictions. Outwit, Outplay, Outlast.
          <br />
          Compete with friends in the ultimate Survivor fantasy experience.
        </p>
        <div className="flex justify-center gap-4">
          <SignedOut>
            <Link
              href="/sign-up"
              className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition transform hover:scale-105"
            >
              Get Started
            </Link>
          </SignedOut>
          <SignedIn>
            <Link
              href="/dashboard"
              className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition transform hover:scale-105"
            >
              Go to Dashboard
            </Link>
          </SignedIn>
          <Link
            href="#how-it-works"
            className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition"
          >
            How It Works
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="grid md:grid-cols-3 gap-8">
        <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700">
          <div className="text-4xl mb-4">🏝️</div>
          <h3 className="text-xl font-bold mb-3">Draft Your Team</h3>
          <p className="text-gray-400">
            Participate in a live snake draft to pick your squad of survivors. 
            Choose wisely - your picks determine your scoring potential.
          </p>
        </div>
        <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700">
          <div className="text-4xl mb-4">🎯</div>
          <h3 className="text-xl font-bold mb-3">Make Predictions</h3>
          <p className="text-gray-400">
            Each episode, predict who gets voted out. Allocate up to 10 points
            to your pick. Correct predictions earn you big points.
          </p>
        </div>
        <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700">
          <div className="text-4xl mb-4">🏆</div>
          <h3 className="text-xl font-bold mb-3">Win Your League</h3>
          <p className="text-gray-400">
            Earn points for immunities, idols found, and correct predictions.
            Climb the leaderboard and become the Sole Survivor of your league.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="bg-gray-800 rounded-3xl p-12">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
            <h4 className="font-bold mb-2">Create or Join</h4>
            <p className="text-gray-400 text-sm">Start a league with friends or join one with an invite code.</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
            <h4 className="font-bold mb-2">Draft Survivors</h4>
            <p className="text-gray-400 text-sm">Pick 3-5 survivors in a live snake draft before the season starts.</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
            <h4 className="font-bold mb-2">Predict Weekly</h4>
            <p className="text-gray-400 text-sm">Each episode, guess who gets voted out. Earn points for correct picks.</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">4</div>
            <h4 className="font-bold mb-2">Score Points</h4>
            <p className="text-gray-400 text-sm">Earn points for immunities, idols, and correct predictions.</p>
          </div>
        </div>
      </section>

      {/* Scoring Preview */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-8">Scoring System</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700">
            <h3 className="text-xl font-bold mb-4 text-orange-500">Survivor Achievements</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex justify-between"><span>Wins Immunity</span><span className="font-bold">+2 pts</span></li>
              <li className="flex justify-between"><span>Wins Reward</span><span className="font-bold">+1 pt</span></li>
              <li className="flex justify-between"><span>Finds Idol</span><span className="font-bold">+1 pt</span></li>
              <li className="flex justify-between"><span>Plays Idol Successfully</span><span className="font-bold">+5 pts</span></li>
              <li className="flex justify-between"><span>Makes Fire</span><span className="font-bold">+1 pt</span></li>
            </ul>
          </div>
          <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700">
            <h3 className="text-xl font-bold mb-4 text-orange-500">Predictions & Bonuses</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex justify-between"><span>Correct Elimination Guess</span><span className="font-bold">Up to +10 pts</span></li>
              <li className="flex justify-between"><span>Pick Winner (Episode 1)</span><span className="font-bold">+13 pts</span></li>
              <li className="flex justify-between"><span>Keep Same Winner Pick</span><span className="font-bold">+1 pt/week</span></li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-12">
        <h2 className="text-3xl font-bold mb-4">Ready to Play?</h2>
        <p className="text-gray-400 mb-8">Join thousands of fans competing in Survivor fantasy leagues.</p>
        <SignedOut>
          <Link
            href="/sign-up"
            className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition"
          >
            Sign Up Free
          </Link>
        </SignedOut>
        <SignedIn>
          <Link
            href="/dashboard"
            className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition"
          >
            Go to Dashboard
          </Link>
        </SignedIn>
      </section>
    </div>
  );
}
