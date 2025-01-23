import React from "react";
import { useRouter } from "next/navigation";

function ProjectTitle() {
  const router = useRouter();
  return (
    <div
      className="p-5 text-xl font-bold cursor-pointer"
      onClick={() => {
        router.push("/");
      }}
    >
      logo
    </div>
  );
}

export default ProjectTitle;