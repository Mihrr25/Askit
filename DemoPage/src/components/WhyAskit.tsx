import { useEffect, useRef, useState } from 'react';
import { IndianRupee, Users, Smartphone, Clock } from 'lucide-react';

const features = [
  {
    icon: IndianRupee,
    title: "Earn While You Learn",
    description: "Use your skills to make money with flexible hours that fit your schedule"
  },
  {
    icon: Users,
    title: "Trusted Campus Community",
    description: "Verified students only, in your region. Build connections that last"
  },
  {
    icon: Smartphone,
    title: "Fast, Simple & Mobile-first",
    description: "No resumes. No formalities. Just value exchange made simple"
  },
  {
    icon: Clock,
    title: "Use Your Time Better",
    description: "Outsource small tasks or offer help in your free hours"
  }
];

const WhyAskit = () => {
  const [visibleFeatures, setVisibleFeatures] = useState<number[]>([]);
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.3,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const featureIndex = featureRefs.current.findIndex(ref => ref === entry.target);
          if (featureIndex !== -1 && !visibleFeatures.includes(featureIndex)) {
            setVisibleFeatures(prev => [...prev, featureIndex]);
          }
        }
      });
    }, observerOptions);

    featureRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [visibleFeatures]);

  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-poppins mb-6">
            Why Choose <span className="text-primary">Askit?</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Built specifically for students, by students. Experience the future of campus collaboration.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const isVisible = visibleFeatures.includes(index);
              
              return (
                <div
                  key={index}
                  ref={(el) => featureRefs.current[index] = el}
                  className={`group p-8 bg-card border border-border rounded-2xl hover:border-primary/50 transition-all duration-700 transform ${
                    isVisible 
                      ? 'opacity-100 translate-x-0' 
                      : 'opacity-0 translate-x-10'
                  }`}
                  style={{
                    transitionDelay: `${index * 150}ms`
                  }}
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold font-poppins mb-3 text-foreground group-hover:text-primary transition-colors">
                        {feature.title}
                      </h3>
                      
                      <p className="text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
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

export default WhyAskit;