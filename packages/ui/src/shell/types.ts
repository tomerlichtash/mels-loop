export interface NavItem {
  key: string;
  href: string;
  hasContent?: boolean;
}

export interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
  icon?: "github" | "twitter" | "envelope" | "info" | "reader" | "heart";
}

export interface FooterLinkColumn {
  titleKey: string;
  links: FooterLink[];
}
