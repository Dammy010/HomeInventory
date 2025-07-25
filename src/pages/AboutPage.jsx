
export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen flex flex-col justify-between">
      <section className="py-20 px-6 bg-gradient-to-br from-blue-50 to-white text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-6">About Home Inventory</h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          Home Inventory is a simple, smart solution for organizing everything in your home. Whether you're moving, decluttering,
          or just love keeping things in order this app makes it easy to add rooms, list your items, and manage your belongings from anywhere.
        </p>
      </section>

      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-blue-900 mb-4">Why We Built It</h2>
            <p className="text-gray-700 mb-4">
              Keeping track of your home inventory shouldn't be stressful. We built this app to help families, students, and professionals manage their home assets without hassle.
            </p>
            <p className="text-gray-700">
              From small apartments to large homes, this platform empowers you to stay organized and prepared whether it’s for insurance, moving, or peace of mind.
            </p>
          </div>
          <img
            src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914"
            alt="Organized home"
            className="rounded-xl shadow-md w-full"
          />
        </div>
      </section>

      <section className="py-16 px-6 bg-blue-50 text-center">
        <h2 className="text-3xl font-bold text-blue-900 mb-4">Our Mission</h2>
        <p className="text-gray-700 max-w-3xl mx-auto">
          We believe an organized home leads to a more peaceful life. Our goal is to make it easy for anyone to know what they own, where it is, and how to manage it digitally and securely.
        </p>
      </section>

    </div>
  );
}
