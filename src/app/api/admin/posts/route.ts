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

// 修正前
// import { NextRequest, NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";

// export const GET = async (request: NextRequest) => {
//   try {
//     const posts = await prisma.post.findMany({
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
//       orderBy: {
//         createdAt: "desc",
//       },
//     });
//     return NextResponse.json({ status: "OK", posts: posts }, { status: 200 });
//   } catch (error) {
//     if (error instanceof Error) {
//       return NextResponse.json({ status: error.message }, { status: 400 });
//     }
//   }
// };

// interface CreatePostRequestBody {
//   title: string;
//   content: string;
//   categories: { id: number }[];
//   thumbnailUrl: string;
// }

// export const POST = async (request: NextRequest, context: any) => {
//   try {
//     const body = await request.json();
//     const { title, content, categories, thumbnailUrl }: CreatePostRequestBody =
//       body;
//     const data = await prisma.post.create({
//       data: {
//         title,
//         content,
//         thumbnailUrl,
//       },
//     });
//     for (const category of categories) {
//       await prisma.postCategory.create({
//         data: {
//           categoryId: category.id,
//           postId: data.id,
//         },
//       });
//     }
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
