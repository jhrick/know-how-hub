import { ChangeEventHandler } from "react";

interface ISectionProps {
  sectionNum: number;
  handleInputChange: ChangeEventHandler<HTMLInputElement>;
}

const SectionForm = ({ sectionNum, handleInputChange }: ISectionProps) => {
  const sectionClassName = "section_" + sectionNum.toString();

  return (
    <div>
      <h4>Section {sectionNum}</h4>
      <label htmlFor="paragraph">Text</label>
      <br />
      <input
        className={sectionClassName}
        name="paragraph"
        onChange={handleInputChange}
      />
      <br />
      <label htmlFor="presenter">Presenter</label>
      <br />
      <input
        className={sectionClassName}
        name="presenter"
        onChange={handleInputChange}
      />
      <br />
      <label htmlFor="image">Image</label>
      <br />
      <input
        className={sectionClassName}
        name="image"
        onChange={handleInputChange}
      />
      <br />
    </div>
  );
};

const renderSectionForm = (
  sectionQtd: number,
  handleInputChange: ChangeEventHandler<HTMLInputElement>,
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
