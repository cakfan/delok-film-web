import { FC } from "react";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface TrailerProps {
  url?: string | null;
  title: string;
}

const TrailerDialog: FC<TrailerProps> = ({ url, title }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          disabled={!url}
          variant="ghost"
          size="sm"
          className="flex w-full gap-2"
        >
          <Play className="h-4 w-4" />
          Trailer
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-screen w-full border-none bg-transparent text-white md:w-4/5">
        <div className="p-2">
          <div className="aspect-video h-full w-full">
            <iframe
              className="h-full w-full rounded-lg"
              src={url?.replaceAll("watch?v=", "embed/") + "?autoplay=1" ?? ""}
              title={"Trailer: " + title}
              aria-hidden="true"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TrailerDialog;
