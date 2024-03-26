import { ChangeEvent, FormEvent, useState } from "react";

const CreatePresentation = () => {
  const [formData, setFormData] = useState({ title: "" });
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
          <label htmlFor="paragraph">Text</label>
          <br />
          <input name="paragraph" onChange={handleInputContentChange} />
          <br />
          <label htmlFor="presenter">Presenter</label>
          <br />
          <input name="presenter" onChange={handleInputContentChange} />
          <br />
          <label htmlFor="image">Image</label>
          <br />
          <input name="image" onChange={handleInputContentChange} />
          <br />
          <button type="submit">Create</button>
        </form>
      </div>
    </div>
  );
};

export default CreatePresentation;
