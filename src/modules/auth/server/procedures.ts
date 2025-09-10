import { headers as getHeaders } from "next/headers";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { loginSchema, registerSchema } from "../schema";
import { deleteAuthCookie, generateAuthCookie } from "../utils";

export const authRouter = createTRPCRouter({
  session: baseProcedure.query(async ({ ctx }) => {
    const headers = await getHeaders();
    const session = await ctx.db.auth({ headers });
    return session;
  }),
  logout: baseProcedure.mutation(async ({ ctx }) => {
    await deleteAuthCookie(ctx.db.config.cookiePrefix);
  }),
  register: baseProcedure
    .input(registerSchema)
    .mutation(async ({ ctx, input }) => {
      const isAlreadyExists = await ctx.db.find({
        collection: "users",
        limit: 1,
        where: {
          OR: [
            {
              username: {
                equals: input.username,
              },
            },
            {
              email: {
                equals: input.email,
              },
            },
          ],
        },
      });

      if (isAlreadyExists.docs[0]) {
        const existingUser = isAlreadyExists.docs[0];

        if (existingUser.username === input.username) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Username already taken",
          });
        }

        if (existingUser.email === input.email) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Email already registered",
          });
        }
      }

      const data = await ctx.db.create({
        collection: "users",
        data: {
          email: input.email,
          password: input.password, // Will be hashed by the Payload backend
          username: input.username,
        },
      });
      return data;
    }),

  login: baseProcedure.input(loginSchema).mutation(async ({ ctx, input }) => {
    const data = await ctx.db.login({
      collection: "users",
      data: {
        email: input.email,
        password: input.password,
      },
    });
    if (!data.token) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Failed to login",
      });
    }
    await generateAuthCookie({
      prefix: ctx.db.config.cookiePrefix,
      value: data.token,
    });
    return data;
  }),
});
