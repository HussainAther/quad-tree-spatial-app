import React, { useEffect } from "react";
import * as d3 from "d3";

const QuadTreeViz = ({ points }) => {
  useEffect(() => {
    const svg = d3.select("#quadTreeSvg");
    svg.selectAll("*").remove();

    const width = 500, height = 500;
    const quadTree = d3.quadtree()
      .x(d => d.x)
      .y(d => d.y)
      .extent([[0, 0], [width, height]])
      .addAll(points);

    svg.append("g")
      .selectAll("circle")
      .data(points)
      .enter()
      .append("circle")
      .attr("cx", d => d.x)
      .attr("cy", d => d.y)
      .attr("r", 3)
      .style("fill", "red");

  }, [points]);

  return <svg id="quadTreeSvg" width="500" height="500"></svg>;
};

export default QuadTreeViz;

