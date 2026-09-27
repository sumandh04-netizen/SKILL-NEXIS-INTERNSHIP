export default function StoryBar() {
  const stories = ["Your Story", "Alex", "Sarah", "Mike", "Priya", "Travel", "Nature"];
  return <section className="card story-bar"><div className="section-title"><h3>Stories</h3><button className="text-btn">See All</button></div><div className="story-row">{stories.map((name, i) => <div className="story" key={name}><div className="story-ring"><img src={`https://i.pravatar.cc/80?img=${i + 10}`} alt=""/></div><span>{name}</span></div>)}</div></section>;
}
