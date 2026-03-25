export default function About() {
  const cards = [
    { title: "Fast", desc: "Built with Vite — lightning speed ⚡", color: "blue" },
    { title: "Modern", desc: "React 19 + React Router v7", color: "purple" },
    { title: "Beautiful", desc: "Tailwind CSS + Dark Mode", color: "emerald" },
  ];

  return (
    <div className="py-20 px-6 max-w-6xl mx-auto">
      <h1 className="text-5xl font-bold text-center mb-16">Why Choose Us?</h1>
      
      <div className="grid md:grid-cols-3 gap-8">
        {cards.map((card, i) => (
          <div
            key={i}
            className={`group bg-white dark:bg-gray-900 p-10 rounded-3xl shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 border border-transparent hover:border-${card.color}-500`}
          >
            <div className={`w-20 h-20 bg-${card.color}-100 dark:bg-${card.color}-900 rounded-2xl flex items-center justify-center text-4xl mb-6 group-hover:rotate-12 transition`}>
              ✨
            </div>
            <h3 className="text-3xl font-bold mb-4">{card.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-lg">{card.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}