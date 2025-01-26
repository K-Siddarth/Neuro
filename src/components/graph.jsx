import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";

const GraphCanvas = () => {
  const svgRef = useRef();
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const proximityThreshold = 100;
  const nodeRadius = 4;

  const [nodes, setNodes] = useState(
    Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * width,
      y: Math.random() * height,
      vx: Math.random() * 2 - 1,
      vy: Math.random() * 2 - 1,
    }))
  );

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    const tick = () => {
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x <= 0 || node.x >= width) node.vx *= -1;
        if (node.y <= 0 || node.y >= height) node.vy *= -1;
      });

      const quadtree = d3.quadtree()
        .x((d) => d.x)
        .y((d) => d.y)
        .addAll(nodes);

      const edges = [];
      nodes.forEach((node1) => {
        quadtree.visit((node, x0, y0, x1, y1) => {
          const target = node.data;
          if (!target || target === node1) return false;

          const dx = node1.x - target.x;
          const dy = node1.y - target.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < proximityThreshold) {
            edges.push({ source: node1, target });
          }
          return (
            x0 > node1.x + proximityThreshold ||
            x1 < node1.x - proximityThreshold ||
            y0 > node1.y + proximityThreshold ||
            y1 < node1.y - proximityThreshold
          );
        });
      });

      svg.selectAll("*").remove();

      svg
        .selectAll("line")
        .data(edges)
        .join("line")
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y)
        .attr("stroke", "gray")
        .attr("stroke-width", 1.5);

      svg
        .selectAll("circle")
        .data(nodes)
        .join("circle")
        .attr("cx", (d) => d.x)
        .attr("cy", (d) => d.y)
        .attr("r", nodeRadius)
        .attr("fill", "steelblue");
    };

    const timer = d3.timer(() => tick());

    return () => timer.stop();
  }, [nodes, proximityThreshold, width, height, nodeRadius]);

  const handleClick = (event) => {
    const svg = d3.select(svgRef.current);
    const [x, y] = d3.pointer(event, svg.node());

    const newNode = {
      id: nodes.length,
      x,
      y,
      vx: Math.random() * 2 - 1,
      vy: Math.random() * 2 - 1,
    };
    setNodes((prevNodes) => [...prevNodes, newNode]);
  };

  return (
    <svg
      ref={svgRef}
      style={{
        display: "block",
        margin: 0,
        padding: 0,
        // border: "1px solid red",
        position: "absolute",
        top: "0",
        left: "0",
        width: "100%", // Fit the width of the viewport
        height: "100%", // Ensure it doesn’t exceed half the viewport height
        boxSizing: "border-box", // Prevent border from exceeding dimensions
      }}
      onClick={handleClick}
    />
  );
};

export default GraphCanvas;
