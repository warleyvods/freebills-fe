export type UploadFile = {
  fileName: string;
  contentType: string;
  contentLength: number;
}

export type UploadFilePresign = {
  fileReferenceId: string;
  uploadSignedUrl: string;
}
