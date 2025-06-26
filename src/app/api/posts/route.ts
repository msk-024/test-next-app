import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Post } from "@/app/_types/microCms/MicroCmsPost";

export async function GET() {
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

    const formattedPosts: Post[] = posts.map((post) => ({
      id: post.id,
      title: post.title,
      content: post.content,
      createdAt: post.createdAt.toISOString(),
      categories: post.postCategories.map((c) => c.category.name),
      thumbnailUrl: post.thumbnailUrl,
    }));

    return NextResponse.json({ status: "OK", posts: formattedPosts });
  } catch (error) {
    return NextResponse.json(
      { status: "ERROR", message: (error as Error).message },
      { status: 500 }
    );
  }
}

// 修正前
// import { NextResponse } from "next/server";
// import { Post } from "@/app/_types/MicroCmsPost";
// import { prisma } from "@/lib/prisma";

// export const GET = async () => {
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

//     const formattedPosts: Post[] = posts.map((post) => ({
//       id: post.id,
//       title: post.title,
//       content: post.content,
//       createdAt: post.createdAt.toISOString(),
//       categories: post.postCategories.map((category) => category.category.name),
//       thumbnailUrl: post.thumbnailUrl,
//     }));

//     return NextResponse.json(
//       { status: "OK", posts: formattedPosts },
//       { status: 200 }
//     );
//   } catch (error) {
//     if (error instanceof Error) {
//       return NextResponse.json({ status: error.message }, { status: 400 });
//     }
//   }
// };
