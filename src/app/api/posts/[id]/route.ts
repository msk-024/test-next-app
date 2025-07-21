import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// 取得
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const post = await prisma.post.findUnique({
      where: { id: parseInt(params.id) },
      include: {
        postCategories: {
          include: {
            category: {
              select: { id: true, name: true },
            },
          },
        },
      },
    });

    return NextResponse.json({ status: "OK", post });
  } catch (error) {
    return NextResponse.json(
      { status: "ERROR", message: (error as Error).message },
      { status: 500 }
    );
  }
}

// 削除
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);

  try {
    await prisma.postCategory.deleteMany({
      where: { postId: id },
    });

    await prisma.post.delete({
      where: { id },
    });

    return NextResponse.json({ message: "削除成功" });
  } catch (err) {
    console.error("削除失敗:", err);
    return NextResponse.json({ message: "削除失敗" }, { status: 500 });
  }
}
