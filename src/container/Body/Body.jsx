import React, { useEffect, useRef, useState } from "react";
import "./Body.scss";
import "./NavBar.scss";
import client from "../../lib/client";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MdNotificationsActive } from "react-icons/md";
import ShakaPlayer from 'shaka-player-react';
import 'shaka-player/dist/controls.css';
import {Footer} from '../../container'

const Body = () => {
  const [currentMusic, setCurrentMusic] = useState(null);
  const [allMusic, setAllMusic] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Fetch all music data
    const fetchAllMusic = async () => {
      try {
        const response = await client.fetch(
          `*[_type == "podcast"]{
            _id,
            title,
            description,
            file{
              asset ->{
                url
              }
            },
            audioimg {
              asset -> {
                url
              }
            },
            slug { current }
          }`
        );
        setAllMusic(response);
        if (!currentMusic && response.length > 0) {
          setCurrentMusic(response[0]);
        }
      } catch (error) {
        console.error("Error fetching all music:", error);
      }
    };

    fetchAllMusic();
  }, []);

  const [naving, setNaving] = useState([]);

  useEffect(() => {
    client
      .fetch(
        `*[_type == "nav"]{
       title,
      imager{
        asset ->{
          url
        },
      },
      imagel{
        asset ->{
          url
        },
      },
      weburl,
     } `
      )
      .then((data) => {
        setNaving(data);
      })
      .catch(console.error);
  }, []);

  

  const handleMusicClick = (music) => {
    setCurrentMusic(music);
    setIsPlaying(true);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredMusic = allMusic.filter((music) =>
    music.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const videoRef = useRef(null);
  const backgroundImageRef = useRef(null);

  const handleImageClick = (music) => {
    setCurrentMusic(music);
    setIsPlaying(true);
    videoRef.current.play();
  };

  const handleClick = (event, music) => {
    if (event.target === videoRef.current) {
      // Click occurred on the background
      videoRef.current.play();
    } else {
      // Click occurred on the controls
      if (videoRef.current.paused) {
        setIsPlaying(true);
        videoRef.current.play();
      } else {
        setIsPlaying(false);
        videoRef.current.pause();
      }
    }
  };

  const handleVideoPlay = () => {
    setIsPlaying(true);
  };

  const handleVideoPause = () => {
    setIsPlaying(false);
  };


  return (
    <>
      <Container>
        <div className="nav">
          {!naving ? (
            <h2>Loading...</h2>
          ) : (
            <>
              {naving[0] && (
                <div className="left">
                  <Link to={naving[0].weburl} target="_blank">
                    {naving[0].imagel && (
                      <img src={naving[0].imagel.asset.url} alt="logo" />
                    )}
                  </Link>
                </div>
              )}
            </>
          )}
          {!naving ? (
            <h2>Loading...</h2>
          ) : (
            <>
              {naving[0] && (
                <div className="right">
                  <form>
                    <input
                      type="text"
                      placeholder="Search songs..."
                      value={searchQuery}
                      onChange={handleSearchChange}
                    />
                    <button type="submit" >Search</button>
                  </form>
                  <div className="notify">
                    <MdNotificationsActive className="notification" />
                    <div className="scroll-notify">
                      <div className="notify-item">
                        {naving[0].imager && (
                          <img
                            src={naving[0].imager.asset.url}
                            alt="noti-logo"
                          />
                        )}
                        <Link to="/">
                          <p>Notification</p>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <Link to="/signup">
                    {naving[0].imager && (
                      <img
                        src={naving[0].imager.asset.url}
                        alt="profile"
                        className="profile"
                      />
                    )}
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      </Container>

      <div className="page">
        {currentMusic && (
          <div className="info">
            <img
              src={currentMusic.audioimg.asset.url}
              alt="Current Music"
            />
            <div className="description">
              <h2>{currentMusic.title}</h2>
              <p>{`${currentMusic.description.substring(
                0,
                600
              )}....`}</p>
            </div>
          </div>
        )}

        <div className="scroll-container">
          <div className="scroll">
            {filteredMusic.map((music) => (
              <div
                key={music._id}
                className={`music-item ${
                  currentMusic && currentMusic._id === music._id
                    ? "active"
                    : ""
                } scroll-box`}
                onClick={() => handleMusicClick(music)}
              >
                
                <ShakaPlayer
                  onClick={handleClick}
                  className="shaka-video"
                  src={music.file.asset.url}
                  style={{
                    backgroundImage: `url(${music.audioimg.asset.url})`,
                    backgroundRepeat: "no-repeat",
                  }}
                  id='player'
                  // controls
                  ref={videoRef}
                  onPlay={handleVideoPlay}
                  onPause={handleVideoPause}
                 
                />
                <p
                  className={`music-title ${
                    currentMusic && currentMusic._id === music._id
                      ? "active"
                      : ""
                  }`}
                  
                >
                  {music.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Body;
