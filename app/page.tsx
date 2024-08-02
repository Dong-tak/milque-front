export default function Home() {
  return (
    <div>
      <h1 className="text-xl bg-neutral-500 text-que-lred font-medium text-center mt-10">
        Welcome to Tailwind CSS dfdf
      </h1>
      <div className="flex gap-5 mt-5 items-center justify-center">
        <button className="sm-solid-btn">Button</button>
        <button className="md-solid-btn">Button</button>
        <button className="lg-solid-btn">Button</button>
      </div>
      <div className="flex gap-5 mt-5 items-center justify-center">
        <button className="sm-outline-btn">Button</button>
        <button className="md-outline-btn">Button</button>
        <button className="lg-outline-btn">Button</button>
      </div>
    </div>
  );
}
