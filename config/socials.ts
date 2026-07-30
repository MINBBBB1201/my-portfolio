import { Icons } from "@/components/common/icons";

interface SocialInterface {
  name: string;
  username: string;
  icon: any;
  link: string;
}

export const SocialLinks: SocialInterface[] = [
  {
    name: "Github",
    username: "@MINBBBB1201",
    icon: Icons.gitHub,
    link: "https://github.com/MINBBBB1201",
  },
  {
    name: "LinkedIn",
    username: "Minchan Kim",
    icon: Icons.linkedin,
    link: "https://www.linkedin.com/in/minchan-kim-6490313ba/",
  },
  {
    name: "Gmail",
    username: "gimm79103",
    icon: Icons.gmail,
    link: "mailto:gimm79103@gmail.com",
  },
];
