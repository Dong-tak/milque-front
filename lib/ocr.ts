import { createWorker } from "tesseract.js";

export interface RecognizeResult {
  text: string;
  words?: Array<{
    text: string;
    bbox: {
      x0: number;
      y0: number;
      x1: number;
      y1: number;
    };
  }>;
  error?: string;
  status: "success" | "error" | "processing";
}

export class OcrService {
  private worker: any = null;

  async initializeWorker() {
    if (!this.worker) {
      this.worker = await createWorker();
      await this.worker.loadLanguage("eng");
      await this.worker.initialize("eng");
    }
  }

  async recognizeText(imageFile: File): Promise<RecognizeResult> {
    try {
      if (!this.worker) {
        await this.initializeWorker();
      }

      const imageUrl = URL.createObjectURL(imageFile);
      const result = await this.worker.recognize(imageUrl);
      URL.revokeObjectURL(imageUrl);

      return {
        text: result.data.text,
        words: result.data.words,
        status: "success",
      };
    } catch (error) {
      return {
        text: "",
        error:
          error instanceof Error ? error.message : "An unknown error occurred.",
        status: "error",
      };
    }
  }

  async cleanup() {
    if (this.worker) {
      await this.worker.terminate();
      this.worker = null;
    }
  }
}
