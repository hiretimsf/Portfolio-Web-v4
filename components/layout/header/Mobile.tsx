import Logo from "@/components/layout/header/Logo";
import Search from "@/components/layout/header/Search";
import ThemeToggle from "@/components/layout/header/ThemeToggle";
import type { FC } from "react";
import MenuToggle from "./MenuToggle";

interface Props {
  currentPath: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const Mobile: FC<Props> = ({ currentPath, isOpen, onOpenChange }) => {
  return (
    <nav className="mx-auto w-full max-w-5xl md:hidden">
      <div className="flex h-18 w-full items-center justify-between">
        <div className="flex flex-1 justify-start">
          <MenuToggle
            currentPath={currentPath}
            isOpen={isOpen}
            onOpenChange={onOpenChange}
          />
        </div>
        <div className="flex flex-1 justify-center">
          <Logo />
        </div>

        <div className="flex flex-1 items-center justify-end gap-1.5">
          <Search />
          <span className="mx-2 flex h-4 w-px bg-border" />
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Mobile;
