type Social = {
  id: string;
  name: string;
  url: string;
  shareUrl?: string;
};

const SOCIALS: Array<Social> = [
  {
    id: "discord",
    name: "Discord",
    url: "https://discord.gg/TvhrbFCp8T",
  },
  {
    id: "github",
    name: "GitHub",
    url: "https://github.com/monark-community",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    url: "https://www.linkedin.com/company/monark-io/about/",
    shareUrl: "https://www.linkedin.com/sharing/share-offsite/?url=",
  },
  {
    id: "twitter",
    name: "Twitter",
    url: "https://x.com/monark_io",
    shareUrl: "https://twitter.com/intent/tweet?url=",
  },
  {
      id: "youtube",
      name: "YouTube",
      url: "https://www.youtube.com/@monark_io",
  },
];

export default SOCIALS;
