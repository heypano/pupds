import html2canvas from "html2canvas";

export interface ExportAsImageArgs {
  element: HTMLElement;
  imageFileName: string;
  width?: number;
  height?: number;
  htmlCanvasOptions?: Parameters<typeof html2canvas>[1];
}
const exportAsImage = async ({
  element,
  imageFileName,
  width,
  height,
  htmlCanvasOptions,
}: ExportAsImageArgs) => {
  const oldHeight = element.style.height;
  const oldWidth = element.style.width;
  if (width) {
    element.style.width = `${width}px`;
  }
  if (height) {
    element.style.height = `${height}px`;
  }

  const canvas = await html2canvas(element, htmlCanvasOptions);
  const image = canvas.toDataURL("image/png", 1.0);
  downloadImage(image, imageFileName);
  if (width) {
    element.style.width = oldWidth;
  }
  if (height) {
    element.style.height = oldHeight;
  }
};

const downloadImage = (blob: string, fileName: string) => {
  const fakeLink = window.document.createElement("a");
  fakeLink.style.display = "none";
  fakeLink.download = fileName;
  fakeLink.href = blob;
  document.body.appendChild(fakeLink);
  fakeLink.click();
  document.body.removeChild(fakeLink);
  fakeLink.remove();
};

export default exportAsImage;
