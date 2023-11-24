import SrcDataType from "./types/srcDataType"

function useBend(imgString: string, forScreen: string | null = null) {
  if (imgString === undefined || typeof imgString !== "string") {
    throw Error(
      `Type '${typeof imgString}' for imgeString isn't a string. Expected '${typeof ""}'`,
    );
  }

  // Object of image attributes data to be returned
  let srcData: SrcDataType = { src: "", srcset: "" };

  //   Screen size measurements for small, medium and large screen.
  const screenSizes = {
    sm: 400,
    md: 800,
    lg: 1200,
  };

  //  Return intrinsic value of width as pixels if screen size is specified
  switch (forScreen) {
    case "sm":
      srcData.src = { src: imgString, width: screenSizes[forScreen] };
      break;
    case "md":
      srcData.src = { src: imgString, width: screenSizes[forScreen] };
      break;
    case "lg":
      srcData.src = { src: imgString, width: screenSizes[forScreen] };
      break;
    default:
      srcData.src += imgString;
      break;
  }

  //  Return intrinsic value of width as pixels for all screen sizes
  srcData.srcset += `${imgString} ${screenSizes.sm}w, ${imgString} ${screenSizes.md}w, ${imgString} ${screenSizes.lg}w`;

  return srcData;
}
