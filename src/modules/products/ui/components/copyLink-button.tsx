"use client";

import { useState } from "react";
import { LinkIcon, CheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CopyLinkButton() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 4000);
  };

  return (
    <Button className="size-12 border" variant="elevated" onClick={handleCopy}>
      {copied ? (
        <CheckIcon className="w-5 h-5" />
      ) : (
        <LinkIcon className="w-5 h-5" />
      )}
    </Button>
  );
}
