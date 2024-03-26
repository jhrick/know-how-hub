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

  const listPosts = posts.map((post) => (
    <li key={post.presentationInfos.id}>
      {post.sections.map((section, i) => {
        if (i === 0)
          return <img src={section.image_url} alt={section.image_url} />;
      })}
      <h3>
        <span>{post.presentationInfos.title}</span>
      </h3>
      <p>
        <span>
          {post.sections.map((section, i) => {
            if (i === 0) return section.paragraph_text;
          })}
        </span>
      </p>
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
