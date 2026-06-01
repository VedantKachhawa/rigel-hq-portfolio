/** First-frame JPG thumbnail from a Cloudinary video URL */
export function cloudinaryVideoPoster(videoUrl: string): string {
  if (!videoUrl.includes("res.cloudinary.com") || !videoUrl.includes("/video/upload/")) {
    return videoUrl;
  }

  return videoUrl
    .replace("/video/upload/q_auto/f_auto/", "/video/upload/so_0,q_auto,f_jpg/")
    .replace(/\.mp4(\?.*)?$/, ".jpg");
}
