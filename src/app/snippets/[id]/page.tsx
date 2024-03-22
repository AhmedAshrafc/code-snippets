import { db } from "@/db";

// Whenever a user tries to find some data that doesn't NOT exist, you can redirect the user to a page that says something like "Sorry but the data you're looking for is NOT found."
import { notFound } from "next/navigation";
import Link from "next/link";

import * as serverActions from "@/server-actions";

interface SnippetShowPageProps {
  params: {
    id: string;
  };
}

export default async function SnippetShowPage(props: SnippetShowPageProps) {
  // Automatically this props will give an object that contains 'params' and 'searchParams'!
  // console.log(props);

  // Manual delay just to see the loading is working.
  await new Promise((r) => setTimeout(r, 2000));

  const snippet = await db.snippet.findFirst({
    where: { id: parseInt(props.params.id) },
  });

  if (!snippet) {
    return notFound();
  }

  const deleteSnippetAction = serverActions.deleteSnippet.bind(
    null,
    snippet.id
  );

  return (
    <div>
      <div className="flex m-4 justify-between items-center">
        <h1 className="text-xl font-bold">{snippet.title}</h1>
        <div className="flex gap-4">
          <Link
            href={`/snippets/${snippet.id}/edit`}
            className="p-2 border rounded"
          >
            Edit
          </Link>
          <form action={deleteSnippetAction}>
            <button className="p-2 border rounded">Delete</button>
          </form>
        </div>
      </div>

      <pre className="p-3 border rounded bg-gray-200 border-gray-200">
        <code>{snippet.code}</code>
      </pre>
    </div>
  );
}

// Since this page is dyanmic we want to still take benefits of the caching system using:
export async function generateStaticParams() {
  const snippets = await db.snippet.findMany();

  return snippets.map((snippet) => {
    return {
      id: snippet.id.toString(),
    };
  });
}
