import React, { useEffect, useRef } from "react";

import "./AchievementsPage.css";
import GraphCanvas from "./graph.jsx";

const eventsData = [
  // {
  //   year: "2024",
  //   achievements: [
  //     { title: "ICPC World Final 2024", image: "https://via.placeholder.com/100", description: "Description for ICPC World Final 2024" },
  //     { title: "Hackathon Winner", image: "https://via.placeholder.com/100", description: "Won a prestigious hackathon." },
  //   ],
  // },
  {
    year: "2023",
    achievements: [
      { title: "ICPC World Final 2023", image: "https://via.placeholder.com/100", description: "Description for ICPC World Final 2023" },
      { title: "Codeforces Top 100", image: "https://via.placeholder.com/100", description: "Achieved top 100 rank in Codeforces." },
      { title: "Local Contest Winner", image: "https://via.placeholder.com/100", description: "Won a local programming contest." },
    ],
  },
  {
    year: "2023",
    achievements: [
      { title: "ICPC World Final 2023", image: "https://via.placeholder.com/100", description: "Description for ICPC World Final 2023" },
      { title: "Codeforces Top 100", image: "https://via.placeholder.com/100", description: "Achieved top 100 rank in Codeforces." },
      { title: "Local Contest Winner", image: "https://via.placeholder.com/100", description: "Won a local programming contest." },
    ],
  },
  {
    year: "2023",
    achievements: [
      { title: "ICPC World Final 2023", image: "https://via.placeholder.com/100", description: "Description for ICPC World Final 2023" },
      { title: "Codeforces Top 100", image: "https://via.placeholder.com/100", description: "Achieved top 100 rank in Codeforces." },
      { title: "Local Contest Winner", image: "https://via.placeholder.com/100", description: "Won a local programming contest." },
    ],
  },
  {
    year: "2023",
    achievements: [
      { title: "ICPC World Final 2023", image: "https://via.placeholder.com/100", description: "Description for ICPC World Final 2023" },
      { title: "Codeforces Top 100", image: "https://via.placeholder.com/100", description: "Achieved top 100 rank in Codeforces." },
      { title: "Local Contest Winner", image: "https://via.placeholder.com/100", description: "Won a local programming contest." },
    ],
  },
];


const EventCard = ({ achievement }) => (
  <div className="event-card">
    <h3>{achievement.title}</h3>
    <p>{achievement.description}</p>
  </div>
);

const AchievementsPage = () => {
  const sectionsRef = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      sectionsRef.current.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Ensure the first card doesn't go too far up and adjust for consistent scaling
        if (rect.top >= 0 && rect.bottom <= windowHeight) {
          section.style.transform = "scale(1)";
          section.style.opacity = "1";
        } else if (rect.bottom < windowHeight * 0.5 || rect.top > windowHeight * 0.5) {
          section.style.transform = "scale(0.9)";
          section.style.opacity = "0.7";
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="achievements-container">
      <div className="graph-canvas">
        <GraphCanvas />
      </div>
      {eventsData.map((section, index) => (
        <div
          key={index}
          className="parallax-section"
          ref={(el) => (sectionsRef.current[index] = el)}
        >
          <h2 className="section-title">{section.year}</h2>
          <div className="section-content">
            {section.achievements.map((achievement, idx) => (
              <EventCard key={idx} achievement={achievement} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AchievementsPage;
