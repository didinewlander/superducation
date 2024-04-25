export function findRole(email?: string | null) {
  if (email === process.env.NEXT_PUBLIC_BOTH_EMAIL) {
    return "both";
  }
  if (email === process.env.NEXT_PUBLIC_TEACHER_EMAIL) {
    return "teacher";
  }
  if (email === process.env.NEXT_PUBLIC_INSTITUTION_EMAIL) {
    return "institution";
  }

  return "student";
}
