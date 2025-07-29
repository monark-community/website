import { NextRequest, NextResponse } from "next/server";
import { DatedProjectMetadata } from "@/types/project.types";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get("locale") || "en";

  // Validate locale parameter
  if (!["en", "fr"].includes(locale)) {
    return NextResponse.json(
      { error: "Invalid locale. Supported locales: en, fr" },
      { status: 400 }
    );
  }

  try {
    // Dynamically import the project data based on locale
    const projectData = await import(`@/content/${locale}/project/index.ts`);
    const data: DatedProjectMetadata[] = projectData.default;

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error(`Error loading project data for locale ${locale}:`, error);
    return NextResponse.json(
      { error: "Failed to load project data" },
      { status: 500 }
    );
  }
}