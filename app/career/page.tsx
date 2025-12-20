"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Briefcase, MapPin, Clock, IndianRupee } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

export default function CareerPage() {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    experience: "",
    coverLetter: "",
    resume: null as File | null,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, resume: e.target.files![0] }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.phone || !formData.resume) {
      toast.error("Please fill in all required fields")
      return
    }

    // Here you would typically send the data to your API
    console.log("Form submitted:", formData)
    toast.success("Application submitted successfully! We'll contact you soon.")
    
    // Reset form and close dialog
    setFormData({
      name: "",
      email: "",
      phone: "",
      experience: "",
      coverLetter: "",
      resume: null,
    })
    setOpen(false)
  }

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
              <Card key={job.id} className="border-2 hover:border-yellow-400 transition-colors">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-start gap-3">
                    <Briefcase className="w-6 h-6 text-yellow-400 mt-1" />
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
                  <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                      <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold">
                        Apply Now
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Apply for {job.title}</DialogTitle>
                        <DialogDescription>
                          Fill out the form below to submit your application. We'll review it and get back to you soon.
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleSubmit} className="space-y-6 mt-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name *</Label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Enter your full name"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email">Email *</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="your.email@example.com"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number *</Label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="+91 XXXXX XXXXX"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="experience">Years of Experience</Label>
                          <Input
                            id="experience"
                            name="experience"
                            value={formData.experience}
                            onChange={handleInputChange}
                            placeholder="e.g., 2 years"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="resume">Resume / CV *</Label>
                          <Input
                            id="resume"
                            name="resume"
                            type="file"
                            onChange={handleFileChange}
                            accept=".pdf,.doc,.docx"
                            required
                          />
                          <p className="text-xs text-muted-foreground">
                            Accepted formats: PDF, DOC, DOCX (Max 5MB)
                          </p>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="coverLetter">Cover Letter</Label>
                          <Textarea
                            id="coverLetter"
                            name="coverLetter"
                            value={formData.coverLetter}
                            onChange={handleInputChange}
                            placeholder="Tell us why you'd be a great fit for this role..."
                            rows={6}
                          />
                        </div>

                        <div className="flex gap-3 pt-4">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setOpen(false)}
                            className="flex-1"
                          >
                            Cancel
                          </Button>
                          <Button
                            type="submit"
                            className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold"
                          >
                            Submit Application
                          </Button>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>
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
                  <a href="mailto:careers@gyanrich.com" className="text-yellow-400 hover:underline">
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
