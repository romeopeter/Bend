function resizeImage(
  originalImage: HTMLImageElement,
  targetWidths: number[],
): string[] {
  // Array to store resized images
  const resizedImages: string[] = [];

  // HTML canvas to draw new image onto
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  // Get aspect ratio of original image to determine new image height
  const aspectRatio = originalImage.width / originalImage.height;

  // Iterate targetWidths to new image width
  targetWidths.forEach((width) => {
    canvas.width = width;
    canvas.height = width / aspectRatio; //  adjusted proportionally

    // Project original image onto canvas and set new dimension
    ctx?.drawImage(originalImage, 0, 0, canvas.width, canvas.height);

    // Convert canvas to data URL (as image string to be used as a source)
    const resizeImageToDataURL = canvas.toDataURL("image/png");

    // Add new image to resized images array
    resizedImages.push(resizeImageToDataURL);
  });

  return resizedImages;
}

async function generateImageSrcset(imagePath: string): Promise<string[]> {
  let imageSrcset: string[] = [];
  const newImagesWidths = [576, 768, 992, 1200];

  return new Promise((resolve) => {
    const originalImage: HTMLImageElement = new Image();
    originalImage.src = imagePath;
    
    // CORS to handle 'Tainted canvas' error
    originalImage.crossOrigin = "*";

    originalImage.onload = () => {
      imageSrcset = resizeImage(originalImage, newImagesWidths);
      resolve(imageSrcset);
    };
  });
}

export default generateImageSrcset;
