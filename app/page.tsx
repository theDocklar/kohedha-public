import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { Search, MapPin, Star, Clock, Users, Calendar, Filter, Heart, Share2 } from "lucide-react"
import LatestEvents from "@/components/latest-events"

export default function HomePage() {
  return (
    <div className="min-h-screen ">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/hero.svg')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
          {/* <div className="mb-8">
            <h1 className="font-bebas text-7xl md:text-9xl lg:text-[12rem] tracking-[0.2em] mb-6 leading-none">
              ko|HEDHA
            </h1>
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="text-sm font-poppins opacity-80">theBOAT.group</div>
              <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-accent-foreground">pulse</span>
              </div>
            </div>
          </div> */}

          {/* <p className="font-playfair italic text-2xl md:text-3xl mb-12 opacity-90 max-w-3xl mx-auto leading-relaxed">
            More than a guide — we're your local vibe compass for Sri Lankan food & culture
          </p> */}

          {/* CTA Buttons */}
          {/* <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button
              size="lg"
              className="bg-black hover:bg-black/90 text-white font-poppins font-semibold px-12 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              
            >
              Discover Sri Lanka
            </Button>
            <Link href="/events">
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-white/80 text-white hover:bg-white hover:text-black font-poppins font-semibold px-12 py-4 text-lg bg-white/10 backdrop-blur-sm rounded-full transition-all duration-300"
            >
              Explore Events
            </Button>
            </Link>
           
          </div> */}
        </div>

        {/* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 animate-bounce">
          <div className="flex flex-col items-center gap-2">
            <div className="w-px h-8 bg-white/40"></div>
            <div className="text-xs font-poppins tracking-wider">SCROLL</div>
          </div>
        </div> */}
      </section>

      {/* Enhanced Search & Filters Section */}
      <section className="py-12 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="bg-card rounded-2xl p-6 shadow-lg border border-border">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input placeholder="Venue or cuisine..." className="pl-10 font-poppins" />
              </div>
              <div className="relative">
                <Select>
                  <SelectTrigger className="font-poppins">
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="colombo-3">Colombo 3</SelectItem>
                    <SelectItem value="galle-face">Galle Face</SelectItem>
                    <SelectItem value="pettah">Pettah</SelectItem>
                    <SelectItem value="mount-lavinia">Mount Lavinia</SelectItem>
                    <SelectItem value="kandy">Kandy</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="relative">
                <Select>
                  <SelectTrigger className="font-poppins">
                    <SelectValue placeholder="Vibe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="romantic">Romantic</SelectItem>
                    <SelectItem value="rooftop">Rooftop</SelectItem>
                    <SelectItem value="live-music">Live Music</SelectItem>
                    <SelectItem value="family">Family Friendly</SelectItem>
                    <SelectItem value="trendy">Trendy</SelectItem>
                    <SelectItem value="authentic">Authentic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="relative">
                <Select>
                  <SelectTrigger className="font-poppins">
                    <SelectValue placeholder="When" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="open-now">Open Now</SelectItem>
                    <SelectItem value="tonight">Tonight Only</SelectItem>
                    <SelectItem value="weekend">This Weekend</SelectItem>
                    <SelectItem value="next-week">Next Week</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="bg-black hover:bg-black/90 text-white font-poppins font-medium">
                Search
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge
                variant="outline"
                className="cursor-pointer hover:bg-accent hover:text-accent-foreground font-poppins"
              >
                <Filter className="h-3 w-3 mr-1" />
                Sri Lankan
              </Badge>
              <Badge
                variant="outline"
                className="cursor-pointer hover:bg-accent hover:text-accent-foreground font-poppins"
              >
                Under LKR 3000
              </Badge>
              <Badge
                variant="outline"
                className="cursor-pointer hover:bg-accent hover:text-accent-foreground font-poppins"
              >
                Highly Rated
              </Badge>
              <Badge
                variant="outline"
                className="cursor-pointer hover:bg-accent hover:text-accent-foreground font-poppins"
              >
                New Openings
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Deals Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-bebas text-4xl md:text-5xl text-primary mb-4 tracking-wide">TRENDING VENUES</h2>
            <p className="font-playfair italic text-lg text-muted-foreground">
              Where Sri Lanka gathers to eat and celebrate
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Venue Card 1 */}
            <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="relative h-64 overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                  style={{
                    backgroundImage: `url('/elegant-sri-lankan-restaurant-rooftop-dining-with-.png')`,
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="font-bebas text-2xl tracking-wide">ROOFTOP SPICE</h3>
                  <p className="font-poppins text-sm opacity-90">Fine Dining • Rooftop</p>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge className="bg-accent text-accent-foreground font-poppins">
                    <Star className="h-3 w-3 mr-1" />
                    4.8
                  </Badge>
                </div>
                <div className="absolute top-4 left-4 flex gap-2">
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0 bg-white/20 hover:bg-white/30 text-white">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0 bg-white/20 hover:bg-white/30 text-white">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center text-muted-foreground font-poppins text-sm">
                    <MapPin className="h-4 w-4 mr-1" />
                    Colombo 3 • 2.1 km
                  </div>
                  <div className="flex items-center text-muted-foreground font-poppins text-sm">
                    <Clock className="h-4 w-4 mr-1" />
                    Open Now
                  </div>
                </div>
                <div className="flex gap-2 mb-3">
                  <Badge variant="secondary" className="font-poppins text-xs">
                    Romantic
                  </Badge>
                  <Badge variant="secondary" className="font-poppins text-xs">
                    Live Music
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <Button className="flex-1 bg-black hover:bg-black/90 text-white font-poppins">Book Now</Button>
                  <Button variant="outline" size="sm" className="px-3 bg-transparent">
                    <MapPin className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Venue Card 2 */}
            <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="relative h-64 overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                  style={{
                    backgroundImage: `url('/traditional-sri-lankan-street-food-stall-with-colo.png')`,
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="font-bebas text-2xl tracking-wide">STREET FLAVORS</h3>
                  <p className="font-poppins text-sm opacity-90">Street Food • Casual</p>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge className="bg-accent text-accent-foreground font-poppins">
                    <Star className="h-3 w-3 mr-1" />
                    4.6
                  </Badge>
                </div>
                <div className="absolute top-4 left-4 flex gap-2">
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0 bg-white/20 hover:bg-white/30 text-white">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0 bg-white/20 hover:bg-white/30 text-white">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center text-muted-foreground font-poppins text-sm">
                    <MapPin className="h-4 w-4 mr-1" />
                    Pettah • 1.5 km
                  </div>
                  <div className="flex items-center text-muted-foreground font-poppins text-sm">
                    <Clock className="h-4 w-4 mr-1" />
                    Open Now
                  </div>
                </div>
                <div className="flex gap-2 mb-3">
                  <Badge variant="secondary" className="font-poppins text-xs">
                    Authentic
                  </Badge>
                  <Badge variant="secondary" className="font-poppins text-xs">
                    Budget
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <Button className="flex-1 bg-black hover:bg-black/90 text-white font-poppins">Join Waitlist</Button>
                  <Button variant="outline" size="sm" className="px-3 bg-transparent">
                    <MapPin className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Venue Card 3 */}
            <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="relative h-64 overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                  style={{
                    backgroundImage: `url('/modern-sri-lankan-fusion-restaurant-with-contempor.png')`,
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="font-bebas text-2xl tracking-wide">FUSION GARDEN</h3>
                  <p className="font-poppins text-sm opacity-90">Fusion • Modern</p>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge className="bg-accent text-accent-foreground font-poppins">
                    <Star className="h-3 w-3 mr-1" />
                    4.9
                  </Badge>
                </div>
                <div className="absolute top-4 left-4 flex gap-2">
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0 bg-white/20 hover:bg-white/30 text-white">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0 bg-white/20 hover:bg-white/30 text-white">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center text-muted-foreground font-poppins text-sm">
                    <MapPin className="h-4 w-4 mr-1" />
                    Galle Face • 3.2 km
                  </div>
                  <div className="flex items-center text-muted-foreground font-poppins text-sm">
                    <Clock className="h-4 w-4 mr-1" />
                    Opens 6 PM
                  </div>
                </div>
                <div className="flex gap-2 mb-3">
                  <Badge variant="secondary" className="font-poppins text-xs">
                    Trendy
                  </Badge>
                  <Badge variant="secondary" className="font-poppins text-xs">
                    Instagram
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <Button className="flex-1 bg-black hover:bg-black/90 text-white font-poppins">Book Now</Button>
                  <Button variant="outline" size="sm" className="px-3 bg-transparent">
                    <MapPin className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Venue Card 4 */}
            <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="relative h-64 overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                  style={{
                    backgroundImage: `url('/beachside-seafood-restaurant-sri-lanka-sunset.png')`,
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="font-bebas text-2xl tracking-wide">OCEAN BREEZE</h3>
                  <p className="font-poppins text-sm opacity-90">Seafood • Beachside</p>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge className="bg-accent text-accent-foreground font-poppins">
                    <Star className="h-3 w-3 mr-1" />
                    4.7
                  </Badge>
                </div>
                <div className="absolute top-4 left-4 flex gap-2">
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0 bg-white/20 hover:bg-white/30 text-white">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0 bg-white/20 hover:bg-white/30 text-white">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center text-muted-foreground font-poppins text-sm">
                    <MapPin className="h-4 w-4 mr-1" />
                    Mount Lavinia • 8.5 km
                  </div>
                  <div className="flex items-center text-muted-foreground font-poppins text-sm">
                    <Clock className="h-4 w-4 mr-1" />
                    Open Now
                  </div>
                </div>
                <div className="flex gap-2 mb-3">
                  <Badge variant="secondary" className="font-poppins text-xs">
                    Sunset Views
                  </Badge>
                  <Badge variant="secondary" className="font-poppins text-xs">
                    Fresh Catch
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <Button className="flex-1 bg-black hover:bg-black/90 text-white font-poppins">Book Now</Button>
                  <Button variant="outline" size="sm" className="px-3 bg-transparent">
                    <MapPin className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Venue Card 5 */}
            <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="relative h-64 overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                  style={{
                    backgroundImage: `url('/traditional-sri-lankan-tea-house-kandy-hills.png')`,
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="font-bebas text-2xl tracking-wide">HILL COUNTRY TEA</h3>
                  <p className="font-poppins text-sm opacity-90">Tea House • Traditional</p>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge className="bg-accent text-accent-foreground font-poppins">
                    <Star className="h-3 w-3 mr-1" />
                    4.5
                  </Badge>
                </div>
                <div className="absolute top-4 left-4 flex gap-2">
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0 bg-white/20 hover:bg-white/30 text-white">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0 bg-white/20 hover:bg-white/30 text-white">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center text-muted-foreground font-poppins text-sm">
                    <MapPin className="h-4 w-4 mr-1" />
                    Kandy • 115 km
                  </div>
                  <div className="flex items-center text-muted-foreground font-poppins text-sm">
                    <Clock className="h-4 w-4 mr-1" />
                    Open Now
                  </div>
                </div>
                <div className="flex gap-2 mb-3">
                  <Badge variant="secondary" className="font-poppins text-xs">
                    Mountain Views
                  </Badge>
                  <Badge variant="secondary" className="font-poppins text-xs">
                    Ceylon Tea
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <Button className="flex-1 bg-black hover:bg-black/90 text-white font-poppins">Book Now</Button>
                  <Button variant="outline" size="sm" className="px-3 bg-transparent">
                    <MapPin className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Venue Card 6 */}
            <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="relative h-64 overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                  style={{
                    backgroundImage: `url('/modern-sri-lankan-cocktail-bar-nightlife-colombo.png')`,
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="font-bebas text-2xl tracking-wide">SPICE LOUNGE</h3>
                  <p className="font-poppins text-sm opacity-90">Cocktails • Nightlife</p>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge className="bg-accent text-accent-foreground font-poppins">
                    <Star className="h-3 w-3 mr-1" />
                    4.8
                  </Badge>
                </div>
                <div className="absolute top-4 left-4 flex gap-2">
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0 bg-white/20 hover:bg-white/30 text-white">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0 bg-white/20 hover:bg-white/30 text-white">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center text-muted-foreground font-poppins text-sm">
                    <MapPin className="h-4 w-4 mr-1" />
                    Colombo 2 • 1.8 km
                  </div>
                  <div className="flex items-center text-muted-foreground font-poppins text-sm">
                    <Clock className="h-4 w-4 mr-1" />
                    Opens 8 PM
                  </div>
                </div>
                <div className="flex gap-2 mb-3">
                  <Badge variant="secondary" className="font-poppins text-xs">
                    Craft Cocktails
                  </Badge>
                  <Badge variant="secondary" className="font-poppins text-xs">
                    DJ Nights
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <Button className="flex-1 bg-black hover:bg-black/90 text-white font-poppins">Reserve Table</Button>
                  <Button variant="outline" size="sm" className="px-3 bg-transparent">
                    <MapPin className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="font-poppins font-medium px-8 bg-transparent">
              Load More Venues
            </Button>
          </div>
        </div>
      </section>

            {/* Enhanced Featured Venues Section */}
            <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-bebas text-4xl md:text-5xl text-primary mb-4 tracking-wide">TRENDING Events</h2>
            <p className="font-playfair italic text-lg text-muted-foreground">
              Where Sri Lanka gathers to eat and celebrate
            </p>
          </div>

          <LatestEvents />

          <div className="text-center mt-12">
            <Link href='/events'>
            <Button variant="outline" size="lg" className="font-poppins font-medium px-8 bg-transparent">
              Load More Events
            </Button>
            </Link>
          
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-muted/10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-bebas text-4xl md:text-5xl text-primary mb-4 tracking-wide">NEARBY RECOMMENDATIONS</h2>
            <p className="font-playfair italic text-lg text-muted-foreground">Discover hidden gems in your area</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="group overflow-hidden border-0 shadow-md hover:shadow-lg transition-all duration-300">
              <div className="relative h-40 overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                  style={{
                    backgroundImage: `url('/local-sri-lankan-bakery-fresh-bread.png')`,
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
                <div className="absolute bottom-2 left-2 text-white">
                  <h4 className="font-bebas text-lg tracking-wide">LOCAL BAKERY</h4>
                </div>
                <div className="absolute top-2 right-2">
                  <Badge className="bg-accent text-accent-foreground font-poppins text-xs">0.3 km</Badge>
                </div>
              </div>
            </Card>

            <Card className="group overflow-hidden border-0 shadow-md hover:shadow-lg transition-all duration-300">
              <div className="relative h-40 overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                  style={{
                    backgroundImage: `url('/sri-lankan-juice-bar-fresh-tropical-fruits.png')`,
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
                <div className="absolute bottom-2 left-2 text-white">
                  <h4 className="font-bebas text-lg tracking-wide">JUICE CORNER</h4>
                </div>
                <div className="absolute top-2 right-2">
                  <Badge className="bg-accent text-accent-foreground font-poppins text-xs">0.5 km</Badge>
                </div>
              </div>
            </Card>

            <Card className="group overflow-hidden border-0 shadow-md hover:shadow-lg transition-all duration-300">
              <div className="relative h-40 overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                  style={{
                    backgroundImage: `url('/traditional-sri-lankan-sweet-shop-colorful-dessert.png')`,
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
                <div className="absolute bottom-2 left-2 text-white">
                  <h4 className="font-bebas text-lg tracking-wide">SWEET TREATS</h4>
                </div>
                <div className="absolute top-2 right-2">
                  <Badge className="bg-accent text-accent-foreground font-poppins text-xs">0.7 km</Badge>
                </div>
              </div>
            </Card>

            <Card className="group overflow-hidden border-0 shadow-md hover:shadow-lg transition-all duration-300">
              <div className="relative h-40 overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                  style={{
                    backgroundImage: `url('/sri-lankan-spice-market-colorful-spices-vendor.png')`,
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
                <div className="absolute bottom-2 left-2 text-white">
                  <h4 className="font-bebas text-lg tracking-wide">SPICE MARKET</h4>
                </div>
                <div className="absolute top-2 right-2">
                  <Badge className="bg-accent text-accent-foreground font-poppins text-xs">1.2 km</Badge>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-16 px-4 bg-muted/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-bebas text-4xl md:text-5xl text-primary mb-4 tracking-wide">HAPPENING NOW</h2>
            <p className="font-playfair italic text-lg text-muted-foreground">
              Events that define the Sri Lankan experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Event Card 1 */}
            <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="relative h-48 overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                  style={{
                    backgroundImage: `url('/sri-lankan-cultural-festival-with-traditional-danc.png')`,
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="font-bebas text-2xl tracking-wide">CULTURAL NIGHT</h3>
                  <p className="font-poppins text-sm opacity-90">Traditional Music & Dance</p>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center text-muted-foreground font-poppins text-sm">
                    <Calendar className="h-4 w-4 mr-1" />
                    Tonight, 7:00 PM
                  </div>
                  <Badge className="bg-accent text-accent-foreground font-poppins">LKR 2,500</Badge>
                </div>
                <Button className="w-full bg-black hover:bg-black/90 text-white font-poppins">RSVP Now</Button>
              </CardContent>
            </Card>

            {/* Event Card 2 */}
            <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="relative h-48 overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                  style={{
                    backgroundImage: `url('/sri-lankan-food-festival-with-various-local-dishes.png')`,
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="font-bebas text-2xl tracking-wide">SPICE FESTIVAL</h3>
                  <p className="font-poppins text-sm opacity-90">Food Tasting & Cooking</p>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center text-muted-foreground font-poppins text-sm">
                    <Calendar className="h-4 w-4 mr-1" />
                    This Weekend
                  </div>
                  <Badge className="bg-accent text-accent-foreground font-poppins">Free Entry</Badge>
                </div>
                <Button className="w-full bg-black hover:bg-black/90 text-white font-poppins">Notify Me</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
