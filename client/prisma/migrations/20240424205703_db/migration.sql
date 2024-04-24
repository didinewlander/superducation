-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Student" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "instituteId" TEXT,
    "enrolledYear" INTEGER,
    "expectedGraduationYear" INTEGER,
    "recommends" TEXT,
    "paymentToken" TEXT,
    "teacherId" TEXT,
    CONSTRAINT "Student_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Student_instituteId_fkey" FOREIGN KEY ("instituteId") REFERENCES "Institute" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Student_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Student" ("enrolledYear", "expectedGraduationYear", "id", "instituteId", "paymentToken", "recommends", "teacherId", "userId") SELECT "enrolledYear", "expectedGraduationYear", "id", "instituteId", "paymentToken", "recommends", "teacherId", "userId" FROM "Student";
DROP TABLE "Student";
ALTER TABLE "new_Student" RENAME TO "Student";
CREATE UNIQUE INDEX "Student_userId_key" ON "Student"("userId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
