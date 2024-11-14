"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function Home() {
  const [link, setLink] = useState<string>("");

  return (
    <div>
      <h1>KoKomics</h1>
      <div className="flex items-center">
        <Input onChange={(e) => setLink(e.target.value)} value={link} />
        <Button>Extract</Button>
      </div>
    </div>
  );
}
