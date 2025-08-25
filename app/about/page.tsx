import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Heart, MapPin, Star } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/cinematic-photo-of-sri-lankan-mountains-meeting-mo.png')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/50"></div>
        </div>

        <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
          <blockquote className="font-playfair italic text-3xl md:text-4xl lg:text-5xl leading-relaxed mb-8">
            "More than a guide — we're your local vibe compass."
          </blockquote>
          <div className="w-24 h-1 bg-accent mx-auto mb-8"></div>
          <p className="font-poppins text-lg md:text-xl opacity-90 max-w-3xl mx-auto">
            Discover the soul of Sri Lanka through its flavors, celebrations, and hidden gems
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="font-bebas text-5xl md:text-6xl text-primary mb-6 tracking-wide">OUR STORY</h1>
            <div className="w-16 h-1 bg-accent mx-auto"></div>
          </div>

          <div className="space-y-8 font-poppins text-lg leading-relaxed text-foreground">
            <p>
              Born from a passion for Sri Lanka's incredible culinary landscape and vibrant cultural scene, ko|HEDHA
              emerged as more than just another discovery platform. We recognized that finding authentic experiences in
              Sri Lanka shouldn't be left to chance or generic recommendations.
            </p>

            <p>
              Our journey began with a simple observation: Sri Lanka's food and event scene is incredibly rich, but
              navigating it can be overwhelming. From hidden street food gems in Pettah to exclusive rooftop dining in
              Colombo 3, from traditional cultural performances to modern fusion experiences — the island offers endless
              possibilities, but they're often scattered and hard to discover.
            </p>

            <p>
              We built ko|HEDHA to be your compass in this adventure. Not just pointing you toward destinations, but
              helping you understand the vibe, the culture, and the stories behind each experience. Whether you're a
              local looking to rediscover your city or a visitor seeking authentic Sri Lankan experiences, we curate
              every recommendation with care.
            </p>

            <p>
              Today, ko|HEDHA connects food lovers and culture enthusiasts with Sri Lanka's most exciting venues and
              events. We partner with local businesses, celebrate traditional flavors, and champion innovative culinary
              artists who are shaping the future of Sri Lankan dining and entertainment.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 bg-muted/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-bebas text-4xl md:text-5xl text-primary mb-6 tracking-wide">WHAT DRIVES US</h2>
            <div className="w-16 h-1 bg-accent mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg bg-card">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="h-8 w-8 text-accent-foreground" />
                </div>
                <h3 className="font-bebas text-2xl text-primary mb-4 tracking-wide">AUTHENTIC EXPERIENCES</h3>
                <p className="font-poppins text-muted-foreground leading-relaxed">
                  We celebrate genuine Sri Lankan culture, from traditional recipes passed down through generations to
                  innovative interpretations that honor our heritage.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-card">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8 text-accent-foreground" />
                </div>
                <h3 className="font-bebas text-2xl text-primary mb-4 tracking-wide">COMMUNITY FIRST</h3>
                <p className="font-poppins text-muted-foreground leading-relaxed">
                  We support local businesses, connect like-minded food enthusiasts, and build bridges between
                  communities through shared culinary experiences.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-card">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
                  <Star className="h-8 w-8 text-accent-foreground" />
                </div>
                <h3 className="font-bebas text-2xl text-primary mb-4 tracking-wide">CURATED QUALITY</h3>
                <p className="font-poppins text-muted-foreground leading-relaxed">
                  Every venue and event on ko|HEDHA is personally vetted. We don't just list places — we recommend
                  experiences that we believe in and would enjoy ourselves.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-bebas text-4xl md:text-5xl text-primary mb-6 tracking-wide">THE TEAM</h2>
          <div className="w-16 h-1 bg-accent mx-auto mb-12"></div>

          <p className="font-poppins text-lg text-muted-foreground leading-relaxed mb-12">
            ko|HEDHA is built by a passionate team of food enthusiasts, cultural explorers, and technology innovators
            who call Sri Lanka home. We combine deep local knowledge with modern technology to create experiences that
            matter.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="text-center">
              <div className="w-32 h-32 bg-muted rounded-full mx-auto mb-4 flex items-center justify-center">
                <Users className="h-16 w-16 text-muted-foreground" />
              </div>
              <h3 className="font-bebas text-xl text-primary mb-2 tracking-wide">CULINARY EXPERTS</h3>
              <p className="font-poppins text-muted-foreground">
                Local food critics and chefs who understand the nuances of Sri Lankan cuisine
              </p>
            </div>

            <div className="text-center">
              <div className="w-32 h-32 bg-muted rounded-full mx-auto mb-4 flex items-center justify-center">
                <MapPin className="h-16 w-16 text-muted-foreground" />
              </div>
              <h3 className="font-bebas text-xl text-primary mb-2 tracking-wide">LOCAL EXPLORERS</h3>
              <p className="font-poppins text-muted-foreground">
                Community scouts who discover hidden gems and emerging trends across the island
              </p>
            </div>
          </div>

          <Button
            size="lg"
            className="bg-accent hover:bg-accent/90 text-accent-foreground font-poppins font-medium px-12 py-4 text-lg"
          >
            Join the Community
          </Button>
        </div>
      </section>
    </div>
  )
}
