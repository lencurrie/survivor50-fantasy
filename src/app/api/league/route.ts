import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, code } = await req.json();

    if (!name || !code) {
      return NextResponse.json(
        { error: "Name and code are required" },
        { status: 400 }
      );
    }

    // Get or create the current season (Survivor 50)
    let season = await prisma.season.findFirst({
      where: { number: 50 },
    });

    if (!season) {
      season = await prisma.season.create({
        data: {
          number: 50,
          name: "Survivor 50: Legends",
          status: "upcoming",
        },
      });
    }

    // Get or create user in database
    let user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      // Get user details from Clerk - in production you'd use Clerk's API
      user = await prisma.user.create({
        data: {
          id: userId,
          email: `user-${userId}@example.com`, // Placeholder
          name: "New User",
        },
      });
    }

    // Create the league
    const league = await prisma.league.create({
      data: {
        name,
        code,
        seasonId: season.id,
        ownerId: userId,
      },
    });

    // Add creator as member
    await prisma.leagueMember.create({
      data: {
        leagueId: league.id,
        userId: userId,
      },
    });

    // Create player team for owner
    await prisma.playerTeam.create({
      data: {
        userId: userId,
        leagueId: league.id,
      },
    });

    return NextResponse.json({ id: league.id, code: league.code });
  } catch (error) {
    console.error("Error creating league:", error);
    return NextResponse.json(
      { error: "Failed to create league" },
      { status: 500 }
    );
  }
}
