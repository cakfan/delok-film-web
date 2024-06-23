import { UseFormReturn } from "react-hook-form";
import { FC, SetStateAction, useState } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SingleImageDropzone } from "@/components/ui/single-image-upload";
import { Progress } from "@/components/ui/progress";
import { MovieFormValues } from "@/types/post/movie";

interface MoviePosterProp {
  form: UseFormReturn<MovieFormValues>;
  isLoading: boolean;
  edgestore: any;
}

const MoviePoster: FC<MoviePosterProp> = ({ form, isLoading, edgestore }) => {
  const [uploadProgress, setUploadProgress] = useState(0);

  return (
    <FormField
      control={form.control}
      name="movie.poster"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Postser</FormLabel>
          <FormControl>
            <div className="relative">
              <SingleImageDropzone
                width={200}
                height={200}
                value={field.value || ""}
                dropzoneOptions={{
                  maxSize: 1024 * 1024 * 1,
                }}
                onChange={async (file) => {
                  if (file) {
                    // setFile(file);
                    const res = await edgestore.publicFiles.upload({
                      file,
                      input: { type: "post" },
                      options: { temporary: true },
                      onProgressChange: (progress: SetStateAction<number>) => {
                        // you can use this to show a progress bar
                        setUploadProgress(progress);
                      },
                    });
                    // you can run some server action or api here
                    // to add the necessary data to your database
                    field.onChange(res.url);
                    setUploadProgress(0);
                  } else {
                    field.onChange();
                  }
                }}
                disabled={isLoading}
              />
              {uploadProgress > 0 && (
                <Progress value={uploadProgress} className="h-2" />
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default MoviePoster;
