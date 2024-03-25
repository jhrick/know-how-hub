import React, { useState, useEffect } from "react";

interface IPresentationData {
  id: number;
  title: string;
  createAt: string;
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

  useEffect(() => {
    fetch("http://localhost:2242/api/show_all")
      .then((result) => result.json())
      .then((datas) => {
        console.log("dados: " + JSON.stringify(datas[0]));
        setPosts(datas.filter((data: IResponse) => data.presentationInfos));
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const listPosts = (
    <ul>
      {posts.map((post) => {
        return (
          <li>
            <h3>{post.presentationInfos.title}</h3>
            <p>{post.sections.map((section) => section.paragraph_text)}</p>
            {post.sections.map((section) => {
              return <img alt={section.image_url} />;
            })}
            ;
          </li>
        );
      })}
    </ul>
  );

  return (
    <>
      <h1>PresentationView</h1>
      {listPosts}
    </>
  );
};

export default PresentationView;
