export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-905 dark:text-white sm:text-5xl">
          About WeOnline
        </h1>
        <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
          Bridging the gap between local businesses and local customers.
        </p>
      </div>

      <div className="mt-12 prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 space-y-6">
        <p>
          WeOnline is a next-generation local business directory platform designed to empower local commerce. Our mission is to make it incredibly easy for customers to find, connect with, and review verified service providers and businesses in their neighborhood.
        </p>
        <p>
          Whether you are looking for a highly-rated dentist, a reliable plumber, a nearby school, or the best bistro in town, WeOnline brings all the information directly to your fingertips. With user reviews, map integration, and instant enquiries, we streamline your search process.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8">For Businesses</h2>
        <p>
          WeOnline offers local businesses and professionals a powerful dashboard to manage their online presence, respond to enquiries, collect customer feedback, and expand their local footprint. By joining WeOnline, business owners gain direct exposure to thousands of prospective leads looking for services in their exact area.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8">Our Vision</h2>
        <p>
          We believe in a vibrant, connected local economy. By giving local service providers a premium digital shopfront and consumers a secure platform to find them, we foster trusted community relationships.
        </p>
      </div>
    </div>
  );
}
