"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, MapPin, Clock, IndianRupee } from "lucide-react"

export default function CareerPage() {
  const jobListings = [
    {
      id: 1,
      title: "Business Development Associate",
      location: "Lucknow, India",
      type: "Full-time",
      salary: "1.2L - 2L per annum",
      description: "We are looking for a motivated Business Development Associate to help expand our reach in the education sector. You'll be responsible for identifying new business opportunities, building relationships with schools and educational institutions, and driving revenue growth.",
      requirements: [
        "Bachelor's degree in Business, Marketing, or related field",
        "0-3 years of experience in business development or sales",
        "Freshers are welcome to apply",
        "Excellent communication and interpersonal skills",
        "Strong negotiation and presentation abilities",
        "Knowledge of the education sector is a plus",
        "Self-motivated with a results-driven approach"
      ],
      responsibilities: [
        "Identify and pursue new business opportunities in the education sector",
        "Build and maintain relationships with schools and institutions",
        "Conduct product presentations and demonstrations",
        "Negotiate contracts and close deals",
        "Collaborate with internal teams to ensure client satisfaction",
        "Meet and complete sales targets"
      ]
    }
  ]

  return (
    <main className="min-h-screen">
      <Navbar />
      <PageHeader
        title="Join Our Team"
        description="Help us shape the future of education"
      />

      <section className="py-16 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Current Openings</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We're always looking for talented individuals who are passionate about education and making a difference.
            </p>
          </div>

          <div className="grid gap-8 max-w-4xl mx-auto">
            {jobListings.map((job) => (
              <Card key={job.id} className="border-2 hover:border-accent transition-colors">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-start gap-3">
                    <Briefcase className="w-6 h-6 text-accent mt-1" />
                    {job.title}
                  </CardTitle>
                  <CardDescription className="space-y-2 mt-4">
                    <div className="flex flex-wrap gap-4 text-sm">
                      <span className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {job.type}
                      </span>
                      <span className="flex items-center gap-2">
                        <IndianRupee className="w-4 h-4" />
                        {job.salary}
                      </span>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-2">About the Role</h4>
                    <p className="text-muted-foreground">{job.description}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Key Responsibilities</h4>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      {job.responsibilities.map((resp, index) => (
                        <li key={index}>{resp}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Requirements</h4>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      {job.requirements.map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
                    onClick={() => window.open('https://forms.office.com/r/9LiiaKEJng', '_blank')}
                  >
                    Apply Now
                  </Button>
                </CardFooter>

              </Card>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Card className="max-w-2xl mx-auto bg-muted/50">
              <CardHeader>
                <CardTitle>Don't see a role that fits?</CardTitle>
                <CardDescription>
                  We're always interested in hearing from talented individuals. Send us your resume at{" "}
                  <a href="mailto:careers@gyanrich.com" className="text-black hover:underline">
                  gyanrich@outlook.in
                  </a>
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
