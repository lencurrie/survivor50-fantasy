import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

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

    // Mock response - DB will be connected later
    return NextResponse.json({ 
      id: "mock-league-" + Date.now(), 
      code: code,
      message: "League created (database pending)"
    });
  } catch (error) {
    console.error("Error creating league:", error);
    return NextResponse.json(
      { error: "Failed to create league" },
      { status: 500 }
    );
  }
}
