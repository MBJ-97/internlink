import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MagnifyingGlassIcon, UsersIcon, ChartBarIcon, MegaphoneIcon, BriefcaseIcon } from '@heroicons/react/24/outline';

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
              <div className="flex flex-1 gap-3 rounded-lg border border-[#cddcea] bg-slate-50 p-4 flex-col">
                <UsersIcon className="h-6 w-6 text-[#0c151d]" />
                <div className="flex flex-col gap-1">
                  <h2 className="text-[#0c151d] text-base font-bold leading-tight">Access Talented Students</h2>
                  <p className="text-[#4574a1] text-sm font-normal leading-normal">Connect with a diverse pool of ambitious students seeking real-world experience.</p>
                </div>
              </div>
              <div className="flex flex-1 gap-3 rounded-lg border border-[#cddcea] bg-slate-50 p-4 flex-col">
                <ChartBarIcon className="h-6 w-6 text-[#0c151d]" />
                <div className="flex flex-col gap-1">
                  <h2 className="text-[#0c151d] text-base font-bold leading-tight">Enhance Employer Branding</h2>
                  <p className="text-[#4574a1] text-sm font-normal leading-normal">Showcase your company culture and values to attract top talent.</p>
                </div>
              </div>
              <div className="flex flex-1 gap-3 rounded-lg border border-[#cddcea] bg-slate-50 p-4 flex-col">
                <MegaphoneIcon className="h-6 w-6 text-[#0c151d]" />
                <div className="flex flex-col gap-1">
                  <h2 className="text-[#0c151d] text-base font-bold leading-tight">Streamlined Recruitment</h2>
                  <p className="text-[#4574a1] text-sm font-normal leading-normal">Simplify your internship program with our easy-to-use platform.</p>
                </div>
              </div>
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
              <div className="flex flex-1 gap-3 rounded-lg border border-[#cddcea] bg-slate-50 p-4 flex-col">
                <MagnifyingGlassIcon className="h-6 w-6 text-[#0c151d]" />
                <div className="flex flex-col gap-1">
                  <h2 className="text-[#0c151d] text-base font-bold leading-tight">Easy Internship Search</h2>
                  <p className="text-[#4574a1] text-sm font-normal leading-normal">Find internships that match your skills and interests with our intuitive search tools.</p>
                </div>
              </div>
              <div className="flex flex-1 gap-3 rounded-lg border border-[#cddcea] bg-slate-50 p-4 flex-col">
                <BriefcaseIcon className="h-6 w-6 text-[#0c151d]" />
                <div className="flex flex-col gap-1">
                  <h2 className="text-[#0c151d] text-base font-bold leading-tight">Bridge to Professional World</h2>
                  <p className="text-[#4574a1] text-sm font-normal leading-normal">Gain valuable experience and build your resume with real-world projects.</p>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}