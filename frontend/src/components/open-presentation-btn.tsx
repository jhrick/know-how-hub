import { Link } from "react-router-dom";

interface IPresentationProps {
  title: string;
}

const OpenPresentationBtn = ({ title }: IPresentationProps) => {
  return (
    <button className="open-presentation_btn">
      <Link to={"presentation/" + title}>Open</Link>
    </button>
  );
};

export default OpenPresentationBtn;
