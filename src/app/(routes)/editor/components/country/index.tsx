import prismadb from "@/config/prisma";
import FormCountry from "./form";

const EditorCountry = async ({ id }: { id: string }) => {
  const country = await prismadb.country.findUnique({
    where: {
      id,
    },
  });
  return (
    <div className="w-full space-y-4 p-8">
      <FormCountry initialData={country} />
    </div>
  );
};

export default EditorCountry;
