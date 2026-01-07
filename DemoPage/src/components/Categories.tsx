import { BookOpen, Briefcase, GraduationCap, Computer, Video, Camera, Palette, Fingerprint, Dumbbell, Truck, ArrowRightLeft, Heart, Calendar, Settings } from 'lucide-react';

const categories = [
  {
    icon: BookOpen,
    title: "Assignment Writing Help",
    description: "Research, writing, academic projects, homework help"
  },
  {
    icon: Briefcase,
    title: "Office & Admin Work",
    description: "Data entry, documentation, admin tasks for businesses"
  },
  {
    icon: GraduationCap,
    title: "Tutoring Services",
    description: "Subject teaching, exam prep, study sessions"
  },
  {
    icon: Computer,
    title: "Computer IT & Web Design",
    description: "Tech support, coding, website design, development"
  },
  {
    icon: Video,
    title: "Video Editing Services",
    description: "Content creation, post-production, social media videos"
  },
  {
    icon: Camera,
    title: "Photography & Filmmaking",
    description: "Photo shoots, event coverage, film projects"
  },
  {
    icon: Palette,
    title: "Design Services",
    description: "Logo design, graphics, poster design, UI/UX work"
  },
  {
    icon: Dumbbell,
    title: "Fitness",
    description: "Gym buddies, workout plans, sports"
  },
  {
    icon: Truck,
    title: "Lift-Move-Pack",
    description: "Moving assistance, heavy lifting, packing"
  },
  {
    icon: ArrowRightLeft,
    title: "Borrow-Lend",
    description: "Equipment, books, tools, electronics"
  },
  {
    icon: Heart,
    title: "Pet Care",
    description: "Pet sitting, walking, grooming, care"
  },
  {
    icon: Calendar,
    title: "Events",
    description: "Planning, coordination, setup, management"
  },
  {
    icon: Fingerprint,
    title: "Custom",
    description: "Special requests and unique tasks"
  }
];

const Categories = () => {
  return (
    <section className="py-20 bg-dark-surface">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-poppins mb-6">
            Explore Service Categories for <span className="text-primary">Student Freelancers</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From design help and content writing to tutoring and tech support - discover freelancing opportunities tailored to college student skills.
          </p>
        </div>


        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((category, index) => {
              const Icon = category.icon;
              
              return (
                <div
                  key={index}
                  className="group p-4 bg-card border border-border rounded-xl hover:border-primary/50 hover:shadow-glow transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 animate-fade-in hover:rotate-1"
                  style={{
                    animationDelay: `${index * 150}ms`
                  }}
                >
                  <div className="text-center">
                    <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/30 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                      <Icon className="w-5 h-5 text-primary group-hover:scale-125 transition-transform duration-300" />
                    </div>
                    
                    <h3 className="font-semibold font-poppins mb-2 text-foreground group-hover:text-primary transition-colors">
                      {category.title}
                    </h3>
                    
                    <p className="text-sm text-muted-foreground">
                      {category.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categories;