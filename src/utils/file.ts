export const getFileSize = (file: File): string => {
  if (file.size < 1024) {
    return `${file.size} Bytes`;
  }
  if (file.size > 1048576) {
    return `${Math.ceil(file.size / 1048576)} MB`;
  }
  return `${Math.ceil(file.size / 1024)} KB`;
};
