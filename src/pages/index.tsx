import { useEffect, useState } from 'react';

export default function Home() {
  const [newsList, setNewsList] = useState([]);

  useEffect(() => {
    fetch('https://news-api-bice.vercel.app/')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setNewsList(data.articles);
      })
      .catch(error => {
        console.error('Hata:', error);
      });
  }, []);

  const getRandomImage = () => {
    const randomId = Math.floor(Math.random() * 100);
    return `https://picsum.photos/id/${randomId}/300/200`;
  };

  return (
    <main>
      <section className="bg-white">
        <div className="px-8 py-10 mx-auto lg:max-w-screen-xl sm:max-w-xl md:max-w-full sm:px-12 md:px-16 lg:py-20 sm:py-16">
          <div className="grid gap-x-8 gap-y-12 sm:gap-y-16 md:grid-cols-2 lg:grid-cols-3">
            {newsList.map((item:any, index) => (
              <div key={item.title} className="relative">
                <a href={item.url} className="block overflow-hidden group rounded-xl">
                  <img src={getRandomImage()} className="object-cover w-full h-56 transition-all duration-300 ease-out sm:h-64 group-hover:scale-110" alt="" />
                </a>
                <div className="relative mt-5">
                  <p className="uppercase font-semibold text-xs mb-2.5 text-purple-600">{new Date(item.publishedAt).toLocaleString()}</p>
                  <a href={item.url} className="block mb-3 hover:underline">
                    <h2 className="text-2xl font-bold leading-5 text-black transition-colors duration-200 hover:text-deep-purple-accent-700">{item.title}</h2>
                  </a>
                  <p className="mb-4 text-gray-700">{item.author}</p>
                  <a href={item.url} className="font-medium underline">Read More</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}