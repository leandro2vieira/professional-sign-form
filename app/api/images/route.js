import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const folder = searchParams.get("folder") || "models";

  // Only allow alphanumeric folder names to prevent path traversal
  if (!/^[a-zA-Z0-9_-]+$/.test(folder)) {
    return NextResponse.json({ error: "Invalid folder name" }, { status: 400 });
  }

  const dir = path.join(process.cwd(), "public", folder);

  if (!fs.existsSync(dir)) {
    return NextResponse.json({ files: [] });
  }

  const files = fs
    .readdirSync(dir)
    .filter((f) => IMAGE_EXTENSIONS.has(path.extname(f).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }));

  return NextResponse.json({ files });
}
