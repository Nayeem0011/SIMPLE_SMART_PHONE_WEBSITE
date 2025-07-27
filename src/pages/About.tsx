const About = () => {
  return (
    <section className="bg-white min-h-screen flex items-center justify-center px-4 py-10">
      <div className="max-w-4xl w-full text-center space-y-8">
        
        {/* Header */}
        <h1 className="text-4xl sm:text-5xl font-bold text-indigo-600">Welcome!</h1>
        <p className="text-gray-600 text-lg sm:text-xl leading-relaxed">
          Welcome to <span className="font-semibold text-indigo-500">Nayeem | ShopSmart Phone</span> — your one-stop destination for smart shopping. We combine quality, affordability, and convenience to bring you the best online experience.
        </p>

        {/* Image section */}
        <div className="flex justify-center">
          <img
            src="https://img.freepik.com/free-vector/online-shopping-concept-illustration_114360-1085.jpg"
            alt="About illustration"
            className="w-full max-w-md rounded-xl shadow-lg"/>
        </div>

        {/* Mission and Vision */}
        <div className="grid md:grid-cols-2 gap-6 text-left mt-10">
          <div className="bg-indigo-50 p-6 rounded-xl shadow">
            <h3 className="text-xl font-bold text-indigo-600 mb-2">Our Mission</h3>
            <p className="text-gray-600">
              To empower customers with a seamless and enjoyable shopping experience by offering top-quality products and unbeatable service.
            </p>
          </div>

          <div className="bg-indigo-50 p-6 rounded-xl shadow">
            <h3 className="text-xl font-bold text-indigo-600 mb-2">Our Vision</h3>
            <p className="text-gray-600">
              To become the most customer-centric e-commerce platform where people can discover and shop everything they need — with trust and ease.
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-sm text-gray-400 mt-10">Thank you for being with us! 💜</p>
      </div>
    </section>
  );
};

export default About;
