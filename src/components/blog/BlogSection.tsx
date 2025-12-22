
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import BlogCard from "./BlogCard";
import { blogPosts } from "./BlogData";

const BlogSection = () => {
  const [visiblePosts] = useState(blogPosts.slice(0, 3));

  return (
    <section id="blog" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our <span className="text-yellow-500">Blog</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Insights, strategies, and expert advice to help your business thrive in the digital landscape
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {visiblePosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
        <div className="text-center mt-12">
          <Button 
            className="bg-yellow-500 hover:bg-yellow-600 text-black group"
            asChild
          >
            <Link to="/blog">
              View All Articles
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
