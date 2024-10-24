export const anchorStyleFunc = (anchor: any) => {
  anchor.cornerRadius(10);
  if (anchor.hasName("top-center") || anchor.hasName("bottom-center")) {
    anchor.height(6);
    anchor.offsetY(3);
    anchor.width(30);
    anchor.offsetX(15);
  }
  if (anchor.hasName("middle-left") || anchor.hasName("middle-right")) {
    anchor.height(30);
    anchor.offsetY(15);
    anchor.width(6);
    anchor.offsetX(3);
  }
};
