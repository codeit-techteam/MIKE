import { OG_IMAGE_ALT } from "@/lib/constants";
import { socialContentType, socialImage, socialSize } from "@/lib/social-image";

export const alt = OG_IMAGE_ALT;
export const size = socialSize;
export const contentType = socialContentType;

export default function TwitterImage() {
  return socialImage();
}
