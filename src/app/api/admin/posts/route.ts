import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const posts = await prisma.post.findMany({
      include: {
        postCategories: {
          include: {
            category: {
              select: { id: true, name: true },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ status: "OK", posts });
  } catch (error) {
    return NextResponse.json(
      { status: "ERROR", message: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const {
      title,
      content,
      categories,
      thumbnailUrl,
    }: {
      title: string;
      content: string;
      categories: { id: number }[];
      thumbnailUrl: string;
    } = await request.json();

    const post = await prisma.post.create({
      data: {
        title,
        content,
        thumbnailUrl,
      },
    });

    await Promise.all(
      categories.map((category) =>
        prisma.postCategory.create({
          data: {
            categoryId: category.id,
            postId: post.id,
          },
        })
      )
    );

    return NextResponse.json({
      status: "OK",
      message: "作成しました",
      id: post.id,
    });
  } catch (error) {
    return NextResponse.json(
      { status: "ERROR", message: (error as Error).message },
      { status: 500 }
    );
  }
}
