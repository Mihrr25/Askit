import { useEffect, useRef, useState } from 'react';
import { Quote, Send } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { useToast } from '@/hooks/use-toast';

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
  const { toast } = useToast();
  
  const [reviewForm, setReviewForm] = useState({
    name: '',
    college: '',
    review: '',
    category: ''
  });

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

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!reviewForm.name || !reviewForm.review) {
      toast({
        title: "Missing Information",
        description: "Please fill in your name and review.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Thank you for your review!",
      description: "We appreciate your feedback and will feature it soon.",
    });

    setReviewForm({
      name: '',
      college: '',
      review: '',
      category: ''
    });
  };

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

        {/* Drop a Review Section */}
        <div className="max-w-2xl mx-auto mt-20">
          <div className="text-center mb-10">
            <h3 className="text-3xl md:text-4xl font-bold font-poppins mb-4">
              Share Your <span className="text-primary">Experience</span>
            </h3>
            <p className="text-muted-foreground">
              Help other students by sharing your Askit story
            </p>
          </div>

          <div className="bg-card border border-border rounded-2xl p-8">
            <form onSubmit={handleSubmitReview} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name *</Label>
                  <Input
                    id="name"
                    placeholder="e.g., Priya Sharma"
                    value={reviewForm.name}
                    onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="college">College/University</Label>
                  <Input
                    id="college"
                    placeholder="e.g., Delhi University"
                    value={reviewForm.college}
                    onChange={(e) => setReviewForm({ ...reviewForm, college: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category (Optional)</Label>
                <Input
                  id="category"
                  placeholder="e.g., Video Editing, Academic Help, etc."
                  value={reviewForm.category}
                  onChange={(e) => setReviewForm({ ...reviewForm, category: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="review">Your Review *</Label>
                <Textarea
                  id="review"
                  placeholder="Share your experience with Askit..."
                  value={reviewForm.review}
                  onChange={(e) => setReviewForm({ ...reviewForm, review: e.target.value })}
                  required
                  className="min-h-[120px] resize-none"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full group"
                size="lg"
              >
                <Send className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                Submit Review
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;