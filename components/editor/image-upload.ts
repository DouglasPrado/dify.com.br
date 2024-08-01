import imageCompression from "browser-image-compression";
import { createImageUpload } from "novel/plugins";
import { toast } from "sonner";

const onUpload = async (file: File) => {
  // Opções de compressão
  const options = {
    maxSizeMB: 0.1, // Tamanho máximo do arquivo em MB
    maxWidthOrHeight: 720, // Largura ou altura máxima da imagem
    useWebWorker: true, // Usar Web Worker para otimizar
    fileType: "image/webp", // Formato do arquivo convertido
  };
  const compressedFile = await imageCompression(file, options);

  const promise = fetch("/api/upload", {
    method: "POST",
    headers: {
      "content-type": compressedFile?.type || "application/octet-stream",
      "x-vercel-filename": compressedFile?.name || "image.png",
    },
    body: compressedFile,
  });

  return new Promise((resolve) => {
    toast.promise(
      promise.then(async (res) => {
        // Successfully uploaded image
        if (res.status === 200) {
          const { url } = (await res.json()) as any;
          // preload the image
          let image = new Image();
          image.src = url;
          image.onload = () => {
            resolve(url);
          };
          // No blob store configured
        } else if (res.status === 401) {
          resolve(file);
          throw new Error(
            "`BLOB_READ_WRITE_TOKEN` environment variable not found, reading image locally instead.",
          );
          // Unknown error
        } else {
          throw new Error(`Error uploading image. Please try again.`);
        }
      }),
      {
        loading: "Uploading image...",
        success: "Image uploaded successfully.",
        error: (e) => e.message,
      },
    );
  });
};

export const uploadFn = createImageUpload({
  onUpload,
  validateFn: (file) => {
    if (!file.type.includes("image/")) {
      toast.error("File type not supported.");
      return false;
    } else if (file.size / 1024 / 1024 > 20) {
      toast.error("File size too big (max 20MB).");
      return false;
    }
    return true;
  },
});
