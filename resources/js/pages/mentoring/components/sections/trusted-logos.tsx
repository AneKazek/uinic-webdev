import Image from "next/image";

type Logo = {
  src: string;
  alt: string;
  width: number;
  height: number;
  type?: "simple" | "composite";
  text?: string;
  className?: string;
};

const logoData: Logo[] = [
  {
    src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/07bb7f59-e82e-4ee8-afb9-85b4bbefdb2e-codedex-io/assets/svgs/csforall-logo-1.svg",
    alt: "CSforALL",
    width: 140,
    height: 60,
  },
  {
    type: "composite",
    src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/07bb7f59-e82e-4ee8-afb9-85b4bbefdb2e-codedex-io/assets/images/divhacks-logo-5.png",
    alt: "Columbia DivHacks",
    text: "COLUMBIA DIVHACKS",
    width: 56,
    height: 56,
  },
  {
    src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/07bb7f59-e82e-4ee8-afb9-85b4bbefdb2e-codedex-io/assets/images/lehman-logo-6.png",
    alt: "Lehman College",
    width: 160,
    height: 60,
  },
  {
    src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/07bb7f59-e82e-4ee8-afb9-85b4bbefdb2e-codedex-io/assets/images/csta-white-removebg-preview-7.png",
    alt: "CSTA",
    width: 100,
    height: 40,
  },
  {
    src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/07bb7f59-e82e-4ee8-afb9-85b4bbefdb2e-codedex-io/assets/images/hacknyu-8.png",
    alt: "HackNYU",
    width: 154,
    height: 25,
  },
  {
    src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/07bb7f59-e82e-4ee8-afb9-85b4bbefdb2e-codedex-io/assets/images/Sullivan-9.png",
    alt: "Sullivan BOCES",
    width: 120,
    height: 60,
  },
  {
    src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/07bb7f59-e82e-4ee8-afb9-85b4bbefdb2e-codedex-io/assets/images/uber-eats-10.png",
    alt: "Uber Eats",
    width: 110,
    height: 18,
  },
  {
    src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/07bb7f59-e82e-4ee8-afb9-85b4bbefdb2e-codedex-io/assets/images/spotify-logo-11.png",
    alt: "Spotify",
    width: 115,
    height: 35,
  },
  {
    src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/07bb7f59-e82e-4ee8-afb9-85b4bbefdb2e-codedex-io/assets/images/MIT_logo-12.png",
    alt: "MIT",
    width: 80,
    height: 40,
  },
];

const TrustedLogos = () => {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <h2 className="text-center font-display text-2xl font-semibold leading-8 text-text-primary">
          Trusted by learners from
        </h2>
        <div className="mx-auto mt-16 flex max-w-lg flex-wrap items-center justify-center gap-x-8 gap-y-12 sm:max-w-xl sm:gap-x-10 lg:mx-0 lg:max-w-none lg:gap-x-16">
          {logoData.map((logo) =>
            logo.type === "composite" ? (
              <div
                key={logo.alt}
                className="flex flex-col items-center justify-center gap-3 text-center"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={logo.width}
                  height={logo.height}
                  className="h-14 w-auto object-contain"
                />
                <p className="text-[10px] font-semibold uppercase tracking-wider text-text-secondary">
                  {logo.text}
                </p>
              </div>
            ) : (
              <Image
                key={logo.alt}
                className="col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1"
                src={logo.src}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
              />
            ),
          )}
        </div>
      </div>
    </section>
  );
};

export default TrustedLogos;