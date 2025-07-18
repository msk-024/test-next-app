import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        postCategories: {
          include: {
            category: true,
          },
        },
      },
    });

    return NextResponse.json({ posts });
  } catch (error) {
    console.error("投稿取得エラー:", error);
    return NextResponse.json(
      { message: "投稿の取得に失敗しました" },
      { status: 500 }
    );
  }
}
