import { cn } from "@/lib/utils";

interface TagProps {
  title?: string;
  skills?: string[];
  className?: string;
}

export default function Tag({ title, skills, className }: TagProps) {
  if (skills && skills.length > 0) {
    return (
      <ul
        className={cn(
          "flex flex-wrap gap-1.5 border-x border-border-edge border-dashed px-4 py-4",
          className,
        )}
      >
        {skills.map((skill) => (
          <li key={skill} className="flex">
            <Tag title={skill} />
          </li>
        ))}
      </ul>
    );
  }

  if (!title) {
    return null;
  }

  return <span className={cn("tag", className)}>{title}</span>;
}
