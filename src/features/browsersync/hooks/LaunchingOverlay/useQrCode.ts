import { useRef } from "react";
import { Image } from "@tauri-apps/api/image";
import { writeImage } from "@tauri-apps/plugin-clipboard-manager";

export default function useQrCode() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const copyQrImage = async () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        try {
            const { width, height } = canvas;
            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            const { data } = ctx.getImageData(0, 0, width, height);
            const buffer = new Uint8Array(data);
            console.log("buffer:", buffer);

            const image = await Image.new(buffer, width, height);
            await writeImage(image);
            console.log("QR code image copied to clipboard");
        } catch (err) {
            console.error("Failed to copy QR code image:", err);
        }
    };
    return {
        canvasRef,
        copyQrImage,
    }
}
