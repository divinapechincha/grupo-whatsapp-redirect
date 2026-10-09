"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { tokenFor } from "@/lib/auth";

export async function login(formData: FormData) {
  const pass = process.env.ADMIN_PASSWORD;
  if (pass && formData.get("password") === pass) {
    (await cookies()).set("admin", tokenFor(pass), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/admin",
      maxAge: 60 * 60 * 24 * 7,
    });
    redirect("/admin");
  }
  redirect("/admin?erro=1");
}

export async function logout() {
  (await cookies()).delete({ name: "admin", path: "/admin" });
  redirect("/admin");
}
