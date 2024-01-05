"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import { MenuIcon } from "lucide-react";
import Title from "./title";
import { useMediaQuery } from "usehooks-ts";
import { cn } from "@/lib/utils";

interface NavbarProps {
  isCollapsed: boolean;
  onResetWidth: () => void;
}

const Navbar = ({ isCollapsed, onResetWidth }: NavbarProps) => {
  const params = useParams();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const document = useQuery(api.documents.getById, {
    documentId: params.documentId as Id<"documents">,
  });

  if (document === undefined)
    return (
      <nav className="bg-background dark:bg-[#1F1F1F] px-3 py-2 w-full flex items-center">
        <Title.Skeleton />
      </nav>
    );

  if (document === null) return null;
  return (
    <>
      <nav
        className={cn(
          "bg-background dark:bg-[#1F1F1F] px-3 py-2 w-full flex items-center gap-x-4",
          isMobile && !isCollapsed && "hidden",
        )}
      >
        {isCollapsed && (
          <MenuIcon
            role="button"
            onClick={onResetWidth}
            className="h-6 w-6 text-muted-foreground"
          />
        )}
        <div className=" flex items-center justify-center">
          <Title initialData={document} />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
