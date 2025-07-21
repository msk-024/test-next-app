import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      include: {
        posts: {
          include: {
            post: true,
          },
        },
      },
    });

    return NextResponse.json({ categories });
  } catch (error) {
    console.error("カテゴリ取得失敗:", error);
    return NextResponse.json(
      { error: "カテゴリの取得に失敗しました" },
      { status: 500 }
    );
  }
}
