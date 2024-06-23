import { DramaFormValues } from "./drama";
import { MovieFormValues } from "./movie";

export interface PostWithMovieAndDrama
  extends MovieFormValues,
    DramaFormValues {
  createdAt: Date;
  updatedAt: Date;
}
