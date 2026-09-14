import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ImagePlus, X } from "lucide-react";
import { useState } from "react";
import { AppShell, PageHeader } from "@/components/AppShell";
import { Avatar, Button, Card, Label, Textarea } from "@/components/ui/primitives";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/create")({
  head: () => ({
    meta: [
      { title: "Create a post — Orbit" },
      { name: "description", content: "Upload a photo, write a caption, and share it with your followers." },
      { property: "og:title", content: "Create a post — Orbit" },
      { property: "og:description", content: "Upload a photo and share it on Orbit." },
    ],
  }),
  component: CreatePost,
});

function CreatePost() {
  const { currentUser, addPost } = useStore();
  const navigate = useNavigate();
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState<string | null>(null);

  return (
    <AppShell>
      <div className="mx-auto w-full max-w-2xl px-4 py-6 lg:px-8">
        <PageHeader title="Create post" subtitle="Add a photo, a caption, or both." />

        <Card className="p-5">
          <div className="mb-4 flex items-center gap-3">
            <Avatar src={currentUser.avatar} alt={currentUser.name} size={40} />
            <div>
              <p className="text-sm font-semibold">{currentUser.name}</p>
              <p className="text-xs text-muted-foreground">@{currentUser.username}</p>
            </div>
          </div>

          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              if (!caption.trim() && !image) return;
              const id = addPost(caption.trim(), image ?? undefined);
              navigate({ to: "/post/$postId", params: { postId: id } });
            }}
          >
            <div>
              <Label htmlFor="caption">Caption</Label>
              <Textarea
                id="caption"
                rows={4}
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Write something…"
              />
            </div>

            {image ? (
              <div className="relative overflow-hidden rounded-lg border border-border">
                <img src={image} alt="Selected upload preview" className="max-h-96 w-full object-cover" />
                <button
                  type="button"
                  onClick={() => setImage(null)}
                  aria-label="Remove image"
                  className="absolute top-2 right-2 grid size-8 place-items-center rounded-full bg-background/80 text-foreground"
                >
                  <X className="size-4" />
                </button>
              </div>
            ) : (
              <label className="flex cursor-pointer flex-col items-center gap-2 rounded-lg border border-dashed border-border py-10 text-center hover:bg-elevated/50">
                <ImagePlus className="size-7 text-primary" />
                <span className="text-sm font-semibold">Upload a photo</span>
                <span className="text-xs text-muted-foreground">PNG or JPG, up to 10MB</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setImage(URL.createObjectURL(file));
                  }}
                />
              </label>
            )}

            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => navigate({ to: "/" })}>
                Cancel
              </Button>
              <Button type="submit" disabled={!caption.trim() && !image}>
                Share post
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </AppShell>
  );
}
