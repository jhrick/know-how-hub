import DeletePresentationBtn from "../components/delete-presentation-btn";
import { useState, useEffect } from "react";

const MAX_TEXT_LENGTH = 270;

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

interface IResponse {
  presentationInfos: IPresentationData;
  sections: ISectionData[];
}

const PresentationView = () => {
  const [posts, setPosts] = useState<IResponse[]>([]);

  console.log("renderizou");

  useEffect(() => {
    fetchData().catch(console.error);
    console.log("valor mudou");
  }, []);
  const fetchData = async () => {
    const response = await fetch("http://localhost:2242/api/show_all");

    const json = await response.json();

    setPosts(json.filter((data: IResponse) => data.presentationInfos));
  };

  const deleteButtonHandle = async (presentationId: number) => {
    await fetch(`http://localhost:2242/api/delete/${presentationId}`, {
      method: "DELETE",
    });
    fetchData().catch(console.error);
  };

  const listPosts = posts.map((post) => (
    <li key={post.presentationInfos.id}>
      {post.sections
        .filter((_, i) => i === 0)
        .map((section) => {
          return <img src={section.image_url} alt={section.image_url} />;
        })}
      <div className="text">
        <p className="create-at">
          <span>{post.presentationInfos.created_at.substring(0, 10)}</span>
        </p>
        <h3>
          <span>{post.presentationInfos.title}</span>
        </h3>
        <p>
          <span>
            {post.sections
              .filter((_, i) => i === 0)
              .map((section) =>
                section.paragraph_text.length > MAX_TEXT_LENGTH
                  ? `${section.paragraph_text.substring(0, MAX_TEXT_LENGTH)}...`
                  : section.paragraph_text,
              )}
          </span>
        </p>
        <DeletePresentationBtn
          presentationId={post.presentationInfos.id}
          onClick={() => deleteButtonHandle(post.presentationInfos.id)}
        ></DeletePresentationBtn>
      </div>
    </li>
  ));

  return (
    <>
      <h2>All Presentations:</h2>
      <ul>{listPosts}</ul>
    </>
  );
};

export default PresentationView;
