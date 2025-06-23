import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface UpdatePostRequestBody {
  title: string;
  content: string;
  categories: { id: number }[];
  thumbnailUrl: string;
}

export const GET = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  try {
    const post = await prisma.post.findUnique({
      where: { id: parseInt(id) },
      include: {
        postCategories: {
          include: {
            category: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json({ status: "OK", post }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { status: "ERROR", message: (error as Error).message },
      { status: 500 }
    );
  }
};

export const PUT = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  try {
    const { title, content, categories, thumbnailUrl }: UpdatePostRequestBody =
      await request.json();

    const post = await prisma.post.update({
      where: { id: parseInt(id) },
      data: { title, content, thumbnailUrl },
    });

    await prisma.postCategory.deleteMany({
      where: { postId: post.id },
    });

    for (const category of categories) {
      await prisma.postCategory.create({
        data: {
          postId: post.id,
          categoryId: category.id,
        },
      });
    }

    return NextResponse.json({ status: "OK", post }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { status: "ERROR", message: (error as Error).message },
      { status: 500 }
    );
  }
};

export const DELETE = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  try {
    await prisma.post.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ status: "OK" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { status: "ERROR", message: (error as Error).message },
      { status: 500 }
    );
  }
};

// 修正前
// import { NextRequest, NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";

// export const GET = async (
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) => {
//   const { id } = params;
//   try {
//     const posts = await prisma.post.findMany({
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
//     return NextResponse.json({ status: "OK", posts: posts }, { status: 200 });
//   } catch (error) {
//     if (error instanceof Error) {
//       return NextResponse.json({ status: error.message }, { status: 400 });
//     }
//   }
// };

// interface UpdatePostRequestBody {
//   title: string;
//   content: string;
//   categories: { id: number }[];
//   thumbnailUrl: string;
// }

// export const PUT = async (
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) => {
//   const { id } = params;
//   const { title, content, categories, thumbnailUrl }: UpdatePostRequestBody =
//     await request.json();
//   try {
//     const post = await prisma.post.update({
//       where: {
//         id: parseInt(id),
//       },
//       data: {
//         title,
//         content,
//         thumbnailUrl,
//       },
//     });

//     await prisma.postCategory.deleteMany({
//       where: {
//         postId: parseInt(id),
//       },
//     });
//     for (const category of categories) {
//       await prisma.postCategory.create({
//         data: {
//           postId: post.id,
//           categoryId: category.id,
//         },
//       });
//     }
//     return NextResponse.json({ status: "OK", post: post }, { status: 200 });
//   } catch (error) {
//     if (error instanceof Error) {
//       return NextResponse.json({ status: error.message }, { status: 400 });
//     }
//   }
// };
// // なかったらエラーを返す
// //     for (const category of categories) {
// //       const categoryExists = await prisma.category.findUnique({
// //         where: { id: category.id },
// //       });
// //       if (!categoryExists) {
// //         return NextResponse.json(
// //           { status: `Category with id ${category.id} not found` },
// //           { status: 404 }
// //         );
// //       }
// //       await prisma.postCategory.create({
// //         data: {
// //           postId: post.id,
// //           categoryId: category.id,
// //         },
// //       });
// //     }
// //     return NextResponse.json({ status: "OK", post: post }, { status: 200 });
// //   } catch (error) {
// //     if (error instanceof Error) {
// //       return NextResponse.json({ status: error.message }, { status: 400 });
// //     }
// //   }
// // };

// export const DELETE = async (
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) => {
//   const { id } = params;
//   try {
//     await prisma.post.delete({
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
