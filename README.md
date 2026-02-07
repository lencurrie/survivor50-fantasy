# Survivor 50th Anniversary Fantasy League

A fantasy league website for Survivor Season 50 where fans can draft survivors, predict eliminations, and compete for points.

## Features

- **User Authentication** - Sign up/login with Clerk
- **Leagues** - Create or join private leagues with invite codes
- **Draft System** - Snake draft to pick your survivor team
- **Weekly Predictions** - Guess who gets voted out each episode
- **Points System** - Earn points for correct predictions and survivor achievements
- **Leaderboards** - Track your standing in real-time

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Clerk (Authentication)
- Prisma + PostgreSQL
- Vercel (Hosting)

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables (see `.env.example`)
4. Run database migrations: `npx prisma migrate dev`
5. Start the dev server: `npm run dev`

## Environment Variables

```env
# Database
DATABASE_URL="postgresql://..."

# Clerk Auth
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_..."
CLERK_SECRET_KEY="sk_..."
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL="/dashboard"
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL="/dashboard"
```

## Scoring System

### Survivor Achievements
| Action | Points |
|--------|--------|
| Wins immunity challenge | 2 |
| Wins reward challenge | 1 |
| Finds hidden immunity idol | 1 |
| Plays idol successfully | 5 |
| Finds advantage | 1 |
| Reads tree mail | 1 |
| Makes fire | 1 |
| Wins island challenge | 1 |
| Merges to new tribe | 1 |

### Predictions
- Correctly guess eliminated survivor: 1-10 points (allocated by user)

### Winner Pick
- Pick season winner before episode 1: 13 points
- Each episode you keep the same pick: +1 point

## Deployment

Deployed on Vercel: [https://survivor50-fantasy.vercel.app](https://survivor50-fantasy.vercel.app)
