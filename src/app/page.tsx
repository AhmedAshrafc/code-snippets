import { db } from "@/db";

import Link from "next/link";

export default async function Home() {
  // To get all the snippets out of our database!
  const snippets = await db.snippet.findMany();

  // We will map over it since its  normal array of objects just like you would do in React.
  const renderedSnippets = snippets.map((snippet) => {
    return (
      <Link
        key={snippet.id}
        href={`/snippets/${snippet.id}`}
        className="flex justify-between items-center p-2 border rounded"
      >
        <div>{snippet.title}</div>
        <div>View</div>
      </Link>
    );
  });

  return (
    <div>
      <p> THANKS FOR CREATING A SNIPPET!</p>

      <div className="flex m-2 justify-between items-center">
        <h1 className="text-xl font-bold">Available Snippets:</h1>
        <Link href="/snippets/new" className="border p-2 rounded bg-green-300">
          New
        </Link>
      </div>
      <div className="flex flex-col gap-2">{renderedSnippets}</div>
    </div>
  );
}
