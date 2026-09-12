import "server-only";

import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

const AUTH_SECRET = process.env.AUTH_SECRET;

if (!AUTH_SECRET) {
  throw new Error("AUTH_SECRET is not configured.");
}

const secretKey = new TextEncoder().encode(AUTH_SECRET);

export type AuthUser = {
  id: number;
  username: string;
  name: string;
  role: "SUPER_ADMIN" | "WEBSITE_ADMIN";
};

type SessionPayload = {
  userId: number;
  username: string;
  name: string;
  role: "SUPER_ADMIN" | "WEBSITE_ADMIN";
};

const SESSION_COOKIE = "svic_admin_session";

/**
 * Verify username and password against the database.
 */
export async function authenticateUser(
  username: string,
  password: string
): Promise<AuthUser | null> {
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (!user || !user.isActive) {
    return null;
  }

  const passwordMatches = await bcrypt.compare(
    password,
    user.passwordHash
  );

  if (!passwordMatches) {
    return null;
  }

  return {
    id: user.id,
    username: user.username,
    name: user.name,
    role: user.role,
  };
}

/**
 * Create a signed session token.
 */
export async function createSessionToken(
  user: AuthUser
): Promise<string> {
  const payload: SessionPayload = {
    userId: user.id,
    username: user.username,
    name: user.name,
    role: user.role,
  };

  return await new SignJWT(payload)
    .setProtectedHeader({
      alg: "HS256",
      typ: "JWT",
    })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(secretKey);
}

/**
 * Verify the JWT token itself.
 *
 * NOTE:
 * This function only validates the token.
 * Database account status is checked separately by
 * getCurrentUser() and getCurrentSession().
 */
export async function verifySessionToken(
  token: string
): Promise<AuthUser | null> {
  try {
    const { payload } = await jwtVerify(
      token,
      secretKey
    );

    if (
      typeof payload.userId !== "number" ||
      typeof payload.username !== "string" ||
      typeof payload.name !== "string" ||
      (payload.role !== "SUPER_ADMIN" &&
        payload.role !== "WEBSITE_ADMIN")
    ) {
      return null;
    }

    return {
      id: payload.userId,
      username: payload.username,
      name: payload.name,
      role: payload.role,
    };
  } catch {
    return null;
  }
}

/**
 * Get the currently authenticated admin user.
 *
 * IMPORTANT:
 * JWT alone is not enough.
 *
 * The database is checked every time so that:
 *
 * - Disabled accounts are immediately blocked.
 * - Username changes are reflected.
 * - Current account role is taken from the database.
 */
export async function getCurrentUser(): Promise<AuthUser | null> {
  const cookieStore = await cookies();

  const token = cookieStore.get(
    SESSION_COOKIE
  )?.value;

  if (!token) {
    return null;
  }

  const tokenUser = await verifySessionToken(token);

  if (!tokenUser) {
    return null;
  }

  const databaseUser = await prisma.user.findUnique({
    where: {
      id: tokenUser.id,
    },
    select: {
      id: true,
      username: true,
      name: true,
      role: true,
      isActive: true,
    },
  });

  /*
   * Account no longer exists or has been disabled.
   */
  if (!databaseUser || !databaseUser.isActive) {
    return null;
  }

  return {
    id: databaseUser.id,
    username: databaseUser.username,
    name: databaseUser.name,
    role: databaseUser.role,
  };
}

/**
 * Require an authenticated admin user.
 */
export async function requireAdmin(): Promise<AuthUser | null> {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  return user;
}

/**
 * Get the current authenticated admin session
 * along with its exact expiry time.
 *
 * Database account status is also checked here.
 */
export async function getCurrentSession(): Promise<{
  user: AuthUser;
  expiresAt: number;
} | null> {
  const cookieStore = await cookies();

  const token = cookieStore.get(
    SESSION_COOKIE
  )?.value;

  if (!token) {
    return null;
  }

  try {
    const { payload } = await jwtVerify(
      token,
      secretKey
    );

    if (
      typeof payload.userId !== "number" ||
      typeof payload.username !== "string" ||
      typeof payload.name !== "string" ||
      (payload.role !== "SUPER_ADMIN" &&
        payload.role !== "WEBSITE_ADMIN") ||
      typeof payload.exp !== "number"
    ) {
      return null;
    }

    const databaseUser = await prisma.user.findUnique({
      where: {
        id: payload.userId,
      },
      select: {
        id: true,
        username: true,
        name: true,
        role: true,
        isActive: true,
      },
    });

    /*
     * Disabled or deleted accounts cannot continue
     * using an existing session.
     */
    if (!databaseUser || !databaseUser.isActive) {
      return null;
    }

    return {
      user: {
        id: databaseUser.id,
        username: databaseUser.username,
        name: databaseUser.name,
        role: databaseUser.role,
      },
      expiresAt: payload.exp * 1000,
    };
  } catch {
    return null;
  }
}