"use server";

import fs from "fs";
import path from "path";

export async function getPhotos() {
    try {
        const photosDir = path.join(process.cwd(), "public", "photos");

        // Check if directory exists
        if (!fs.existsSync(photosDir)) {
            return [];
        }

        const files = await fs.promises.readdir(photosDir);

        // Filter for image files (jpg, jpeg, png, webp, heic, heif)
        const imageFiles = files.filter((file) =>
            /\.(jpg|jpeg|png|webp|heic|heif)$/i.test(file)
        );

        // Return paths
        return imageFiles.map((file, index) => {
            const isHeic = /\.(heic|heif)$/i.test(file);
            return {
                id: index + 1,
                src: isHeic ? `/api/photo?name=${file}` : `/photos/${file}`,
                alt: file.replace(/\.[^/.]+$/, "").replace(/-/g, " "), // Remove extension and hyphens for alt text
            };
        });
    } catch (error) {
        console.error("Error reading photos directory:", error);
        return [];
    }
}
