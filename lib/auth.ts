import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
const VERCEL_DEPLOYMENT = !!process.env.VERCEL_URL;
const prisma = new PrismaClient();

const authOptions: any = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.AUTH_GOOGLE_CLIENT_SECRET as string,
      profile(profile) {
        return {
          id: profile.sub.toString(),
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.picture,
        };
      },
    }),
    GitHubProvider({
      clientId: process.env.AUTH_GITHUB_ID as string,
      clientSecret: process.env.AUTH_GITHUB_SECRET as string,
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name || profile.login,
          gh_username: profile.login,
          email: profile.email,
          image: profile.avatar_url,
        };
      },
    }),
  ],
  pages: {
    signIn: `/login`,
    verifyRequest: `/login`,
    error: "/login", // Página de erro com ?error=
  },
  session: { strategy: "jwt" },
  cookies: {
    sessionToken: {
      name: `${VERCEL_DEPLOYMENT ? "__Secure-" : ""}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        domain: VERCEL_DEPLOYMENT
          ? `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`
          : undefined,
        secure: VERCEL_DEPLOYMENT,
      },
    },
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }: any) {
      try {
        // Permitir login normalmente
        return true;
      } catch (error) {
        // Se o erro é de conta não vinculada, tentamos vincular a conta
        const userFromDB = await prisma.user.findUnique({
          where: { email: user.email },
        });

        if (userFromDB) {
          // Vincular a nova conta ao usuário existente
          await prisma.account.create({
            data: {
              userId: userFromDB.id, // Associar ao usuário existente
              provider: account.provider,
              providerAccountId: account.providerAccountId,
              access_token: account.accessToken,
              refresh_token: account.refreshToken,
              type: "oauth",
            },
          });
          // Retorna true para permitir o login
          return true;
        }
        // Caso não seja o erro esperado, retornar o erro original
        throw error;
      }
    },
    jwt: async ({ token, user }: any) => {
      if (user) {
        const userFromDB = await prisma.user.findUnique({
          where: { email: user.email },
        });
        token.id = userFromDB?.id;
        token.user = {
          ...user,
          //@ts-ignore
          isAdmin: userFromDB?.isAdmin,
        };
      }
      return token;
    },
    session: async ({ session, token }: any) => {
      session.user = {
        ...session.user,
        id: token.sub,
        username: token?.user?.username || token?.user?.gh_username,
        isAdmin: token?.user?.isAdmin,
      };
      return session;
    },
  },
  events: {
    error: async (message: any) => {
      if (message.error === "OAuthAccountNotLinked") {
        // Log ou tratamento adicional pode ser feito aqui
        console.log(
          "Conta OAuth não vinculada. Tentando vincular automaticamente...",
        );
      }
    },
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);

export function getSession() {
  return auth() as Promise<{
    user: {
      id: string;
      name: string;
      username: string;
      email: string;
      image: string;
      isAdmin: boolean;
    };
  } | null>;
}

export function withSiteAuth(action: any) {
  return async (
    formData: FormData | null,
    siteId: string,
    key: string | null,
  ) => {
    const session = await getSession();
    if (!session) {
      return {
        error: "Not authenticated",
      };
    }
    const site = await prisma.site.findUnique({
      where: {
        id: siteId,
      },
    });
    if (!site || site.userId !== session.user.id) {
      return {
        error: "Not authorized",
      };
    }

    return action(formData, site, key);
  };
}

export function withPostAuth(action: any) {
  return async (
    formData: FormData | null,
    postId: string,
    key: string | null,
  ) => {
    const session = await getSession();
    if (!session?.user.id) {
      return {
        error: "Not authenticated",
      };
    }
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        site: true,
      },
    });
    if (!post || post.userId !== session.user.id) {
      return {
        error: "Post not found",
      };
    }

    return action(formData, post, key);
  };
}

export function withColumnistAuth(action: any) {
  return async (
    formData: FormData | null,
    columnistId: string,
    key: string | null,
  ) => {
    const session = await getSession();
    if (!session?.user.id) {
      return {
        error: "Not authenticated",
      };
    }
    const columnist = await prisma.columnist.findUnique({
      where: {
        id: columnistId,
      },
      include: {
        site: true,
      },
    });
    if (!columnist) {
      return {
        error: "Columnist not found",
      };
    }

    return action(formData, columnist, key);
  };
}

export function withCategoryAuth(action: any) {
  return async (
    formData: FormData | null,
    categoryId: string,
    key: string | null,
  ) => {
    const session = await getSession();
    if (!session?.user.id) {
      return {
        error: "Not authenticated",
      };
    }
    const category = await prisma.category.findUnique({
      where: {
        id: categoryId,
      },
      include: {
        site: true,
      },
    });
    if (!category) {
      return {
        error: "Category not found",
      };
    }

    return action(formData, category, key);
  };
}

export function withCollectionAuth(action: any) {
  return async (
    formData: FormData | null,
    collectionId: string,
    key: string | null,
  ) => {
    const session = await getSession();
    if (!session?.user.id) {
      return {
        error: "Not authenticated",
      };
    }
    const collection = await prisma.collection.findUnique({
      where: {
        id: collectionId,
      },
      include: {
        site: true,
      },
    });
    if (!collection || collection.userId !== session.user.id) {
      return {
        error: "Collection not found",
      };
    }

    return action(formData, collection, key);
  };
}

export function withProductAuth(action: any) {
  return async (
    formData: FormData | null,
    productId: string,
    key: string | null,
  ) => {
    const session = await getSession();
    if (!session?.user.id) {
      return {
        error: "Not authenticated",
      };
    }
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        site: true,
      },
    });
    if (!product) {
      return {
        error: "Product not found",
      };
    }

    return action(formData, product, key);
  };
}
export function withPageAuth(action: any) {
  return async (
    formData: FormData | null,
    pageId: string,
    key: string | null,
  ) => {
    const session = await getSession();
    if (!session?.user.id) {
      return {
        error: "Not authenticated",
      };
    }
    const page = await prisma.page.findUnique({
      where: {
        id: pageId,
      },
      include: {
        site: true,
      },
    });
    if (!page) {
      return {
        error: "Page not found",
      };
    }

    return action(formData, page, key);
  };
}

export function withQueueAuth(action: any) {
  return async (
    formData: FormData | null,
    queueId: string,
    key: string | null,
  ) => {
    const session = await getSession();
    if (!session?.user.id) {
      return {
        error: "Not authenticated",
      };
    }
    const queue = await prisma.queue.findUnique({
      where: {
        id: queueId,
      },
      include: {
        site: true,
      },
    });
    if (!queue) {
      return {
        error: "Queue not found",
      };
    }

    return action(formData, queue, key);
  };
}

export function withMediaAuth(action: any) {
  return async (
    formData: FormData | null,
    siteId: string,
    key: string | null,
  ) => {
    const session = await getSession();
    if (!session?.user.id) {
      return {
        error: "Not authenticated",
      };
    }
    const site = await prisma.site.findUnique({
      where: {
        id: siteId,
      },
    });
    if (!site) {
      return {
        error: "Site not found",
      };
    }

    return action(formData, site, key);
  };
}

export function withLaunchAuth(action: any) {
  return async (
    formData: FormData | null,
    launchId: string,
    key: string | null,
  ) => {
    const session = await getSession();
    if (!session?.user.id) {
      return {
        error: "Not authenticated",
      };
    }
    const page = await prisma.launch.findUnique({
      where: {
        id: launchId,
      },
      include: {
        site: true,
      },
    });
    if (!page) {
      return {
        error: "Page not found",
      };
    }

    return action(formData, page, key);
  };
}

export function withTagAuth(action: any) {
  return async (
    formData: FormData | null,
    tagId: string,
    key: string | null,
  ) => {
    const session = await getSession();
    if (!session?.user.id) {
      return {
        error: "Not authenticated",
      };
    }
    const tag = await prisma.tag.findUnique({
      where: {
        id: tagId,
      },
      include: {
        site: true,
      },
    });
    if (!tag) {
      return {
        error: "Tag not found",
      };
    }

    return action(formData, tag, key);
  };
}

export function withReferenceAuth(action: any) {
  return async (
    formData: FormData | null,
    referenceId: string,
    key: string | null,
  ) => {
    const session = await getSession();
    if (!session?.user.id) {
      return {
        error: "Not authenticated",
      };
    }
    const reference = await prisma.reference.findUnique({
      where: {
        id: referenceId,
      },
      include: {
        site: true,
      },
    });
    if (!reference) {
      return {
        error: "Reference not found",
      };
    }

    return action(formData, reference, key);
  };
}

export function withTemplateAuth(action: any) {
  return async (
    formData: FormData | null,
    templateId: string,
    key: string | null,
  ) => {
    const session = await getSession();
    if (!session?.user.id) {
      return {
        error: "Not authenticated",
      };
    }
    const template = await prisma.template.findUnique({
      where: {
        id: templateId,
      },
      include: {
        site: true,
      },
    });
    if (!template) {
      return {
        error: "Template not found",
      };
    }

    return action(formData, template, key);
  };
}
