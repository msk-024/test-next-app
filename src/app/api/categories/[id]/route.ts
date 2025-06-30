import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // ← あなたの構成に応じて調整

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
