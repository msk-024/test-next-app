import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        posts: {
          include: {
            post: true,
          },
        },
      },
    });
    return NextResponse.json({ status: "OK", categories });
  } catch (error) {
    return NextResponse.json(
      { status: "ERROR", message: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name }: { name: string } = await request.json();

    const data = await prisma.category.create({
      data: { name },
    });

    return NextResponse.json({
      status: "OK",
      message: "作成しました",
      id: data.id,
    });
  } catch (error) {
    console.error("カテゴリー一覧取得エラー:", error);
    return NextResponse.json(
      { status: "ERROR", message: (error as Error).message },
      { status: 500 }
    );
  }
}
