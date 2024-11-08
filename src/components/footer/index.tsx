import Link from "next/link";

const FooterComponent = () => {
  return (
    <div className="flex flex-wrap gap-2 py-10 font-sans text-xs uppercase text-muted-foreground">
      <span>© {new Date().getFullYear()} Delok Film</span>

      <Link
        href="https://instagram.com/withcakfan"
        target="_blank"
        className="hover:underline"
      >
        @WithCakfan
      </Link>
      <Link
        href="https://github.com/cakfan/delok-film-web"
        target="_blank"
        className="hover:underline"
      >
        GitHub
      </Link>
    </div>
  );
};

export default FooterComponent;
