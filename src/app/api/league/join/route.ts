import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { code } = await req.json();

    if (!code) {
      return NextResponse.json(
        { error: "Invite code is required" },
        { status: 400 }
      );
    }

    // Find league by code
    const league = await prisma.league.findUnique({
      where: { code },
    });

    if (!league) {
      return NextResponse.json(
        { error: "Invalid invite code" },
        { status: 404 }
      );
    }

    // Check if user is already a member
    const existingMember = await prisma.leagueMember.findFirst({
      where: {
        leagueId: league.id,
        userId: userId,
      },
    });

    if (existingMember) {
      return NextResponse.json(
        { error: "You're already in this league" },
        { status: 400 }
      );
    }

    // Get or create user
    let user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          id: userId,
          email: `user-${userId}@example.com`,
          name: "New User",
        },
      });
    }

    // Add member to league
    await prisma.leagueMember.create({
      data: {
        leagueId: league.id,
        userId: userId,
      },
    });

    // Create player team
    await prisma.playerTeam.create({
      data: {
        userId: userId,
        leagueId: league.id,
      },
    });

    return NextResponse.json({ leagueId: league.id });
  } catch (error) {
    console.error("Error joining league:", error);
    return NextResponse.json(
      { error: "Failed to join league" },
      { status: 500 }
    );
  }
}
