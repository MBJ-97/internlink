import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MagnifyingGlassIcon, UsersIcon, ChartBarIcon, MegaphoneIcon, BriefcaseIcon } from '@heroicons/react/24/outline';
import BenefitCard from "@/components/BenefitCard";

export default function Home() {
  return (
    <main>
      <div
        className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat items-center justify-center p-4"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url(/landing-bg.png)",
        }}
      >
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] sm:text-5xl">
            Unlock Your Potential with Real-World Experience
          </h1>
          <h2 className="text-white text-sm font-normal leading-normal sm:text-base">
            Connect with leading companies and find internships that match your
            skills and career goals.
          </h2>
        </div>
        <div className="flex w-full max-w-[480px]">
          <div className="relative w-full">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search internships"
              className="pl-10 w-full"
            />
          </div>
          <Button className="ml-2">Find Internships</Button>
        </div>
      </div>

      <div className="px-8 flex flex-1 justify-center py-5">
        <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
          <h2 className="text-[#0c151d] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Benefits for Employers</h2>
          <div className="flex flex-col gap-10 px-4 py-10">
            <div className="flex flex-col gap-4">
              <h1 className="text-[#0c151d] tracking-light text-[32px] font-bold leading-tight sm:text-4xl max-w-[720px]">
                Empower Your Future Workforce
              </h1>
              <p className="text-[#0c151d] text-base font-normal leading-normal max-w-[720px]">
                Find the best interns to contribute to your company's success and build a strong talent pipeline.
              </p>
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-0">
              <BenefitCard
                icon={<UsersIcon className="h-6 w-6 text-[#0c151d]" />}
                title="Access Talented Students"
                description="Connect with a diverse pool of ambitious students seeking real-world experience."
              />
              <BenefitCard
                icon={<ChartBarIcon className="h-6 w-6 text-[#0c151d]" />}
                title="Enhance Employer Branding"
                description="Showcase your company culture and values to attract top talent."
              />
              <BenefitCard
                icon={<MegaphoneIcon className="h-6 w-6 text-[#0c151d]" />}
                title="Streamlined Recruitment"
                description="Simplify your internship program with our easy-to-use platform."
              />
            </div>
          </div>

          <h2 className="text-[#0c151d] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Benefits for Students</h2>
          <div className="flex flex-col gap-10 px-4 py-10">
            <div className="flex flex-col gap-4">
              <h1 className="text-[#0c151d] tracking-light text-[32px] font-bold leading-tight sm:text-4xl max-w-[720px]">
                Launch Your Career with Confidence
              </h1>
              <p className="text-[#0c151d] text-base font-normal leading-normal max-w-[720px]">
                Find the perfect internship to kickstart your career and gain valuable industry experience.
              </p>
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-0">
              <BenefitCard
                icon={<MagnifyingGlassIcon className="h-6 w-6 text-[#0c151d]" />}
                title="Easy Internship Search"
                description="Find internships that match your skills and interests with our intuitive search tools."
              />
              <BenefitCard
                icon={<BriefcaseIcon className="h-6 w-6 text-[#0c151d]" />}
                title="Bridge to Professional World"
                description="Gain valuable experience and build your resume with real-world projects."
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}