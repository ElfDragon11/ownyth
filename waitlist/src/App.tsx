import React from 'react';
import { ArrowRight, Book, Film, Tv, Lock, RefreshCw, Wallet } from 'lucide-react';
import { Logo } from './components/Logo';
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { insertWaitlistSchema, type InsertWaitlist } from "../shared/schema";
import { useSearchParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [searchParams] = useSearchParams();
  const source = searchParams.get("src") || "Website";

  const form = useForm<InsertWaitlist>({
    resolver: zodResolver(insertWaitlistSchema),
    defaultValues: {
      email: "",
      fullName: "",
      Hp: "",
      source: source,
      mediaPreference: "",
      userType: ""
    }
  });

  const joinWaitlist = useMutation({
    mutationFn: async (data: InsertWaitlist) => {
      if (data.Hp !== "") {
        console.log("Spam detected! Blocking submission.");
        throw new Error("Spam detected! Submission blocked.");
      }
      
      const response = await fetch("/server/addWaitlistSignup.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }
      return response.json();
    },
    onSuccess: (result) => {
      if(result.success){ 
        toast.success("You've been added to the waitlist!");
        form.reset();
      }else{
        toast.error("Error: " + result.message);
      }

    },
    onError: (error: Error) => {
      console.log(error);
      toast.error(error.message || "Something went wrong. Please try again.");
    }
  });

  const onSubmit = form.handleSubmit((data) => {
    joinWaitlist.mutate(data);
  });

  return (
    <div className="min-h-screen bg-[#1C1C1E] text-[#F3F3F4]">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#1C1C1E]/80 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Logo />
          <button 
            onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-gradient-to-r from-[#9055FF] to-[#4F3CFF] hover:from-[#4050a3] hover:to-[#4050a3] text-white font-semibold px-6 py-2 rounded-lg transition-all duration-300"
          >
            Join Waitlist
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20 mt-16 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="./images/heroImage.png"
            alt=""
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1C1C1E] via-[#1C1C1E]/35 to-[#1C1C1E]"></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#3F8CFF]/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#9055FF]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Content */}
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
            What you buy should be yours.
          </h1>
          <p className="text-xl md:text-2xl text-[#A6A6A8] mb-8 max-w-3xl mx-auto">
            Truly own your favorite books, films, and shows — not just access them.
          </p>
          <button 
            onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-gradient-to-r from-[#9055FF] to-[#4F3CFF] hover:from-[#4050a3] hover:to-[#4050a3] text-white font-semibold px-8 py-4 rounded-lg text-lg transition-all duration-300"
          >
            Join the Waitlist
          </button>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                icon: <Wallet className="w-12 h-12 text-[#3F8CFF]" />,
                title: "Buy your digital media",
                description: "Purchase content directly and secure true ownership through blockchain technology."
              },
              {
                icon: <RefreshCw className="w-12 h-12 text-[#3F8CFF]" />,
                title: "Customize your experience",
                description: "Add notes, edit preferences, and make it truly yours."
              },
              {
                icon: <Lock className="w-12 h-12 text-[#3F8CFF]" />,
                title: "Own it forever",
                description: "Access offline, transfer to others, and maintain permanent ownership."
              }
            ].map((step, index) => (
              <div key={index} className="text-center p-6 rounded-xl bg-white/5">
                <div className="flex justify-center mb-6">{step.icon}</div>
                <h3 className="text-2xl font-semibold mb-4">{step.title}</h3>
                <p className="text-[#A6A6A8]">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Ownership Matters */}
      <section className="py-20 px-4 bg-white/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Why Ownership Matters</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex gap-4">
                <Book className="w-6 h-6 text-[#3F8CFF] flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">True Digital Ownership</h3>
                  <p className="text-[#A6A6A8]">No more temporary access. Your purchases are truly yours, backed by blockchain technology.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Film className="w-6 h-6 text-[#3F8CFF] flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Resale Rights</h3>
                  <p className="text-[#A6A6A8]">Transfer or sell your digital content just like physical media.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Tv className="w-6 h-6 text-[#3F8CFF] flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Offline Access</h3>
                  <p className="text-[#A6A6A8]">Access your content anytime, anywhere, without requiring an internet connection.</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="./images/example.png" 
                alt="Digital Content Ownership" 
                className="rounded-xl w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1E] to-transparent rounded-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Waitlist Form */}
      <section id="waitlist" className="py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-8">Join the Waitlist</h2>
          <p className="text-center text-[#A6A6A8] mb-12">Be among the first to experience true digital ownership.</p>
          
          <form onSubmit={onSubmit} className="space-y-6">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                id="fullName"
                {...form.register("fullName")}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-[#3F8CFF] focus:ring-1 focus:ring-[#3F8CFF] transition-all"
              />
              {form.formState.errors.fullName && (
                <p className="mt-1 text-red-500">{form.formState.errors.fullName.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                id="email"
                {...form.register("email")}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-[#3F8CFF] focus:ring-1 focus:ring-[#3F8CFF] transition-all"
              />
              {form.formState.errors.email && (
                <p className="mt-1 text-red-500">{form.formState.errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="mediaPreference" className="block text-sm font-medium mb-2">What kind of media do you care most about?</label>
              <select
                id="mediaPreference"
                {...form.register("mediaPreference")}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-[#3F8CFF] focus:ring-1 focus:ring-[#3F8CFF] transition-all"
              >
                <option value="" className="text-black">Select an option</option>
                <option value="books" className="text-black">Books</option>
                <option value="movies" className="text-black">Movies</option>
                <option value="shows" className="text-black">TV Shows</option>
                <option value="all" className="text-black">All of the above</option>
              </select>
              {form.formState.errors.mediaPreference && (
                <p className="mt-1 text-red-500">{form.formState.errors.mediaPreference.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="userType" className="block text-sm font-medium mb-2">Are you a creator or a consumer?</label>
              <select
                id="userType"
                {...form.register("userType")}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-[#3F8CFF] focus:ring-1 focus:ring-[#3F8CFF] transition-all"
              >
                <option value="" className="text-black">Select an option</option>
                <option value="creator" className="text-black">Creator</option>
                <option value="consumer" className="text-black">Consumer</option>
                <option value="both" className="text-black">Both</option>
              </select>
              {form.formState.errors.userType && (
                <p className="mt-1 text-red-500">{form.formState.errors.userType.message}</p>
              )}
            </div>

            <input type="text" {...form.register("Hp")} className="hidden" />
            <input type="hidden" {...form.register("source")} />

            <button
              type="submit"
              disabled={joinWaitlist.isPending}
              className="w-full bg-gradient-to-r from-[#9055FF] to-[#4F3CFF] hover:from-[#4050a3] hover:to-[#4050a3] text-white font-semibold px-8 py-4 rounded-lg text-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {joinWaitlist.isPending ? 'Submitting...' : 'Get Early Access'}
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12">
            <Logo className="mb-8 md:mb-0" />
            <div className="flex gap-6">
              <a href="#" className="text-[#A6A6A8] hover:text-white transition-colors">Twitter</a>
              <a href="#" className="text-[#A6A6A8] hover:text-white transition-colors">Discord</a>
              <a href="#" className="text-[#A6A6A8] hover:text-white transition-colors">LinkedIn</a>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-[#A6A6A8] hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="text-[#A6A6A8] hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="text-[#A6A6A8] hover:text-white transition-colors">Press</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-[#A6A6A8] hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="text-[#A6A6A8] hover:text-white transition-colors">Terms</a></li>
                <li><a href="#" className="text-[#A6A6A8] hover:text-white transition-colors">Privacy</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-[#A6A6A8] hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="text-[#A6A6A8] hover:text-white transition-colors">Developers</a></li>
                <li><a href="#" className="text-[#A6A6A8] hover:text-white transition-colors">Documentation</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Connect</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-[#A6A6A8] hover:text-white transition-colors">Twitter</a></li>
                <li><a href="#" className="text-[#A6A6A8] hover:text-white transition-colors">Discord</a></li>
                <li><a href="#" className="text-[#A6A6A8] hover:text-white transition-colors">LinkedIn</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/10 text-center text-[#A6A6A8]">
            <p>&copy; 2025 Ownyth. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;