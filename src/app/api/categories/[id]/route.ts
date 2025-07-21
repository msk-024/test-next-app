import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GETカテゴリ詳細取得
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id, 10);
  if (isNaN(id)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  const category = await prisma.category.findUnique({
    where: { id },
  });

  if (!category) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ category });
}

// DELETEカテゴリ削除
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const categoryId = Number(params.id);

    await prisma.postCategory.deleteMany({
      where: { categoryId },
    });

    await prisma.category.delete({
      where: { id: categoryId },
    });

    return NextResponse.json({ message: "削除成功" });
  } catch (error) {
    console.error("削除エラー:", error);
    return NextResponse.json(
      { message: "削除に失敗しました" },
      { status: 500 }
    );
  }
}
