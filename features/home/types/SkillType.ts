import { IconType } from "react-icons";

type SkillDescriptionPart = {
  text: string;
  icon?: IconType;
  className?: string;
};

type SkillType = {
  name?: string;
  description: string | SkillDescriptionPart[];
  href?: string;
  icons?: IconType[];
};

export type { SkillType, SkillDescriptionPart };
