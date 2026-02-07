# Survivor 50th Anniversary Fantasy League - Project Plan

## Overview
A fantasy league website for Survivor Season 50 where fans can draft survivors, predict eliminations, and compete for points.

## Core Features

### 1. User System
- Email/password signup & login
- Profile with display name
- Join/create leagues

### 2. Draft System
- Snake draft before season starts
- Each player drafts 3-5 survivors
- Real-time draft room with WebSocket

### 3. Weekly Predictions (Outwit)
- Guess which survivor gets voted out each episode
- Allocate 0-10 points to each guess
- Earn points for correct predictions

### 4. Scoring System (Outplay + Outlast)

**Survivor Achievements:**
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
| Plays an idol (on themself) | 1 |

**Bonus Points:**
- Pick season winner: 1 point per consecutive week picked (max 13)
- Survivor eliminated: 1 point per episode they were out

### 5. Leaderboards
- League-specific standings
- Global rankings
- Weekly episode breakdown

### 6. Admin Panel
- Manage seasons/episode data
- Input challenge winners
- Track eliminations
- Adjust scores manually if needed

## Tech Stack
- **Frontend:** Next.js 14 (App Router), Tailwind CSS
- **Backend:** Next.js API Routes
- **Database:** PostgreSQL (Neon or Supabase)
- **Auth:** Clerk
- **Real-time:** Pusher or Socket.io
- **Hosting:** Vercel
- **Images:** Cloudinary (for survivor photos)

## Data Model

### Entities
- **User**: id, email, name, avatar
- **League**: id, name, code, season_id, owner_id
- **Season**: id, season_number, name, status
- **Survivor**: id, name, season_id, image_url, eliminated_episode
- **PlayerTeam**: id, user_id, league_id, draft_order
- **TeamSurvivor**: player_team_id, survivor_id
- **Prediction**: id, user_id, episode_id, survivor_id, points_allocated
- **Score**: id, player_team_id, episode_id, points, category

## Pages
1. **Landing** - Hero, features, sign up CTA
2. **Auth** - Login/signup
3. **Dashboard** - My leagues, create/join
4. **League** - Draft, standings, chat
5. **Episode** - Make predictions, view results
6. **Admin** - Manage season data

## Phases

### Phase 1: Core (Week 1)
- [ ] Auth system (Clerk)
- [ ] Database setup (Supabase)
- [ ] Basic league creation/joining
- [ ] Survivor data import (S50 cast)

### Phase 2: Draft (Week 1-2)
- [ ] Draft room with real-time updates
- [ ] Snake draft logic
- [ ] Team assignment

### Phase 3: Predictions (Week 2+)
- [ ] Weekly prediction interface
- [ ] Point allocation slider (0-10)
- [ ] Auto-scoring from admin inputs

### Phase 4: Polish
- [ ] Leaderboards & stats
- [ ] Mobile responsive
- [ ] Share results

## Design Inspiration
- Dark tropical theme (Survivor aesthetic)
- Torch/flame accents
- Survivor logo styling
- Clean, modern cards

## Deployment
- Vercel for hosting
- GitHub repo: `survivor50-fantasy`

## Timeline
- **Week 1:** Core + Draft
- **Week 2:** Predictions + Scoring
- **Week 3:** Polish + Deploy

---

Ready to build this. Creating GitHub repo now.
