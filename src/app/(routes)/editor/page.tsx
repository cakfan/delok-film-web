import { Metadata } from "next";
import { redirect } from "next/navigation";
import EditorProduct from "./components/country";
import EditorPeople from "./components/people";
import EditorCategory from "./components/category";
import EditorMovie from "./components/movie";
import EditorDrama from "./components/drama";

interface EditorProps {
  searchParams: {
    type: string;
    id: string;
  };
}

interface EditType {
  title: string;
  description: string;
}

const editTypes: { [key: string]: EditType } = {
  country: { title: "Country", description: "Manage country" },
  category: { title: "Category", description: "Manage category" },
  people: { title: "People", description: "Manage people" },
  movie: { title: "Movie", description: "Manage movie" },
  drama: { title: "Drama", description: "Manage drama" },
};

export const generateMetadata = async ({
  searchParams: { type },
}: EditorProps): Promise<Metadata> => {
  return {
    title: editTypes[type]?.title ?? "",
    description: editTypes[type]?.description ?? "",
  };
};

export default async function EditorPage({
  searchParams: { type, id },
}: EditorProps) {
  if (!type || !Object.keys(editTypes)) redirect(`/dashboard`);

  switch (type) {
    case "country":
      return <EditorProduct id={id} />;
    case "category":
      return <EditorCategory id={id} />;
    case "people":
      return <EditorPeople id={id} />;
    case "movie":
      return <EditorMovie id={id} />;
    case "drama":
      return <EditorDrama id={id} />;
    default:
      redirect("/dashboard");
  }
}
