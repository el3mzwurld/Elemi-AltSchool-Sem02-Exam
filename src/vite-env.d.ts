/// <reference types="vite/client" />

// Tell TypeScript that SVG imports are allowed and they're strings (URLs)
declare module "*.svg" {
  const content: string;
  export default content;
}

// While we're at it, let's declare other common image types too
declare module "*.png" {
  const content: string;
  export default content;
}

declare module "*.jpg" {
  const content: string;
  export default content;
}

declare module "*.jpeg" {
  const content: string;
  export default content;
}

declare module "*.gif" {
  const content: string;
  export default content;
}

declare module "*.webp" {
  const content: string;
  export default content;
}
