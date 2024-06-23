import FormCategory from "./form";
import { getCategory } from "@/actions/categoy";

const EditorCategory = async ({ id }: { id: string }) => {
  const category = await getCategory({ id });

  return (
    <div className="w-full space-y-4 p-8">
      <FormCategory initialData={category} />
    </div>
  );
};

export default EditorCategory;
