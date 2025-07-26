import { BookOpen, Briefcase, GraduationCap, Computer, Video, Camera, Palette, Fingerprint, Dumbbell, Truck, ArrowRightLeft, Heart, Calendar, Settings } from 'lucide-react';

const categories = [
  {
    icon: BookOpen,
    title: "Homework and Assignments",
    description: "Research, writing, academic projects"
  },
  {
    icon: Briefcase,
    title: "Office Work",
    description: "Data entry, documentation, admin tasks"
  },
  {
    icon: GraduationCap,
    title: "Tutoring",
    description: "Subject teaching, exam prep, study sessions"
  },
  {
    icon: Computer,
    title: "Computer IT",
    description: "Tech support, coding, web development"
  },
  {
    icon: Video,
    title: "Video Editing",
    description: "Content creation, post-production, effects"
  },
  {
    icon: Camera,
    title: "Photography-Filmmaking",
    description: "Photo shoots, event coverage, film projects"
  },
  {
    icon: Palette,
    title: "Design",
    description: "Graphics, logos, UI/UX, creative work"
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
            Explore Categories Tailored to <span className="text-primary">Student Life</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Multiple categories to choose from, crafted for your needs.
          </p>
        </div>


        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((category, index) => {
              const Icon = category.icon;
              
              return (
                <div
                  key={index}
                  className="group p-6 bg-card border border-border rounded-xl hover:border-primary/50 hover:shadow-glow transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 animate-fade-in hover:rotate-1"
                  style={{
                    animationDelay: `${index * 150}ms`
                  }}
                >
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/30 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                      <Icon className="w-6 h-6 text-primary group-hover:scale-125 transition-transform duration-300" />
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