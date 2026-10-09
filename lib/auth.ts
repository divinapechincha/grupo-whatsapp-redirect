import { createHash } from "crypto";

export function tokenFor(password: string) {
  return createHash("sha256").update(`dp-admin:${password}`).digest("hex");
}
