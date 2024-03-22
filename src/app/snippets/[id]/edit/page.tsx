import { db } from "@/db";
import SnippetEditForm from "../../../../components/SnippetEditForm";

import { notFound } from "next/navigation";

interface SnippetEditPageProps {
  params: {
    id: string;
  };
}

export default async function SnippetEditPage(props: SnippetEditPageProps) {
  // because by default the params is always a string and the id in our prisma data is an INT.
  const id = parseInt(props.params.id);

  const snippet = await db.snippet.findFirst({
    where: { id: id },
  });

  if (!snippet) {
    return notFound();
  }

  return (
    <div>
      <SnippetEditForm snippet={snippet} />
    </div>
  );
}
