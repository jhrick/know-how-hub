import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface IPresentationData {
  id: number;
  title: string;
  created_at: string;
}

interface ISectionData {
  presenter: string;
  paragraph_text: string;
  image_url: string;
}

interface IResult {
  result: IPresentationData;
  sections: ISectionData[];
}

type PresentationParams = {
  title: string;
};

const Presentation = () => {
  const [presentation, setPresentation] = useState<IResult>();
  const { title } = useParams<PresentationParams>();

  console.log("renderizou");

  const fetchData = async () => {
    const result = await fetch(`http://localhost:2242/${title}`);

    if (!result) {
      return;
    }

    const json = await result.json();

    setPresentation(json);
  };

  useEffect(() => {
    fetchData().catch(console.error);
  }, []);

  return (
    <div>
      <h1>{presentation?.result.title}</h1>

      {presentation?.sections.map((section, index) => {
        return (
          <div key={index}>
            <p>{section.paragraph_text}</p>
            <img src={section.image_url} alt="this is " />
          </div>
        );
      })}
    </div>
  );
};

export default Presentation;
