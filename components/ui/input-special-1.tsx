"use client";

import { FileText, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const title = "File Upload with List";

interface FileInputProps {
  data?: File[];
  onUpdate: (files: File[]) => void;
  id?: string;
  label?: string;
  multiple?: boolean;
}

const FileInput = ({
  data = [],
  onUpdate,
  id = "file-upload",
  label = "Upload Files",
  multiple = true,
}: FileInputProps) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onUpdate(Array.from(e.target.files));
    }
  };

  const removeFile = (index: number) => {
    onUpdate(data.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full max-w-sm space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        className="bg-background"
        id={id}
        multiple={multiple}
        onChange={handleFileChange}
        type="file"
      />
      {data.length > 0 && (
        <div className="space-y-2">
          {data.map((file, index) => (
            <div
              className="flex items-center justify-between rounded-md border p-2"
              key={index}
            >
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{file.name}</span>
                <span className="text-muted-foreground text-xs">
                  ({(file.size / 1024).toFixed(1)} KB)
                </span>
              </div>
              <Button
                className="h-6 w-6"
                onClick={() => removeFile(index)}
                size="icon"
                type="button"
                variant="ghost"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileInput;
