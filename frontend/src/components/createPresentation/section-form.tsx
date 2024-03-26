import { ChangeEventHandler } from "react";

interface ISectionProps {
  sectionNum: number;
  handleInputChange: ChangeEventHandler<HTMLElement>;
}

const SectionForm = ({ sectionNum, handleInputChange }: ISectionProps) => {
  return (
    <div>
      <h4>Section {sectionNum}</h4>
      <label htmlFor="paragraph">Text</label>
      <br />
      <input name="paragraph" onChange={handleInputChange} />
      <br />
      <label htmlFor="presenter">Presenter</label>
      <br />
      <input name="presenter" onChange={handleInputChange} />
      <br />
      <label htmlFor="image">Image</label>
      <br />
      <input name="image" onChange={handleInputChange} />
      <br />
    </div>
  );
};

const renderSectionForm = (
  sectionQtd: number,
  handleInputChange: ChangeEventHandler<HTMLElement>,
) => {
  return (
    <div>
      {[...Array(sectionQtd)].map((_, index) => (
        <SectionForm
          sectionNum={index + 1}
          handleInputChange={handleInputChange}
        ></SectionForm>
      ))}
    </div>
  );
};

export { renderSectionForm };
