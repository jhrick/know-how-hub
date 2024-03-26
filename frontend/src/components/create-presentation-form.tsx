import { renderSectionForm } from "../components/createPresentation/section-form";
import { useState, ChangeEvent, FormEvent } from "react";

const CreatePresentationForm = () => {
  const [formData, setFormData] = useState({ title: "" });

  const [sectionsQtd, setSectionsQtd] = useState(1);
  const [sectionsData, setSectionsData] = useState({
    presenter: "anyone",
    paragraph: "",
    image: "",
  });

  const handleInputTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleInputContentChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSectionsData({ ...sectionsData, [name]: value });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const { title } = formData;

    const data = {
      title,
      content: [{ ...sectionsData }],
    };

    console.log(data);

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
            <button onClick={() => setSectionsQtd(sectionsQtd + 1)}>
              Add Section
            </button>
            <button onClick={() => setSectionsQtd(sectionsQtd - 1)}>
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
