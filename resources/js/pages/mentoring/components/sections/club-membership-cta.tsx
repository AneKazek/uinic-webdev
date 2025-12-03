import Image from "next/image";
import Link from "next/link";
import { BookOpen, Heart, Award } from "lucide-react";

const benefits = [
  {
    icon: BookOpen,
    title: "Unlimited exercises and projects",
    description: "Unlock our complete collection of courses and real-world projects.",
  },
  {
    icon: Heart,
    title: "Get help from Code Mentors",
    description: "Have your project code reviewed by human experts in the field.",
  },
  {
    icon: Award,
    title: "Earn a Certificate of Completion",
    description: "Request official certificates for finishing courses.",
  },
];

const ClubMembershipCta = () => {
  return (
    <section className="overflow-hidden bg-gradient-to-br from-[#2563eb] via-[#9333ea] to-[#ec4899] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-accent text-4xl tracking-tight text-white sm:text-5xl">
            Join the Club
          </h2>
          <p className="mt-6 text-xl leading-8 text-gray-200">
            Want to take your learning to the next level? Get full access to all
            courses and more for as low as $9.99 / month.
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 items-center gap-y-16 gap-x-8 lg:grid-cols-2">
          <div className="flex flex-col gap-y-10">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="flex items-start gap-x-5">
                <benefit.icon
                  className="mt-1 h-8 w-8 flex-none text-white"
                  aria-hidden="true"
                  strokeWidth={1.5}
                />
                <div>
                  <h3 className="text-lg font-semibold leading-tight text-white">
                    {benefit.title}
                  </h3>
                  <p className="mt-2 text-base leading-relaxed text-gray-300">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center lg:justify-end">
            <Image
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/07bb7f59-e82e-4ee8-afb9-85b4bbefdb2e-codedex-io/assets/images/final-1-3.gif"
              alt="Pixel art illustration of characters on a vehicle"
              width={292}
              height={248}
              unoptimized
              className="max-w-xs sm:max-w-sm"
            />
          </div>
        </div>

        <div className="mt-20 flex justify-center">
          <Link
            href="/pricing"
            className="rounded-lg bg-primary px-8 py-4 text-lg font-bold text-primary-foreground shadow-lg transition-transform hover:scale-105"
          >
            Join Club now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ClubMembershipCta;