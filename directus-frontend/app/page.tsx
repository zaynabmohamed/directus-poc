import Image from "next/image";
import { directus } from "@/lib/directus";
import { readItems } from "@directus/sdk";

const DIRECTUS_URL = (
  process.env.NEXT_PUBLIC_DIRECTUS_URL || "http://127.0.0.1:8055"
).replace(/\/$/, "");

export default async function Home() {
  const news = await directus.request(
    readItems("news", {
      fields: ["*", "image"],
      sort: ["-publish_date"],
    })
  );

  const events = await directus.request(
    readItems("events", {
      fields: ["*", "image"],
    })
  );

  const partners = await directus.request(
    readItems("partners", {
      fields: ["*", "logo"],
    })
  );

  return (
    <main className="min-h-screen bg-gray-100">

      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold">
            Directus CMS Demo
          </h1>

          <p className="mt-4 text-lg text-blue-100">
            Dynamic content fetched from Directus Headless CMS using Directus SDK.
          </p>
        </div>
      </section>


      {/* News */}
      <section className="max-w-6xl mx-auto px-6 py-12">

        <h2 className="text-3xl font-bold mb-8 text-center">
          Latest News
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

          {news.map((item: any) => {

            const imageId =
              typeof item.image === "string"
                ? item.image
                : item.image?.id;

            const imageUrl = imageId
              ? `${DIRECTUS_URL}/assets/${imageId}`
              : null;


            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition"
              >

                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={item.title}
                    width={600}
                    height={400}
                    className="w-full h-56 object-cover"
                  />
                ) : (
                  <div className="w-full h-56 bg-gray-200 flex items-center justify-center">
                    No Image
                  </div>
                )}


                <div className="p-6">

                  <h3 className="text-xl font-bold text-gray-800">
                    {item.title}
                  </h3>

                  <p className="text-gray-600 mt-3">
                    {item.description}
                  </p>

                  <p className="mt-5 text-sm text-gray-500">
                    {item.publish_date
                      ? new Date(item.publish_date).toLocaleDateString()
                      : ""}
                  </p>

                </div>

              </div>
            );
          })}

        </div>

      </section>



      {/* Events */}
      <section className="max-w-6xl mx-auto px-6 py-12">

        <h2 className="text-3xl font-bold mb-8 text-center">
          Events
        </h2>


        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

          {events.map((event: any) => (

            <div
              key={event.id}
              className="bg-white rounded-2xl overflow-hidden shadow-md p-6"
            >

              {event.image?.id && (
                <Image
                  src={`${DIRECTUS_URL}/assets/${event.image.id}`}
                  alt={event.title}
                  width={600}
                  height={300}
                  className="w-full h-48 object-cover rounded-xl mb-4"
                />
              )}


              <h3 className="text-xl font-bold text-gray-800">
                {event.title}
              </h3>


              <p className="text-gray-600 mt-3">
                {event.description}
              </p>


              {event.date && (
                <p className="text-sm text-gray-500 mt-4">
                  {new Date(event.date).toLocaleDateString()}
                </p>
              )}

            </div>

          ))}

        </div>

      </section>




      {/* Partners */}
      <section className="max-w-6xl mx-auto px-6 py-12">

        <h2 className="text-3xl font-bold mb-8 text-center">
          Partners
        </h2>


        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

          {partners.map((partner: any) => (

            <div
              key={partner.id}
              className="bg-white rounded-2xl shadow-md p-6 text-center"
            >

              {partner.logo?.id && (
                <Image
                  src={`${DIRECTUS_URL}/assets/${partner.logo.id}`}
                  alt={partner.name}
                  width={200}
                  height={100}
                  className="mx-auto object-contain mb-5"
                />
              )}


              <h3 className="text-xl font-bold text-gray-800">
                {partner.name}
              </h3>


              <p className="text-gray-600 mt-3">
                {partner.description}
              </p>

            </div>

          ))}

        </div>

      </section>



      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6 text-center">
        <p>
          Directus POC • Built with Next.js, Tailwind CSS & Directus SDK
        </p>
      </footer>

    </main>
  );
}