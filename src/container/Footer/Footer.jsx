import React from "react";
import "./Footer.scss";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import client from "../../lib/client";
import { useState } from "react";
import { useEffect } from "react";

const Footer = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    client
      .fetch(
        `*[_type == "footer"]{
        title,
        image{
          asset->{
            url
          }
        },
        url1,
        url2,
        url3,
        url4,
        url6,
        copyright,
      }`
      )
      .then((data) => {
        setPosts(data);
        // console.log(data);
      })
      .catch(console.error);
  }, []);
  return (
    <Container>
      {!posts ? (
        <h2>Load Ho rha h.....</h2>
      ) : (
        <>
          {posts[0] && (
            <div className="box_footer">
              <div class="vr"></div>
              <div className="footer_text">
                <div className="left_text">
                  {posts[0].url1 && (
                    <Link to={posts[0].url1} target="_blank">
                      {posts[0].image && (
                        <img src={posts[0].image.asset.url} alt="" />
                      )}
                    </Link>
                  )}
                  <div className="copyright">
                    <span> &copy; </span> AlRight Copyright reserved with{" "}
                    {posts[0].url2 && (
                      <Link to={posts[0].url2} className="Link" target="_blank">
                        {" "}
                        @{posts[0].copyright}
                      </Link>
                    )}
                  </div>
                </div>
                <div className="right_text">
                  <ul>
                    {posts[0].url3 && (
                      <Link to={posts[0].url3} target="_blank">
                        <li>Blog Website</li>
                      </Link>
                    )}
                    {posts[0].url4 && (
                      <Link to={posts[0].url4} target="_blank">
                        <li>E-Commerce Website</li>
                      </Link>
                    )}
                    {posts[0].url6 && (
                      <Link to={posts[0].url6} target="_blank">
                        <li>Movie Website</li>
                      </Link>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </Container>
  );
};

export default Footer;
