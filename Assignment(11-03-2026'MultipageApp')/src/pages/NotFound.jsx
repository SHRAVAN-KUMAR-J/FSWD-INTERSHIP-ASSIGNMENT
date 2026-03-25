export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-8xl font-bold mb-6">404</h1>
      <p className="text-3xl mb-10">Oops! Page not found</p>
      <a href="/" className="px-10 py-5 bg-blue-600 text-white rounded-2xl text-xl hover:bg-blue-700 transition">
        Back to Home
      </a>
    </div>
  );
}