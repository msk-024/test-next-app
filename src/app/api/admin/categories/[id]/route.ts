import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const category = await prisma.category.findUnique({
      where: { id: parseInt(params.id) },
    });
    return NextResponse.json({ status: "OK", category });
  } catch (error) {
    return NextResponse.json(
      { status: "ERROR", message: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { name }: { name: string } = await request.json();

    const category = await prisma.category.update({
      where: { id: parseInt(params.id) },
      data: { name },
    });

    return NextResponse.json({ status: "OK", category });
  } catch (error) {
    return NextResponse.json(
      { status: "ERROR", message: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.category.delete({
      where: { id: parseInt(params.id) },
    });

    return NextResponse.json({ status: "OK" });
  } catch (error) {
    return NextResponse.json(
      { status: "ERROR", message: (error as Error).message },
      { status: 500 }
    );
  }
}

// 修正前
// import { NextRequest, NextResponse } from "next/server";
// // import { Category } from "@prisma/client";
// import { prisma } from "@/lib/prisma";

// export const GET = async (
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) => {
//   const { id } = params;
//   try {
//     const category = await prisma.category.findUnique({
//       where: {
//         id: parseInt(id),
//       },
//     });
//     return NextResponse.json({ status: "OK", category }, { status: 200 });
//   } catch (error) {
//     if (error instanceof Error) {
//       return NextResponse.json({ status: error.message }, { status: 400 });
//     }
//   }
// };

// interface UpdateCategoryRequestBody {
//   name: string;
// }

// export const PUT = async (
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) => {
//   const { id } = params;
//   const { name }: UpdateCategoryRequestBody = await request.json();
//   try {
//     const category = await prisma.category.update({
//       where: {
//         id: parseInt(id),
//       },
//       data: {
//         name,
//       },
//     });
//     return NextResponse.json({ status: "OK", category }, { status: 200 });
//   } catch (error) {
//     if (error instanceof Error) {
//       return NextResponse.json({ status: error.message }, { status: 400 });
//     }
//   }
// };

// export const DELETE = async (
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) => {
//   const { id } = params;
//   try {
//     await prisma.category.delete({
//       where: {
//         id: parseInt(id),
//       },
//     });
//     return NextResponse.json({ status: "OK" }, { status: 200 });
//   } catch (error) {
//     if (error instanceof Error) {
//       return NextResponse.json({ status: error.message }, { status: 400 });
//     }
//   }
// };
