// This is a file that gathers all the SERVER ACTIONS in your application in one place. More reusability, less code.
"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/db";

import { redirect } from "next/navigation";

// create a function that edits a snippet
export async function editSnippet(snippetId: number, newCode: string) {
  // console.log(snippetId, newCode);
  await db.snippet.update({
    where: { id: snippetId },
    data: { code: newCode },
  });

  revalidatePath(`/snippets/${snippetId}`);
  // redirect to the snippet page
  redirect(`/snippets/${snippetId}`);
}

export async function deleteSnippet(snippetId: number) {
  await db.snippet.delete({
    where: { id: snippetId },
  });

  revalidatePath("/");

  // redirect to the home page
  redirect(`/`);
}

// CREATING A SERVER ACTIONS! (which is just a function.)
// formData is an object that contains all the information of the form. (user's inputs.)
export async function createSnippet(
  formState: { message: string },
  formData: FormData
) {
  try {
    // Check the user's input and make sure they're valid.
    const title = formData.get("title"); // 'title' because the input down there has a name="title"
    const code = formData.get("code"); // 'code' because the textarea down there has a name='code'

    // Form Validations
    if (typeof title !== "string" || title.length === 0) {
      return { message: "Please provide a title." };
    }

    if (typeof code !== "string" || !code || code.toString().length < 10) {
      return {
        message: `Code must be longer. Your current code length is ${
          code ? code.toString().length : 0
        }. Provide at least 10 characters!`,
      };
    }

    // Take the user's input and create a new record in the database.
    await db.snippet.create({
      data: {
        title,
        code,
      },
    });
    // Just to see the user's input
    // console.log(snippet);
    // throw new Error("Failed to save to database! Try again please!");
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        message: err.message,
      };
    } else {
      return {
        message: "Something went wrong! We couldn't create the record!",
      };
    }
  }

  revalidatePath("/");
  // Redirect the user back to the home page.
  redirect("/");
}
