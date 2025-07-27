import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';
import emailjs from 'emailjs-com';
import { useNavigate } from 'react-router-dom';

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    emailjs.sendForm(
      'service_p2op9zl',
      'template_wufw8s2',
      e.currentTarget,
      'Dg1Y8fH1XkowP7Zl3'
    )

    .then((result) => {
      console.log('Email sent:', result.text);
      toast.success('Message sent successfully!');
      navigate("/")
      e.currentTarget.reset(); // reset form
    })

    // .catch((error) => {
    //   console.error('Email error:', error.text);
    //   toast.error('Failed to send message. Try again.');
    // })

    .finally(() => {
      setLoading(false);
    });
  };

  return (
    <section className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="max-w-5xl w-full grid md:grid-cols-2 gap-10 bg-white p-8 rounded-2xl shadow-lg">
        
        {/* Left side - Info */}
        <div className="space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-indigo-600">Get in Touch</h2>
          <p className="text-gray-600 text-lg">
            Have a question, suggestion or feedback? Fill up the form or contact us via email or phone.
          </p>

          <div className="text-gray-600 space-y-4">
            <p className="flex items-center gap-2">
              <MdEmail className="text-indigo-500 text-xl" />
              <span><strong>Email:</strong> sknayeemislam384@gmail.com</span>
            </p>

            <p className="flex items-center gap-2">
              <MdPhone className="text-indigo-500 text-xl" />
              <span><strong>Phone:</strong> +880 1852 705 818</span>
            </p>

            <p className="flex items-center gap-2">
              <MdLocationOn className="text-indigo-500 text-xl" />
              <span><strong>Address:</strong> Dhaka, Bangladesh</span>
            </p>
          </div>
        </div>

        {/* Right side - Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="user_name"
            placeholder="Your Name"
            required
            className="w-full border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"/>

          <input
            type="email"
            name="user_email"
            placeholder="Your Email"
            required
            className="w-full border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"/>

          <textarea
            rows={5}
            name="message"
            placeholder="Your Message"
            required
            className="w-full border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none">
            </textarea>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-md transition duration-300 flex justify-center items-center gap-2">
            {loading ? (
              <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
            ) : (
              "Send Message"
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
