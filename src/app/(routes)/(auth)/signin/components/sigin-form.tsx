import { Each } from "@/components/ui/Each";
import { BrandIcons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { providerMap, signIn } from "@/config/auth";

const SignInForm = () => {
  return (
    <div className="z-10 flex flex-col gap-2">
      <Each
        of={providerMap}
        render={(provider) => (
          <form
            action={async () => {
              "use server";
              await signIn(provider.id);
            }}
          >
            <Button variant={"secondary"} type="submit">
              <BrandIcons.google2 className="mr-2 h-4 w-4" />
              Sign In with Google
            </Button>
          </form>
        )}
      />
    </div>
  );
};

export default SignInForm;
