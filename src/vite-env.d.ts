/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FORM_ENDPOINT?: string;
  readonly VITE_FORM_RECIPIENT_EMAIL?: string;
  readonly VITE_API_URL?: string;
  readonly VITE_SOCIAL_LINKEDIN_URL?: string;
  readonly VITE_SOCIAL_INSTAGRAM_URL?: string;
  readonly VITE_SOCIAL_XIAOHONGSHU_URL?: string;
  readonly VITE_WHATSAPP_URL?: string;
  readonly VITE_MAPS_URL?: string;
  readonly VITE_WECHAT_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
