import { sql } from "../lib/sql";

interface IPresentation {
  id: number;
  title: string;
  createdAt: string;
}

interface ISection {
  id?: number;
  content_id?: number;
  presenter: string;
  paragraph_text: string;
  image_url: string;
}

export async function getPresentationFromTitle(title: string) {
  const search = await sql`SELECT * FROM presentations WHERE title = ${title}`;

  const searchResult: IPresentation = search[0] as IPresentation;

  if (!searchResult) throw new Error("Not Found");

  const presentation = async (result: IPresentation) => {
    const presentationContent =
      await sql`SELECT * FROM sections WHERE content_id = ${result.id}`;

    let sections: ISection[] = presentationContent.map((section) => {
      const { presenter, paragraph_text, image_url } = section;

      return { presenter, paragraph_text, image_url };
    });

    return { result, sections };
  };

  return await presentation(searchResult);
}
