"use client";

import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function SearchBar({ wBtn }: { wBtn?: boolean }) {
    return (
        <div className="w-full flex items-center gap-2">
            <Input placeholder="Search..." className="w-full" />
            {wBtn && <Button>Search</Button>}
        </div>
    );
}
