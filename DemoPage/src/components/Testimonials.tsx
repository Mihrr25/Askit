import { useEffect, useRef, useState } from 'react';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    text: "I made ₹1,000 just editing a video for someone via Askit!",
    author: "Priya, Delhi University",
    category: "Video Editing"
  },
  {
    text: "I found someone to help me with my workouts on Askit!",
    author: "Anuj, NMIMS University",
    category: "Fitness Partner"
  },
  {
    text: "I met my college deadlines with help for research & writing on Askit.",
    author: "Reyansh, St. Xavier's",
    category: "Academic Help"
  },
  {
    text: "I borrowed a Bluetooth speaker last minute and saved our house party!",
    author: "Sneha, Amity University",
    category: "Equipment Rental"
  }
];

const Testimonials = () => {
  const [visibleTestimonials, setVisibleTestimonials] = useState<number[]>([]);
  const testimonialRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.3,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const testimonialIndex = testimonialRefs.current.findIndex(ref => ref === entry.target);
          if (testimonialIndex !== -1 && !visibleTestimonials.includes(testimonialIndex)) {
            setVisibleTestimonials(prev => [...prev, testimonialIndex]);
          }
        }
      });
    }, observerOptions);

    testimonialRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [visibleTestimonials]);

  return (
    <section className="py-20 bg-dark-surface">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-poppins mb-6">
            What Students Are <span className="text-primary">Saying</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real experiences from real students across India
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => {
              const isVisible = visibleTestimonials.includes(index);
              
              return (
                <div
                  key={index}
                  ref={(el) => testimonialRefs.current[index] = el}
                  className={`group p-8 bg-card border border-border rounded-2xl hover:border-primary/50 hover:shadow-glow transition-all duration-700 transform hover:scale-105 hover:-translate-y-2 ${
                    isVisible 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-10'
                  }`}
                  style={{
                    transitionDelay: `${index * 200}ms`
                  }}
                >
                  <div className="relative">
                    <Quote className="w-8 h-8 text-primary mb-4 opacity-80" />
                    
                    <blockquote className="text-lg text-foreground mb-6 leading-relaxed">
                      "{testimonial.text}"
                    </blockquote>
                    
                    <div className="flex items-center justify-between">
                      <cite className="text-muted-foreground not-italic">
                        {testimonial.author}
                      </cite>
                      <span className="text-xs bg-primary/20 text-primary px-3 py-1 rounded-full">
                        {testimonial.category}
                      </span>
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

export default Testimonials;