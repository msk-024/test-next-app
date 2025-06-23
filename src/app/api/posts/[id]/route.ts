import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

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

// 修正前
// import { NextRequest, NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";

// export const GET = async (
//   request: NextRequest,
//   context: { params: { id: string } }
// ) => {
//   const { params } = await context;
//   const { id } = params;

//   try {
//     const post = await prisma.post.findUnique({
//       where: {
//         id: parseInt(id),
//       },
//       include: {
//         postCategories: {
//           include: {
//             category: {
//               select: {
//                 id: true,
//                 name: true,
//               },
//             },
//           },
//         },
//       },
//     });
//     return NextResponse.json({ status: "OK", post: post }, { status: 200 });
//   } catch (error) {
//     if (error instanceof Error) {
//       return NextResponse.json({ status: error.message }, { status: 400 });
//     }
//   }
// };
