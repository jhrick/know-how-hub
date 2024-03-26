import { renderSectionForm } from "../components/createPresentation/section-form";
import { useState, ChangeEvent, FormEvent } from "react";

interface ISectionProps {
  [key: string]: string;
  presenter: string;
  paragraph: string;
  image: string;
}

const SECTION_PROPS = ["presenter", "paragraph", "image"];

type SectionKeys = (typeof SECTION_PROPS)[number];

const CreatePresentationForm = () => {
  const [formData, setFormData] = useState({ title: "" });

  const [sectionsQtd, setSectionsQtd] = useState(1);
  const [sections] = useState<ISectionProps[]>([
    {
      presenter: "",
      paragraph: "",
      image: "",
    },
  ]);

  const handleInputTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleInputContentChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name: SectionKeys = event.target.name;
    const { value, className } = event.target;

    console.log(sections);

    const sectionIndex: number = Number(className[className.length - 1]) - 1;

    sections[sectionIndex][name] = value;
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const { title } = formData;

    const data = {
      title,
      content: [...sections],
    };

    console.log(JSON.stringify(data));

    fetch("http://localhost:2242/api/content", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };

  return (
    <>
      <div id="presentation-creation">
        <div className="creation-form_container">
          <header>
            <div>
              <h2>Create Presention</h2>
            </div>
          </header>
          <form onSubmit={handleSubmit}>
            <label htmlFor="title">Title</label>
            <br />
            <input name="title" onChange={handleInputTitleChange} />
            <br />
            {renderSectionForm(sectionsQtd, handleInputContentChange)}
            <button
              type="button"
              onClick={() => {
                sections.push({ presenter: "", paragraph: "", image: "" });
                setSectionsQtd(sectionsQtd + 1);
              }}
            >
              Add Section
            </button>
            <button
              type="button"
              onClick={() => {
                sections.pop();
                setSectionsQtd(sectionsQtd - 1);
              }}
            >
              Remove Section
            </button>
            <button type="submit">Create</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreatePresentationForm;
