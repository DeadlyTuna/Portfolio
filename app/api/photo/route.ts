import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import heicConvert from "heic-convert";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const name = searchParams.get("name");

    if (!name) {
        return new NextResponse("Filename is required", { status: 400 });
    }

    // Prevent directory traversal
    const filename = path.basename(name);
    const filePath = path.join(process.cwd(), "public", "photos", filename);

    try {
        if (!fs.existsSync(filePath)) {
            return new NextResponse("File not found", { status: 404 });
        }

        const fileBuffer = await fs.promises.readFile(filePath);
        const ext = path.extname(filename).toLowerCase();

        if (ext === ".heic" || ext === ".heif") {
            try {
                const jpegBuffer = await heicConvert({
                    buffer: fileBuffer,
                    format: "JPEG",
                    quality: 0.8,
                });

                // Cast to any because Next.js types for BodyInit are strict about Buffer
                return new NextResponse(jpegBuffer as any, {
                    headers: {
                        "Content-Type": "image/jpeg",
                        "Cache-Control": "public, max-age=31536000, immutable",
                    },
                });
            } catch (err) {
                console.error("Error converting HEIC:", err);
                return new NextResponse("Error converting image", { status: 500 });
            }
        }

        // Serve other images as-is
        let contentType = "application/octet-stream";
        if (ext === ".jpg" || ext === ".jpeg") contentType = "image/jpeg";
        if (ext === ".png") contentType = "image/png";
        if (ext === ".webp") contentType = "image/webp";

        return new NextResponse(fileBuffer as any, {
            headers: {
                "Content-Type": contentType,
                "Cache-Control": "public, max-age=31536000, immutable",
            },
        });
    } catch (error) {
        console.error("Error serving photo:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
