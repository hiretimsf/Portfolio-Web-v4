import SeparatorHorizontal from "@/components/SeparatorHorizontal";

export default function Home() {
  return (
    <>
      <SeparatorHorizontal borderTop={false} />
      <Content />
    </>
  );
}

function Content() {
  return (
    <div className="mt-10 w-full space-y-8 px-4">
      {Array.from({ length: 10 }).map((_, i) => (
        <section key={i} className="rounded-lg border p-6 max-w-2xl mx-auto">
          <h2 className="mb-4 text-xl font-semibold">Section {i + 1}</h2>
          <p className="leading-relaxed text-muted-foreground">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo.
          </p>
        </section>
      ))}
    </div>
  );
}
