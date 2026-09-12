import { prisma } from "@/lib/prisma";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GoToTop from "@/components/GoToTop";

export const dynamic = "force-dynamic";

async function isWebsiteEnabled() {
  const setting = await prisma.siteSetting.findFirst({
    select: {
      websiteEnabled: true,
    },
  });

  return setting?.websiteEnabled ?? true;
}

function WebsiteBlocked() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f5f7fa] px-4 py-16">
      <div className="w-full max-w-2xl">
        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl">
          {/* Top Brand Area */}
          <div className="bg-[#071d49] px-6 py-10 text-center sm:px-10">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-white shadow-lg">
              <span className="text-2xl font-extrabold text-[#071d49]">
                SV
              </span>
            </div>

            <h1 className="mt-6 text-xl font-extrabold text-white sm:text-2xl">
              श्री विक्रमादित्य इंटर कॉलेज
            </h1>

            <p className="mt-2 text-sm text-white/70">
              बरौली कर्मा, कौंधियारा, प्रयागराज
            </p>
          </div>

          {/* Message */}
          <div className="px-6 py-10 text-center sm:px-10 sm:py-12">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#f4c400]/15">
              <svg
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="text-[#b08b00]"
              >
                <rect
                  x="5"
                  y="10"
                  width="14"
                  height="10"
                  rx="2"
                />

                <path d="M8 10V7a4 4 0 0 1 8 0v3" />

                <circle
                  cx="12"
                  cy="15"
                  r="1"
                />
              </svg>
            </div>

            <h2 className="mt-6 text-2xl font-extrabold text-[#071d49] sm:text-3xl">
              वेबसाइट अस्थायी रूप से बंद है
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-gray-500 sm:text-base">
              यह वेबसाइट Super Admin द्वारा अस्थायी रूप से
              ब्लॉक की गई है। कृपया कुछ समय बाद पुनः प्रयास
              करें।
            </p>

            <div className="mx-auto mt-8 max-w-md rounded-2xl border border-[#f4c400]/40 bg-[#fffbea] px-5 py-4">
              <p className="text-sm font-semibold leading-6 text-[#6f5b00]">
                वेबसाइट को शीघ्र ही पुनः उपलब्ध कराया जा सकता
                है। असुविधा के लिए खेद है।
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-100 bg-gray-50 px-6 py-5 text-center">
            <p className="text-xs text-gray-400">
              © {new Date().getFullYear()} श्री विक्रमादित्य
              इंटर कॉलेज
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default async function WebsiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const websiteEnabled = await isWebsiteEnabled();

  /*
   * Website OFF होने पर public website का पूरा content
   * render नहीं होगा।
   *
   * Admin Panel इससे प्रभावित नहीं होगा क्योंकि /admin
   * इस route group के बाहर है।
   */
  if (!websiteEnabled) {
    return <WebsiteBlocked />;
  }

  return (
    <>
      <Header />

      <main>{children}</main>

      <Footer />

      <GoToTop />
    </>
  );
}