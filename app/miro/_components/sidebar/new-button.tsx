"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export const NewButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="aspect-square">
          <Button
            variant="sidebar"
            size="icon"
            className="opacity-60 hover:opacity-100"
          >
            <PlusIcon className="h-4 w-4" />
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-[400px] rounded-md p-2">
        <div className="flex flex-col gap-y-4">
          <p>Create a new document</p>
          <Input />
          <Button>Create</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
