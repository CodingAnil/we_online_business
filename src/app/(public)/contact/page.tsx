import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-905 dark:text-white sm:text-5xl">
          Contact Us
        </h1>
        <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
          Have questions or feedback? We&apos;d love to hear from you. Get in touch with our team.
        </p>
      </div>

      <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Info */}
        <div className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-800 rounded-3xl p-8 space-y-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Our Office</h3>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3 text-sm">
              <MapPin className="h-5 w-5 text-indigo-500 shrink-0 mt-0.5" />
              <span className="text-gray-600 dark:text-gray-400">
                101, Business Hub, Bandra Kurla Complex, Mumbai, Maharashtra 400051
              </span>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <Phone className="h-5 w-5 text-indigo-500 shrink-0" />
              <a href="tel:+912212345678" className="text-gray-600 dark:text-gray-400 hover:underline">
                +91 22 1234 5678
              </a>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <Mail className="h-5 w-5 text-indigo-500 shrink-0" />
              <a href="mailto:support@weonline.example.com" className="text-gray-600 dark:text-gray-400 hover:underline">
                support@weonline.example.com
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2 bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-800 rounded-3xl p-8 shadow-xl">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Send us a Message</h3>
          
          <form className="mt-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="John"
                  className="mt-1 block w-full rounded-xl border border-gray-250 dark:border-gray-800 bg-slate-50 dark:bg-[#090d16] px-4 py-2.5 text-sm text-gray-950 dark:text-white focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="Doe"
                  className="mt-1 block w-full rounded-xl border border-gray-250 dark:border-gray-800 bg-slate-50 dark:bg-[#090d16] px-4 py-2.5 text-sm text-gray-950 dark:text-white focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Email Address
              </label>
              <input
                type="email"
                placeholder="john@example.com"
                className="mt-1 block w-full rounded-xl border border-gray-250 dark:border-gray-800 bg-slate-50 dark:bg-[#090d16] px-4 py-2.5 text-sm text-gray-950 dark:text-white focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Subject
              </label>
              <input
                type="text"
                placeholder="How can we help you?"
                className="mt-1 block w-full rounded-xl border border-gray-250 dark:border-gray-800 bg-slate-50 dark:bg-[#090d16] px-4 py-2.5 text-sm text-gray-950 dark:text-white focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Message
              </label>
              <textarea
                rows={5}
                placeholder="Detail your enquiry here..."
                className="mt-1 block w-full rounded-xl border border-gray-250 dark:border-gray-800 bg-slate-50 dark:bg-[#090d16] px-4 py-2.5 text-sm text-gray-950 dark:text-white focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none"
              />
            </div>

            <button
              type="button"
              className="inline-flex w-full items-center justify-center rounded-xl bg-indigo-650 px-4 py-3 text-sm font-semibold text-white shadow hover:bg-indigo-600 transition cursor-pointer"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
