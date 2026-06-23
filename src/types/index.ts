export type NavItem = {
  label: string;
  href: string;
};

export type ServiceItem = {
  title: string;
  description: string;
};

export type ProjectItem = {
  title: string;
  description: string;
  tags?: string[];
};

export type TeamMember = {
  name: string;
  role: string;
  initials: string;
  /** Tailwind gradient stops, e.g. "from-primary to-secondary" */
  accent: string;
};
