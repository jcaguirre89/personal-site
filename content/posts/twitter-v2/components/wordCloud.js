import cloud from "d3-cloud";
import { descending } from "d3-array";

const sortedWords = words
  .concat()
  .sort((x, y) => descending(x.value, y.value))
  .slice(0, maxWords);

const random = ()

const layout = cloud()
  .size([500, 500])
  .words(sortedWords)
  .padding(5)
  .rotate(() => ~~(Math.random() * 2) * 90)
  .font('impact')
  fontSize()
  .on('end', draw)

  const draw = (words) => (
  d3.select("body").append("svg")
      .attr("width", layout.size()[0])
      .attr("height", layout.size()[1])
    .append("g")
      .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
    .selectAll("text")
      .data(words)
    .enter().append("text")
      .style("font-size", d => d.size + "px")
      .style("font-family", "Impact")
      .attr("text-anchor", "middle")
      .attr("transform", d => "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")")
      .text(d => d.text)
)
