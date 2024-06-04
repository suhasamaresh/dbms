"use server";
import prisma from "./db";

export async function BlogPageServer({ id }: { id: string }) {
  // Fetch the blog data from the database
  const blog = await prisma.blog.findUnique({
    where: {
      id: Number(id),
    },
  });
  await prisma.blog.update({
    where: {
      id: Number(id),
    },
    data: {
      reads: blog ? blog.reads + 1 : 1,
    },
  });

  return blog;
}

export async function Likeincrement({ id }: { id: string }) {
    // Fetch the blog data from the database
    const blog = await prisma.blog.findUnique({
      where: {
        id: Number(id),
      },
    });
    await prisma.blog.update({
      where: {
        id: Number(id),
      },
      data: {
        likes: blog ? blog.likes + 1 : 1,
      },
    });
  }

  export async function deleteBlog({ id }: { id: string }) {
    // Fetch the blog data from the database
    const blog = await prisma.blog.delete({
      where: {
        id: Number(id),
      },
    });
  }

  export async function blogsWritten(id: string) {
    if (!id) {
      throw new Error("User ID is required");
    }
  
    const user = await prisma.user.findUnique({
      where: { id },
    });
  
    if (!user) {
      throw new Error("User not found");
    }
  
    await prisma.user.update({
      where: { id },
      data: {
        noblogs: (user.noblogs || 0) + 1,
      },
    });
  }

  export async function blogsRead(id: string){
    if (!id) {
      throw new Error("User ID is required");
    }
  
    const user = await prisma.user.findUnique({
      where: { id },
    });
  
    if (!user) {
      throw new Error("User not found");
    }
  
    await prisma.user.update({
      where: { id },
      data: {
        noblogsread: (user.noblogsread || 0) + 1,
      },
    });
  }

