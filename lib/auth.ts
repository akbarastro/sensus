import { jwtVerify, SignJWT } from "jose";

const COOKIE_NAME = "sensus_rt_session";

function getSecretKey() {
  const secret = process.env.AUTH_SECRET;

  if (!secret) {
    throw new Error("AUTH_SECRET belum diatur di .env");
  }

  return new TextEncoder().encode(secret);
}

export async function createSessionToken(username: string) {
  return new SignJWT({
    username,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("8h")
    .sign(getSecretKey());
}

export async function verifySessionToken(token: string) {
  try {
    const verified = await jwtVerify(token, getSecretKey());

    return verified.payload;
  } catch {
    return null;
  }
}

export { COOKIE_NAME };