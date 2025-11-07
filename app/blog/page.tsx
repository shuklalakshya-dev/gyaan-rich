// import { Navbar } from "@/components/navbar"
// import { PageHeader } from "@/components/page-header"
// import { Footer } from "@/components/footer"
// import { BlogCard } from "@/components/blog-card"

// const samplePosts = [
//   {
//     id: "1",
//     title: "The Future of Education: Embracing Digital Learning",
//     excerpt:
//       "Explore how digital transformation is reshaping the educational landscape and preparing students for the future.",
//     author: "Gyaan Rich",
//     category: "Education",
//     date: "Oct 15, 2024",
//   },
//   {
//     id: "2",
//     title: "Career Counselling: Finding Your Path",
//     excerpt: "Discover how proper career guidance can help you make informed decisions about your future.",
//     author: "Gyaan Rich",
//     category: "Career",
//     date: "Oct 10, 2024",
//   },
//   {
//     id: "3",
//     title: "Top 10 Tips for Exam Preparation",
//     excerpt: "Master the art of exam preparation with these proven strategies and techniques.",
//     author: "Gyaan Rich",
//     category: "Study Tips",
//     date: "Oct 5, 2024",
//   },
//   {
//     id: "4",
//     title: "Building Effective School Websites",
//     excerpt: "Learn how a well-designed school website can enhance communication and engagement.",
//     author: "Gyaan Rich",
//     category: "Technology",
//     date: "Sep 28, 2024",
//   },
//   {
//     id: "5",
//     title: "Student Success Stories",
//     excerpt: "Inspiring stories of students who achieved their dreams with proper guidance and support.",
//     author: "Gyaan Rich",
//     category: "Success",
//     date: "Sep 20, 2024",
//   },
//   {
//     id: "6",
//     title: "The Importance of Mentorship",
//     excerpt: "Understand how mentorship can accelerate your personal and professional growth.",
//     author: "Gyaan Rich",
//     category: "Mentorship",
//     date: "Sep 15, 2024",
//   },
// ]

// export default function BlogPage() {
//   return (
//     <main className="min-h-screen">
//       <Navbar />
//       <PageHeader
//         title="Gyaan Rich Blog"
//         description="Insights, tips, and stories about education, career, and personal growth"
//       />

//       <section className="py-20 md:py-32 bg-background">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="mb-12">
//             <h2 className="text-3xl font-bold mb-4">Latest Articles</h2>
//             <p className="text-foreground/70">
//               Stay updated with our latest insights and resources for educational excellence.
//             </p>
//           </div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {samplePosts.map((post) => (
//               <BlogCard
//                 key={post.id}
//                 id={post.id}
//                 title={post.title}
//                 excerpt={post.excerpt}
//                 author={post.author}
//                 category={post.category}
//                 date={post.date}
//               />
//             ))}
//           </div>
//         </div>
//       </section>

//       <section className="bg-secondary text-secondary-foreground py-16 md:py-24">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <h2 className="text-3xl md:text-4xl font-bold mb-6">Subscribe to Our Newsletter</h2>
//           <p className="text-lg text-secondary-foreground/80 mb-8 max-w-2xl mx-auto">
//             Get the latest articles and resources delivered to your inbox.
//           </p>
//           <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
//             <input
//               type="email"
//               placeholder="Enter your email"
//               className="flex-1 px-4 py-3 rounded-lg bg-secondary-foreground/10 border border-secondary-foreground/20 text-secondary-foreground placeholder:text-secondary-foreground/50 focus:outline-none focus:border-accent"
//             />
//             <button
//               type="submit"
//               className="bg-accent text-accent-foreground px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
//             >
//               Subscribe
//             </button>
//           </form>
//         </div>
//       </section>

//       <Footer />
//     </main>
//   )
// }
