import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        createdAt: "desc",
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
    return NextResponse.json(
      { status: "ERROR", message: (error as Error).message },
      { status: 500 }
    );
  }
}

// 修正前
// import { NextRequest, NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";

// export const GET = async (request: NextRequest) => {
//   try {
//     const categories = await prisma.category.findMany({
//       orderBy: {
//         createdAt: "desc",
//       },
//     });
//     return NextResponse.json({ status: "OK", categories }, { status: 200 });
//   } catch (error) {
//     if (error instanceof Error) {
//       return NextResponse.json({ status: error.message }, { status: 400 });
//     }
//   }
// };

// interface CreateCategoryRequestBody {
//   name: string;
// }

// export const POST = async (request: NextRequest, context: any) => {
//   try {
//     const body = await request.json();
//     const { name }: CreateCategoryRequestBody = body;
//     const data = await prisma.category.create({
//       data: {
//         name,
//       },
//     });
//     return NextResponse.json({
//       status: "OK",
//       message: "作成しました",
//       id: data.id,
//     });
//   } catch (error) {
//     if (error instanceof Error) {
//       return NextResponse.json({ status: error.message }, { status: 400 });
//     }
//   }
// };
